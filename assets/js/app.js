/**
 * SHIVAKALI ASHRAM - Main Application JavaScript
 * Handles navigation, interactions, and dynamic content loading
 */

// Application configuration
const AppConfig = {
    version: '1.0.0',
    debug: false,
    features: {
        smoothScroll: true,
        animations: true,
        preloader: false
    }
};

/**
 * Main Application Class
 * Manages all site functionality and interactions
 */
class ShivakaliApp {
    constructor() {
        this.initialized = false;
        this.navigationItems = [];
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        if (this.initialized) return;

        console.log('🕉️ Initializing Shivakali Ashram App v' + AppConfig.version);

        this.initNavigation();
        this.initScrollEffects();
        this.initCardInteractions();
        
        this.initialized = true;
        console.log('✅ Shivakali Ashram App initialized successfully');
    }

    /**
     * Initialize navigation functionality
     */
    initNavigation() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-item[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Add visual feedback
                    this.highlightNavItem(link);
                }
            });
        });

        console.log('📍 Navigation initialized');
    }

    /**
     * Initialize scroll effects and interactions
     */
    initScrollEffects() {
        // Add scroll-based animations if animations are enabled
        if (AppConfig.features.animations) {
            window.addEventListener('scroll', this.handleScroll.bind(this));
        }
    }

    /**
     * Initialize card interactions
     */
    initCardInteractions() {
        // Add hover effects and click handlers for service cards
        document.querySelectorAll('.service-card, .category-card').forEach(card => {
            card.addEventListener('mouseenter', this.handleCardHover.bind(this));
            card.addEventListener('mouseleave', this.handleCardLeave.bind(this));
        });

        console.log('🎴 Card interactions initialized');
    }

    /**
     * Handle navigation item highlighting
     */
    highlightNavItem(activeLink) {
        // Remove previous highlights
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        // Add highlight to clicked item
        activeLink.classList.add('active');

        // Remove highlight after animation
        setTimeout(() => {
            activeLink.classList.remove('active');
        }, 2000);
    }

    /**
     * Handle scroll events
     */
    handleScroll() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Add any scroll-based effects here
        // For example: parallax effects, fade-in animations, etc.
    }

    /**
     * Handle card hover enter
     */
    handleCardHover(e) {
        const card = e.currentTarget;
        
        // Add gentle scaling effect
        if (AppConfig.features.animations) {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        }
    }

    /**
     * Handle card hover leave  
     */
    handleCardLeave(e) {
        const card = e.currentTarget;
        
        // Reset transform
        if (AppConfig.features.animations) {
            card.style.transform = '';
        }
    }

    /**
     * Utility method to log debug information
     */
    debug(message, data = null) {
        if (AppConfig.debug) {
            console.log('🐛 DEBUG:', message, data);
        }
    }

    /**
     * Method to handle future dynamic content loading
     */
    async loadContent(contentType, contentId) {
        this.debug('Loading content:', { contentType, contentId });
        
        try {
            // Future implementation for loading knowledge content
            // This will be expanded when we add the knowledge system
            console.log('📚 Content loading system ready for:', contentType);
        } catch (error) {
            console.error('❌ Error loading content:', error);
        }
    }

    /**
     * Method to handle form submissions (future use)
     */
    handleFormSubmit(form) {
        console.log('📧 Form submission handler ready');
        // Future implementation for contact forms
    }

    /**
     * Method to show notifications (future use)
     */
    showNotification(message, type = 'info') {
        console.log('🔔 Notification:', type, message);
        // Future implementation for user notifications
    }
}

/**
 * Utility Functions
 */
const Utils = {
    /**
     * Check if device is mobile
     */
    isMobile() {
        return window.innerWidth <= 768;
    },

    /**
     * Get viewport dimensions
     */
    getViewport() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    },

    /**
     * Smooth scroll to element
     */
    scrollTo(element, offset = 0) {
        const targetPosition = element.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
};

/**
 * Initialize application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', async () => {
    // Create global app instance
    window.ShivakaliApp = new ShivakaliApp();
    
    // Make utilities globally available
    window.Utils = Utils;
    
    // Initialize content system
    try {
        console.log('🕉️ Initializing content system...');
        
        // Create content loader
        window.contentLoader = new ContentLoader();
        await window.contentLoader.init();
        
        // Create knowledge renderer
        window.knowledgeRenderer = new KnowledgeRenderer(window.contentLoader);
        
        // Load dynamic content into categories grid
        await window.knowledgeRenderer.renderSubjectsGrid('main-content');
        
        // Handle hash navigation
        window.addEventListener('hashchange', () => {
            window.knowledgeRenderer.handleHashChange();
        });
        
        // Handle initial hash if present
        if (window.location.hash) {
            window.knowledgeRenderer.handleHashChange();
        }
        
        console.log('✅ Content system initialized successfully');
        
    } catch (error) {
        console.error('❌ Failed to initialize content system:', error);
        // Fallback: show error in categories grid
        const categoriesGrid = document.getElementById('categories-grid');
        if (categoriesGrid) {
            categoriesGrid.innerHTML = `
                <div class="category-card error-state">
                    <div class="category-icon">❌</div>
                    <h3 class="category-title">Content System Error</h3>
                    <p class="category-description">Failed to load knowledge system. Please refresh the page.</p>
                    <button onclick="window.location.reload()" class="retry-button">🔄 Retry</button>
                </div>
            `;
        }
    }

    console.log('🏛️ Shivakali Ashram is ready to serve seekers of wisdom');
});

/**
 * Handle page visibility changes
 */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('👁️ Page hidden - pausing any animations');
    } else {
        console.log('👁️ Page visible - resuming normal operation');
    }
});

/**
 * Export for future module system
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ShivakaliApp, Utils, AppConfig };
}
