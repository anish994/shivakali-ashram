/**
 * CategoryCard.js - Beautiful Main Category Card Component
 * Creates rich, animated cards for each spiritual knowledge category
 */

class CategoryCard {
    constructor(categoryData) {
        this.data = categoryData;
        this.element = null;
    }

    /**
     * Create the card HTML element with beautiful styling
     */
    createElement() {
        const card = document.createElement('div');
        card.className = `category-card ${this.data.cardStyle}`;
        card.setAttribute('data-category-id', this.data.id);
        card.setAttribute('data-priority', this.data.priority);
        
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-background">
                    <div class="gradient-overlay" style="background: ${this.data.gradient}"></div>
                    <div class="card-pattern"></div>
                </div>
                
                <div class="card-content">
                    <div class="card-header">
                        <div class="card-icon">
                            <span class="main-icon">${this.data.icon}</span>
                            <span class="emoji-accent">${this.data.emoji}</span>
                        </div>
                        <div class="card-badge">
                            <span class="sub-count">${this.data.subCategoryCount}</span>
                            <span class="badge-text">systems</span>
                        </div>
                    </div>
                    
                    <div class="card-body">
                        <h2 class="card-title">${this.data.title}</h2>
                        <h3 class="card-subtitle">${this.data.subtitle}</h3>
                        <p class="card-description">${this.data.description}</p>
                        
                        <div class="card-stats">
                            <div class="stat-item">
                                <span class="stat-icon">📚</span>
                                <span class="stat-text">${this.data.subCategoryCount} systems</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card-footer">
                        <button class="explore-button" data-action="explore" data-category="${this.data.id}">
                            <span class="button-text">Open</span>
                            <span class="button-icon">›</span>
                        </button>
                        <div class="card-glow"></div>
                    </div>
                </div>
            </div>
        `;

        this.element = card;
        this.attachEventListeners();
        this.initializeAnimations();
        
        return card;
    }

    /**
     * Attach event listeners for interactions
     */
    attachEventListeners() {
        if (!this.element) return;

        // Subtle hover class (no animations)
        this.element.addEventListener('mouseenter', () => {
            this.element.classList.add('hovered');
        });

        this.element.addEventListener('mouseleave', () => {
            this.element.classList.remove('hovered');
        });

        // Click handler
        const exploreButton = this.element.querySelector('.explore-button');
        exploreButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleExplore();
        });

        // Card click handler
        this.element.addEventListener('click', (e) => {
            if (!e.target.closest('.explore-button')) {
                this.handleCardClick();
            }
        });
    }

    /**
     * Initialize card animations
     */
    initializeAnimations() {
        // No motion: keep static visual presence
    }

    /**
     * Handle explore button click
     */
    handleExplore() {
        // Add click animation
        this.element.classList.add('clicked');
        
        setTimeout(() => {
            // Navigate to category (will be implemented with router)
            this.navigateToCategory();
        }, 300);
    }

    /**
     * Handle card click (same as explore but different animation)
     */
    handleCardClick() {
        this.element.classList.add('card-clicked');
        setTimeout(() => {
            this.navigateToCategory();
        }, 200);
    }

    /**
     * Navigate to category - Load sub-categories
     */
    navigateToCategory() {
        console.log(`Loading sub-categories for: ${this.data.id}`);
        
        // Check if this category has a direct URL (like tantra/index.html)
        if (this.data.directUrl) {
            console.log(`Navigating to direct URL: ${this.data.directUrl}`);
            window.location.href = this.data.directUrl;
            return;
        }
        
        // Trigger sub-category display
        if (window.SubCategoryDisplay && typeof window.SubCategoryDisplay.handleCategoryClick === 'function') {
            window.SubCategoryDisplay.handleCategoryClick(this.data.id, this.data);
        } else {
            console.error('SubCategoryDisplay not available');
            // Fallback: show alert for now
            alert(`🚀 Loading ${this.data.title} sub-categories...\n\nThis will show epic sub-category cards with detailed content!`);
        }
    }

    /**
     * Trigger sparkle animations
     */
    // Removed sparkles for static design
    triggerSparkles() {
        const sparkles = this.element.querySelectorAll('.sparkle');
        sparkles.forEach((sparkle, index) => {
            setTimeout(() => {
                sparkle.classList.add('animate');
                setTimeout(() => {
                    sparkle.classList.remove('animate');
                }, 1000);
            }, index * 200);
        });
    }

    /**
     * Start continuous glow animation
     */
    // Removed glow animation for static design
    startGlowAnimation() {
        const glow = this.element.querySelector('.card-glow');
        if (glow) {
            setInterval(() => {
                glow.classList.add('pulse');
                setTimeout(() => {
                    glow.classList.remove('pulse');
                }, 2000);
            }, 4000);
        }
    }

    /**
     * Update card data and refresh display
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
     * Destroy card and clean up
     */
    destroy() {
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }

    /**
     * Get card element
     */
    getElement() {
        return this.element || this.createElement();
    }
}

// Export for use in other modules
window.CategoryCard = CategoryCard;
