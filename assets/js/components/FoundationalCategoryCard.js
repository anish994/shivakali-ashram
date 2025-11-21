/**
 * FoundationalCategoryCard.js
 * Specialized card component for Foundational Systems - Core Principles
 */

class FoundationalCategoryCard {
    constructor(data) {
        this.data = data;
        this.element = null;
    }

    createElement() {
        const card = document.createElement('div');
        card.className = 'category-card foundational-card';
        card.setAttribute('data-category', 'foundational');
        card.setAttribute('data-category-id', this.data.id);
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `${this.data.title} - ${this.data.description}`);

        card.innerHTML = `
            <div class="card-background foundational-bg">
                <div class="found-gradient"></div>
                <div class="stone-texture"></div>
            </div>

            <div class="card-header">
                <div class="card-icon found-icon">${this.data.icon}</div>
                <div class="card-status">
                    <span class="status-indicator found-status"></span>
                    <span class="status-text">CORE-SYSTEMS</span>
                </div>
            </div>

            <div class="card-body">
                <h2 class="card-title found-title">${this.data.title}</h2>
                <p class="card-description">${this.data.description}</p>
                
                <div class="found-stats">
                    <div class="stat-item">
                        <span class="stat-value">04</span>
                        <span class="stat-label">PILLARS</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">ROOT</span>
                        <span class="stat-label">ACCESS</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">♾️</span>
                        <span class="stat-label">ETERNAL</span>
                    </div>
                </div>

                <div class="found-modules">
                    <span class="module-tag">DHARMA</span>
                    <span class="module-tag">KARMA</span>
                    <span class="module-tag">REINCARNATION</span>
                    <span class="module-tag">MOKSHA</span>
                </div>
            </div>

            <div class="card-footer">
                <button class="card-action-btn found-btn">
                    <span class="btn-text">ACCESS CORE</span>
                    <span class="btn-arrow">→</span>
                </button>
            </div>

            <div class="card-glow found-glow"></div>
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
        console.log('☸️ Navigating to Foundational Systems...');
        if (this.element) {
            this.element.classList.add('launching');
        }
        setTimeout(() => {
            window.location.href = 'foundational/index.html';
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

window.FoundationalCategoryCard = FoundationalCategoryCard;