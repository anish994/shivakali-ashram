/**
 * SUB-CATEGORY DISPLAY SYSTEM
 * Manages the transition from main categories to sub-categories with epic animations
 */

class SubCategoryDisplay {
    constructor(containerId = 'main-content') {
        this.container = document.getElementById(containerId);
        this.currentCategory = null;
        this.subCategories = [];
        this.isAnimating = false;
    }

    /**
     * Load and display sub-categories for a given main category
     */
    async loadSubCategories(categoryId, categoryData) {
        if (this.isAnimating) return;
        
        console.log(`Loading sub-categories for: ${categoryId}`);
        this.isAnimating = true;
        this.currentCategory = { id: categoryId, ...categoryData };

        try {
            // Load sub-category data
            const subCategoryData = await this.fetchSubCategoryData(categoryId);
            
            if (!subCategoryData) {
                console.error(`No sub-category data found for: ${categoryId}`);
                this.isAnimating = false;
                return;
            }

            // Animate out current content
            await this.animateOutCurrentContent();

            // Create sub-category view
            this.renderSubCategoryView(subCategoryData);

            // Animate in new content
            await this.animateInSubCategories();

        } catch (error) {
            console.error('Error loading sub-categories:', error);
        } finally {
            this.isAnimating = false;
        }
    }

