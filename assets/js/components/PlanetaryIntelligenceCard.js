/**
 * 🪐 Planetary Intelligence Card - Cosmic CPU Architecture
 * 
 * A specialized component for the Planetary Intelligence mastery path.
 * Features Mars-fire gradient theming and planetary processor concepts.
 */

class PlanetaryIntelligenceCard {
    constructor() {
        this.data = {
            id: "planetary-intelligence",
            title: "Planetary Intelligence",
            subtitle: "Cosmic CPU Architecture",
            description: "🪐 DECODE THE UNIVERSE'S OPERATING SYSTEM: Each planet functions as a specialized consciousness processor in the cosmic computer. Master the data streams, frequency signatures, and algorithmic patterns of celestial intelligence networks. Harness Mars as your willpower CPU, Venus as your attraction algorithm, and Jupiter as your wisdom database.",
            icon: "🪐",
            emoji: "⚡",
            gradient: "linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFD23F 100%)",
            primaryColor: "#FF6B35",
            secondaryColor: "#FFD23F",
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
                "Venus: Harmony & Attraction Algorithms",
                "Saturn: Structure & Discipline Framework",
                "Rahu/Ketu: Karmic Data Processing",
                "Planetary Combinations & Synergies"
            ],
            unlocks: [
                "Advanced timing techniques", 
                "Personalized planetary remedies", 
                "Cosmic energy channeling"
            ],
            planetaryProcessors: [
                { name: "Sun", role: "Core Identity CPU", function: "Self-awareness processing", frequency: "⚡ High" },
                { name: "Moon", role: "Emotional RAM", function: "Memory & intuition storage", frequency: "🌊 Fluid" },
                { name: "Mars", role: "Action Engine", function: "Willpower & drive execution", frequency: "🔥 Intense" },
                { name: "Mercury", role: "Communication Bus", function: "Data transfer protocols", frequency: "💨 Rapid" },
                { name: "Venus", role: "Harmony Algorithm", function: "Attraction & beauty processing", frequency: "💖 Magnetic" },
                { name: "Jupiter", role: "Wisdom Database", function: "Knowledge expansion & growth", frequency: "🌟 Expansive" },
                { name: "Saturn", role: "Structure Framework", function: "Discipline & limitation systems", frequency: "⏳ Steady" }
            ]
        };
    }

    /**
     * Create the complete Planetary Intelligence card element
     */
    createElement() {
        const card = document.createElement('div');
        card.className = 'planetary-card';
        card.innerHTML = `
            <div class="planetary-card-inner">
                <!-- Background Layers -->
                <div class="planetary-gradient" style="background: ${this.data.gradient}"></div>
                <div class="cosmic-pattern"></div>
                <div class="planetary-glow"></div>
                
                <!-- Header Section -->
                <div class="planetary-header">
                    <div class="header-content">
                        <div class="planetary-icon-section">
                            <div class="main-planetary-icon">${this.data.icon}</div>
                            <div class="energy-pulse ${this.data.emoji}"></div>
                        </div>
                        <div class="planetary-badge">
                            <div class="difficulty-level">${this.data.difficulty}</div>
                            <div class="module-count">${this.data.contentCount}</div>
                        </div>
                    </div>
                    
                    <div class="planetary-titles">
                        <h3 class="planetary-title">${this.data.title}</h3>
                        <h4 class="planetary-subtitle">${this.data.subtitle}</h4>
                        <p class="planetary-description">${this.data.description}</p>
                    </div>
                    
                    <!-- Quick System Overview -->
                    <div class="system-overview">
                        <div class="overview-item">
                            <span class="overview-icon">⏱️</span>
                            <span class="overview-text">${this.data.timeToMaster}</span>
                        </div>
                        <div class="overview-item">
                            <span class="overview-icon">🎯</span>
                            <span class="overview-text">${this.data.practicalApplications.length} power applications</span>
                        </div>
                    </div>
                </div>
                
                <!-- Planetary Processors Section -->
                <div class="processors-section">
                    <h5 class="section-title">🖥️ Planetary Processors</h5>
                    <div class="processors-grid">
                        ${this.renderPlanetaryProcessors()}
                    </div>
                </div>
                
                <!-- Expandable Deep System Analysis -->
                <div class="deep-system-analysis">
                    <h5 class="section-title">⚡ Power Applications</h5>
                    <div class="applications-matrix">
                        ${this.data.practicalApplications.map(app => `
                            <div class="application-chip">
                                <span class="app-icon">▸</span>
                                <span class="app-name">${app}</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <h5 class="section-title">🧠 Advanced Topics</h5>
                    <div class="topics-matrix">
                        ${this.data.keyTopics.slice(0, 6).map(topic => `
                            <div class="topic-chip">
                                <span class="topic-bullet">🔸</span>
                                <span class="topic-name">${topic}</span>
                            </div>
                        `).join('')}
                        ${this.data.keyTopics.length > 6 ? `
                            <div class="topic-chip more-topics">
                                <span class="topic-bullet">⋯</span>
                                <span class="topic-name">+${this.data.keyTopics.length - 6} more planetary systems</span>
                            </div>
                        ` : ''}
                    </div>
                    
                    <h5 class="section-title">🔓 System Unlocks</h5>
                    <div class="unlocks-matrix">
                        ${this.data.unlocks.map(unlock => `
                            <div class="unlock-chip">
                                <span class="unlock-icon">✨</span>
                                <span class="unlock-name">${unlock}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Action Controls -->
                <div class="planetary-controls">
                    <button class="show-details-btn" onclick="PlanetaryIntelligenceCard.toggleDetails(this)">
                        <span class="btn-text">Show Detailed Analysis</span>
                        <span class="btn-icon">▼</span>
                    </button>
                    <button class="access-portal-btn" onclick="PlanetaryIntelligenceCard.openPortal()">
                        <span class="portal-icon">🚀</span>
                        <span class="portal-text">ACCESS PLANETARY PORTAL</span>
                        <span class="portal-arrow">»</span>
                    </button>
                </div>
            </div>
        `;
        
        this.element = card;
        this.attachEventListeners();
        return card;
    }

    /**
     * Render the planetary processors grid
     */
    renderPlanetaryProcessors() {
        return this.data.planetaryProcessors.map(processor => `
            <div class="processor-unit">
                <div class="processor-header">
                    <span class="processor-planet">${processor.name}</span>
                    <span class="processor-frequency">${processor.frequency}</span>
                </div>
                <div class="processor-role">${processor.role}</div>
                <div class="processor-function">${processor.function}</div>
            </div>
        `).join('');
    }

    /**
     * Attach interactive event listeners
     */
    attachEventListeners() {
        if (!this.element) return;

        // Hover effects for card
        this.element.addEventListener('mouseenter', () => {
            this.element.classList.add('hovered');
        });

        this.element.addEventListener('mouseleave', () => {
            this.element.classList.remove('hovered');
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
     * Static method to toggle detailed analysis
     */
    static toggleDetails(button) {
        const card = button.closest('.planetary-card');
        const analysis = card.querySelector('.deep-system-analysis');
        const btnText = button.querySelector('.btn-text');
        const btnIcon = button.querySelector('.btn-icon');
        
        const isMobile = window.innerWidth <= 768;
        
        if (analysis.style.display === 'block') {
            // Hide details
            analysis.style.display = 'none';
            btnText.textContent = 'Show Detailed Analysis';
            btnIcon.textContent = '▼';
            
            if (!isMobile) {
                button.style.transform = 'scale(0.95)';
                setTimeout(() => { button.style.transform = 'scale(1)'; }, 100);
            } else {
                button.style.opacity = '0.8';
                setTimeout(() => { button.style.opacity = '1'; }, 100);
            }
        } else {
            // Show details
            analysis.style.display = 'block';
            btnText.textContent = 'Hide Detailed Analysis';
            btnIcon.textContent = '▲';
            
            if (!isMobile) {
                button.style.transform = 'scale(0.95)';
                setTimeout(() => { button.style.transform = 'scale(1)'; }, 100);
            } else {
                button.style.opacity = '0.8';
                setTimeout(() => { button.style.opacity = '1'; }, 100);
            }
        }
    }

    /**
     * Static method to open the planetary portal
     */
    static openPortal() {
        console.log('🚀 Opening Planetary Intelligence Portal...');
        
        // Create portal modal
        const modal = document.createElement('div');
        modal.className = 'planetary-portal-modal';
        modal.innerHTML = `
            <div class="portal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="portal-content">
                <button class="portal-close" onclick="this.closest('.planetary-portal-modal').remove()">×</button>
                <div class="portal-header">
                    <h2>🪐 Planetary Intelligence Portal</h2>
                    <p>Access the cosmic CPU architecture mastery system</p>
                </div>
                
                <div class="portal-actions">
                    <a href="https://discord.gg/QKaBQV24" target="_blank" class="portal-community">
                        <span class="action-icon">💬</span>
                        <div class="action-content">
                            <span class="action-title">Join Planetary Community</span>
                            <span class="action-desc">Connect with fellow cosmic programmers</span>
                        </div>
                    </a>
                    
                    <a href="#consultation" onclick="this.closest('.planetary-portal-modal').remove(); openConsultationModal();" class="portal-guidance">
                        <span class="action-icon">👨‍🚀</span>
                        <div class="action-content">
                            <span class="action-title">Expert Planetary Guidance</span>
                            <span class="action-desc">1-on-1 planetary intelligence sessions</span>
                        </div>
                    </a>
                </div>
                
                <div class="portal-preview">
                    <h3>🌟 Coming Soon to the Portal:</h3>
                    <ul class="preview-list">
                        <li>🖥️ Interactive Planetary CPU Simulator</li>
                        <li>⚡ Real-time Cosmic Data Streams</li>
                        <li>🧠 Personalized Planet-Processor Mapping</li>
                        <li>🎯 Advanced Timing Algorithm Tools</li>
                        <li>🔄 Live Planetary Transit Analysis</li>
                    </ul>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'flex';
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