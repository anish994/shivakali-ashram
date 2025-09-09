/**
 * main-cards.js - Bootstrap script for initializing main category cards
 * Initializes the CardGrid and renders all category cards
 */

// Global CardGrid instance
let categoryCardsGrid = null;

/**
 * Initialize the main category cards system
 */
async function initMainCards() {
    console.log('🚀 Initializing Shivakali Ashram Category Cards...');

    try {
        // Create CardGrid instance
        categoryCardsGrid = new CardGrid('main-content');
        
        // Initialize the grid
        await categoryCardsGrid.init();
        
        // Add global references for debugging
        window.categoryCardsGrid = categoryCardsGrid;
        
        // Log success stats
        const stats = categoryCardsGrid.getStats();
        console.log('✅ Category Cards initialized successfully!', {
            totalCards: stats.totalCards,
            enabledCards: stats.enabledCards,
            totalSubCategories: stats.totalSubCategories
        });

        // Add custom event for app readiness
        window.dispatchEvent(new CustomEvent('categoryCardsReady', { detail: stats }));

    } catch (error) {
        console.error('❌ Failed to initialize category cards:', error);
        
        // Show fallback content
        showFallbackContent();
        
        // Dispatch error event
        window.dispatchEvent(new CustomEvent('categoryCardsError', { detail: error.message }));
    }
}

/**
 * Show fallback content when cards fail to load
 */
function showFallbackContent() {
    const container = document.getElementById('main-content');
    if (!container) return;

    container.innerHTML = `
        <div class="fallback-content">
            <div class="fallback-inner">
                <h1>🕉️ Shivakali Ashram</h1>
                <p>Sacred Knowledge Gateway</p>
                <div class="fallback-message">
                    <p>🔄 Unable to load dynamic content. Please refresh the page or check your connection.</p>
                    <button onclick="location.reload()" class="retry-button">
                        🔄 Refresh Page
                    </button>
                </div>
                <div class="fallback-categories">
                    <h3>Available Knowledge Areas:</h3>
                    <ul>
                        <li>🌟 Jyotish Mastery - Vedic Astrology</li>
                        <li>🔥 Tantra Sciences - Sacred Energy Work</li>
                        <li>🧠 Consciousness Studies - Meditation & Awareness</li>
                        <li>🛡️ Therapeutic Systems - Holistic Healing</li>
                        <li>🎭 Character Analysis - Personality Mastery</li>
                        <li>🔮 Divination Sciences - Oracle Wisdom</li>
                        <li>📚 Foundational Systems - Core Principles</li>
                        <li>⚡ Advanced Practices - Mastery & Transcendence</li>
                        <li>🌸 Spiritual Lifestyle - Sacred Living</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

/**
 * Add category cards event listeners
 */
function addCategoryCardsEventListeners() {
    // Listen for card clicks and interactions
    document.addEventListener('click', (e) => {
        const categoryCard = e.target.closest('.category-card');
        if (categoryCard) {
            const categoryId = categoryCard.getAttribute('data-category-id');
            console.log(`Category card clicked: ${categoryId}`);
            
            // Add analytics or tracking here if needed
            trackCategoryClick(categoryId);
        }
    });

    // Listen for app readiness
    window.addEventListener('categoryCardsReady', (e) => {
        console.log('🎉 Category cards are ready!', e.detail);
        
        // Add any post-initialization logic here
        addEnhancedInteractions();
        startPerformanceMonitoring();
    });

    // Listen for errors
    window.addEventListener('categoryCardsError', (e) => {
        console.error('⚠️ Category cards error:', e.detail);
        
        // Add error tracking or reporting here
        trackError('category_cards_init_error', e.detail);
    });
}

/**
 * Track category card clicks for analytics
 */
function trackCategoryClick(categoryId) {
    // Placeholder for analytics tracking
    console.log(`📊 Analytics: Category ${categoryId} clicked`);
    
    // Example: Google Analytics event
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'category_click', {
    //         'category_id': categoryId,
    //         'event_category': 'navigation'
    //     });
    // }
}

/**
 * Track errors for monitoring
 */
function trackError(errorType, errorMessage) {
    // Placeholder for error tracking
    console.log(`🚨 Error tracked: ${errorType} - ${errorMessage}`);
    
    // Example: Sentry error tracking
    // if (typeof Sentry !== 'undefined') {
    //     Sentry.captureException(new Error(`${errorType}: ${errorMessage}`));
    // }
}

/**
 * Add enhanced interactions after cards are loaded
 */
function addEnhancedInteractions() {
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Press '1'-'9' to navigate to categories
        const numKey = parseInt(e.key);
        if (numKey >= 1 && numKey <= 9 && !e.ctrlKey && !e.altKey) {
            const cards = document.querySelectorAll('.category-card');
            const targetCard = cards[numKey - 1];
            if (targetCard) {
                targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                targetCard.focus();
            }
        }
    });

    // Add scroll-based animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-viewport');
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.category-card').forEach(card => {
        observer.observe(card);
    });
}

/**
 * Start performance monitoring
 */
function startPerformanceMonitoring() {
    // Monitor card rendering performance
    const renderTime = performance.now() - window.appStartTime;
    console.log(`⚡ Cards rendered in ${renderTime.toFixed(2)}ms`);
    
    // Monitor memory usage if available
    if (performance.memory) {
        console.log('💾 Memory usage:', {
            used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) + 'MB',
            total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024) + 'MB'
        });
    }
}

/**
 * DOM Content Loaded handler
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM loaded, initializing category cards...');
    
    // Record app start time for performance monitoring
    window.appStartTime = performance.now();
    
    // Add event listeners
    addCategoryCardsEventListeners();
    
    // Initialize cards
    initMainCards();
});

/**
 * Export functions for global access
 */
window.ShivakaliAshram = {
    initMainCards,
    categoryCardsGrid: () => categoryCardsGrid,
    showFallbackContent,
    trackCategoryClick,
    trackError
};
