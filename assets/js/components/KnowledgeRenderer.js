/**
 * KnowledgeRenderer.js - Handles rendering of sacred knowledge content
 */

class KnowledgeRenderer {
    constructor(contentLoader) {
        this.contentLoader = contentLoader;
        this.currentCategory = null;
        this.gridContainer = null;
    }

    /**
     * Render the main subjects grid
     */
    async renderSubjectsGrid(containerId) {
        try {
            this.gridContainer = document.getElementById(containerId);
            if (!this.gridContainer) {
                throw new Error(`Container '${containerId}' not found`);
            }

            // Show loading state
            this.showLoadingState();

            // Get categories from content loader
            const categories = this.contentLoader.getMainCategories();
            
            // Clear existing content
            this.gridContainer.innerHTML = '';
            
            // Create grid container
            const gridWrapper = document.createElement('div');
            gridWrapper.className = 'sacred-knowledge-grid';
            gridWrapper.innerHTML = `
                <div class="cards-header">
                    <h1 class="cards-title">🕉️ Sacred Knowledge Gateway</h1>
                    <p class="cards-subtitle">Choose your path to spiritual mastery</p>
                </div>
                <div class="category-cards-grid"></div>
            `;
            
            // Create category cards
            const grid = gridWrapper.querySelector('.category-cards-grid');
            categories.forEach(category => {
                const card = this.createCategoryCard(category);
                grid.appendChild(card);
            });
            
            // Add to DOM
            this.gridContainer.appendChild(gridWrapper);
            
            // Trigger entrance animations
            setTimeout(() => {
                const cards = grid.querySelectorAll('.category-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, index * 100);
                });
            }, 100);
            
            return true;
        } catch (error) {
            console.error('❌ Failed to render subjects grid:', error);
            this.showErrorState();
            return false;
        }
    }

    /**
     * Create a single category card
     */
    createCategoryCard(category) {
        const card = document.createElement('div');
        card.className = `category-card ${category.cardStyle}`;
        card.setAttribute('data-category-id', category.id);
        
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-background">
                    <div class="gradient-overlay" style="background: ${category.gradient}"></div>
                    <div class="card-pattern"></div>
                </div>
                
                <div class="card-content">
                    <div class="card-header">
                        <div class="card-icon">
                            <span class="main-icon">${category.icon}</span>
                            <span class="emoji-accent">${category.emoji}</span>
                        </div>
                        <div class="card-badge">
                            <span class="sub-count">${category.subCategoryCount}</span>
                            <span class="badge-text">systems</span>
                        </div>
                    </div>
                    
                    <div class="card-body">
                        <h2 class="card-title">${category.title}</h2>
                        <h3 class="card-subtitle">${category.subtitle}</h3>
                        <p class="card-description">${category.description}</p>
                    </div>
                    
                    <div class="card-footer">
                        <button class="explore-button" data-action="explore" data-category="${category.id}">
                            <span class="button-text">Explore</span>
                            <span class="button-icon">›</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        this.attachCardListeners(card, category);
        return card;
    }

    /**
     * Handle hash-based navigation
     */
    handleHashChange() {
        const hash = window.location.hash;
        if (hash) {
            const [type, id] = hash.slice(1).split('-');
            if (type === 'category' && id) {
                this.loadCategory(id);
            }
        } else {
            // Return to main grid if no hash
            this.renderSubjectsGrid('categories-grid');
        }
    }

    /**
     * Load a specific category
     */
    async loadCategory(categoryId) {
        try {
            const category = this.contentLoader.getCategory(categoryId);
            if (!category) {
                throw new Error(`Category '${categoryId}' not found`);
            }

            this.currentCategory = category;
            this.showLoadingState();
            
            // Load category content (to be implemented)
            console.log(`Loading category: ${category.title}`);
            
        } catch (error) {
            console.error('❌ Failed to load category:', error);
            this.showErrorState();
        }
    }

    /**
     * Show loading state
     */
    showLoadingState() {
        if (!this.gridContainer) return;
        
        this.gridContainer.innerHTML = `
            <div class="loading-state">
                <div class="loading-spinner">
                    <div class="spinner"></div>
                    <p>Loading Sacred Knowledge...</p>
                </div>
            </div>
        `;
    }

    /**
     * Show error state
     */
    showErrorState() {
        if (!this.gridContainer) return;
        
        this.gridContainer.innerHTML = `
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
     * Attach event listeners to category cards
     */
    attachCardListeners(card, category) {
        const exploreButton = card.querySelector('.explore-button');
        if (exploreButton) {
            exploreButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.loadCategory(category.id);
            });
        }

        card.addEventListener('click', (e) => {
            if (!e.target.closest('.explore-button')) {
                this.loadCategory(category.id);
            }
        });
    }
}