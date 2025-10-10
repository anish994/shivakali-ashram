/**
 * 🕉️ SACRED KNOWLEDGE HUB - Main Integration
 */

// Initialize once DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🕉️ Initializing Sacred Knowledge System...');
    
    try {
        // Initialize content loader
        window.contentLoader = new ContentLoader();
        await window.contentLoader.init();

        // Initialize knowledge renderer
        window.knowledgeRenderer = new KnowledgeRenderer(window.contentLoader);
        await window.knowledgeRenderer.renderSubjectsGrid('main-content');

        console.log('✨ Sacred Knowledge System initialized successfully');
    } catch (error) {
        console.error('❌ Failed to initialize Sacred Knowledge System:', error);
        
        // Show error message to user
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.innerHTML = `
                <div style="text-align: center; padding: 4rem 2rem; color: var(--sacred-gold);">
                    <h2>🕉️ Sacred Knowledge Gateway</h2>
                    <p style="margin: 2rem 0; color: var(--sacred-cream);">Unable to load knowledge cards. Please refresh the page.</p>
                    <button onclick="location.reload()" style="padding: 1rem 2rem; background: var(--sacred-gold); color: var(--deep-void); border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: 600;">🔄 Refresh Page</button>
                </div>
            `;
        }
    }
    
    // Handle deep linking
    const hash = window.location.hash;
    if (hash) {
        const [type, id] = hash.slice(1).split('-');
        if (type && id) {
            // Handle navigation to specific section
            console.log(`🔍 Deep linking to ${type}: ${id}`);
            // Implementation pending...
        }
    }
});

// Handle back/forward navigation
window.addEventListener('popstate', (event) => {
    if (window.sacredKnowledgeHub) {
        const hash = window.location.hash;
        // Handle navigation state
        console.log(`⚡ Navigation state change: ${hash}`);
        // Implementation pending...
    }
});