/**
 * 🕉️ SACRED KNOWLEDGE HUB - Core Component
 * 
 * A revolutionary interface that transforms Vedic wisdom into
 * an interactive, immersive digital experience.
 */

class SacredKnowledgeHub {
    constructor() {
        // Core system configuration
        this.config = {
            animations: {
                enabled: true,
                reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            },
            language: {
                showSanskrit: true,
                showTransliteration: true,
                showTranslation: true
            },
            accessibility: {
                highContrast: window.matchMedia('(prefers-contrast: high)').matches,
                fontSize: parseFloat(getComputedStyle(document.documentElement).fontSize)
            }
        };

        // Initialize sacred knowledge structure
        this.knowledgeSystem = {
            core: {
                sanskrit: "परब्रह्म",
                transliteration: "Parabrahma",
                translation: "Supreme Consciousness",
                description: "The source of all knowledge and existence",
                icon: "🕉️"
            },
            
            vedas: [
                {
                    id: "rigveda",
                    sanskrit: "ऋग्वेद",
                    transliteration: "Rig Veda",
                    essence: "Knowledge of Cosmic Laws",
                    icon: "🌟",
                    color: "#FF6B6B",
                    frequency: "432Hz",
                    layers: {
                        samhita: {
                            sanskrit: "संहिता",
                            content: "Original hymns and mantras",
                            count: "10,552 mantras",
                            type: "Direct revelation"
                        },
                        brahmana: {
                            sanskrit: "ब्राह्मण",
                            content: "Ritual and practical application",
                            type: "Technical knowledge"
                        },
                        aranyaka: {
                            sanskrit: "आरण्यक",
                            content: "Mystic and symbolic meaning",
                            type: "Forest meditation"
                        },
                        upanishad: {
                            sanskrit: "उपनिषद्",
                            content: "Philosophical essence",
                            type: "Ultimate truth"
                        }
                    }
                },
                // Other Vedas follow same structure...
            ],
            
            vedangas: [
                {
                    id: "shiksha",
                    sanskrit: "शिक्षा",
                    transliteration: "Shiksha",
                    domain: "Sacred Sound Engineering",
                    icon: "🗣️",
                    tools: [
                        {
                            name: "Pronunciation Guide",
                            type: "Interactive",
                            interface: "3D visualization"
                        },
                        {
                            name: "Sound Patterns",
                            type: "Analysis",
                            interface: "Waveform display"
                        }
                    ]
                }
                // Other Vedangas follow same structure...
            ]
        };
    }

    /**
     * Initialize the sacred knowledge interface
     */
    async initialize() {
        console.log("🕉️ Initializing Sacred Knowledge Hub...");
        
        try {
            await this.createSacredGeometry();
            await this.initializeKnowledgeStreams();
            await this.setupVedangaTools();
            
            // Enable energy flow animations
            if (!this.config.animations.reducedMotion) {
                this.startEnergyFlows();
            }
            
            console.log("✨ Sacred Knowledge Hub Active");
            return true;
        } catch (error) {
            console.error("⚠️ Sacred Knowledge Hub initialization error:", error);
            return false;
        }
    }

    /**
     * Create the sacred geometry background
     */
    async createSacredGeometry() {
        const container = document.createElement('div');
        container.className = 'sacred-geometry-layer';
        
        // Create Sri Yantra core
        const sriYantra = document.createElement('div');
        sriYantra.className = 'sri-yantra-core';
        container.appendChild(sriYantra);
        
        document.querySelector('.sacred-knowledge-hub').appendChild(container);
    }

    /**
     * Initialize the four knowledge streams (Vedas)
     */
    async initializeKnowledgeStreams() {
        const streamsContainer = document.createElement('div');
        streamsContainer.className = 'knowledge-streams';
        
        this.knowledgeSystem.vedas.forEach(veda => {
            const vedaCard = this.createVedaCard(veda);
            streamsContainer.appendChild(vedaCard);
        });
        
        document.querySelector('.sacred-knowledge-hub').appendChild(streamsContainer);
    }

