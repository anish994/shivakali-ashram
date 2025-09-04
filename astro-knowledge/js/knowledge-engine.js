/*
  SHIVAKALI ASHRAM — Astro Knowledge Engine (v0.1)
  Lightweight loader that:
  - Loads astro-knowledge/catalog.json
  - Validates basic shape (no heavy deps yet)
  - Logs counts and exposes a small API on window.SKAstro
*/
(function(){
  const base = "/astro-knowledge";
  const state = { catalog: null, domains: new Map() };

  async function fetchJSON(path){
    const url = path.startsWith("/") ? path : `${base}/${path}`;
    const res = await fetch(url, { cache: "no-cache" });
    if(!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
    return res.json();
  }

  function validateCatalog(c){
    if(!c || !Array.isArray(c.domains)) throw new Error("Catalog missing domains");
    return true;
  }

  async function load(){
    try{
      const catalog = await fetchJSON("catalog.json");
      validateCatalog(catalog);
      state.catalog = catalog;

      // Load domain item refs (shallow) to count
      for(const d of catalog.domains){
        const items = [];
        for(const item of (d.items||[])){
          try {
            const data = await fetchJSON(item.ref);
            items.push({ ref: item.ref, id: data.id || null, title: data.title || null });
          } catch(e){
            console.warn("Failed item", item.ref, e.message);
          }
        }
        state.domains.set(d.id, { meta: d, items });
      }

      const totalItems = Array.from(state.domains.values()).reduce((a,d)=>a + d.items.length, 0);
      console.log(`🕉️ SKAstro: Loaded catalog with ${catalog.domains.length} domains and ${totalItems} items.`);

      return { domains: catalog.domains.length, items: totalItems };
    } catch(e){
      console.error("SKAstro load error:", e);
      return { error: e.message };
    }
  }

  window.SKAstro = {
    load,
    getCatalog(){ return state.catalog; },
    getDomain(id){ return state.domains.get(id); },
    list(){
      return Array.from(state.domains.entries()).map(([id, d])=>({ id, title: d.meta.title, count: d.items.length }));
    }
  };
})();

