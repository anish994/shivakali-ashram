(function(){
  // ====================================
  // PERFORMANCE OPTIMIZATIONS
  // ====================================
  
  // Throttle function for scroll events
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Debounce function for resize/search events
  function debounce(func, delay) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  }

  // Lazy load images (if needed in future)
  function lazyLoadImages() {
    const images = $all('img[data-src]');
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });
      images.forEach(img => imageObserver.observe(img));
    }
  }

  // ====================================
  // CORE UTILITIES
  // ====================================
  
  function $(sel){ return document.querySelector(sel); }
  function $all(sel){ return Array.from(document.querySelectorAll(sel)); }
  function safeStorage(){
    try { const t='__t'; localStorage.setItem(t,'1'); localStorage.removeItem(t); return localStorage; } catch(e){ return {getItem:()=>null,setItem:()=>{},removeItem:()=>{}}; }
  }
  const store = safeStorage();

  // Scroll progress (throttled for performance)
  function initScrollProgress(){
    const bar = document.querySelector('.scroll-progress-bar');
    if(!bar) return;
    const onScroll = throttle(() => {
      const doc = document.documentElement;
      const total = (doc.scrollHeight - doc.clientHeight) || 1;
      const scrolled = (doc.scrollTop / total) * 100;
      bar.style.width = Math.max(0, Math.min(100, scrolled)) + '%';
    }, 50); // Update every 50ms max
    document.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  // TOC & ScrollSpy
  function initTOC(){
    const links = $all('.toc-link');
    const sections = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
    if(!links.length || !sections.length) return;

    // Mobile toggle
    const toggle = $('.toc-toggle');
    const list = $('#tocList');
    if(toggle && list){
      toggle.addEventListener('click', ()=>{
        const hidden = list.hasAttribute('hidden');
        if(hidden) list.removeAttribute('hidden'); else list.setAttribute('hidden','');
        toggle.setAttribute('aria-expanded', hidden ? 'true' : 'false');
      });
    }

    // Smooth anchor
    links.forEach(a => a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href');
      if(!id.startsWith('#')) return;
      e.preventDefault();
      const el = document.querySelector(id);
      if(el){ el.scrollIntoView({behavior:'smooth', block:'start'}); }
    }));

    // Spy
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(entry => {
        const idx = sections.indexOf(entry.target);
        if(idx>=0 && entry.isIntersecting){
          links.forEach(l => l.classList.remove('active'));
          links[idx].classList.add('active');
          const id = sections[idx].id;
          if(id) store.setItem('sunCodex:last', id);
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 });
    sections.forEach(s => obs.observe(s));
  }

  // In-page search (debounced for performance)
  function initSearch(){
    const input = $('#codexSearch');
    if(!input) return;
    const sections = $all('.codex-section');

    function clearMarks(node){
      $all('mark[data-codex-hit]').forEach(m => {
        const parent = m.parentNode; if(parent){ parent.replaceChild(document.createTextNode(m.textContent||''), m); parent.normalize(); }
      });
    }

    function highlight(node, term){
      if(!term) return;
      const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null);
      const re = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      const nodes = [];
      while(walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(txt => {
        const m = txt.nodeValue.match(re); if(!m) return;
        const span = document.createElement('mark'); span.setAttribute('data-codex-hit',''); span.textContent = m[0];
        const parts = txt.nodeValue.split(re);
        const frag = document.createDocumentFragment();
        for(let i=0;i<parts.length;i++){
          frag.appendChild(document.createTextNode(parts[i]));
          if(i < parts.length-1) frag.appendChild(span.cloneNode(true));
        }
        txt.parentNode && txt.parentNode.replaceChild(frag, txt);
      });
    }

    const performSearch = debounce(() => {
      const q = (input.value||'').trim();
      clearMarks(document.body);
      if(!q){ sections.forEach(s => s.style.display=''); return; }
      const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      sections.forEach(s => {
        const text = s.textContent || '';
        const show = re.test(text);
        s.style.display = show ? '' : 'none';
        if(show) highlight(s, q);
      });
    }, 300); // Wait 300ms after typing stops

    input.addEventListener('input', performSearch);
  }

  // Copy link buttons on section headers
  function initCopyLinks(){
    const sections = $all('.codex-section');
    sections.forEach(sec => {
      const h2 = sec.querySelector('h2.section-title');
      if(!h2) return;
      const btn = document.createElement('button');
      btn.className = 'copy-link';
      btn.type = 'button';
      btn.title = 'Copy link to this section';
      btn.textContent = '🔗';
      btn.addEventListener('click', ()=>{
        const url = location.origin + location.pathname + '#' + sec.id;
        navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(url) : null;
        showToast('Link copied');
        history.replaceState(null, '', '#' + sec.id);
      });
      h2.appendChild(btn);
    });
  }

  // Reading mode toggle
  function initReadingMode(){
    const btn = $('#readingModeBtn');
    const key = 'sunCodex:readingMode';
    if(!btn) return;
    const apply = (on) => {
      document.body.classList.toggle('reading-mode', !!on);
      store.setItem(key, on ? '1':'0');
    };
    const saved = store.getItem(key) === '1';
    apply(saved);
    btn.addEventListener('click', ()=> apply(!document.body.classList.contains('reading-mode')));
  }

  // Resume button
  function initResume(){
    const btn = $('#resumeBtn');
    if(!btn) return;
    const last = store.getItem('sunCodex:last');
    if(last){
      btn.hidden = false;
      btn.addEventListener('click', ()=>{
        const el = document.getElementById(last);
        if(el){ el.scrollIntoView({behavior:'smooth', block:'start'}); }
      });
    }
  }

  // Toast
  function showToast(msg){
    const t = $('#toast'); if(!t) return; t.textContent = msg; t.hidden = false; clearTimeout(showToast._to);
    showToast._to = setTimeout(()=>{ t.hidden = true; }, 1600);
  }

  // Command palette (Ctrl/Cmd+K)
  function initCommandPalette(){
    const openBtn = $('#commandPaletteBtn');
    const backdrop = $('#cmdkBackdrop');
    const modal = $('#cmdk');
    const input = $('#cmdkInput');
    const list = $('#cmdkList');
    const links = $all('.toc-link');
    const items = links.map(a => ({ id: a.getAttribute('href').slice(1), label: a.textContent.trim() }));

    function render(filter=''){
      list.innerHTML='';
      const f = (filter||'').toLowerCase();
      const rows = items.filter(it => it.label.toLowerCase().includes(f));
      rows.forEach((it, i) => {
        const li = document.createElement('li');
        li.className = 'cmdk-item' + (i===0 ? ' active' : '');
        li.setAttribute('role','option');
        li.dataset.id = it.id;
        li.innerHTML = `<span>${it.label}</span><span>#${it.id}</span>`;
        li.addEventListener('click', ()=>{ go(it.id); });
        list.appendChild(li);
      });
    }
    function open(){ backdrop.hidden = false; modal.hidden = false; render(); input.value=''; input.focus(); }
    function close(){ backdrop.hidden = true; modal.hidden = true; }
    function go(id){ close(); const el = document.getElementById(id); if(el){ el.scrollIntoView({behavior:'smooth'}); } }

    openBtn && openBtn.addEventListener('click', open);
    backdrop && backdrop.addEventListener('click', close);
    document.addEventListener('keydown', e => {
      if((e.ctrlKey || e.metaKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); open(); }
    });
    input && input.addEventListener('input', ()=> render(input.value));
    document.addEventListener('keydown', e => {
      if(modal.hidden) return;
      const act = list.querySelector('.cmdk-item.active');
      if(e.key==='Escape'){ close(); }
      else if(e.key==='ArrowDown'){ e.preventDefault(); const n = act ? act.nextElementSibling : list.firstElementChild; if(n){ act&&act.classList.remove('active'); n.classList.add('active'); n.scrollIntoView({block:'nearest'}); } }
      else if(e.key==='ArrowUp'){ e.preventDefault(); const p = act ? act.previousElementSibling : list.lastElementChild; if(p){ act&&act.classList.remove('active'); p.classList.add('active'); p.scrollIntoView({block:'nearest'}); } }
      else if(e.key==='Enter'){ e.preventDefault(); const id = act && act.dataset.id; if(id) go(id); }
    });
  }

  // Keyboard shortcuts: '/' focus search, 'r' reading mode, 't' top
  function initShortcuts(){
    const search = $('#codexSearch');
    document.addEventListener('keydown', (e)=>{
      if(e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey){ e.preventDefault(); search && search.focus(); }
      if(e.key.toLowerCase() === 't' && (e.shiftKey || e.altKey)){ window.scrollTo({top:0, behavior:'smooth'}); }
      if(e.key.toLowerCase() === 'r' && !e.metaKey && !e.ctrlKey && !e.altKey){ const btn = $('#readingModeBtn'); btn && btn.click(); }
    });
  }

  // Mastery Progression System (optimized)
  function initMastery(){
    const fillEl = $('#masteryFill');
    const percentEl = $('#masteryPercent');
    const unlocksEl = $('#masteryUnlocks');
    const statusEl = $('#masteryLevel');
    if(!fillEl || !percentEl || !unlocksEl) return;

    const sections = $all('.codex-section[data-mastery]');
    const total = sections.length;
    
    // Throttled update to prevent excessive recalculations
    const throttledUpdate = throttle(() => updateMastery(), 200);
    
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.dataset.visited = 'true';
        }
      });
      throttledUpdate();
    }, {threshold: 0.2}); // Reduced threshold for better performance

    sections.forEach(s => obs.observe(s));

    function updateMastery(){
      const visited = $all('.codex-section[data-visited="true"]').length;
      const percent = Math.floor((visited / total) * 100);
      fillEl.style.width = percent + '%';
      fillEl.setAttribute('aria-valuenow', percent);
      percentEl.textContent = percent + '%';
      unlocksEl.textContent = `${visited}/${total} sections explored`;

      // Update status level
      let level = 'Initiate';
      if(percent >= 90) level = 'Master';
      else if(percent >= 75) level = 'Adept';
      else if(percent >= 50) level = 'Practitioner';
      else if(percent >= 25) level = 'Apprentice';
      if(statusEl) statusEl.textContent = level;

      // Unlock sections
      checkUnlocks(percent);

      // Store progress
      store.setItem('solaris-mastery', percent);
    }

    function checkUnlocks(percent){
      $all('.locked-section').forEach(sec => {
        const unlock = parseInt(sec.dataset.unlock || 0);
        if(percent >= unlock){
          sec.classList.remove('locked-section');
          const overlay = sec.querySelector('.unlock-overlay');
          if(overlay) overlay.remove();

          // Unlock TOC links
          const id = sec.id;
          const link = $(`.toc-link[href="#${id}"]`);
          if(link){
            link.classList.remove('locked-link');
            link.querySelector('.link-icon').textContent = getSectionIcon(id);
          }
        }
      });
    }

    function getSectionIcon(id){
      const icons = {
        'case-patterns': '📂',
        'advanced-techniques': '🧪'
      };
      return icons[id] || '📍';
    }

    // Restore progress
    const saved = parseInt(store.getItem('solaris-mastery') || 0);
    if(saved > 0) checkUnlocks(saved);
  }

  // Lagna Selector with Dynamic Insights
  function initLagna(){
    const select = $('#lagnaSelect');
    const insightBox = $('#lagnaInsight');
    if(!select || !insightBox) return;

    const insights = {
      aries: "Sun in Leo (5th house): Peak creative authority, leadership through children/students, speculation success. Focus: Joyful self-expression, teaching, artistic ventures.",
      taurus: "Sun in Virgo (5th house): Service-oriented creativity, health/wellness leadership. Your authority comes through practical problem-solving and attention to detail.",
      gemini: "Sun in Libra (5th house, debilitated): Creative partnerships crucial. Lead through collaboration and diplomacy. Watch for indecision—cultivate decisive authority.",
      cancer: "Sun in Scorpio (5th house): Transformational creative power, research authority. Your leadership transforms others. Occult/psychology fields favorable.",
      leo: "Sun in Sagittarius (5th house): Dharmic teaching, philosophical authority. Natural mentor. Travel and higher education bring recognition.",
      virgo: "Sun in Capricorn (5th house): Disciplined creative authority, executive power. Lead through systems and structures. Slow but lasting success.",
      libra: "Sun in Aquarius (5th house): Innovative leadership, humanitarian projects. Your authority comes through serving collective good and forward-thinking.",
      scorpio: "Sun in Pisces (5th house): Spiritual creative authority, compassionate leadership. Art, music, mysticism. Lead through inspiration and intuition.",
      sagittarius: "Sun in Aries (5th house, exalted): Maximum creative power! Pioneering leadership, bold self-expression. Children/students thrive. Take calculated risks.",
      capricorn: "Sun in Taurus (5th house): Stable creative authority, wealth through art/children. Patient leadership builds lasting value. Real estate favorable.",
      aquarius: "Sun in Gemini (5th house): Intellectual creativity, communicative authority. Writing, speaking, media. Lead through ideas and networking.",
      pisces: "Sun in Cancer (5th house): Nurturing creative authority, emotionally intelligent leadership. Public popularity. Children/students central to purpose."
    };

    select.addEventListener('change', ()=>{
      const value = select.value;
      if(!value){
        insightBox.setAttribute('hidden', '');
        return;
      }

      const text = insights[value];
      insightBox.querySelector('.insight-content').textContent = text || 'Personalized insight coming soon.';
      insightBox.removeAttribute('hidden');

      // Update insights sidebar
      updateContextInsights(`Your Lagna: ${select.options[select.selectedIndex].text}`, text);

      store.setItem('solaris-lagna', value);
    });

    // Restore selection
    const saved = store.getItem('solaris-lagna');
    if(saved){
      select.value = saved;
      select.dispatchEvent(new Event('change'));
    }
  }

  // Context-Aware Insights Sidebar
  function updateContextInsights(title, content){
    const widget = $('#contextInsights');
    if(!widget) return;

    widget.innerHTML = `
      <h4 style="font-weight:800;color:var(--sun-gold);margin-bottom:0.75rem;">${title}</h4>
      <p style="line-height:1.7;font-size:0.95rem;">${content}</p>
    `;
  }

  // Update Current Section Display
  function initSectionDisplay(){
    const display = $('#currentSection');
    if(!display) return;

    const links = $all('.toc-link');
    const sections = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);

    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const name = entry.target.querySelector('.section-title')?.textContent || 'Overview';
          const nameEl = display.querySelector('.section-name');
          if(nameEl) nameEl.textContent = name.replace(/[^\w\s&]/g, '').trim();
        }
      });
    }, {threshold: 0.5});

    sections.forEach(s => obs.observe(s));
  }

  // Mobile Bottom Navigation
  function initMobileNav(){
    const btns = $all('.mobile-nav-btn');
    if(!btns.length) return;

    btns.forEach(btn => {
      btn.addEventListener('click', ()=>{
        const panel = btn.dataset.panel;
        
        // Simple panel toggles for demo
        if(panel === 'nav'){
          const toc = $('.codex-toc');
          if(toc){
            toc.scrollIntoView({behavior:'smooth', block:'start'});
            const toggle = $('.toc-toggle');
            const list = $('#tocList');
            if(toggle && list && list.hasAttribute('hidden')){
              list.removeAttribute('hidden');
              toggle.setAttribute('aria-expanded', 'true');
            }
          }
        }
        else if(panel === 'insights'){
          const insightCol = $('.nexus-insights-col');
          // On mobile, insights are merged into content; scroll to lagna selector
          const lagna = $('.lagna-selector');
          if(lagna) lagna.scrollIntoView({behavior:'smooth', block:'start'});
        }
        else if(panel === 'search'){
          const search = $('#codexSearch');
          if(search){
            search.scrollIntoView({behavior:'smooth', block:'center'});
            search.focus();
          }
        }
        else if(panel === 'tools'){
          const toolbar = $('.nexus-toolbar');
          if(toolbar) toolbar.scrollIntoView({behavior:'smooth', block:'start'});
        }

        // Visual feedback
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  // Quick Actions
  function initQuickActions(){
    const shareBtn = $('#shareBtn');
    const bookmarkBtn = $('#bookmarkBtn');

    if(shareBtn){
      shareBtn.addEventListener('click', async ()=>{
        if(navigator.share){
          try {
            await navigator.share({
              title: document.title,
              text: 'Explore the Solaris Nexus - Sun Mahadasha Command Center',
              url: window.location.href
            });
            showToast('✓ Shared successfully');
          } catch(e){
            if(e.name !== 'AbortError') copyURL();
          }
        } else {
          copyURL();
        }
      });
    }

    if(bookmarkBtn){
      bookmarkBtn.addEventListener('click', ()=>{
        if(window.sidebar && window.sidebar.addPanel){
          window.sidebar.addPanel(document.title, window.location.href, '');
        } else if(window.external && ('AddFavorite' in window.external)){
          window.external.AddFavorite(window.location.href, document.title);
        } else {
          showToast('💡 Press Ctrl+D (Cmd+D on Mac) to bookmark');
        }
      });
    }

    function copyURL(){
      navigator.clipboard.writeText(window.location.href).then(()=>{
        showToast('✓ Link copied to clipboard');
      }).catch(()=>{
        showToast('⚠️ Could not copy link');
      });
    }
  }

  // ====================================
  // FACT MODAL SYSTEM
  // ====================================
  
  const factDatabase = {
    element: {
      icon: '🔥',
      title: 'Element: Fire (Tejas)',
      content: `
        <p>The Sun embodies <strong>Agni</strong> (Fire), the principle of transformation, illumination, and purification. Fire represents active, radiating energy that transforms everything it touches.</p>
        
        <div class="modal-section">
          <h3>Qualities of Solar Fire</h3>
          <ul>
            <li><strong>Heat (Ushna):</strong> Activates metabolic processes, drives ambition, creates urgency</li>
            <li><strong>Light (Prakasha):</strong> Reveals truth, illuminates path, exposes shadows</li>
            <li><strong>Transformation (Paka):</strong> Digests experience, refines character, purifies karma</li>
            <li><strong>Dryness (Ruksha):</strong> Removes excess moisture (emotion), creates structure and boundaries</li>
          </ul>
        </div>
        
        <h3>Physiological Correspondence</h3>
        <p>Fire governs <strong>Pitta dosha</strong> in Ayurveda—metabolism, digestion, body temperature, and vision. During Sun Mahadasha, Pitta imbalances may manifest as inflammation, acidity, skin issues, or anger. Balance with cooling practices.</p>
        
        <h3>Psychological Dimension</h3>
        <p>Fire is the ego's fuel. It creates <strong>drive and self-definition</strong> but can burn out relationships and health if unregulated. Solar fire must be contained in the vessel of dharma (purpose) and humility.</p>
      `
    },
    guna: {
      icon: '✨',
      title: 'Guna: Sattva (Purity)',
      content: `
        <p>Among the three gunas (Sattva, Rajas, Tamas), the Sun is <strong>Sattvic</strong>—the quality of clarity, wisdom, harmony, and truth. This is why the Sun governs <em>Atma</em> (soul) in Jyotisha.</p>
        
        <div class="modal-section">
          <h3>Sattvic Expression of Sun</h3>
          <ul>
            <li><strong>Dharmic Leadership:</strong> Authority used for protection and upliftment</li>
            <li><strong>Self-Awareness:</strong> Clear sense of identity without arrogance</li>
            <li><strong>Illumination:</strong> Dispelling ignorance through knowledge and example</li>
            <li><strong>Generosity:</strong> Sharing light and resources without attachment</li>
          </ul>
        </div>
        
        <h3>Rajasic Distortion</h3>
        <p>When influenced by Rajas (passion/ambition), the Sun can become egotistical, domineering, and status-obsessed. This creates the "tyrant king" archetype.</p>
        
        <h3>Tamasic Degradation</h3>
        <p>Under Tamas (ignorance/inertia), solar energy collapses into apathy, weak will, or identification with victimhood. The king becomes the beggar.</p>
        
        <h3>Practical Guidance</h3>
        <p>During Sun Mahadasha, <strong>cultivate Sattva</strong> through sunrise routines, meditation, ethical conduct, and service. This keeps your solar expression dignified and effective.</p>
      `
    },
    caste: {
      icon: '⚔️',
      title: 'Caste: Kshatriya (Warrior-Ruler)',
      content: `
        <p>The Sun belongs to the <strong>Kshatriya varna</strong>—the warrior and ruling class. This is not about social hierarchy but about archetypal function: <em>protection, governance, and dharmic enforcement</em>.</p>
        
        <div class="modal-section">
          <h3>Kshatriya Dharma</h3>
          <ul>
            <li><strong>Protection:</strong> Defending the weak and maintaining order</li>
            <li><strong>Courage:</strong> Facing challenges directly without retreat</li>
            <li><strong>Justice:</strong> Upholding fairness and ethical standards</li>
            <li><strong>Command:</strong> Making decisive decisions under pressure</li>
            <li><strong>Sacrifice:</strong> Placing duty above personal comfort</li>
          </ul>
        </div>
        
        <h3>During Sun Mahadasha</h3>
        <p>You are being <strong>trained as a warrior-leader</strong>. Expect situations that test your courage, decision-making authority, and willingness to take responsibility. Avoid victim mentality and passivity.</p>
        
        <h3>Shadow Side</h3>
        <p>The warrior can become the <strong>warlord</strong>—aggressive, domineering, and addicted to conflict. Balance martial energy with wisdom (Jupiter) and compassion (Moon).</p>
        
        <h3>Practical Application</h3>
        <p>Own your role as a <strong>protector and decision-maker</strong> in your domain—family, team, community. Act with clarity and honor. Study Kshatriya archetypes: Arjuna, Rama, Shivaji.</p>
      `
    },
    deity: {
      icon: '☀️',
      title: 'Deity: Surya / Aditya',
      content: `
        <p><strong>Surya</strong> (the Sun God) is one of the most ancient and universally worshipped deities in Vedic tradition. He is consciousness itself—the witness, the illuminator, the source of time and life.</p>
        
        <div class="modal-section">
          <h3>Names and Epithets</h3>
          <ul>
            <li><strong>Aditya:</strong> Son of Aditi (infinite space); the undivided one</li>
            <li><strong>Bhaskara:</strong> Creator of light; revealer of reality</li>
            <li><strong>Divakar:</strong> Maker of day; initiator of cycles</li>
            <li><strong>Ravi:</strong> The radiant one; destroyer of darkness</li>
          </ul>
        </div>
        
        <h3>Iconography</h3>
        <p>Surya rides a chariot drawn by <strong>seven horses</strong> (representing the seven colors of light, seven days, seven chakras). His charioteer is <strong>Aruna</strong> (dawn), symbolizing the transition from darkness to light.</p>
        
        <h3>Aditya Hridayam</h3>
        <p>The <em>Aditya Hridayam</em> ("Heart of the Sun") is the supreme solar hymn. Recited by Rama before defeating Ravana, it grants invincibility, clarity, and the removal of all obstacles. This is the primary practice for Sun Mahadasha.</p>
        
        <h3>Philosophical Dimension</h3>
        <p>Surya is <strong>Atma-karaka</strong>—the significator of the soul. Worshipping Surya is not about external rituals but about recognizing your <em>true self</em> beyond ego, roles, and conditioning.</p>
        
        <div class="modal-section">
          <h3>Core Practices</h3>
          <ul>
            <li>Surya Namaskar (Sun Salutations) at sunrise</li>
            <li>Offering water to the rising Sun (Arghya)</li>
            <li>Recitation of Aditya Hridayam or Gayatri Mantra</li>
            <li>Observing fasts on Sundays (with guidance)</li>
          </ul>
        </div>
      `
    },
    direction: {
      icon: '🧭',
      title: 'Direction: East (Purva)',
      content: `
        <p>The Sun rules <strong>East</strong>, the direction of dawn, new beginnings, and awakening. In Vastu Shastra and sacred architecture, the East is where the Sun enters and activates space.</p>
        
        <h3>Symbolic Significance</h3>
        <p>East represents:</p>
        <ul>
          <li><strong>Initiation:</strong> The start of cycles and projects</li>
          <li><strong>Clarity:</strong> The dispelling of night's confusion</li>
          <li><strong>Hope:</strong> The promise of a new day</li>
          <li><strong>Authority:</strong> The source of light and power</li>
        </ul>
        
        <div class="modal-section">
          <h3>Practical Applications</h3>
          <ul>
            <li><strong>Morning Routines:</strong> Align important decisions and strategic work with sunrise hours (6–10 AM)</li>
            <li><strong>Workspace:</strong> Face East while working to channel solar clarity and focus</li>
            <li><strong>Meditation:</strong> Sit facing East during solar practices for maximum receptivity</li>
            <li><strong>Living Spaces:</strong> Ensure the eastern part of your home is clean, well-lit, and unobstructed</li>
          </ul>
        </div>
        
        <h3>During Sun Mahadasha</h3>
        <p>Pay special attention to the <strong>eastern zone</strong> of your environment. It should be vibrant, organized, and associated with growth (plants, light, fresh air). Avoid clutter or darkness in this area.</p>
      `
    },
    day: {
      icon: '📅',
      title: 'Day: Sunday (Ravivara)',
      content: `
        <p><strong>Sunday</strong> is ruled by the Sun across all astrological traditions. It is the day to honor solar energy, reset intention, and align with one's higher purpose.</p>
        
        <div class="modal-section">
          <h3>Sunday Practices for Sun Mahadasha</h3>
          <ul>
            <li><strong>Sunrise Ritual:</strong> Offer water to the rising Sun with gratitude</li>
            <li><strong>Solar Mantra:</strong> Recite Aditya Hridayam or Gayatri 108 times</li>
            <li><strong>Gold or Red:</strong> Wear gold, copper, or red-colored clothing</li>
            <li><strong>Service to Father/Authority:</strong> Honor lineage, teachers, or elders</li>
            <li><strong>Fasting (Optional):</strong> Light fast or single meal with guidance</li>
            <li><strong>Charity:</strong> Donate wheat, jaggery, or copper to those in need</li>
          </ul>
        </div>
        
        <h3>Timing</h3>
        <p>The most potent time for solar practices is <strong>sunrise (Brahma Muhurta + 1 hour)</strong>. Avoid heavy, conflictual, or ego-driven activities on Sundays—use the day for alignment and purification.</p>
        
        <h3>Avoid on Sundays</h3>
        <ul>
          <li>Cutting hair or nails (reduces vitality)</li>
          <li>Excessive alcohol or stimulants</li>
          <li>Arguments with father figures or authorities</li>
          <li>Starting new enmities or legal battles</li>
        </ul>
      `
    },
    time: {
      icon: '🌅',
      title: 'Time: Sunrise (Udaya Kala)',
      content: `
        <p><strong>Sunrise</strong> is the Sun's moment of maximum potency. It represents the transition from darkness (ignorance) to light (knowledge), making it the ideal time for spiritual practice, strategic planning, and setting intentions.</p>
        
        <h3>The Science of Sunrise</h3>
        <p>Modern research validates ancient wisdom:</p>
        <ul>
          <li><strong>Circadian Alignment:</strong> Sunrise exposure regulates melatonin and cortisol rhythms</li>
          <li><strong>Vitamin D Synthesis:</strong> Early sunlight (UV-B) without harmful intensity</li>
          <li><strong>Cognitive Peak:</strong> Brain function is sharpest in the first 3 hours after waking</li>
          <li><strong>Emotional Reset:</strong> Viewing sunrise reduces stress and improves mood</li>
        </ul>
        
        <div class="modal-section">
          <h3>Sunrise Protocol for Sun Mahadasha</h3>
          <ol>
            <li><strong>Wake before sunrise</strong> (ideally 30–60 minutes prior)</li>
            <li><strong>Hydrate:</strong> Drink warm water with lemon</li>
            <li><strong>Witness:</strong> Go outside and face the rising Sun</li>
            <li><strong>Arghya:</strong> Offer water with both hands while reciting mantra</li>
            <li><strong>Breathe:</strong> 12 rounds of Surya Bhedana (right nostril breathing)</li>
            <li><strong>Set Intention:</strong> Define one key action for the day</li>
          </ol>
        </div>
        
        <h3>Why It Works</h3>
        <p>Sunrise is the Sun's <strong>exaltation moment daily</strong>. By aligning with it, you synchronize your personal rhythms with cosmic cycles. This creates coherence, vitality, and clarity—core Sun Mahadasha themes.</p>
      `
    },
    metal: {
      icon: '🪙',
      title: 'Metal: Gold & Copper',
      content: `
        <p>The Sun is associated with <strong>Gold</strong> (primary) and <strong>Copper</strong> (secondary). These metals resonate with solar frequency and are used in remedial measures.</p>
        
        <h3>Gold (Suvarna)</h3>
        <p>Gold symbolizes <strong>purity, incorruptibility, and royal authority</strong>. It is the noblest metal—resistant to tarnish and decay, much like the solar principle.</p>
        <ul>
          <li><strong>Wearing Gold:</strong> Enhances confidence, vitality, and social status. Best worn on ring finger (Sun's finger) in a gold ring or pendant</li>
          <li><strong>Donation:</strong> Giving gold (even small amounts) to temples or worthy causes on Sundays strengthens the Sun</li>
          <li><strong>Caution:</strong> Gold amplifies the Sun. If Sun is malefic or you're in a combative Antardasha (Sun/Mars, Sun/Rahu), consult an astrologer first</li>
        </ul>
        
        <h3>Copper (Tamra)</h3>
        <p>Copper is more accessible and has <strong>grounding, purifying properties</strong>. It conducts solar energy without the intensity of gold.</p>
        <ul>
          <li><strong>Wearing Copper:</strong> Copper bracelets or rings are safe and balancing for most people</li>
          <li><strong>Donation:</strong> Donating copper vessels or coins on Sundays is a powerful remedy</li>
          <li><strong>Ayurvedic Use:</strong> Drinking water stored overnight in a copper vessel improves vitality and digestion</li>
        </ul>
        
        <div class="modal-section">
          <h3>Remedial Protocol</h3>
          <ul>
            <li>Wear a small gold or copper ring on the ring finger of your right hand</li>
            <li>Donate copper coins to a Sun temple or charity on Sundays</li>
            <li>Store drinking water in a copper vessel overnight</li>
          </ul>
        </div>
      `
    },
    gem: {
      icon: '💎',
      title: 'Gemstone: Ruby (Manikya)',
      content: `
        <p><strong>Ruby</strong> is the Sun's primary gemstone—a corundum (Al₂O₃) with chromium, creating its signature red color. It is one of the most powerful and expensive remedial gems.</p>
        
        <h3>⚠️ Critical Warning</h3>
        <p><strong>DO NOT wear Ruby without professional chart assessment.</strong> Gems amplify planetary energy—if the Sun is functionally malefic for your Lagna or poorly placed, Ruby can increase ego conflicts, legal issues, or health problems.</p>
        
        <div class="modal-section">
          <h3>When Ruby May Help</h3>
          <ul>
            <li>Sun is <strong>functionally benefic</strong> for your Lagna</li>
            <li>Sun is well-placed (Kendra/Trikona) and strong by dignity</li>
            <li>You're experiencing lack of confidence, vitality, or recognition despite effort</li>
            <li>Recommended by a competent Jyotishi after Prashna (horary) confirmation</li>
          </ul>
        </div>
        
        <h3>Specifications (If Prescribed)</h3>
        <ul>
          <li><strong>Weight:</strong> Minimum 3 carats, ideally 5–7 carats</li>
          <li><strong>Quality:</strong> Natural, untreated, eye-clean Burmese or Mozambique Ruby</li>
          <li><strong>Setting:</strong> Gold ring, worn on ring finger of right hand</li>
          <li><strong>Day:</strong> First worn on a Sunday during sunrise hour</li>
          <li><strong>Mantra:</strong> Om Ghrini Suryaya Namah (108 times before wearing)</li>
        </ul>
        
        <h3>Safer Alternatives</h3>
        <p>If Ruby is too intense or expensive, consider:</p>
        <ul>
          <li><strong>Red Garnet:</strong> Milder solar substitute</li>
          <li><strong>Sunstone:</strong> Gentle, affordable, aesthetically solar</li>
          <li><strong>Behavioral Remedies:</strong> Always primary and universally safe (sunrise practice, mantra, service)</li>
        </ul>
      `
    },
    color: {
      icon: '🎨',
      title: 'Colors: Red & Gold',
      content: `
        <p>The Sun's primary colors are <strong>Red</strong> (energy, vitality) and <strong>Gold</strong> (illumination, royalty). These colors activate solar consciousness and can be used strategically during Sun Mahadasha.</p>
        
        <h3>Red (Rakta)</h3>
        <p>Red represents <strong>life force, courage, and action</strong>. It stimulates circulation, confidence, and assertiveness.</p>
        <ul>
          <li><strong>When to Use:</strong> Important meetings, public speaking, leadership moments</li>
          <li><strong>How:</strong> Wear red clothing, accessories, or add red accents to workspace</li>
          <li><strong>Caution:</strong> Avoid excessive red if Sun is afflicted by Mars or Rahu (can increase aggression)</li>
        </ul>
        
        <h3>Gold (Suvarna)</h3>
        <p>Gold symbolizes <strong>wisdom, dignity, and divine light</strong>. It is calming yet authoritative.</p>
        <ul>
          <li><strong>When to Use:</strong> Daily wear, especially on Sundays</li>
          <li><strong>How:</strong> Gold jewelry, gold-toned clothing, or warm earth tones (ochre, saffron)</li>
          <li><strong>Effect:</strong> Enhances gravitas and respect without aggression</li>
        </ul>
        
        <div class="modal-section">
          <h3>Color Therapy for Sun Mahadasha</h3>
          <ul>
            <li><strong>Wardrobe:</strong> Incorporate red, gold, copper, or saffron tones</li>
            <li><strong>Environment:</strong> Add warm-toned artwork, lighting, or textiles</li>
            <li><strong>Avoid:</strong> Excessive black, dark blue, or cold colors (Saturnian/Venus)</li>
            <li><strong>Sunday Special:</strong> Wear red or gold specifically on Sundays</li>
          </ul>
        </div>
      `
    },
    physiology: {
      icon: '🫀',
      title: 'Physiology: Heart & Eyes',
      content: `
        <p>The Sun governs the <strong>heart</strong> (cardiovascular system) and <strong>eyes</strong> (vision and light perception). During Sun Mahadasha, these systems may become focal points—for strength or vulnerability.</p>
        
        <h3>Heart (Hridaya)</h3>
        <p>The heart is the <strong>throne of consciousness</strong> in Vedic physiology. The Sun's energy circulates through it.</p>
        <ul>
          <li><strong>Strengths:</strong> Strong vitality, courage, emotional resilience</li>
          <li><strong>Vulnerabilities:</strong> Hypertension, arrhythmia, coronary issues (especially if Sun is afflicted)</li>
          <li><strong>Support:</strong> Cardiovascular exercise, pranayama (Nadi Shodhana), Omega-3s, stress management</li>
        </ul>
        
        <h3>Eyes (Netra)</h3>
        <p>Eyes are the Sun's <strong>instruments of perception</strong>. Vision problems may manifest symbolically (lack of clarity) or literally.</p>
        <ul>
          <li><strong>Strengths:</strong> Sharp perception, strategic vision, foresight</li>
          <li><strong>Vulnerabilities:</strong> Eye strain, dryness, inflammation, sensitivity to light</li>
          <li><strong>Support:</strong> Eye exercises (Trataka), Vitamin A, reducing screen time, Ayurvedic eye drops (rose water)</li>
        </ul>
        
        <div class="modal-section">
          <h3>Ayurvedic Perspective</h3>
          <p>The Sun governs <strong>Pitta dosha</strong>, concentrated in the heart, eyes, and small intestine. Pitta imbalances during Sun Mahadasha may manifest as:</p>
          <ul>
            <li>Inflammation, acidity, skin rashes</li>
            <li>Irritability, impatience, anger</li>
            <li>Overheating, excessive sweating</li>
          </ul>
          <p><strong>Balance Pitta:</strong> Cooling foods (coconut, cucumber), aloe vera, moon bathing, Sheetali pranayama</p>
        </div>
        
        <h3>Practical Health Protocol</h3>
        <ol>
          <li><strong>Heart:</strong> 30 minutes cardio 4–5x/week, monitor BP/HR</li>
          <li><strong>Eyes:</strong> 20-20-20 rule (every 20 min, look 20 feet away for 20 sec)</li>
          <li><strong>Pitta:</strong> Avoid spicy, fried, sour foods; favor sweet, bitter, astringent</li>
          <li><strong>Monitor:</strong> Track energy, mood, and physical symptoms monthly</li>
        </ol>
      `
    },
    exaltation: {
      icon: '🔺',
      title: 'Exaltation: Aries 10° (Mesha)',
      content: `
        <p>The Sun reaches its <strong>highest dignity at 10° Aries</strong>—the sign of Mars, representing courage, initiation, and independence. This is called <em>Uchcha</em> (exaltation).</p>
        
        <h3>Why Aries?</h3>
        <p>Aries is the <strong>first sign of the zodiac</strong>, symbolizing birth, spring, and new beginnings. The Sun here is like a king at the height of power—confident, decisive, and respected.</p>
        
        <div class="modal-section">
          <h3>Qualities of Exalted Sun</h3>
          <ul>
            <li><strong>Natural Authority:</strong> Leadership without force; people naturally follow</li>
            <li><strong>Courage:</strong> Faces challenges directly without hesitation</li>
            <li><strong>Clarity:</strong> Sharp discernment and strategic vision</li>
            <li><strong>Vitality:</strong> Strong life force and physical health</li>
            <li><strong>Generosity:</strong> Shares resources and light freely</li>
            <li><strong>Independence:</strong> Self-reliant without arrogance</li>
          </ul>
        </div>
        
        <h3>If Your Sun is in Aries</h3>
        <p>You have a <strong>naturally strong Sun</strong> in your chart. During Sun Mahadasha, expect heightened recognition, leadership opportunities, and confidence. Use this power responsibly—avoid domination and cultivate humility.</p>
        
        <h3>If Your Sun is Elsewhere</h3>
        <p>You can <strong>invoke exalted solar qualities</strong> through practice:</p>
        <ul>
          <li>Study Kshatriya archetypes (Rama, Arjuna)</li>
          <li>Practice decisive action and clarity</li>
          <li>Wear red or copper on Sundays (Mars's color)</li>
          <li>Meditate on the Sun at sunrise</li>
        </ul>
        
        <h3>Cosmic Timing</h3>
        <p>The Sun is exalted from approximately <strong>April 13–15</strong> each year. This is an auspicious time for solar initiations, wearing Ruby (if prescribed), or starting Sun-related projects.</p>
      `
    },
    debilitation: {
      icon: '⚖️',
      title: 'Debilitation: Libra 10° (Tula)',
      content: `
        <p>The Sun is <strong>weakest at 10° Libra</strong>—the sign of Venus, representing relationships, diplomacy, and compromise. This is called <em>Neecha</em> (debilitation).</p>
        
        <h3>Why Libra?</h3>
        <p>Libra is the sign of <strong>the other</strong>—partnership, balance, and social harmony. The Sun, which represents individual self and authority, struggles here because it must constantly adjust and compromise.</p>
        
        <div class="modal-section">
          <h3>Challenges of Debilitated Sun</h3>
          <ul>
            <li><strong>Identity Confusion:</strong> Over-adapting to please others, losing sense of self</li>
            <li><strong>Low Confidence:</strong> Difficulty asserting authority or making decisions</li>
            <li><strong>Father Issues:</strong> Strained or absent paternal relationship</li>
            <li><strong>Weak Vitality:</strong> Low energy, digestive issues, or poor circulation</li>
            <li><strong>Recognition Struggles:</strong> Effort not acknowledged or appreciated</li>
          </ul>
        </div>
        
        <h3>If Your Sun is in Libra</h3>
        <p>This is <strong>not a curse</strong>—it's a karmic assignment. You are learning to <em>balance ego and relationship</em>, self and other. During Sun Mahadasha, you may face:</p>
        <ul>
          <li>Tests of self-worth and boundary-setting</li>
          <li>Opportunities to reclaim personal authority</li>
          <li>Lessons in dignified compromise vs. self-abandonment</li>
        </ul>
        
        <h3>Remedial Strategies</h3>
        <ol>
          <li><strong>Neechabhanga (Cancellation):</strong> Check if debilitation is canceled by specific yogas (e.g., Venus in Kendra, Libra lord strong)</li>
          <li><strong>Sunrise Practice:</strong> Double down on Surya Namaskar and Aditya Hridayam</li>
          <li><strong>Service to Father:</strong> Heal paternal lineage through respect and service</li>
          <li><strong>Boundaries:</strong> Learn to say "no" with grace; practice assertiveness training</li>
          <li><strong>Copper Remedies:</strong> Wear copper, donate copper on Sundays</li>
        </ol>
        
        <h3>Famous Examples</h3>
        <p>Many highly successful people have debilitated Sun—it creates <strong>hunger for recognition and mastery</strong>. The struggle can become a superpower if channeled correctly.</p>
      `
    },
    own: {
      icon: '♌',
      title: 'Own Sign: Leo (Simha)',
      content: `
        <p>The Sun <strong>owns Leo</strong>, the royal sign of the zodiac. This is the Sun's natural home, where it expresses its essential nature most clearly.</p>
        
        <h3>Symbolism of Leo</h3>
        <p>Leo represents:</p>
        <ul>
          <li><strong>Royalty:</strong> Natural authority and dignified presence</li>
          <li><strong>Creativity:</strong> Self-expression through art, performance, or leadership</li>
          <li><strong>Generosity:</strong> Big-hearted, magnanimous, protective</li>
          <li><strong>Pride:</strong> Self-respect and honor (can become arrogance if unchecked)</li>
          <li><strong>Drama:</strong> Life as theater; tendency toward grand gestures</li>
        </ul>
        
        <div class="modal-section">
          <h3>Sun in Leo (Natal Chart)</h3>
          <p>If you have Sun in Leo, your <strong>core identity aligns with solar principles</strong>. You are naturally confident, charismatic, and leadership-oriented. During Sun Mahadasha, expect:</p>
          <ul>
            <li>Peak visibility and recognition</li>
            <li>Opportunities to lead, create, or perform</li>
            <li>Tests of ego and humility</li>
            <li>Strong vitality and life force</li>
          </ul>
        </div>
        
        <h3>Archetypal Examples</h3>
        <p>Study these solar archetypes to understand Leo energy:</p>
        <ul>
          <li><strong>Rama:</strong> Dharmic king, balances power with righteousness</li>
          <li><strong>Shiva (Nataraja):</strong> Creative-destructive principle, cosmic dancer</li>
          <li><strong>Modern:</strong> Barack Obama (Leo Sun), Madonna (Leo Sun)</li>
        </ul>
        
        <h3>Working with Leo Energy</h3>
        <p>Whether or not you have Sun in Leo, you can <strong>invoke Leo qualities</strong> during Sun Mahadasha:</p>
        <ol>
          <li><strong>Own Your Gifts:</strong> Be unapologetic about your talents</li>
          <li><strong>Create Boldly:</strong> Express yourself without seeking permission</li>
          <li><strong>Lead with Heart:</strong> Balance authority with warmth and generosity</li>
          <li><strong>Dress the Part:</strong> Cultivate regal presence through grooming and attire</li>
        </ol>
      `
    },
    friendly: {
      icon: '🤝',
      title: 'Friendly Planets: Moon, Mars, Jupiter',
      content: `
        <p>The Sun is <strong>friendly</strong> with Moon, Mars, and Jupiter. When these planets aspect or conjoin the Sun, they generally support and amplify solar expression.</p>
        
        <h3>Moon (Chandra)</h3>
        <p>The <strong>Sun-Moon relationship</strong> is like King and Queen. Moon governs emotions and public sentiment; Sun governs authority and self. Together they create balance.</p>
        <ul>
          <li><strong>Positive:</strong> Emotional intelligence in leadership, public popularity, harmonious relationships</li>
          <li><strong>Challenge:</strong> If too close (New Moon), Moon is "burned" (emotional volatility)</li>
        </ul>
        
        <h3>Mars (Mangala)</h3>
        <p>Mars is the Sun's <strong>warrior and executor</strong>. Mars provides courage, energy, and the will to implement solar vision.</p>
        <ul>
          <li><strong>Positive:</strong> Decisive action, physical vitality, competitive edge, athletic ability</li>
          <li><strong>Challenge:</strong> Can become aggressive, domineering, or conflict-prone if unbalanced</li>
        </ul>
        
        <h3>Jupiter (Guru)</h3>
        <p>Jupiter is the Sun's <strong>counselor and priest</strong>. Jupiter adds wisdom, ethics, and expansive vision to solar authority.</p>
        <ul>
          <li><strong>Positive:</strong> Dharmic leadership, mentorship, respect from elders, spiritual depth</li>
          <li><strong>Challenge:</strong> Over-optimism or self-righteousness if Jupiter is afflicted</li>
        </ul>
        
        <div class="modal-section">
          <h3>During Sun Mahadasha</h3>
          <p>If you're running <strong>Sun/Moon, Sun/Mars, or Sun/Jupiter Antardasha</strong>, expect supportive themes:</p>
          <ul>
            <li><strong>Sun/Moon:</strong> Public recognition, emotional fulfillment, family harmony</li>
            <li><strong>Sun/Mars:</strong> Bold initiatives, physical achievements, competitive success</li>
            <li><strong>Sun/Jupiter:</strong> Mentorship, teaching, spiritual growth, ethical leadership</li>
          </ul>
        </div>
        
        <h3>Remedial Synergy</h3>
        <p>To strengthen the Sun's friendly relationships:</p>
        <ul>
          <li><strong>Honor Moon:</strong> Practice emotional intelligence, spend time with mother</li>
          <li><strong>Honor Mars:</strong> Maintain physical discipline, respect martial arts or sports</li>
          <li><strong>Honor Jupiter:</strong> Study scriptures, serve teachers, practice generosity</li>
        </ul>
      `
    },
    enemy: {
      icon: '⚡',
      title: 'Enemy Planets: Venus & Saturn',
      content: `
        <p>The Sun is in <strong>natural enmity</strong> with Venus and Saturn. This doesn't mean they're "bad"—it means their principles <em>challenge and refine</em> each other.</p>
        
        <h3>Venus (Shukra)</h3>
        <p>Venus represents <strong>pleasure, relationship, and compromise</strong>—the opposite of Sun's independence and authority.</p>
        <ul>
          <li><strong>Tension:</strong> Ego vs. diplomacy, self vs. other, duty vs. desire</li>
          <li><strong>In Sun Dasha:</strong> Relationships may test your authority; balance needed between assertiveness and compromise</li>
          <li><strong>Sun/Venus Antardasha:</strong> Creative expression, romantic tensions, learning grace</li>
        </ul>
        
        <h3>Saturn (Shani)</h3>
        <p>Saturn represents <strong>limitation, discipline, and time</strong>—curbing the Sun's natural radiance and confidence.</p>
        <ul>
          <li><strong>Tension:</strong> Optimism vs. realism, immediate authority vs. earned respect, youth vs. age</li>
          <li><strong>In Sun Dasha:</strong> Responsibilities increase; delays or obstacles test patience and maturity</li>
          <li><strong>Sun/Saturn Antardasha:</strong> Career tests, father-son tensions, learning humility through constraint</li>
        </ul>
        
        <div class="modal-section">
          <h3>The Gift of Enmity</h3>
          <p>Planetary enmity creates <strong>productive tension</strong>. Venus and Saturn <em>refine</em> the Sun:</p>
          <ul>
            <li><strong>Venus:</strong> Teaches diplomacy, aesthetics, and relationship skills</li>
            <li><strong>Saturn:</strong> Teaches humility, patience, and earned authority</li>
          </ul>
          <p>Without them, the Sun becomes tyrannical and immature.</p>
        </div>
        
        <h3>Navigating Sun-Saturn Antardasha</h3>
        <p>This is often the <strong>most challenging period</strong> of Sun Mahadasha:</p>
        <ol>
          <li><strong>Expect Delays:</strong> Projects take longer; patience is required</li>
          <li><strong>Responsibility:</strong> Authority comes with heavy obligations</li>
          <li><strong>Health:</strong> Manage stress; support heart and bones</li>
          <li><strong>Father:</strong> Issues with father or authority figures may surface</li>
          <li><strong>Remedy:</strong> Serve elders, donate to Saturn (iron, black items on Saturdays)</li>
        </ol>
        
        <h3>Navigating Sun-Venus Antardasha</h3>
        <p>This period blends <strong>authority with grace</strong>:</p>
        <ul>
          <li><strong>Creativity:</strong> Strong period for artistic expression and refinement</li>
          <li><strong>Relationships:</strong> Balance independence with partnership needs</li>
          <li><strong>Luxury:</strong> May acquire status symbols or improve aesthetics</li>
          <li><strong>Caution:</strong> Avoid ego conflicts with spouse or business partners</li>
        </ul>
      `
    }
  };

  function initFactModals() {
    const factCards = $all('.fact-card.clickable');
    const backdrop = $('#factModalBackdrop');
    const modal = $('#factModal');
    const closeBtn = modal && modal.querySelector('.modal-close');
    const modalIcon = $('#factModalIcon');
    const modalTitle = $('#factModalTitle');
    const modalBody = $('#factModalBody');

    if (!factCards.length || !modal) return;

    function openModal(factKey) {
      const data = factDatabase[factKey];
      if (!data) return;

      if (modalIcon) modalIcon.textContent = data.icon;
      if (modalTitle) modalTitle.textContent = data.title;
      if (modalBody) modalBody.innerHTML = data.content;

      backdrop && (backdrop.hidden = false);
      modal.hidden = false;
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    function closeModal() {
      backdrop && (backdrop.hidden = true);
      modal.hidden = true;
      document.body.style.overflow = ''; // Restore scroll
    }

    // Attach click handlers to fact cards
    factCards.forEach(card => {
      const factKey = card.getAttribute('data-fact');
      if (factKey && factDatabase[factKey]) {
        card.addEventListener('click', () => openModal(factKey));
      }
    });

    // Close modal on backdrop click
    backdrop && backdrop.addEventListener('click', closeModal);

    // Close modal on close button
    closeBtn && closeBtn.addEventListener('click', closeModal);

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hidden) {
        closeModal();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    initScrollProgress();
    initTOC();
    initSearch();
    initCopyLinks();
    initReadingMode();
    initResume();
    initCommandPalette();
    initShortcuts();
    initFactModals(); // NEW: Fact Modal System
    
    // Solaris Nexus features
    if(document.body.classList.contains('solaris-nexus')){
      initMastery();
      initLagna();
      initSectionDisplay();
      initMobileNav();
      initQuickActions();
    }
  });
})();
