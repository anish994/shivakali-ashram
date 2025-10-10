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
            // If category has a direct URL, navigate there instead of loading subcategories
            if (category.directUrl) {
                window.location.href = category.directUrl;
                return;
            }
            this.currentCategory = category;
            this.showLoadingState();
            await this.renderSubCategoryGrid(category);
            window.location.hash = `category-${categoryId}`;
        } catch (error) {
            console.error('❌ Failed to load category:', error);
            this.showErrorState();
        }
    }

    /**
     * Renders the sub-category grid for a given category by fetching its data
     */
    async renderSubCategoryGrid(category) {
        try {
            const response = await fetch(`./knowledge/categories/${category.id}-subcategories.json?v=${new Date().getTime()}`); // Cache-busting
            if (!response.ok) {
                throw new Error(`Sub-category data for '${category.title}' not found.`);
            }
            const subCategories = await response.json();
            console.log("Sub-category data received:", subCategories); // Debugging line

            this.gridContainer.innerHTML = ''; // Clear loading state

            const subCategoryWrapper = document.createElement('div');
            subCategoryWrapper.className = 'sub-category-view';

            subCategoryWrapper.innerHTML = `
                <div class="sub-category-header">
                    <a href="#" class="back-button">‹ Back to Gateway</a>
                    <h1 class="sub-category-title">${category.title}</h1>
                    <p class="sub-category-description">${category.description}</p>
                </div>
                <div class="sub-category-grid ${!subCategories.subCategories || subCategories.subCategories.length === 0 ? 'no-content' : ''}"></div>
            `;

            const subGrid = subCategoryWrapper.querySelector('.sub-category-grid');
            if (subCategories.subCategories && subCategories.subCategories.length > 0) {
                subCategories.subCategories.forEach(subCat => {
                    const card = this.createSubCategoryCard(subCat);
                    subGrid.appendChild(card);
                });
            } else {
                subGrid.innerHTML = '<p class="no-content-message">Further wisdom on this path is being transcribed. Please check back later.</p>';
            }

            this.gridContainer.appendChild(subCategoryWrapper);

            subCategoryWrapper.querySelector('.back-button').addEventListener('click', (e) => {
                e.preventDefault();
                window.location.hash = '';
                this.renderSubjectsGrid('categories-grid');
            });

        } catch (error) {
            console.error('❌ Failed to render sub-category grid:', error);
            this.showErrorState(); // Show a user-friendly error screen
        }
    }

    /**
     * Creates a single sub-category card that links to a separate HTML page
     */
    createSubCategoryCard(subCategory) {
        const card = document.createElement('a');
        card.className = `sub-category-card ${subCategory.cardStyle || ''}`.trim();
        card.href = subCategory.path; // Use the new 'path' property

        card.innerHTML = `
            <div class="sub-card-icon">${subCategory.icon || '✨'}</div>
            <div class="sub-card-content">
                <h3 class="sub-card-title">${subCategory.title}</h3>
                <p class="sub-card-description">${subCategory.description}</p>
            </div>
            <div class="sub-card-arrow">›</div>
        `;
        return card;
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
                if (category.directUrl) {
                    window.location.href = category.directUrl;
                } else {
                    this.loadCategory(category.id);
                }
            });
        }

        card.addEventListener('click', (e) => {
            if (!e.target.closest('.explore-button')) {
                if (category.directUrl) {
                    window.location.href = category.directUrl;
                } else {
                    this.loadCategory(category.id);
                }
            }
        });
    }
}