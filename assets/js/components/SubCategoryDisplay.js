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
                const response = await fetch('./knowledge/categories/jyotisha-subcategories.json');
                if (response.ok) {
                    return await response.json();
                }
            } catch (error) {
                console.log('Fetch failed, using fallback data');
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