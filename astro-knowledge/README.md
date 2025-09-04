# SHIVAKALI ASHRAM — Astro Knowledge System

A living, expanding knowledge system for Vedic sciences and Jyotisha (astrology) — designed to be real, structured, and verifiable. No simulations. Everything is grounded in traceable sources, lineage, and practical application.

## Goals
- Model knowledge with precision (Vedas, Vedangas, Jyotisha, Tantra, Applied Sciences)
- Provide deep yet accessible articles with citations and evidence trails
- Offer interactive learning later (calculators, visualizations, timelines)
- Be local-first and portable (JSON + lightweight JS loader)
- Grow organically with a clean content pipeline

## Structure
```
astro-knowledge/
  README.md
  CHECKLIST.md
  catalog.json                # Master catalog of domains and items
  schema/                     # JSON Schemas (validation-ready)
    article.schema.json
    topic.schema.json
    glossary.schema.json
    evidence.schema.json
  content/
    foundations/
      vedas.json
      vedangas.json
    jyotisha/
      overview.json
      nakshatras.manifest.json
    glossary/
      index.json
  js/
    knowledge-engine.js       # Loader + validator (lightweight)
  pipeline/
    PLAN.md                   # Content roadmap & process
```

## Editing Principles
- Source-first: include Sanskrit, transliteration, translation, and commentary sections
- Evidence-driven: Always include `citations` and, when relevant, `evidence_trails`
- Lineage-aware: Note parampara/lineage where applicable
- Practicality: Include applications, safeguards, and limitations
- Accessibility: Define clear levels (intro, intermediate, advanced)

## Roadmap (short)
- v0.1 Schemas + seed content + loader (this commit)
- v0.2 Expand foundations and jyotisha sections (12 signs, planets, houses)
- v0.3 Add tantra overview + practical remedies with evidence trails
- v0.4 Add calculators and visual timelines (deferred to UI)


