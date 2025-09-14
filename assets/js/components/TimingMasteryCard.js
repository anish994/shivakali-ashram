/**
 * ⏰ Timing Mastery Card - Temporal Advantage Protocols
 * 
 * A clean card component for Timing Mastery subcategory.
 * Covers Dasha systems, transits, and muhurat selection.
 */

class TimingMasteryCard {
    constructor() {
        this.subCategory = {
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
                "Career move synchronization",
                "Investment timing strategies",
                "Health protocol timing"
            ],
            keyTopics: [
                "Vimshottari Dasha: The 120-Year Life Algorithm",
                "Transit Analysis: Real-time cosmic weather tracking",
                "Muhurat Selection: Auspicious timing protocols",
                "Gochara Effects: Daily planetary influence patterns",
                "Ashtakavarga: Strength scoring systems",
                "Panchanga: 5-factor time quality analysis",
                "Electional Astrology: Optimal event timing",
                "Void of Course Moon: Timing to avoid"
            ],
            unlocks: [
                "Perfect timing abilities",
                "Strategic advantage",
                "Cosmic synchronization",
                "Event optimization mastery"
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
                        <button class="dive-deeper-button" onclick="window.location.href='timing-mastery.html'">
                            <span class="button-icon">⏰</span>
                            <span class="button-text">ENTER TIME PORTAL</span>
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
     * Render key topics in an organized grid
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

        // Click effects
        this.element.addEventListener('click', (e) => {
            if (!e.target.closest('.sub-card-footer')) {
                this.element.classList.add('clicked');
                setTimeout(() => {
                    this.element.classList.remove('clicked');
                }, 200);
            }
        });

        // Touch support for mobile
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
     * Static method for toggling details (called by expand button)
     */
    static toggleDetails(button) {
        const card = button.closest('.sub-category-card');
        const details = card.querySelector('.sub-card-details');
        const expandText = button.querySelector('.expand-text');
        const expandIcon = button.querySelector('.expand-icon');
        
        if (details.classList.contains('expanded')) {
            details.classList.remove('expanded');
            expandText.textContent = 'Show More Details';
            expandIcon.textContent = '▼';
            card.classList.remove('details-expanded');
        } else {
            details.classList.add('expanded');
            expandText.textContent = 'Hide Details';
            expandIcon.textContent = '▲';
            card.classList.add('details-expanded');
        }
    }

    /**
     * Get the card element
     */
    getElement() {
        return this.element || this.createElement();
    }

    /**
     * Get subcategory data
     */
    getSubCategoryData() {
        return this.subCategory;
    }
}

// Add to global scope for use
window.TimingMasteryCard = TimingMasteryCard;

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimingMasteryCard;
}