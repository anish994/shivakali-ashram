/**
 * 🔬 Consciousness Lab Category Card
 * 
 * Interactive spiritual technology category with gamified tools and assessments
 * for transforming ancient wisdom into modern digital experiences.
 */

class InteractiveToolsCategoryCard {
    constructor() {
        this.category = {
            id: "interactive-tools",
            title: "Consciousness Lab",
            subtitle: "Interactive Spiritual Technology",
            description: "🔬 ENTER THE DIGITAL ASHRAM: Step into our advanced spiritual technology laboratory where ancient wisdom meets cutting-edge interactivity. These tools and assessments transform cosmic knowledge into engaging, personalized experiences that accelerate your spiritual evolution through digital innovation.",
            icon: "🔬",
            emoji: "🎮",
            gradient: "linear-gradient(135deg, #00c9ff 0%, #92fe9d 50%, #ffa726 100%)",
            primaryColor: "#00c9ff",
            secondaryColor: "#92fe9d",
            cardStyle: "digital-lab",
            totalContent: "Coming Soon - Revolutionary Interactive Experiences",
            difficulty: "All Levels → Interactive",
            timeToMaster: "Instant engagement, lifetime exploration",
            practicalApplications: [
                "Personalized cosmic blueprint analysis",
                "Interactive consciousness assessments", 
                "Gamified spiritual skill development",
                "Real-time compatibility calculations",
                "Automated timing and planning tools",
                "Immersive learning experiences",
                "Progressive spiritual RPG elements",
                "Community-based spiritual challenges"
            ],
            comingSoonFeatures: [
                {
                    id: "planetary-assessments",
                    title: "Planetary Power Assessments",
                    subtitle: "Interactive Consciousness Profiling",
                    description: "🪐 Dynamic personality analysis with real-time insights",
                    icon: "🪐",
                    status: "In Development",
                    gradient: "linear-gradient(135deg, #FF6B35 0%, #FFD23F 100%)"
                },
                {
                    id: "house-life-tools", 
                    title: "Life Domain Optimizers",
                    subtitle: "Interactive Reality Architecture",
                    description: "🏛️ Tools for each of the 12 life areas with actionable guidance",
                    icon: "🏛️",
                    status: "Conceptualized", 
                    gradient: "linear-gradient(135deg, #667eea 0%, #f093fb 100%)"
                },
                {
                    id: "timing-calculators",
                    title: "Cosmic Timing Calculators", 
                    subtitle: "Automated Auspicious Moment Finder",
                    description: "⏰ AI-powered timing selection for major life decisions",
                    icon: "⏰",
                    status: "In Development",
                    gradient: "linear-gradient(135deg, #FF9A8B 0%, #66D9EF 100%)"
                },
                {
                    id: "compatibility-engine",
                    title: "Relationship Compatibility Engine",
                    subtitle: "Advanced Synastry & Connection Analysis", 
                    description: "💕 Deep compatibility analysis with improvement suggestions",
                    icon: "💕",
                    status: "Planned",
                    gradient: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)"
                },
                {
                    id: "gemstone-advisor",
                    title: "AI Gemstone & Rudraksha Advisor",
                    subtitle: "Personalized Crystal Technology Selection",
                    description: "💎 Smart recommendations for optimal energy enhancement",
                    icon: "💎", 
                    status: "Conceptualized",
                    gradient: "linear-gradient(135deg, #56ab2f 0%, #00d2ff 100%)"
                },
                {
                    id: "spiritual-rpg",
                    title: "Spiritual Evolution RPG",
                    subtitle: "Gamified Consciousness Development",
                    description: "🎮 Level up your spiritual skills through interactive challenges",
                    icon: "🎮",
                    status: "Vision Phase", 
                    gradient: "linear-gradient(135deg, #8360c3 0%, #ffeaa7 100%)"
                }
            ],
            unlocks: [
                "Instant spiritual insights and guidance",
                "Personalized growth recommendations", 
                "Interactive learning acceleration",
                "Gamified spiritual development",
                "Real-time cosmic calculations",
                "Community spiritual challenges"
            ]
        };
    }

    /**
     * Create the complete category card
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
                    <div class="digital-particles"></div>
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
                            <div class="status-badge">Coming Soon</div>
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
                                <span class="stat-icon">⚡</span>
                                <span class="stat-text">${this.category.timeToMaster}</span>
                            </div>
                            <div class="stat-divider">•</div>
                            <div class="stat-item">
                                <span class="stat-icon">🚀</span>
                                <span class="stat-text">Revolutionary Tools Coming</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Coming Soon Features Grid -->
                    <div class="features-section">
                        <h4 class="section-title">🛠️ Revolutionary Tools in Development</h4>
                        <div class="features-grid">
                            ${this.renderComingSoonFeatures()}
                        </div>
                    </div>
                    
                    <!-- Expandable Details Section -->
                    <div class="card-details">
                        <!-- Vision Statement -->
                        <div class="vision-section">
                            <h5 class="section-title">🔮 Our Vision</h5>
                            <div class="vision-content">
                                <p class="vision-text">Transform ShivaKali Ashram into the world's first truly interactive spiritual learning platform. Where ancient Vedic wisdom meets modern technology, creating personalized, gamified experiences that accelerate consciousness evolution through digital innovation.</p>
                                <div class="vision-highlights">
                                    <div class="highlight-item">
                                        <span class="highlight-icon">🧠</span>
                                        <span class="highlight-text">AI-Powered Personalization</span>
                                    </div>
                                    <div class="highlight-item">
                                        <span class="highlight-icon">🎯</span>
                                        <span class="highlight-text">Real-time Guidance</span>
                                    </div>
                                    <div class="highlight-item">
                                        <span class="highlight-icon">🌟</span>
                                        <span class="highlight-text">Gamified Evolution</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Applications Section -->
                        <div class="applications-section">
                            <h5 class="section-title">⚡ Future Applications</h5>
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
                            <h5 class="section-title">🔓 Interactive Experience Unlocks</h5>
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
                            <span class="expand-text">Show Vision Details</span>
                            <span class="expand-icon">▼</span>
                        </button>
                        <button class="coming-soon-button" disabled>
                            <span class="button-icon">🚧</span>
                            <span class="button-text">UNDER CONSTRUCTION</span>
                            <span class="button-arrow">⚡</span>
                        </button>
                    </div>
                </div>
                
                <!-- Animated Border -->
                <div class="card-border digital-border"></div>
            </div>
        `;
        
        this.element = card;
        this.attachEventListeners();
        return card;
    }

    /**
     * Render coming soon features
     */
    renderComingSoonFeatures() {
        return this.category.comingSoonFeatures.map(feature => `
            <div class="feature-item" style="background: ${feature.gradient}">
                <div class="feature-header">
                    <span class="feature-icon">${feature.icon}</span>
                    <span class="feature-status">${feature.status}</span>
                </div>
                <div class="feature-body">
                    <h6 class="feature-title">${feature.title}</h6>
                    <p class="feature-subtitle">${feature.subtitle}</p>
                    <p class="feature-description">${feature.description}</p>
                </div>
                <div class="feature-footer">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${this.getProgressWidth(feature.status)}"></div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    /**
     * Get progress width based on status
     */
    getProgressWidth(status) {
        const progressMap = {
            'In Development': '60%',
            'Conceptualized': '30%', 
            'Planned': '15%',
            'Vision Phase': '5%'
        };
        return progressMap[status] || '0%';
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        if (!this.element) return;

        // Hover effects with digital enhancement
        this.element.addEventListener('mouseenter', () => {
            this.element.classList.add('hovered', 'digital-glow');
        });

        this.element.addEventListener('mouseleave', () => {
            this.element.classList.remove('hovered', 'digital-glow');
        });

        // Click effects
        this.element.addEventListener('click', (e) => {
            if (!e.target.closest('.card-footer')) {
                this.element.classList.add('clicked', 'digital-pulse');
                setTimeout(() => {
                    this.element.classList.remove('clicked', 'digital-pulse');
                }, 300);
            }
        });

        // Touch support for mobile
        this.element.addEventListener('touchstart', () => {
            this.element.classList.add('touched', 'digital-touch');
        });

        this.element.addEventListener('touchend', () => {
            setTimeout(() => {
                this.element.classList.remove('touched', 'digital-touch');
            }, 200);
        });

        // Feature item interactions
        const featureItems = this.element.querySelectorAll('.feature-item');
        featureItems.forEach(item => {
            item.addEventListener('click', (e) => {
                item.classList.add('feature-clicked');
                setTimeout(() => {
                    item.classList.remove('feature-clicked');
                }, 200);
            });
        });
    }

    /**
     * Get the card element
     */
    getElement() {
        return this.element || this.createElement();
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
            this.element.style.transform = 'translateY(40px) scale(0.9)';
            
            setTimeout(() => {
                this.element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                this.element.style.opacity = '1';
                this.element.style.transform = 'translateY(0) scale(1)';
            }, 100);
        }
    }
}

// Add to global scope for use
window.InteractiveToolsCategoryCard = InteractiveToolsCategoryCard;

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InteractiveToolsCategoryCard;
}