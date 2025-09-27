
/**
 * ⭐ Nakshatra Codes Card - Clean Simple Version
 * 
 * A clean card component that matches other sub-category cards.
 * Opens dedicated nakshatra systems page when clicked.
 */

class NakshatraCodesCard {
    constructor() {
        this.subCategory = {
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
            contentCount: "27 nakshatra deep-dives",
            difficulty: "Advanced → Master Level",
            timeToMaster: "6-12 months intensive research",
            practicalApplications: [
                "Soul purpose discovery",
                "Natural talent activation", 
                "Karmic pattern recognition",
                "Compatibility analysis",
                "Predictive insights",
                "Remedial measures"
            ],
            keyTopics: [
                "Ashwini: The Cosmic Healers",
                "Bharani: The Life-Death Operators",
                "Krittika: The Cosmic Cutters",
                "Rohini: The Magnetic Attractors", 
                "Mrigashira: The Eternal Seekers",
                "Ardra: The Storm Processors"
            ],
            unlocks: [
                "Soul-level understanding", 
                "Karmic mission clarity", 
                "Natural talent optimization",
                "Stellar consciousness integration"
            ]
        };
        this.parentCategory = { id: "jyotisha", title: "Jyotish Mastery" };
    }

    /**
     * Create a clean card that matches other sub-category cards
     */
    createElement() {
        const card = document.createElement('div');
        card.className = `sub-category-card ${this.subCategory.cardStyle || 'default-style'}`;
        card.setAttribute('data-subcategory-id', this.subCategory.id);
        
        // Apply gradient background
        card.style.background = this.subCategory.gradient;
        
        card.innerHTML = `
            <div class="sub-card-inner">
                <!-- Card Background Effects -->
                <div class="sub-card-background">
                    <div class="gradient-overlay"></div>
                    <div class="pattern-overlay"></div>
                    <div class="glow-effect"></div>
                </div>
                
                <!-- Main Card Content -->
                <div class="sub-card-content">
                    <!-- Header Section -->
                    <div class="sub-card-header">
                        <div class="sub-icon-group">
                            <span class="sub-main-icon">${this.subCategory.icon}</span>
                            <span class="sub-emoji-accent">${this.subCategory.emoji}</span>
                        </div>
                        <div class="sub-card-badge">
                            <div class="difficulty-badge">${this.subCategory.difficulty}</div>
                            <div class="content-count">${this.subCategory.contentCount}</div>
                        </div>
                    </div>
                    
                    <!-- Body Section -->
                    <div class="sub-card-body">
                        <h3 class="sub-card-title">${this.subCategory.title}</h3>
                        <h4 class="sub-card-subtitle">${this.subCategory.subtitle}</h4>
                        <div class="sub-card-description">
                            <p class="description-text">${this.subCategory.description}</p>
                        </div>
                        
                        <!-- Quick Stats -->
                        <div class="sub-card-stats">
                            <div class="stat-item">
                                <span class="stat-icon">⏱️</span>
                                <span class="stat-text">${this.subCategory.timeToMaster}</span>
                            </div>
                            <div class="stat-divider">•</div>
                            <div class="stat-item">
                                <span class="stat-icon">🎯</span>
                                <span class="stat-text">${this.subCategory.practicalApplications.length} applications</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Expandable Details Section -->
                    <div class="sub-card-details">
                        <!-- Key Topics Preview -->
                        <div class="key-topics-section">
                            <h5 class="section-title">🧠 Key Mastery Areas</h5>
                            <div class="topics-grid">
                                ${this.renderKeyTopics()}
                            </div>
                        </div>
                        
                        <!-- Practical Applications -->
                        <div class="applications-section">
                            <h5 class="section-title">⚡ Practical Applications</h5>
                            <div class="applications-list">
                                ${this.subCategory.practicalApplications.map(app => `
                                    <div class="application-item">
                                        <span class="app-bullet">▸</span>
                                        <span class="app-text">${app}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Unlocks Section -->
                        <div class="unlocks-section">
                            <h5 class="section-title">🔓 What You'll Unlock</h5>
                            <div class="unlocks-grid">
                                ${this.subCategory.unlocks.map(unlock => `
                                    <div class="unlock-item">
                                        <span class="unlock-icon">✨</span>
                                        <span class="unlock-text">${unlock}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Footer Actions -->
                    <div class="sub-card-footer">
                        <button class="expand-button" onclick="SubCategoryCard.toggleDetails(this)">
                            <span class="expand-text">Show More Details</span>
                            <span class="expand-icon">▼</span>
                        </button>
                        <button class="dive-deeper-button" onclick="window.location.href='nakshatras.html'">
                            <span class="button-icon">⭐</span>
                            <span class="button-text">ENTER NAKSHATRA PORTAL</span>
                            <span class="button-arrow">»</span>
                        </button>
                    </div>
                </div>
                
                <!-- Animated Border -->
                <div class="sub-card-border"></div>
            </div>
        `;
        
        this.element = card;
        this.attachEventListeners();
        return card;
    }

    /**
     * Render key topics in an organized grid (same as SubCategoryCard)
     */
    renderKeyTopics() {
        const maxPreview = 6; // Show first 6 topics
        const topics = this.subCategory.keyTopics.slice(0, maxPreview);
        
        return topics.map(topic => `
            <div class="topic-item">
                <span class="topic-bullet">🔸</span>
                <span class="topic-text">${topic}</span>
            </div>
        `).join('') + (this.subCategory.keyTopics.length > maxPreview ? `
            <div class="topic-item more-topics">
                <span class="topic-bullet">⋯</span>
                <span class="topic-text">+${this.subCategory.keyTopics.length - maxPreview} more advanced topics</span>
            </div>
        ` : '');
    }

    /**
     * Attach event listeners for interactions
     */
    attachEventListeners() {
        if (!this.element) return;

        // Hover effects
        this.element.addEventListener('mouseenter', () => {
            this.element.classList.add('hovered');
        });

        this.element.addEventListener('mouseleave', () => {
            this.element.classList.remove('hovered');
        });

        // *** CORRECTED CLICK BEHAVIOR ***
        // Make the entire card clickable, except for the expand button.
        this.element.addEventListener('click', (e) => {
            // If the "Show More" button or any of its children are clicked, let that button's own handler work.
            if (e.target.closest('.expand-button')) {
                // This allows the SubCategoryCard.toggleDetails(this) to function without navigating.
                return; 
            }
            
            // For any other click on the card, navigate to the page.
            // This ensures clicking the card body or the "Enter Portal" button works.
            window.location.href = 'nakshatras.html';
        });

        // Touch support
        this.element.addEventListener('touchstart', () => {
            this.element.classList.add('touched');
        });

        this.element.addEventListener('touchend', () => {
            setTimeout(() => {
                this.element.classList.remove('touched');
            }, 150);
        });
    }

    /**
     * Get the card element
     */
    getElement() {
        return this.element || this.createElement();
    }
}

// Export for module use
window.NakshatraCodesCard = NakshatraCodesCard;
