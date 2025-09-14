/**
 * 🔮 Jyotish Mastery Category Card
 * 
 * Displays the complete Jyotish/Vedic Astrology mastery system with all subcategories
 * including Planetary Intelligence, House Systems, Nakshatra Codes, Timing Mastery,
 * Predictive Algorithms, and Remedial Technologies.
 */

class JyotishCategoryCard {
    constructor() {
        this.category = {
            id: "jyotisha",
            title: "Jyotish Mastery",
            subtitle: "Quantum Cosmic Intelligence",
            description: "🔮 DECODE THE UNIVERSE'S HIDDEN ALGORITHMS: Master the ancient Vedic science of cosmic timing and celestial intelligence. Unlock planetary consciousness patterns, house system architectures, nakshatra DNA codes, and temporal advantage protocols. Transform from cosmic amateur to quantum astrologer with systematic mastery of Jyotisha's deepest secrets.",
            icon: "🔮",
            emoji: "⚡",
            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
            primaryColor: "#667eea",
            secondaryColor: "#f093fb",
            cardStyle: "cosmic-mastery",
            totalContent: "72+ deep-dive modules across 6 mastery systems",
            difficulty: "Beginner → Grandmaster",
            timeToMaster: "12-24 months complete immersion",
            practicalApplications: [
                "Personal life optimization through cosmic timing",
                "Professional consultation and guidance services",
                "Strategic decision-making with celestial intelligence",
                "Relationship compatibility and timing analysis",
                "Career advancement through planetary periods",
                "Health and wellness optimization protocols",
                "Wealth generation through cosmic alignments",
                "Spiritual evolution and consciousness development"
            ],
            subCategories: [
                {
                    id: "planetary-intelligence",
                    title: "Planetary Intelligence",
                    subtitle: "Cosmic CPU Architecture", 
                    description: "🪐 Master the consciousness processors of the universe",
                    icon: "🪐",
                    contentCount: "12 modules",
                    gradient: "linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFD23F 100%)"
                },
                {
                    id: "house-systems",
                    title: "House Systems",
                    subtitle: "Life Domain Command Centers",
                    description: "🏠 Architect your reality through 12 life domains",
                    icon: "🏠", 
                    contentCount: "15 modules",
                    gradient: "linear-gradient(135deg, #4FACFE 0%, #A855F7 50%, #6366F1 100%)"
                },
                {
                    id: "nakshatra-codes",
                    title: "Nakshatra Codes",
                    subtitle: "Stellar DNA Programming",
                    description: "⭐ Decode your cosmic genetic blueprint",
                    icon: "⭐",
                    contentCount: "27 modules",
                    gradient: "linear-gradient(135deg, #4ECDC4 0%, #44A08D 50%, #2E8B57 100%)"
                },
                {
                    id: "timing-mastery", 
                    title: "Timing Mastery",
                    subtitle: "Temporal Advantage Protocols",
                    description: "⏰ Hack time itself for maximum success probability",
                    icon: "⏰",
                    contentCount: "10 modules",
                    gradient: "linear-gradient(135deg, #FF9A8B 0%, #A8E6CF 50%, #66D9EF 100%)"
                },
                {
                    id: "predictive-algorithms",
                    title: "Predictive Algorithms", 
                    subtitle: "Future Probability Engineering",
                    description: "🔮 Calculate tomorrow with scientific precision",
                    icon: "🔮",
                    contentCount: "8 modules",
                    gradient: "linear-gradient(135deg, #8360c3 0%, #2ebf91 50%, #ffeaa7 100%)"
                },
                {
                    id: "remedial-technologies",
                    title: "Remedial Technologies",
                    subtitle: "Cosmic Debugging & Optimization", 
                    description: "🛠️ Debug your destiny with advanced protocols",
                    icon: "🛠️",
                    contentCount: "12 modules",
                    gradient: "linear-gradient(135deg, #56ab2f 0%, #a8e6cf 50%, #00d2ff 100%)"
                }
            ],
            unlocks: [
                "Complete cosmic intelligence mastery",
                "Professional consultation abilities", 
                "Strategic timing optimization",
                "Predictive analysis capabilities",
                "Remedial solution design",
                "Advanced spiritual evolution"
            ]
        };
    }