    /**
     * Fetch sub-category data (for now, using the local data we created)
     */
    async fetchSubCategoryData(categoryId) {
        // For now, we'll use the jyotisha data we created
        if (categoryId === 'jyotisha') {
            try {
                // Add cache-busting parameter to ensure latest data
                const cacheBuster = Date.now();
                const response = await fetch(`./knowledge/categories/jyotisha-subcategories.json?v=${cacheBuster}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log('✅ JSON DATA LOADED SUCCESSFULLY:', data.subCategories?.length, 'systems found');
                    return data;
                } else {
                    console.log('❌ JSON FETCH FAILED - Response not OK, using fallback data');
                }
            } catch (error) {
                console.log('❌ JSON FETCH FAILED - Error:', error, 'using fallback data');
            }
            
            // Fallback data for jyotisha (our created content)
            return this.getJyotishaFallbackData();
        }

        // For other categories, return placeholder data
        return this.getPlaceholderSubCategoryData(categoryId);
    }

    /**
     * Get fallback data for Jyotisha category
     */
    getJyotishaFallbackData() {
        return {
            parentCategory: {
                id: "jyotisha",
                title: "Jyotish Mastery",
                subtitle: "Quantum Cosmic Intelligence"
            },
            subCategories: [
                {
                    id: "planetary-intelligence",
                    title: "Planetary Intelligence",
                    subtitle: "Cosmic CPU Architecture",
                    description: "🪐 DECODE THE UNIVERSE'S OPERATING SYSTEM: Each planet functions as a specialized consciousness processor in the cosmic computer. Master the data streams, frequency signatures, and algorithmic patterns of celestial intelligence networks. Harness Mars as your willpower CPU, Venus as your attraction algorithm, and Jupiter as your wisdom database.",
                    icon: "🪐",
                    emoji: "⚡",
                    gradient: "linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFD23F 100%)",
                    primaryColor: "#FF6B35",
                    secondaryColor: "#FFD23F",
                    cardStyle: "mars-fire",
                    contentCount: "12 deep-dive modules",
                    difficulty: "Intermediate → Advanced",
                    timeToMaster: "3-6 months intensive study",
                    practicalApplications: [
                        "Personal power optimization",
                        "Decision-making enhancement", 
                        "Energy field calibration",
                        "Cosmic timing mastery"
                    ],
                    keyTopics: [
                        "Sun: Core Identity Programming",
                        "Moon: Emotional Operating System",
                        "Mars: Action & Willpower Engine",
                        "Mercury: Communication Protocols",
                        "Jupiter: Expansion & Wisdom Database",
                        "Venus: Harmony & Attraction Algorithms"
                    ],
                    unlocks: ["Advanced timing techniques", "Personalized planetary remedies", "Cosmic energy channeling"]
                },
                {
                    id: "house-systems",
                    title: "House Systems Architecture", 
                    subtitle: "Life Domain Command Centers",
                    description: "🏛️ ARCHITECT YOUR REALITY BLUEPRINT: The 12 houses form your life's control panel - each governing specific reality sectors. Master the command protocols for wealth (2nd house), relationships (7th house), career (10th house), and spiritual evolution (12th house). Deploy strategic house activation for total life optimization.",
                    icon: "🏛️",
                    emoji: "🎯",
                    gradient: "linear-gradient(135deg, #FF9A8B 0%, #A8E6CF 50%, #66D9EF 100%)",
                    primaryColor: "#667eea",
                    secondaryColor: "#f093fb", 
                    cardStyle: "royal-palace",
                    contentCount: "15 comprehensive modules",
                    difficulty: "Beginner → Expert",
                    timeToMaster: "4-8 months deep immersion",
                    practicalApplications: [
                        "Life area optimization",
                        "Strategic planning frameworks",
                        "Personal development roadmaps",
                        "Relationship dynamics mastery"
                    ],
                    keyTopics: [
                        "1st House: Identity & Self-Image Programming",
                        "2nd House: Wealth Generation Algorithms", 
                        "3rd House: Communication & Skill Networks",
                        "4th House: Foundation & Security Systems",
                        "5th House: Creativity & Intelligence Hubs",
                        "6th House: Health & Service Protocols"
                    ],
                    unlocks: ["Life optimization strategies", "Sector-specific remedies", "Reality architecture mastery"]
                },
                {
                    id: "nakshatra-codes",
                    title: "Nakshatra Codes",
                    subtitle: "Stellar DNA Programming", 
                    description: "⭐ CRACK YOUR COSMIC GENETIC CODE: 27 Nakshatras contain your soul's source code - the stellar DNA that programs your deepest motivations, talents, and karmic missions. Each Nakshatra operates like a specialized app in consciousness, with unique features, bugs, and upgrade paths.",
                    icon: "⭐",
                    emoji: "🧬",
                    gradient: "linear-gradient(135deg, #4ECDC4 0%, #44A08D 50%, #2E8B57 100%)",
                    primaryColor: "#4ECDC4", 
                    secondaryColor: "#2E8B57",
                    cardStyle: "stellar-code",
                    contentCount: "27 nakshatra deep-dives + integration modules",
                    difficulty: "Advanced → Master Level",
                    timeToMaster: "6-12 months intensive research",
                    practicalApplications: [
                        "Soul purpose discovery",
                        "Natural talent activation", 
                        "Karmic pattern recognition",
                        "Compatibility analysis"
                    ],
                    keyTopics: [
                        "Ashwini: The Cosmic Healers - Lightning-fast manifestation codes",
                        "Bharani: The Life-Death Operators - Transformation algorithms",
                        "Krittika: The Cosmic Cutters - Precision & discernment protocols",
                        "Rohini: The Magnetic Attractors - Beauty & abundance programs", 
                        "Mrigashira: The Eternal Seekers - Quest & exploration drives",
                        "Ardra: The Storm Processors - Chaos-to-order algorithms"
                    ],
                    unlocks: ["Soul-level understanding", "Karmic mission clarity", "Natural talent optimization"]
                },
                {
                    id: "timing-mastery",
                    title: "Timing Mastery",
                    subtitle: "Temporal Advantage Protocols",
                    description: "⏰ HACK TIME ITSELF: Master the universe's scheduling algorithm through Dasha systems, transits, and muhurat selection. Deploy perfect timing strategies for maximum success probability. Understand when the cosmic servers are optimized for your specific requests.",
                    icon: "⏰", 
                    emoji: "🎯",
                    gradient: "linear-gradient(135deg, #FF9A8B 0%, #A8E6CF 50%, #66D9EF 100%)",
                    primaryColor: "#FF9A8B",
                    secondaryColor: "#A8E6CF",
                    cardStyle: "time-master",
                    contentCount: "10 timing system modules", 
                    difficulty: "Intermediate → Expert",
                    timeToMaster: "3-5 months focused practice",
                    practicalApplications: [
                        "Launch timing optimization",
                        "Decision timing strategies", 
                        "Relationship timing mastery",
                        "Career move synchronization"
                    ],
                    keyTopics: [
                        "Vimshottari Dasha: The 120-Year Life Algorithm",
                        "Transit Analysis: Real-time cosmic weather tracking",
                        "Muhurat Selection: Auspicious timing protocols",
                        "Gochara Effects: Daily planetary influence patterns",
                        "Ashtakavarga: Strength scoring systems",
                        "Panchanga: 5-factor time quality analysis"
                    ],
                    unlocks: ["Perfect timing abilities", "Strategic advantage", "Cosmic synchronization"]
                },
                {
                    id: "predictive-algorithms",
                    title: "Predictive Algorithms",
                    subtitle: "Future Probability Engineering",
                    description: "🔮 CALCULATE TOMORROW TODAY: Deploy advanced prediction engines using Yogas, planetary combinations, and pattern recognition systems. Generate probability matrices for life events, relationship outcomes, and career trajectories with scientific precision.",
                    icon: "🔮",
                    emoji: "📊",
                    gradient: "linear-gradient(135deg, #8360c3 0%, #2ebf91 50%, #ffeaa7 100%)",
                    primaryColor: "#8360c3",
                    secondaryColor: "#ffeaa7",
                    cardStyle: "future-sight",
                    contentCount: "8 prediction methodology modules",
                    difficulty: "Advanced → Master Level", 
                    timeToMaster: "4-7 months intensive training",
                    practicalApplications: [
                        "Life event forecasting",
                        "Risk assessment protocols",
                        "Opportunity identification",
                        "Strategic planning support"
                    ],
                    keyTopics: [
                        "Yoga Formations: Planetary combination effects",
                        "Dasha Progression: Life phase prediction models",
                        "Transit Triggering: Event timing calculations", 
                        "Divisional Charts: Specialized life area analysis",
                        "Prashna Techniques: Question-specific algorithms",
                        "Pattern Recognition: Historical trend analysis"
                    ],
                    unlocks: ["Predictive mastery", "Future planning abilities", "Strategic advantage"]
                },
                {
                    id: "remedial-technologies",
                    title: "Remedial Technologies",
                    subtitle: "Cosmic Debugging & Optimization",
                    description: "🛠️ DEBUG YOUR DESTINY: Advanced troubleshooting protocols for planetary malfunctions and karmic bugs. Deploy gemstone frequency modulators, mantra programming languages, and ritual debugging scripts to optimize your cosmic operating system for peak performance.",
                    icon: "🛠️",
                    emoji: "💎", 
                    gradient: "linear-gradient(135deg, #56ab2f 0%, #a8e6cf 50%, #00d2ff 100%)",
                    primaryColor: "#56ab2f",
                    secondaryColor: "#00d2ff",
                    cardStyle: "cosmic-repair",
                    contentCount: "12 remedial system modules",
                    difficulty: "Intermediate → Advanced",
                    timeToMaster: "2-4 months implementation focus", 
                    practicalApplications: [
                        "Planetary imbalance correction",
                        "Karmic debt resolution",
                        "Energy field optimization", 
                        "Life obstacle removal"
                    ],
                    keyTopics: [
                        "Gemstone Therapy: Crystal frequency programming",
                        "Mantra Technologies: Sound-based system updates",
                        "Yantra Geometries: Sacred circuit designs",
                        "Ritual Protocols: Reality modification ceremonies",
                        "Charity Algorithms: Karmic balance restoration",
                        "Lifestyle Adjustments: Daily optimization practices"
                    ],
                    unlocks: ["Planetary harmonization", "Karmic debugging", "Life optimization mastery"]
                },
                {
                    id: "dasha-systems",
                    title: "Dasha Systems",
                    subtitle: "Planetary Time Mastery",
                    description: "⏰ MASTER THE COSMIC TIMING MATRIX: Dasha systems reveal the precise timing of your life's chapters. Each planetary period (Dasha) activates different aspects of your consciousness. Navigate Mahadasha, Antardasha, and Pratyantar cycles to optimize every phase of your evolution.",
                    icon: "⏰",
                    emoji: "🎯",
                    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    primaryColor: "#667eea",
                    secondaryColor: "#764ba2",
                    cardStyle: "time-master",
                    contentCount: "9 planetary period deep-dives",
                    difficulty: "Intermediate → Expert",
                    timeToMaster: "4-8 months systematic study",
                    practicalApplications: [
                        "Life phase optimization",
                        "Perfect timing for decisions",
                        "Career transition planning",
                        "Relationship timing mastery"
                    ],
                    keyTopics: [
                        "Sun Dasha: Leadership & Authority Periods",
                        "Moon Dasha: Emotional & Intuitive Cycles",
                        "Mars Dasha: Action & Conquest Phases",
                        "Mercury Dasha: Communication & Learning Cycles",
                        "Jupiter Dasha: Wisdom & Expansion Periods",
                        "Venus Dasha: Creativity & Relationship Phases"
                    ],
                    unlocks: ["Perfect timing mastery", "Life phase optimization", "Planetary period navigation"]
                },
                {
                    id: "yuga-cycles",
                    title: "Yuga Cycles",
                    subtitle: "Cosmic Time Architecture",
                    description: "🌌 DECODE THE UNIVERSE'S GRAND DESIGN: The 4 Yugas represent massive cosmic consciousness cycles that shape reality itself. Understand how Satya, Treta, Dvapara, and Kali Yugas influence human potential and spiritual evolution across millennia.",
                    icon: "🌌",
                    emoji: "♾️",
                    gradient: "linear-gradient(135deg, #a8e6cf 0%, #dcedc1 50%, #ffd3a5 100%)",
                    primaryColor: "#a8e6cf",
                    secondaryColor: "#ffd3a5",
                    cardStyle: "cosmic-cycles",
                    contentCount: "4 cosmic age explorations + integration",
                    difficulty: "Advanced → Cosmic Level",
                    timeToMaster: "6-12 months deep contemplation",
                    practicalApplications: [
                        "Evolutionary consciousness tracking",
                        "Spiritual development optimization",
                        "Collective consciousness understanding",
                        "Reality framework navigation"
                    ],
                    keyTopics: [
                        "Satya Yuga: The Golden Age - Perfect consciousness",
                        "Treta Yuga: Silver Age - Ritualistic awakening",
                        "Dvapara Yuga: Bronze Age - Energy & knowledge focus",
                        "Kali Yuga: Iron Age - Material challenges & spiritual opportunities",
                        "Yuga Sandhi: Transition periods and consciousness shifts",
                        "Personal Yuga Cycles: Individual consciousness evolution"
                    ],
                    unlocks: ["Cosmic consciousness perspective", "Evolutionary timeline mastery", "Universal cycle navigation"]
                },
                {
                    id: "sade-sati",
                    title: "Sade Sati Mastery",
                    subtitle: "Saturn's 7.5 Year Transformation",
                    description: "🪐 TRANSFORM SATURN'S CHALLENGE INTO POWER: Sade Sati isn't punishment - it's your cosmic graduation exam. Master the 7.5-year Saturn transit cycle, decode its hidden gifts, and emerge as a disciplined, wise, and unstoppable force of nature.",
                    icon: "🪐",
                    emoji: "💎",
                    gradient: "linear-gradient(135deg, #434343 0%, #000000 100%)",
                    primaryColor: "#434343",
                    secondaryColor: "#000000",
                    cardStyle: "saturn-power",
                    contentCount: "3 phase breakdown + remedy systems",
                    difficulty: "Advanced → Master Level",
                    timeToMaster: "3-6 months intensive preparation",
                    practicalApplications: [
                        "Saturn transit navigation",
                        "Discipline system building",
                        "Challenge transformation techniques",
                        "Spiritual maturation acceleration"
                    ],
                    keyTopics: [
                        "First Phase: Foundation Testing - Saturn enters 12th house",
                        "Second Phase: Peak Challenge - Saturn transits natal Moon",
                        "Third Phase: Results Harvesting - Saturn exits 2nd house",
                        "Saturn Return Integration: 29.5-year mastery cycles",
                        "Remedial Measures: Practical Saturn appeasement",
                        "Hidden Gifts: Extracting wisdom from restrictions"
                    ],
                    unlocks: ["Saturn mastery", "Discipline architecture", "Challenge transformation"]
                },
                {
                    id: "kala-sarpa",
                    title: "Kala Sarpa Yoga",
                    subtitle: "Serpent Power Mastery",
                    description: "🐍 MASTER THE SERPENT'S COSMIC DANCE: When all planets align between Rahu and Ketu, the Serpent awakens. This isn't a curse - it's concentrated karmic evolution. Learn to ride the serpent's power for accelerated spiritual transformation.",
                    icon: "🐍",
                    emoji: "⚡",
                    gradient: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
                    primaryColor: "#ff416c",
                    secondaryColor: "#ff4b2b",
                    cardStyle: "serpent-power",
                    contentCount: "12 Kala Sarpa types + activation methods",
                    difficulty: "Expert → Transcendent Level",
                    timeToMaster: "6-18 months deep practice",
                    practicalApplications: [
                        "Karmic acceleration techniques",
                        "Serpent energy channeling",
                        "Shadow integration mastery",
                        "Rapid spiritual evolution"
                    ],
                    keyTopics: [
                        "Anant Kala Sarpa: First house serpent - Identity transformation",
                        "Kulik Kala Sarpa: Second house - Wealth & values restructuring",
                        "Vasuki Kala Sarpa: Third house - Communication power enhancement",
                        "Shankpal Kala Sarpa: Fourth house - Foundation rebuilding",
                        "Padma Kala Sarpa: Fifth house - Creative & intelligence awakening",
                        "Mahapadma Kala Sarpa: Sixth house - Service & healing mastery"
                    ],
                    unlocks: ["Serpent power mastery", "Karmic acceleration", "Shadow integration"]
                },
                {
                    id: "dhaiya",
                    title: "Dhaiya Mastery",
                    subtitle: "Saturn's 2.5 Year Precision Strike",
                    description: "⚔️ MASTER SATURN'S SURGICAL INTERVENTION: Dhaiya is Saturn's focused 2.5-year training program - more precise than Sade Sati, but equally transformative. Learn to decode Saturn's targeted lessons and emerge with laser-focused discipline and wisdom.",
                    icon: "⚔️",
                    emoji: "🎯",
                    gradient: "linear-gradient(135deg, #8B4513 0%, #2F4F4F 100%)",
                    primaryColor: "#8B4513",
                    secondaryColor: "#2F4F4F",
                    cardStyle: "precision-strike",
                    contentCount: "2 phase analysis + targeted remedies",
                    difficulty: "Intermediate → Advanced",
                    timeToMaster: "2-4 months focused study",
                    practicalApplications: [
                        "Focused challenge navigation",
                        "Targeted discipline building",
                        "Precision timing mastery",
                        "Surgical life adjustments"
                    ],
                    keyTopics: [
                        "4th House Dhaiya: Foundation & Security Testing",
                        "8th House Dhaiya: Transformation & Hidden Resources",
                        "Saturn's Teaching Methods: Discipline through limitation",
                        "Dhaiya vs Sade Sati: Intensity comparison and navigation",
                        "Targeted Remedies: Specific solutions for each Dhaiya type",
                        "Graduation Indicators: Signs of successful Dhaiya completion"
                    ],
                    unlocks: ["Precision challenge mastery", "Targeted discipline", "Surgical timing"]
                },
                {
                    id: "zodiac-signs",
                    title: "Zodiac Signs Mastery",
                    subtitle: "Cosmic Personality Architecture",
                    description: "♈ DECODE THE 12 COSMIC ARCHETYPES: Each zodiac sign represents a unique consciousness operating system with distinct strengths, challenges, and evolutionary paths. Master the psychological patterns, elemental energies, and transformational potentials of all 12 signs to unlock complete personality mastery.",
                    icon: "♈",
                    emoji: "🔮",
                    gradient: "linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 25%, #45B7D1 50%, #96CEB4 75%, #FFEAA7 100%)",
                    primaryColor: "#FF6B6B",
                    secondaryColor: "#4ECDC4",
                    cardStyle: "zodiac-spectrum",
                    contentCount: "12 zodiac sign deep-dives + elemental mastery",
                    difficulty: "Beginner → Advanced",
                    timeToMaster: "3-6 months comprehensive study",
                    practicalApplications: [
                        "Personality type optimization",
                        "Relationship compatibility analysis",
                        "Personal strength activation",
                        "Shadow work integration",
                        "Elemental balance techniques",
                        "Evolutionary growth planning"
                    ],
                    keyTopics: [
                        "Fire Signs: Aries, Leo, Sagittarius - Action & Inspiration Engines",
                        "Earth Signs: Taurus, Virgo, Capricorn - Stability & Manifestation Masters",
                        "Air Signs: Gemini, Libra, Aquarius - Communication & Intellectual Networks",
                        "Water Signs: Cancer, Scorpio, Pisces - Emotional & Intuitive Processors",
                        "Cardinal Signs: Leadership & Initiation Patterns",
                        "Fixed Signs: Stability & Persistence Mechanisms",
                        "Mutable Signs: Adaptability & Transformation Systems",
                        "Sign Polarities: Complementary Energy Dynamics"
                    ],
                    unlocks: ["Complete personality mastery", "Relationship optimization", "Elemental balance mastery", "Evolutionary consciousness"]
                }
            ]
        };
    }

    /**
     * Get placeholder data for other categories
     */
    getPlaceholderSubCategoryData(categoryId) {
        return {
            parentCategory: {
                id: categoryId,
                title: categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
                subtitle: "Coming Soon"
            },
            subCategories: [
                {
                    id: `${categoryId}-coming-soon`,
                    title: "🚧 Epic Content Coming Soon!",
                    subtitle: "We're Building Something LEGENDARY",
                    description: `🔥 Get ready for mind-blowing ${categoryId} content! We're crafting the most comprehensive, badass spiritual technology system ever created. Each sub-category will be packed with advanced techniques, practical applications, and game-changing insights.`,
                    icon: "🚧",
                    emoji: "🔥",
                    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    primaryColor: "#667eea",
                    secondaryColor: "#764ba2",
                    cardStyle: "coming-soon",
                    contentCount: "Epic modules in development",
                    difficulty: "All Levels",
                    timeToMaster: "Worth the wait",
                    practicalApplications: [
                        "Revolutionary techniques",
                        "Advanced applications",
                        "Consciousness upgrades",
                        "Reality mastery"
                    ],
                    keyTopics: [
                        "🔥 Advanced methodologies being developed",
                        "⚡ Cutting-edge techniques in progress",
                        "🌟 Game-changing insights coming soon",
                        "🎯 Practical mastery systems in creation",
                        "🧠 Consciousness technologies being refined"
                    ],
                    unlocks: ["Revolutionary insights", "Advanced capabilities", "Consciousness mastery"]
                }
            ]
        };
    }

