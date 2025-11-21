/**
 * AdvancedCategoryCard.js
 * Specialized card component for Advanced Practices - Mastery & Transcendence
 */

class AdvancedCategoryCard {
    constructor(data) {
        this.data = data;
        this.element = null;
    }

    createElement() {
        const card = document.createElement('div');
        card.className = 'category-card advanced-card';
        card.setAttribute('data-category', 'advanced');
        card.setAttribute('data-category-id', this.data.id);
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `${this.data.title} - ${this.data.description}`);

        card.innerHTML = `
            <div class="card-background advanced-bg">
                <div class="adv-gradient"></div>
                <div class="circuit-grid"></div>
            </div>

            <div class="card-header">
                <div class="card-icon adv-icon">${this.data.icon}</div>
                <div class="card-status">
                    <span class="status-indicator adv-status"></span>
                    <span class="status-text">HIGH-VOLTAGE</span>
                </div>
            </div>

            <div class="card-body">
                <h2 class="card-title adv-title">${this.data.title}</h2>
                <p class="card-description">${this.data.description}</p>
                
                <div class="adv-stats">
                    <div class="stat-item">
                        <span class="stat-value">⚡</span>
                        <span class="stat-label">ENERGY</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">MAX</span>
                        <span class="stat-label">POTENTIAL</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">👁️</span>
                        <span class="stat-label">AWAKE</span>
                    </div>
                </div>

                <div class="adv-modules">
                    <span class="module-tag">KUNDALINI</span>
                    <span class="module-tag">KRIYA</span>
                    <span class="module-tag">TURIYA</span>
                    <span class="module-tag">SIDDHIS</span>
                </div>
            </div>

            <div class="card-footer">
                <button class="card-action-btn adv-btn">
                    <span class="btn-text">INITIATE UPGRADE</span>
                    <span class="btn-arrow">→</span>
                </button>
            </div>

            <div class="card-glow adv-glow"></div>
        `;

        card.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleClick();
        });

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.handleClick();
            }
        });

        this.element = card;
        return card;
    }

    handleClick() {
        console.log('⚡ Navigating to Advanced Practices...');
        if (this.element) {
            this.element.classList.add('launching');
        }
        setTimeout(() => {
            window.location.href = 'advanced/index.html';
        }, 300);
    }

    update(newData) {
        this.data = { ...this.data, ...newData };
        if (this.element) {
            const parent = this.element.parentNode;
            const newElement = this.createElement();
            parent.replaceChild(newElement, this.element);
        }
    }

    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
    }
}

window.AdvancedCategoryCard = AdvancedCategoryCard;