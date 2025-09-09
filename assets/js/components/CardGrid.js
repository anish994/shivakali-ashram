/**
 * CardGrid.js - Main Category Cards Grid Manager
 * Handles rendering and managing all category cards
 */

class CardGrid {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.cards = [];
        this.config = null;
        this.isLoaded = false;
    }

    /**
     * Initialize the card grid
     */
    async init() {
        try {
            await this.loadConfig();
            this.createGridContainer();
            await this.renderCards();
            this.attachGlobalEventListeners();
            this.isLoaded = true;
            console.log('CardGrid initialized successfully!', this.cards.length, 'cards loaded');
        } catch (error) {
            console.error('Failed to initialize CardGrid:', error);
            this.showErrorState();
        }
    }

    /**
     * Load configuration from knowledge/config.json
     */
    async loadConfig() {
        const response = await fetch('./knowledge/config.json');
        if (!response.ok) {
            throw new Error(`Failed to load config: ${response.status}`);
        }
        this.config = await response.json();
    }

    /**
     * Create the grid container
     */
    createGridContainer() {
        if (!this.container) {
            throw new Error('Container not found');
        }

        // Clear existing content
        this.container.innerHTML = '';

        // Add loading state
        this.showLoadingState();

        // Create grid wrapper
        const gridWrapper = document.createElement('div');
        gridWrapper.className = 'category-cards-wrapper';
        gridWrapper.innerHTML = `
            <div class="cards-header">
                <h1 class="cards-title">🕉️ Sacred Knowledge Gateway</h1>
                <p class="cards-subtitle">Choose your path to spiritual mastery and consciousness expansion</p>
            </div>
            <div class="category-cards-grid" id="category-cards-grid">
                <!-- Cards will be rendered here -->
            </div>
        `;

        this.container.appendChild(gridWrapper);
        this.gridContainer = document.getElementById('category-cards-grid');
    }

    /**
     * Show loading state
     */
    showLoadingState() {
        const loading = document.createElement('div');
        loading.className = 'loading-state';
        loading.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading Sacred Knowledge...</p>
            </div>
        `;
        this.container.appendChild(loading);
    }

    /**
     * Remove loading state
     */
    hideLoadingState() {
        const loading = this.container.querySelector('.loading-state');
        if (loading) {
            loading.remove();
        }
    }

    /**
     * Show error state
     */
    showErrorState() {
        this.container.innerHTML = `
            <div class="error-state">
                <div class="error-content">
                    <span class="error-icon">⚠️</span>
                    <h2>Unable to Load Knowledge Cards</h2>
                    <p>Please check your connection and try refreshing the page.</p>
                    <button onclick="location.reload()" class="retry-button">Try Again</button>
                </div>
            </div>
        `;
    }

    /**
     * Render all category cards
     */
    async renderCards() {
        if (!this.config?.mainCategories) {
            throw new Error('No main categories found in config');
        }

        this.hideLoadingState();

        // Sort categories by priority
        const sortedCategories = [...this.config.mainCategories]
            .filter(cat => cat.enabled)
            .sort((a, b) => a.priority - b.priority);

        // Create and render cards
        for (const categoryData of sortedCategories) {
            const card = new CategoryCard(categoryData);
            const cardElement = card.createElement();
            
            this.gridContainer.appendChild(cardElement);
            this.cards.push(card);
        }

        // Trigger entrance animations
        this.animateCardsIn();
    }

    /**
     * Animate cards entrance
     */
    animateCardsIn() {
        const cards = this.gridContainer.querySelectorAll('.category-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-in');
            }, index * 150);
        });
    }

    /**
     * Attach global event listeners
     */
    attachGlobalEventListeners() {
        // Add window resize handler for responsive adjustments
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
    }

    /**
     * Handle window resize
     */
    handleResize() {
        // Recalculate card layouts if needed
        this.cards.forEach(card => {
            // Trigger any resize-specific animations
            if (card.element) {
                card.element.classList.add('resizing');
                setTimeout(() => {
                    card.element.classList.remove('resizing');
                }, 300);
            }
        });
    }

    /**
     * Handle keyboard navigation
     */
    handleKeyboardNavigation(e) {
        const cards = this.gridContainer.querySelectorAll('.category-card');
        
        if (e.key === 'Tab' && cards.length > 0) {
            // Enhanced tab navigation with visual indicators
            cards.forEach((card, index) => {
                if (document.activeElement === card) {
                    card.classList.add('keyboard-focused');
                } else {
                    card.classList.remove('keyboard-focused');
                }
            });
        }
    }

    /**
     * Get card by ID
     */
    getCard(categoryId) {
        return this.cards.find(card => card.data.id === categoryId);
    }

    /**
     * Update card data
     */
    updateCard(categoryId, newData) {
        const card = this.getCard(categoryId);
        if (card) {
            card.update(newData);
        }
    }

    /**
     * Add a new card
     */
    addCard(categoryData) {
        const card = new CategoryCard(categoryData);
        const cardElement = card.createElement();
        this.gridContainer.appendChild(cardElement);
        this.cards.push(card);
        
        // Animate new card in
        setTimeout(() => {
            cardElement.classList.add('animate-in');
        }, 100);
    }

    /**
     * Remove a card
     */
    removeCard(categoryId) {
        const cardIndex = this.cards.findIndex(card => card.data.id === categoryId);
        if (cardIndex !== -1) {
            const card = this.cards[cardIndex];
            card.destroy();
            this.cards.splice(cardIndex, 1);
        }
    }

    /**
     * Refresh all cards
     */
    async refresh() {
        // Clear existing cards
        this.cards.forEach(card => card.destroy());
        this.cards = [];
        
        // Reload and render
        await this.loadConfig();
        await this.renderCards();
    }

    /**
     * Destroy the card grid
     */
    destroy() {
        this.cards.forEach(card => card.destroy());
        this.cards = [];
        if (this.container) {
            this.container.innerHTML = '';
        }
    }

    /**
     * Get grid statistics
     */
    getStats() {
        return {
            totalCards: this.cards.length,
            enabledCards: this.cards.filter(card => card.data.enabled).length,
            totalSubCategories: this.cards.reduce((sum, card) => sum + (card.data.subCategoryCount || 0), 0),
            isLoaded: this.isLoaded
        };
    }
}

// Export for use in other modules
window.CardGrid = CardGrid;
