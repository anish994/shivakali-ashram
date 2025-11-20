/**
 * TherapeuticSystemsCategoryCard.js
 * Specialized card component for Therapeutic Systems - Bio-Sanctuary Interface
 */

class TherapeuticSystemsCategoryCard {
    constructor(data) {
        this.data = data;
        this.element = null;
    }

    /**
     * Create the therapeutic systems card element
     */
    createElement() {
        const card = document.createElement('div');
        card.className = 'category-card therapeutic-systems-card';
        card.setAttribute('data-category', 'therapeutic');
        card.setAttribute('data-category-id', this.data.id);
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `${this.data.title} - ${this.data.description}`);

        // Main card structure
        card.innerHTML = `
            <div class="card-background therapeutic-bg">
                <div class="bio-gradient"></div>
                <div class="scanline-effect"></div>
            </div>

            <div class="card-header">
                <div class="card-icon therapeutic-icon">${this.data.icon}</div>
                <div class="card-status">
                    <span class="status-indicator therapeutic-status"></span>
                    <span class="status-text">BIO-SANCTUARY</span>
                </div>
            </div>

            <div class="card-body">
                <h2 class="card-title therapeutic-title">${this.data.title}</h2>
                <p class="card-description">${this.data.description}</p>
                
                <div class="therapeutic-stats">
                    <div class="stat-item">
                        <span class="stat-value">04</span>
                        <span class="stat-label">SYSTEMS</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">16</span>
                        <span class="stat-label">PROTOCOLS</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">∞</span>
                        <span class="stat-label">HEALING</span>
                    </div>
                </div>

                <div class="therapeutic-modules">
                    <span class="module-tag">AYURVEDIC ALCHEMY</span>
                    <span class="module-tag">SOMATIC RELEASE</span>
                    <span class="module-tag">VIBRATIONAL MED.</span>
                    <span class="module-tag">ENERGY HEALING</span>
                </div>
            </div>

            <div class="card-footer">
                <button class="card-action-btn therapeutic-btn">
                    <span class="btn-text">INITIATE PROTOCOLS</span>
                    <span class="btn-arrow">→</span>
                </button>
            </div>

            <div class="card-glow therapeutic-glow"></div>
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
     * Handle card click - navigate to therapeutic systems interface
     */
    handleClick() {
        console.log('🧬 Navigating to Therapeutic Systems...');
        
        // Add transition animation
        if (this.element) {
            this.element.classList.add('launching');
        }

        // Navigate after brief animation
        setTimeout(() => {
            window.location.href = 'therapeutics/theriputic homepage.html';
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
window.TherapeuticSystemsCategoryCard = TherapeuticSystemsCategoryCard;
