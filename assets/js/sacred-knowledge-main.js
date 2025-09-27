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