    /**
     * Create the complete category card with all subcategories
     */
    createElement() {
        const card = document.createElement('div');
        card.className = `category-card ${this.category.cardStyle}`;
        card.setAttribute('data-category-id', this.category.id);
        
        // Apply gradient background
        card.style.background = this.category.gradient;
        
        card.innerHTML = `
            <div class="card-inner">
                <!-- Card Background Effects -->
                <div class="card-background">
                    <div class="gradient-overlay"></div>
                    <div class="pattern-overlay"></div>
                    <div class="glow-effect"></div>
                </div>
                
                <!-- Main Card Content -->
                <div class="card-content">
                    <!-- Header Section -->
                    <div class="card-header">
                        <div class="icon-group">
                            <span class="main-icon">${this.category.icon}</span>
                            <span class="emoji-accent">${this.category.emoji}</span>
                        </div>
                        <div class="card-badge">
                            <div class="difficulty-badge">${this.category.difficulty}</div>
                            <div class="content-count">${this.category.totalContent}</div>
                        </div>
                    </div>
                    
                    <!-- Body Section -->
                    <div class="card-body">
                        <h2 class="card-title">${this.category.title}</h2>
                        <h3 class="card-subtitle">${this.category.subtitle}</h3>
                        <div class="card-description">
                            <p class="description-text">${this.category.description}</p>
                        </div>
                        
                        <!-- Quick Stats -->
                        <div class="card-stats">
                            <div class="stat-item">
                                <span class="stat-icon">⏱️</span>
                                <span class="stat-text">${this.category.timeToMaster}</span>
                            </div>
                            <div class="stat-divider">•</div>
                            <div class="stat-item">
                                <span class="stat-icon">🎯</span>
                                <span class="stat-text">${this.category.subCategories.length} mastery systems</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Subcategories Grid -->
                    <div class="subcategories-section">
                        <h4 class="section-title">🧠 Mastery Systems</h4>
                        <div class="subcategories-grid">
                            ${this.renderSubCategories()}
                        </div>
                    </div>
                    
                    <!-- Expandable Details Section -->
                    <div class="card-details">
                        <!-- Practical Applications -->
                        <div class="applications-section">
                            <h5 class="section-title">⚡ Practical Applications</h5>
                            <div class="applications-grid">
                                ${this.category.practicalApplications.map(app => `
                                    <div class="application-item">
                                        <span class="app-bullet">▸</span>
                                        <span class="app-text">${app}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Unlocks Section -->
                        <div class="unlocks-section">
                            <h5 class="section-title">🔓 Master Level Unlocks</h5>
                            <div class="unlocks-grid">
                                ${this.category.unlocks.map(unlock => `
                                    <div class="unlock-item">
                                        <span class="unlock-icon">✨</span>
                                        <span class="unlock-text">${unlock}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Footer Actions -->
                    <div class="card-footer">
                        <button class="expand-button" onclick="CategoryCard.toggleDetails(this)">
                            <span class="expand-text">Show Complete System</span>
                            <span class="expand-icon">▼</span>
                        </button>
                        <button class="dive-deeper-button" onclick="window.location.href='jyotisha-mastery.html'">
                            <span class="button-icon">🔮</span>
                            <span class="button-text">ENTER COSMIC PORTAL</span>
                            <span class="button-arrow">»</span>
                        </button>
                    </div>
                </div>
                
                <!-- Animated Border -->
                <div class="card-border"></div>
            </div>
        `;
        
        this.element = card;
        this.attachEventListeners();
        return card;
    }

    /**
     * Render subcategories in an organized grid
     */
    renderSubCategories() {
        return this.category.subCategories.map(subCat => `
            <div class="subcategory-item" style="background: ${subCat.gradient}">
                <div class="subcat-header">
                    <span class="subcat-icon">${subCat.icon}</span>
                    <span class="subcat-count">${subCat.contentCount}</span>
                </div>
                <div class="subcat-body">
                    <h6 class="subcat-title">${subCat.title}</h6>
                    <p class="subcat-subtitle">${subCat.subtitle}</p>
                    <p class="subcat-description">${subCat.description}</p>
                </div>
                <div class="subcat-footer">
                    <button class="subcat-explore" onclick="window.location.href='${subCat.id}.html'">
                        <span class="explore-text">Explore</span>
                        <span class="explore-arrow">→</span>
                    </button>
                </div>
            </div>
        `).join('');
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
            if (!e.target.closest('.card-footer') && !e.target.closest('.subcat-footer')) {
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

        // Add subcategory click handlers
        const subcatItems = this.element.querySelectorAll('.subcategory-item');
        subcatItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.subcat-footer')) {
                    item.classList.add('subcat-clicked');
                    setTimeout(() => {
                        item.classList.remove('subcat-clicked');
                    }, 200);
                }
            });
        });
    }

    /**
     * Static method for toggling details (called by expand button)
     */
    static toggleDetails(button) {
        const card = button.closest('.category-card');
        const details = card.querySelector('.card-details');
        const expandText = button.querySelector('.expand-text');
        const expandIcon = button.querySelector('.expand-icon');
        
        if (details.classList.contains('expanded')) {
            details.classList.remove('expanded');
            expandText.textContent = 'Show Complete System';
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
     * Update content dynamically
     */
    updateContent(newData) {
        if (newData) {
            Object.assign(this.category, newData);
            if (this.element) {
                // Re-render the card with new data
                const newCard = this.createElement();
                this.element.replaceWith(newCard);
                this.element = newCard;
            }
        }
    }

    /**
     * Get category data
     */
    getCategoryData() {
        return this.category;
    }

    /**
     * Animate card entrance
     */
    animateIn() {
        if (this.element) {
            this.element.style.opacity = '0';
            this.element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                this.element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                this.element.style.opacity = '1';
                this.element.style.transform = 'translateY(0)';
            }, 100);
        }
    }
}

// Add to global scope for use
window.JyotishCategoryCard = JyotishCategoryCard;

// Static method available globally
window.CategoryCard = {
    toggleDetails: JyotishCategoryCard.toggleDetails
};

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = JyotishCategoryCard;
}