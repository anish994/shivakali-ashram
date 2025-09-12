/**
 * 🪐 Planetary Intelligence Card - Clean Simple Version
 * 
 * A clean card component that matches other sub-category cards.
 * Opens dedicated planetary intelligence page when clicked.
 */

class PlanetaryIntelligenceCard {
    constructor() {
        this.subCategory = {
            id: "planetary-intelligence",
            title: "Planetary Intelligence",
            subtitle: "Cosmic CPU Architecture",
            description: "🪐 DECODE THE UNIVERSE'S OPERATING SYSTEM: Each planet functions as a specialized consciousness processor in the cosmic computer. Master the data streams, frequency signatures, and algorithmic patterns of celestial intelligence networks.",
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
            unlocks: [
                "Advanced timing techniques", 
                "Personalized planetary remedies", 
                "Cosmic energy channeling"
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
                        <button class="dive-deeper-button" onclick="PlanetaryIntelligenceCard.openPlanetaryPortal()">
                            <span class="button-icon">🚀</span>
                            <span class="button-text">ENTER PLANETARY PORTAL</span>
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
     * Attach event listeners for interactions (same as SubCategoryCard)
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
     * Static method to open the dedicated Planetary Intelligence page
     */
    static openPlanetaryPortal() {
        console.log('🚀 Opening Planetary Intelligence Portal...');
        
        // For now, create a modal. Later we'll create a dedicated page.
        const modal = document.createElement('div');
        modal.className = 'planetary-portal-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <button class="modal-close" onclick="this.closest('.planetary-portal-modal').remove()">×</button>
                <div class="modal-header">
                    <div class="header-icon">🪐</div>
                    <h2>Planetary Intelligence Portal</h2>
                    <p>Cosmic CPU Architecture Mastery System</p>
                </div>
                
                <div class="portal-message">
                    <h3>🚧 Epic Portal Under Construction</h3>
                    <p>We're building the most advanced planetary intelligence training system ever created! This dedicated portal will feature:</p>
                    
                    <div class="feature-grid">
                        <div class="feature-item">
                            <span class="feature-icon">🖥️</span>
                            <span class="feature-text">Interactive Planetary CPU Simulator</span>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">⚡</span>
                            <span class="feature-text">Real-time Cosmic Data Streams</span>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">🧠</span>
                            <span class="feature-text">Personalized Planet-Processor Mapping</span>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">🎯</span>
                            <span class="feature-text">Advanced Timing Algorithm Tools</span>
                        </div>
                    </div>
                </div>
                
                <div class="portal-actions">
                    <a href="https://discord.gg/QKaBQV24" target="_blank" class="action-button community">
                        <span class="btn-icon">💬</span>
                        <span class="btn-text">Join Our Community</span>
                    </a>
                    <button class="action-button notify" onclick="PlanetaryIntelligenceCard.notifyOnLaunch()">
                        <span class="btn-icon">🔔</span>
                        <span class="btn-text">Notify Me When Ready</span>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    /**
     * Handle notification signup
     */
    static notifyOnLaunch() {
        // Simple notification system
        const email = prompt('Enter your email to get notified when the Planetary Intelligence Portal launches:');
        if (email && email.includes('@')) {
            alert('🚀 Awesome! You\'ll be the first to know when the Planetary Intelligence Portal goes live!');
            console.log('Notification signup:', email);
            // In a real app, this would send to a backend service
        } else if (email) {
            alert('Please enter a valid email address.');
        }
    }

    /**
     * Get the card element
     */
    getElement() {
        return this.element || this.createElement();
    }
}

// Export for module use
window.PlanetaryIntelligenceCard = PlanetaryIntelligenceCard;