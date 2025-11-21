/**
 * CharacterAnalysisCategoryCard.js
 * Specialized card component for Character Analysis - Psyche Profiler Interface
 */

class CharacterAnalysisCategoryCard {
    constructor(data) {
        this.data = data;
        this.element = null;
    }

    /**
     * Create the character analysis card element
     */
    createElement() {
        const card = document.createElement('div');
        card.className = 'category-card character-analysis-card';
        card.setAttribute('data-category', 'character');
        card.setAttribute('data-category-id', this.data.id);
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `${this.data.title} - ${this.data.description}`);

        // Main card structure
        card.innerHTML = `
            <div class="card-background character-bg">
                <div class="psyche-gradient"></div>
                <div class="neural-grid"></div>
            </div>

            <div class="card-header">
                <div class="card-icon character-icon">${this.data.icon}</div>
                <div class="card-status">
                    <span class="status-indicator character-status"></span>
                    <span class="status-text">PSYCHE-PROFILER</span>
                </div>
            </div>

            <div class="card-body">
                <h2 class="card-title character-title">${this.data.title}</h2>
                <p class="card-description">${this.data.description}</p>
                
                <div class="character-stats">
                    <div class="stat-item">
                        <span class="stat-value">06</span>
                        <span class="stat-label">MODULES</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">AI</span>
                        <span class="stat-label">ANALYSIS</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">∞</span>
                        <span class="stat-label">DEPTH</span>
                    </div>
                </div>

                <div class="character-modules">
                    <span class="module-tag">GUNA MATRIX</span>
                    <span class="module-tag">ARCHETYPES</span>
                    <span class="module-tag">SHADOW WORK</span>
                    <span class="module-tag">KARMIC LOOPS</span>
                </div>
            </div>

            <div class="card-footer">
                <button class="card-action-btn character-btn">
                    <span class="btn-text">ENTER THE MIRROR</span>
                    <span class="btn-arrow">→</span>
                </button>
            </div>

            <div class="card-glow character-glow"></div>
        `;

        // Add click handler
        card.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleClick();
        });

        // Add keyboard handler
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.handleClick();
            }
        });

        this.element = card;
        return card;
    }

    /**
     * Handle card click - navigate to character analysis interface
     */
    handleClick() {
        console.log('🎭 Navigating to Character Analysis...');
        
        // Add transition animation
        if (this.element) {
            this.element.classList.add('launching');
        }

        // Navigate after brief animation
        setTimeout(() => {
            window.location.href = 'character/index.html';
        }, 300);
    }

    /**
     * Update card data
     */
    update(newData) {
        this.data = { ...this.data, ...newData };
        if (this.element) {
            // Re-create element with new data
            const parent = this.element.parentNode;
            const newElement = this.createElement();
            parent.replaceChild(newElement, this.element);
        }
    }

    /**
     * Destroy the card
     */
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
    }
}

// Export for global access
window.CharacterAnalysisCategoryCard = CharacterAnalysisCategoryCard;
