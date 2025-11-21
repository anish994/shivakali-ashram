/**
 * DivinationCategoryCard.js
 * Specialized card component for Divination Sciences - Oracle Wisdom
 */

class DivinationCategoryCard {
    constructor(data) {
        this.data = data;
        this.element = null;
    }

    /**
     * Create the divination card element
     */
    createElement() {
        const card = document.createElement('div');
        card.className = 'category-card divination-card';
        card.setAttribute('data-category', 'divination');
        card.setAttribute('data-category-id', this.data.id);
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `${this.data.title} - ${this.data.description}`);

        // Main card structure
        card.innerHTML = `
            <div class="card-background divination-bg">
                <div class="divine-gradient"></div>
                <div class="stardust-grid"></div>
            </div>

            <div class="card-header">
                <div class="card-icon divine-icon">${this.data.icon}</div>
                <div class="card-status">
                    <span class="status-indicator divine-status"></span>
                    <span class="status-text">ORACLE-LINK</span>
                </div>
            </div>

            <div class="card-body">
                <h2 class="card-title divine-title">${this.data.title}</h2>
                <p class="card-description">${this.data.description}</p>
                
                <div class="divine-stats">
                    <div class="stat-item">
                        <span class="stat-value">04</span>
                        <span class="stat-label">METHODS</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">PRED</span>
                        <span class="stat-label">FUTURE</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">👁️</span>
                        <span class="stat-label">SIGHT</span>
                    </div>
                </div>

                <div class="divine-modules">
                    <span class="module-tag">PRASHNA</span>
                    <span class="module-tag">NIMITTA</span>
                    <span class="module-tag">SWARA YOGA</span>
                    <span class="module-tag">NUMEROLOGY</span>
                </div>
            </div>

            <div class="card-footer">
                <button class="card-action-btn divine-btn">
                    <span class="btn-text">CONSULT ORACLE</span>
                    <span class="btn-arrow">→</span>
                </button>
            </div>

            <div class="card-glow divine-glow"></div>
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
     * Handle card click - navigate to divination interface
     */
    handleClick() {
        console.log('🔮 Navigating to Divination Sciences...');
        
        // Add transition animation
        if (this.element) {
            this.element.classList.add('launching');
        }

        // Navigate after brief animation
        setTimeout(() => {
            window.location.href = 'divination/index.html';
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
window.DivinationCategoryCard = DivinationCategoryCard;