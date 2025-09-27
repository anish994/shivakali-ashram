/**
 * 🕉️ VEDIC LAYER SYSTEM - Interactive Knowledge Exploration
 * 
 * Creates an immersive layer-based exploration system for Vedic knowledge,
 * allowing users to dive deep into each level of understanding.
 */

class VedicLayerSystem {
    constructor() {
        this.currentVeda = null;
        this.currentLayer = null;
        this.layerData = {
            samhita: {
                sanskrit: "संहिता",
                meaning: "Collection of Mantras",
                description: "The core verses and mantras that form the foundation of the Veda",
                icon: "📜",
                color: "#FFD700"
            },
            brahmana: {
                sanskrit: "ब्राह्मण",
                meaning: "Ritual Knowledge",
                description: "Detailed explanations of Vedic ceremonies and their mystical significance",
                icon: "🕯️",
                color: "#FF6B6B"
            },
            aranyaka: {
                sanskrit: "आरण्यक",
                meaning: "Forest Treaties",
                description: "Esoteric interpretations meant for forest meditation",
                icon: "🌳",
                color: "#4FACFE"
            },
            upanishad: {
                sanskrit: "उपनिषद्",
                meaning: "Secret Teaching",
                description: "The highest philosophical truths and realizations",
                icon: "✨",
                color: "#9F44D3"
            }
        };
    }

    /**
     * Initialize the layer system
     */
    initialize() {
        this.createLayerInterface();
        this.attachEventListeners();
    }

    /**
     * Create the layer interface
     */
    createLayerInterface() {
        // Create main layer container
        const container = document.createElement('div');
        container.className = 'vedic-layer-system';
        container.style.display = 'none';
        
        // Create layer content
        container.innerHTML = `
            <div class="layer-overlay"></div>
            <div class="layer-container">
                <div class="layer-header">
                    <div class="veda-title">
                        <span class="veda-icon"></span>
                        <span class="veda-name"></span>
                    </div>
                    <button class="close-layers">×</button>
                </div>
                
                <div class="layer-navigation">
                    ${Object.entries(this.layerData).map(([key, data]) => `
                        <button class="layer-tab" data-layer="${key}">
                            <span class="layer-icon">${data.icon}</span>
                            <div class="layer-text">
                                <span class="sanskrit">${data.sanskrit}</span>
                                <span class="english">${data.meaning}</span>
                            </div>
                        </button>
                    `).join('')}
                </div>
                
                <div class="layer-content">
                    <div class="layer-info"></div>
                    <div class="layer-visualization"></div>
                </div>
            </div>
        `;

        document.body.appendChild(container);
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Handle Veda card clicks
        document.querySelectorAll('.veda-card').forEach(card => {
            card.addEventListener('click', () => {
                this.openLayers(card.dataset.veda);
            });
        });

        // Handle layer system interactions
        const system = document.querySelector('.vedic-layer-system');
        
        // Close button
        system.querySelector('.close-layers').addEventListener('click', () => {
            this.closeLayers();
        });

        // Layer tabs
        system.querySelectorAll('.layer-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchLayer(tab.dataset.layer);
            });
        });

        // Close on overlay click
        system.querySelector('.layer-overlay').addEventListener('click', () => {
            this.closeLayers();
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeLayers();
        });
    }

    /**
     * Open layer system for a specific Veda
     */
    openLayers(vedaId) {
        const system = document.querySelector('.vedic-layer-system');
        const card = document.querySelector(`[data-veda="${vedaId}"]`);
        
        if (!card) return;

        // Update Veda info
        this.currentVeda = vedaId;
        system.querySelector('.veda-icon').textContent = card.querySelector('.veda-icon').textContent;
        system.querySelector('.veda-name').textContent = card.querySelector('.veda-title .english').textContent;

        // Show system with animation
        system.style.display = 'block';
        requestAnimationFrame(() => {
            system.classList.add('active');
            // Auto-select first layer
            this.switchLayer('samhita');
        });

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    /**
     * Switch to a specific layer
     */
    switchLayer(layerId) {
        if (!this.layerData[layerId]) return;

        const system = document.querySelector('.vedic-layer-system');
        const data = this.layerData[layerId];
        
        // Update active tab
        system.querySelectorAll('.layer-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.layer === layerId);
        });

        // Update content with animation
        const content = system.querySelector('.layer-content');
        content.style.opacity = '0';
        
        setTimeout(() => {
            // Update info
            system.querySelector('.layer-info').innerHTML = `
                <div class="layer-header" style="color: ${data.color}">
                    <span class="layer-icon">${data.icon}</span>
                    <h2>
                        <span class="sanskrit">${data.sanskrit}</span>
                        <span class="english">${data.meaning}</span>
                    </h2>
                </div>
                <div class="layer-description">${data.description}</div>
            `;

            // Update visualization
            this.updateVisualization(layerId);

            content.style.opacity = '1';
        }, 300);

        this.currentLayer = layerId;
    }

    /**
     * Update layer visualization
     */
    updateVisualization(layerId) {
        const container = document.querySelector('.layer-visualization');
        const data = this.layerData[layerId];

        // Create unique visualization for each layer
        switch(layerId) {
            case 'samhita':
                this.createMantraVisualization(container);
                break;
            case 'brahmana':
                this.createRitualVisualization(container);
                break;
            case 'aranyaka':
                this.createForestVisualization(container);
                break;
            case 'upanishad':
                this.createWisdomVisualization(container);
                break;
        }
    }

    /**
     * Create mantra visualization
     */
    createMantraVisualization(container) {
        container.innerHTML = `
            <div class="mantra-circle">
                <div class="mantra-ring"></div>
                <div class="mantra-ring"></div>
                <div class="mantra-ring"></div>
                <div class="mantra-center">
                    <span class="om">ॐ</span>
                </div>
            </div>
        `;
    }

    /**
     * Create ritual visualization
     */
    createRitualVisualization(container) {
        container.innerHTML = `
            <div class="ritual-fire">
                <div class="flame-container">
                    <div class="flame"></div>
                    <div class="flame"></div>
                    <div class="flame"></div>
                </div>
                <div class="sparks"></div>
            </div>
        `;
    }

    /**
     * Create forest visualization
     */
    createForestVisualization(container) {
        container.innerHTML = `
            <div class="forest-meditation">
                <div class="trees"></div>
                <div class="meditator"></div>
                <div class="energy-field"></div>
            </div>
        `;
    }

    /**
     * Create wisdom visualization
     */
    createWisdomVisualization(container) {
        container.innerHTML = `
            <div class="wisdom-cosmos">
                <div class="stars"></div>
                <div class="consciousness"></div>
                <div class="enlightenment"></div>
            </div>
        `;
    }

    /**
     * Close the layer system
     */
    closeLayers() {
        const system = document.querySelector('.vedic-layer-system');
        system.classList.remove('active');
        
        setTimeout(() => {
            system.style.display = 'none';
            this.currentVeda = null;
            this.currentLayer = null;
        }, 300);

        // Restore body scroll
        document.body.style.overflow = '';
    }
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VedicLayerSystem;
} else {
    window.VedicLayerSystem = VedicLayerSystem;
}