    /**
     * Create an individual Veda card
     */
    createVedaCard(veda) {
        const card = document.createElement('div');
        card.className = 'veda-card';
        card.style.setProperty('--veda-color', veda.color);
        
        card.innerHTML = `
            <div class="dual-language-text">
                <span class="sanskrit">${veda.sanskrit}</span>
                <span class="english">${veda.transliteration}</span>
            </div>
            
            <div class="veda-essence">
                <span class="icon">${veda.icon}</span>
                <p>${veda.essence}</p>
            </div>
            
            ${Object.entries(veda.layers).map(([key, layer]) => `
                <div class="knowledge-layer" data-layer="${key}">
                    <div class="dual-language-text">
                        <span class="sanskrit">${layer.sanskrit}</span>
                        <span class="english">${key}</span>
                    </div>
                    <div class="layer-content">
                        <p>${layer.content}</p>
                        ${layer.count ? `<span class="layer-count">${layer.count}</span>` : ''}
                        <span class="layer-type">${layer.type}</span>
                    </div>
                </div>
            `).join('')}
        `;
        
        this.attachVedaInteractions(card, veda);
        return card;
    }

    /**
     * Setup the six Vedanga tools
     */
    async setupVedangaTools() {
        const toolsContainer = document.createElement('div');
        toolsContainer.className = 'vedanga-tools';
        
        this.knowledgeSystem.vedangas.forEach(vedanga => {
            const toolCard = this.createVedangaCard(vedanga);
            toolsContainer.appendChild(toolCard);
        });
        
        document.querySelector('.sacred-knowledge-hub').appendChild(toolsContainer);
    }

    /**
     * Create an individual Vedanga tool card
     */
    createVedangaCard(vedanga) {
        const card = document.createElement('div');
        card.className = 'vedanga-tool';
        
        card.innerHTML = `
            <span class="tool-icon">${vedanga.icon}</span>
            <div class="dual-language-text">
                <span class="sanskrit">${vedanga.sanskrit}</span>
                <span class="english">${vedanga.transliteration}</span>
            </div>
            <p class="tool-domain">${vedanga.domain}</p>
            
            <div class="tool-interfaces">
                ${vedanga.tools.map(tool => `
                    <div class="tool-interface" data-type="${tool.type}">
                        <h4>${tool.name}</h4>
                        <p>${tool.interface}</p>
                    </div>
                `).join('')}
            </div>
        `;
        
        this.attachVedangaInteractions(card, vedanga);
        return card;
    }

    /**
     * Attach interactions to Veda cards
     */
    attachVedaInteractions(card, veda) {
        // Layer reveal on hover/touch
        const layers = card.querySelectorAll('.knowledge-layer');
        layers.forEach(layer => {
            layer.addEventListener('mouseenter', () => {
                if (!this.config.animations.reducedMotion) {
                    layer.style.transform = 'translateX(10px)';
                }
            });
            
            layer.addEventListener('mouseleave', () => {
                layer.style.transform = 'none';
            });
        });
        
        // Sacred sound on interaction
        if (veda.frequency) {
            card.addEventListener('click', () => {
                this.playSacredSound(veda.frequency);
            });
        }
    }

    /**
     * Attach interactions to Vedanga tools
     */
    attachVedangaInteractions(card, vedanga) {
        const interfaces = card.querySelectorAll('.tool-interface');
        interfaces.forEach(interface => {
            interface.addEventListener('click', () => {
                this.activateVedangaTool(vedanga.id, interface.dataset.type);
            });
        });
    }

    /**
     * Activate a specific Vedanga tool
     */
    async activateVedangaTool(vedangaId, toolType) {
        console.log(`🛠️ Activating ${vedangaId} tool: ${toolType}`);
        // Tool-specific activation logic to be implemented
    }

    /**
     * Play sacred sound frequencies
     */
    async playSacredSound(frequency) {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.frequency.value = parseFloat(frequency);
        oscillator.type = 'sine';
        
        gainNode.gain.value = 0;
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Gentle fade in/out
        gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.1);
        gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 2);
        
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 2);
    }

    /**
     * Start energy flow animations
     */
    startEnergyFlows() {
        // Create energy flow particles
        const flows = document.createElement('div');
        flows.className = 'energy-flows';
        
        // Add subtle particle animations
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'energy-particle';
            particle.style.setProperty('--delay', `${Math.random() * 5}s`);
            flows.appendChild(particle);
        }
        
        document.querySelector('.sacred-geometry-layer').appendChild(flows);
    }
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SacredKnowledgeHub;
} else {
    window.SacredKnowledgeHub = SacredKnowledgeHub;
}