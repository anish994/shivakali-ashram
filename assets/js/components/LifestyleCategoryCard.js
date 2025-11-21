/**
 * LifestyleCategoryCard.js
 * Specialized card component for Spiritual Lifestyle - Sacred Living
 */

class LifestyleCategoryCard {
    constructor(data) {
        this.data = data;
        this.element = null;
    }

    createElement() {
        const card = document.createElement('div');
        card.className = 'category-card lifestyle-card';
        card.setAttribute('data-category', 'lifestyle');
        card.setAttribute('data-category-id', this.data.id);
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `${this.data.title} - ${this.data.description}`);

        card.innerHTML = `
            <div class="card-background lifestyle-bg">
                <div class="life-gradient"></div>
                <div class="organic-texture"></div>
            </div>

            <div class="card-header">
                <div class="card-icon life-icon">${this.data.icon}</div>
                <div class="card-status">
                    <span class="status-indicator life-status"></span>
                    <span class="status-text">SACRED-LIVING</span>
                </div>
            </div>

            <div class="card-body">
                <h2 class="card-title life-title">${this.data.title}</h2>
                <p class="card-description">${this.data.description}</p>
                
                <div class="life-stats">
                    <div class="stat-item">
                        <span class="stat-value">24h</span>
                        <span class="stat-label">RHYTHM</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">BIO</span>
                        <span class="stat-label">SYNC</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">🌱</span>
                        <span class="stat-label">PURE</span>
                    </div>
                </div>

                <div class="life-modules">
                    <span class="module-tag">RITUCHARYA</span>
                    <span class="module-tag">SATTVIC DIET</span>
                    <span class="module-tag">VASTU</span>
                    <span class="module-tag">SATSANG</span>
                </div>
            </div>

            <div class="card-footer">
                <button class="card-action-btn life-btn">
                    <span class="btn-text">ALIGN RHYTHM</span>
                    <span class="btn-arrow">→</span>
                </button>
            </div>

            <div class="card-glow life-glow"></div>
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
        console.log('🌱 Navigating to Spiritual Lifestyle...');
        if (this.element) {
            this.element.classList.add('launching');
        }
        setTimeout(() => {
            window.location.href = 'lifestyle/index.html';
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

window.LifestyleCategoryCard = LifestyleCategoryCard;