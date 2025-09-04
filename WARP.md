# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

SHIVAKALI ASHRAM is a sacred digital platform preserving 500+ years of ancestral Vedic wisdom through modern web technology. The project consists of two main components:

1. **Frontend Website**: Pure HTML/CSS/JavaScript spiritual platform
2. **Astro Knowledge System**: Comprehensive JSON-based knowledge engine for Vedic sciences

## Architecture

### Frontend Structure
- **Static HTML/CSS/JavaScript**: No build tools, frameworks, or dependencies
- **Mobile-first responsive design** with sacred design system
- **Netlify deployment**: `shivakali-ashram.netlify.app`
- **Sacred color palette**: Saffron (#FF9933), Gold (#FFD700), Purple (#6B46C1), Cream (#FAF0E6)

### Astro Knowledge System
Located in `astro-knowledge/` - a sophisticated knowledge management system:

```
astro-knowledge/
├── catalog.json          # Master index of all domains
├── js/knowledge-engine.js # Lightweight loader/validator
├── schema/               # JSON schemas for content validation
├── content/              # Structured knowledge in JSON format
└── pipeline/             # Content development process
```

## Key Commands

### Development Server
```bash
# Simple HTTP server for local development
python -m http.server 8000
# or
npx serve .
```

### Knowledge System Operations
```javascript
// Load and validate astro knowledge system
SKAstro.load().then(result => console.log(result))

// Get catalog structure
SKAstro.getCatalog()

// List all domains
SKAstro.list()

// Get specific domain
SKAstro.getDomain("jyotisha")
```

### Content Validation
```bash
# Validate JSON schemas and content structure
cd astro-knowledge
node -e "require('./js/knowledge-engine.js'); SKAstro.load()"
```

## Content Development Workflow

### Adding New Astro Knowledge Content

1. **Choose appropriate domain** from catalog.json (foundations, jyotisha, vastu, etc.)
2. **Follow schema structure** using relevant schema from `schema/` directory
3. **Use content checklist** from `CHECKLIST.md`:
   - Sanskrit sources with transliteration
   - Citations and evidence trails
   - Practical applications and limitations
   - Ethical considerations
4. **Validate content** against JSON schema
5. **Update catalog.json** if adding new content files

### Content Quality Standards
- **Scholarly citations** with sources (book/page, mantra reference, URL, DOI)
- **Evidence trails**: observational, experimental, textual validation
- **Lineage/parampara** notes where applicable
- **Plain, respectful language** - no sensational claims
- **Practical applications** with safeguards and limitations

## Sacred Design System

### Color Variables
```css
:root {
    --saffron: #FF9933;           /* Sacred tradition */
    --sacred-gold: #FFD700;       /* Divine wisdom */
    --divine-purple: #6B46C1;     /* Spiritual depth */
    --warm-cream: #FAF0E6;        /* Ancient parchment */
    --dark-charcoal: #2D2D2D;     /* Cosmic void */
}
```

### Visual Guidelines
- Sacred geometry patterns and traditional spiritual motifs
- Cosmic background animations with divine glow effects
- Meditative color transitions
- Mobile-first responsive design
- Touch-optimized interactions

## Knowledge System Schema Architecture

### Core Schemas
- **article.schema.json**: Main content structure with citations and evidence
- **topic.schema.json**: Catalog organization and metadata
- **glossary.schema.json**: Reference terms and definitions
- **evidence.schema.json**: Source validation framework
- **calculator.schema.json**: Interactive tools structure
- **qa.schema.json**: Question-answer system format
- **casestudy.schema.json**: Educational examples with peer review

### Content Categories
1. **Vedic Foundations** (vedas.json, vedangas.json, tantra-complete.json)
2. **Jyotisha** (overview, planets, houses, nakshatras)
3. **Vastu Shastra** (sacred architecture)
4. **Divination Sciences** (tarot systems)
5. **Character Analysis** (graphology, palmistry, physiognomy)
6. **Glossary & Reference** (Sanskrit terminology)

## Integration Context

### Everything Gateway Connection
- Access point through Gateway main page category card
- Seamless navigation with unified branding
- Cross-promotion for authentic spiritual wisdom
- Part of mobile app wrapper strategy

### Technical Integration
- **Frontend**: Pure HTML5, CSS3, Vanilla JavaScript
- **Deployment**: Netlify hosting
- **Repository**: GitHub (anish994/shivakali-ashram)
- **Performance**: Optimized for rich media and deep content

## Development Status

### Completed (Phase 1)
- ✅ Sacred landing page with 6 main categories
- ✅ Deep hierarchical card system architecture
- ✅ Astrology section with 9 sub-categories
- ✅ Sacred design system implementation
- ✅ Mobile-responsive layouts
- ✅ Comprehensive astro-knowledge system with 15 articles across 6 domains

### In Progress (Phase 2)
- Individual wisdom pages for each sub-category
- Image galleries for sacred content
- Interactive astrological tools
- Personal consultation forms

### Future (Phase 3)
- Birth chart calculator integration
- Cosmic calendar functionality
- Personalized guidance systems
- Community wisdom sharing

## Working with the Codebase

### When Adding Frontend Features
- Maintain sacred design system consistency
- Use existing CSS variables and design patterns
- Ensure mobile-first responsive design
- Test touch interactions and accessibility
- Preserve spiritual aesthetic while adding functionality

### When Expanding Knowledge System
- Follow schema validation requirements
- Include proper citations and evidence trails
- Maintain content quality standards from CHECKLIST.md
- Use structured JSON format for all content
- Update catalog.json for new content areas

### When Modifying Knowledge Engine
- Maintain lightweight JavaScript approach
- Ensure cross-browser compatibility
- Preserve validation and loading functionality
- Keep API simple and extensible
- Test with actual knowledge content files

## Sacred Mission

The project preserves and shares profound ancestral wisdom while making ancient Vedic knowledge accessible to modern seekers. Every addition should honor this sacred mission and maintain the reverent, authentic approach to spiritual content.

*"The light of knowledge dispels the darkness of ignorance"* - Ancient Vedic Wisdom