    /**
     * Animate out current content
     */
    async animateOutCurrentContent() {
        if (!this.container) return;

        const currentContent = this.container.children;
        const animationPromises = [];

        for (let element of currentContent) {
            element.style.transition = 'all 0.5s ease-out';
            element.style.opacity = '0';
            element.style.transform = 'translateY(-30px) scale(0.95)';
            
            animationPromises.push(new Promise(resolve => {
                setTimeout(resolve, 500);
            }));
        }

        await Promise.all(animationPromises);
        this.container.innerHTML = '';
    }

    /**
     * Render the sub-category view
     */
    renderSubCategoryView(data) {
        // DEBUG: Show what data we're getting
        console.log('🔍 SUB-CATEGORY DATA:', data);
        console.log('🔍 NUMBER OF SUB-CATEGORIES:', data.subCategories ? data.subCategories.length : 'NONE');
        console.log('🚀 INTEGRATION TEST: ALL SYSTEMS CHECK!');
        if (data.subCategories) {
            console.log('📚 ORIGINAL SYSTEMS:');
            const originalSystems = data.subCategories.filter(sub => ['planetary-intelligence', 'house-systems', 'nakshatra-codes', 'timing-mastery', 'predictive-algorithms', 'remedial-technologies'].includes(sub.id));
            originalSystems.forEach((sys, i) => console.log(`  ${i+1}. ${sys.id}: ${sys.title}`));
            
            console.log('🔥 NEW SYSTEMS:');
            const newSystems = data.subCategories.filter(sub => ['dasha-systems', 'yuga-cycles', 'sade-sati', 'kala-sarpa', 'dhaiya', 'zodiac-signs'].includes(sub.id));
            newSystems.forEach((sys, i) => console.log(`  ${i+7}. ${sys.id}: ${sys.title}`));
            
            console.log(`✅ TOTAL SYSTEMS FOUND: ${data.subCategories.length} (Expected: 12)`);
            if (data.subCategories.length !== 12) {
                console.warn('⚠️ SYSTEM COUNT MISMATCH!');
            }
        }
        if (data.subCategories) {
            data.subCategories.forEach((sub, index) => {
                console.log(`🔍 Sub-category ${index + 1}: ${sub.id} - ${sub.title}`);
            });
        }
        
        const viewContainer = document.createElement('div');
        viewContainer.className = 'sub-category-view';
        
        // Header with back button and category info
        const header = this.createSubCategoryHeader(data.parentCategory);
        viewContainer.appendChild(header);

        // Sub-categories grid
        const grid = document.createElement('div');
        grid.className = 'sub-category-grid';
        grid.id = 'sub-category-grid';

        // Create sub-category cards
        data.subCategories.forEach((subCategory, index) => {
            let cardElement;
            console.log(`Creating card for: ${subCategory.id}`);
            
            // Use specialized card for Planetary Intelligence
            if (subCategory.id === 'planetary-intelligence') {
                console.log('Attempting to create Planetary Intelligence card...');
                // Check if PlanetaryIntelligenceCard is available
                if (typeof PlanetaryIntelligenceCard !== 'undefined') {
                    console.log('PlanetaryIntelligenceCard class found, creating specialized card');
                    try {
                        const planetaryCard = new PlanetaryIntelligenceCard();
                        cardElement = planetaryCard.createElement();
                        console.log('Planetary Intelligence card created successfully');
                    } catch (error) {
                        console.error('Error creating Planetary Intelligence card:', error);
                        // Fallback to generic card
                        const card = new SubCategoryCard(subCategory, data.parentCategory);
                        cardElement = card.createElement();
                    }
                } else {
                    console.log('PlanetaryIntelligenceCard class not found, using fallback');
                    // Fallback to generic card if specialized card isn't loaded
                    const card = new SubCategoryCard(subCategory, data.parentCategory);
                    cardElement = card.createElement();
                }
            } else if (subCategory.id === 'house-systems') {
                // Use specialized card for House Systems (direct link to house-systems.html)
                console.log('Attempting to create House Systems card...');
                if (typeof HouseSystemsCard !== 'undefined') {
                    try {
                        const housesCard = new HouseSystemsCard();
                        cardElement = housesCard.createElement();
                        console.log('House Systems card created successfully');
                    } catch (error) {
                        console.error('Error creating House Systems card:', error);
                        const card = new SubCategoryCard(subCategory, data.parentCategory);
                        cardElement = card.createElement();
                    }
                } else {
                    console.log('HouseSystemsCard class not found, using fallback');
                    const card = new SubCategoryCard(subCategory, data.parentCategory);
                    cardElement = card.createElement();
                }
            } else if (subCategory.id === 'dasha-systems') {
                // Use specialized card for Dasha Systems
                console.log('Attempting to create Dasha Systems card...');
                if (typeof DashaSystemsCard !== 'undefined') {
                    try {
                        const dashaCard = new DashaSystemsCard();
                        cardElement = dashaCard.createElement();
                        console.log('Dasha Systems card created successfully');
                    } catch (error) {
                        console.error('Error creating Dasha Systems card:', error);
                        const card = new SubCategoryCard(subCategory, data.parentCategory);
                        cardElement = card.createElement();
                    }
                } else {
                    console.log('DashaSystemsCard class not found, using fallback');
                    const card = new SubCategoryCard(subCategory, data.parentCategory);
                    cardElement = card.createElement();
                }
            } else if (subCategory.id === 'yuga-cycles') {
                // Use specialized card for Yuga Cycles
                console.log('Attempting to create Yuga Cycles card...');
                if (typeof YugaCyclesCard !== 'undefined') {
                    try {
                        const yugaCard = new YugaCyclesCard();
                        cardElement = yugaCard.createElement();
                        console.log('Yuga Cycles card created successfully');
                    } catch (error) {
                        console.error('Error creating Yuga Cycles card:', error);
                        const card = new SubCategoryCard(subCategory, data.parentCategory);
                        cardElement = card.createElement();
                    }
                } else {
                    console.log('YugaCyclesCard class not found, using fallback');
                    const card = new SubCategoryCard(subCategory, data.parentCategory);
                    cardElement = card.createElement();
                }
            } else if (subCategory.id === 'sade-sati') {
                // Use specialized card for Sade Sati
                console.log('Attempting to create Sade Sati card...');
                if (typeof SadeSatiCard !== 'undefined') {
                    try {
                        const sadeSatiCard = new SadeSatiCard();
                        cardElement = sadeSatiCard.createElement();
                        console.log('Sade Sati card created successfully');
                    } catch (error) {
                        console.error('Error creating Sade Sati card:', error);
                        const card = new SubCategoryCard(subCategory, data.parentCategory);
                        cardElement = card.createElement();
                    }
                } else {
                    console.log('SadeSatiCard class not found, using fallback');
                    const card = new SubCategoryCard(subCategory, data.parentCategory);
                    cardElement = card.createElement();
                }
            } else if (subCategory.id === 'kala-sarpa') {
                // Use specialized card for Kala Sarpa
                console.log('Attempting to create Kala Sarpa card...');
                if (typeof KalaSarpaCard !== 'undefined') {
                    try {
                        const kalaSarpaCard = new KalaSarpaCard();
                        cardElement = kalaSarpaCard.createElement();
                        console.log('Kala Sarpa card created successfully');
                    } catch (error) {
                        console.error('Error creating Kala Sarpa card:', error);
                        const card = new SubCategoryCard(subCategory, data.parentCategory);
                        cardElement = card.createElement();
                    }
                } else {
                    console.log('KalaSarpaCard class not found, using fallback');
                    const card = new SubCategoryCard(subCategory, data.parentCategory);
                    cardElement = card.createElement();
                }
            } else if (subCategory.id === 'dhaiya') {
                // Use specialized card for Dhaiya
                console.log('Attempting to create Dhaiya card...');
                if (typeof DhaiyaCard !== 'undefined') {
                    try {
                        const dhaiyaCard = new DhaiyaCard();
                        cardElement = dhaiyaCard.createElement();
                        console.log('Dhaiya card created successfully');
                    } catch (error) {
                        console.error('Error creating Dhaiya card:', error);
                        const card = new SubCategoryCard(subCategory, data.parentCategory);
                        cardElement = card.createElement();
                    }
                } else {
                    console.log('DhaiyaCard class not found, using fallback');
                    const card = new SubCategoryCard(subCategory, data.parentCategory);
                    cardElement = card.createElement();
                }
            } else if (subCategory.id === 'timing-mastery') {
                // Use specialized card for Timing Mastery
                console.log('Attempting to create Timing Mastery card...');
                if (typeof TimingMasteryCard !== 'undefined') {
                    try {
                        const timingCard = new TimingMasteryCard();
                        cardElement = timingCard.createElement();
                        console.log('Timing Mastery card created successfully');
                    } catch (error) {
                        console.error('Error creating Timing Mastery card:', error);
                        const card = new SubCategoryCard(subCategory, data.parentCategory);
                        cardElement = card.createElement();
                    }
                } else {
                    console.log('TimingMasteryCard class not found, using fallback');
                    const card = new SubCategoryCard(subCategory, data.parentCategory);
                    cardElement = card.createElement();
                }
            } else if (subCategory.id === 'predictive-algorithms') {
                // Use specialized card for Predictive Algorithms
                console.log('Attempting to create Predictive Algorithms card...');
                if (typeof PredictiveAlgorithmsCard !== 'undefined') {
                    try {
                        const predictiveCard = new PredictiveAlgorithmsCard();
                        cardElement = predictiveCard.createElement();
                        console.log('Predictive Algorithms card created successfully');
                    } catch (error) {
                        console.error('Error creating Predictive Algorithms card:', error);
                        const card = new SubCategoryCard(subCategory, data.parentCategory);
                        cardElement = card.createElement();
                    }
                } else {
                    console.log('PredictiveAlgorithmsCard class not found, using fallback');
                    const card = new SubCategoryCard(subCategory, data.parentCategory);
                    cardElement = card.createElement();
                }
            } else if (subCategory.id === 'remedial-technologies') {
                // Use specialized card for Remedial Technologies
                console.log('Attempting to create Remedial Technologies card...');
                if (typeof RemedialTechnologiesCard !== 'undefined') {
                    try {
                        const remedialCard = new RemedialTechnologiesCard();
                        cardElement = remedialCard.createElement();
                        console.log('Remedial Technologies card created successfully');
                    } catch (error) {
                        console.error('Error creating Remedial Technologies card:', error);
                        const card = new SubCategoryCard(subCategory, data.parentCategory);
                        cardElement = card.createElement();
                    }
                } else {
                    console.log('RemedialTechnologiesCard class not found, using fallback');
                    const card = new SubCategoryCard(subCategory, data.parentCategory);
                    cardElement = card.createElement();
                }
            } else if (subCategory.id === 'nakshatra-codes') {
                // Use specialized card for Nakshatra Codes if it exists
                console.log('Attempting to create Nakshatra Codes card...');
                if (typeof NakshatraCodesCard !== 'undefined') {
                    try {
                        const nakshatraCard = new NakshatraCodesCard();
                        cardElement = nakshatraCard.createElement();
                        console.log('Nakshatra Codes card created successfully');
                    } catch (error) {
                        console.error('Error creating Nakshatra Codes card:', error);
                        const card = new SubCategoryCard(subCategory, data.parentCategory);
                        cardElement = card.createElement();
                    }
                } else {
                    console.log('NakshatraCodesCard class not found, using fallback');
                    const card = new SubCategoryCard(subCategory, data.parentCategory);
                    cardElement = card.createElement();
                }
            } else if (subCategory.id === 'zodiac-signs') {
                // Use specialized card for Zodiac Signs
                console.log('Attempting to create Zodiac Signs card...');
                if (typeof ZodiacSignsCard !== 'undefined') {
                    try {
                        const zodiacCard = new ZodiacSignsCard();
                        cardElement = zodiacCard.createElement();
                        console.log('Zodiac Signs card created successfully');
                    } catch (error) {
                        console.error('Error creating Zodiac Signs card:', error);
                        const card = new SubCategoryCard(subCategory, data.parentCategory);
                        cardElement = card.createElement();
                    }
                } else {
                    console.log('ZodiacSignsCard class not found, using fallback');
                    const card = new SubCategoryCard(subCategory, data.parentCategory);
                    cardElement = card.createElement();
                }
            } else {
                // Use generic card for other sub-categories
                console.log(`Creating generic card for: ${subCategory.id}`);
                const card = new SubCategoryCard(subCategory, data.parentCategory);
                cardElement = card.createElement();
            }
            
            // Set initial animation state
            cardElement.style.opacity = '0';
            cardElement.style.transform = 'translateY(50px) scale(0.9)';
            
            grid.appendChild(cardElement);
        });

        viewContainer.appendChild(grid);
        this.container.appendChild(viewContainer);
        
        // If specialized Planetary card exists, append it first in the grid
        try {
            const firstCard = grid.firstChild;
            const planetary = grid.querySelector('.planetary-card');
            if (planetary && firstCard && planetary !== firstCard) {
                grid.insertBefore(planetary, firstCard);
            }
        } catch (e) {
            console.warn('Optional: could not reposition planetary card', e);
        }
    }

    /**
     * Create sub-category header
     */
    createSubCategoryHeader(parentCategory) {
        const header = document.createElement('div');
        header.className = 'sub-category-header';
        
        header.innerHTML = `
            <div class="header-content">
                <button class="back-to-main-button" onclick="SubCategoryDisplay.returnToMain()">
                    <span class="back-arrow">←</span>
                    <span class="back-text">Back to Categories</span>
                </button>
                
                <div class="category-info">
                    <h1 class="category-title">${parentCategory.title}</h1>
                    <h2 class="category-subtitle">${parentCategory.subtitle}</h2>
                    <p class="category-description">Choose your path to mastery:</p>
                </div>
            </div>
        `;

        return header;
    }

    /**
     * Animate in sub-categories
     */
    async animateInSubCategories() {
        // Include both generic and specialized subcategory cards
        const cards = document.querySelectorAll('.sub-category-card, .planetary-card');
        
        // Animate cards in sequence
        for (let i = 0; i < cards.length; i++) {
            setTimeout(() => {
                cards[i].style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                cards[i].style.opacity = '1';
                cards[i].style.transform = 'translateY(0) scale(1)';
            }, i * 150);
        }

        // Wait for all animations to complete
        await new Promise(resolve => {
            setTimeout(resolve, cards.length * 150 + 600);
        });
    }

    /**
     * Return to main categories view
     */
    static returnToMain() {
        console.log('Returning to main categories...');
        
        // Check if we have the main card grid system
        if (window.cardGrid && typeof window.cardGrid.showMainCategories === 'function') {
            window.cardGrid.showMainCategories();
        } else {
            // Fallback: reload the page
            location.reload();
        }
    }

    /**
     * Static method to handle category clicks from main cards
     */
    static handleCategoryClick(categoryId, categoryData) {
        console.log(`Category clicked: ${categoryId}`);
        
        // Create or get existing display instance
        if (!window.subCategoryDisplay) {
            window.subCategoryDisplay = new SubCategoryDisplay();
        }

        // Load sub-categories
        window.subCategoryDisplay.loadSubCategories(categoryId, categoryData);
    }
}

// Export for use in other components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SubCategoryDisplay;
} else if (typeof window !== 'undefined') {
    window.SubCategoryDisplay = SubCategoryDisplay;
}