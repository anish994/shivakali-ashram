/**
 * ContentLoader.js - Handles loading and managing sacred knowledge content
 */

class ContentLoader {
    constructor() {
        this.content = null;
        this.initialized = false;
    }

    /**
     * Initialize the content loader
     */
    async init() {
        try {
            // Load config.json which contains category data
            const response = await fetch('./knowledge/config.json');
            if (!response.ok) {
                throw new Error('Failed to load content configuration');
            }

            this.content = await response.json();
            this.initialized = true;
            
            console.log('✨ Content Loader initialized with', {
                categories: this.content.mainCategories.length,
                features: Object.keys(this.content.features).length
            });

            return true;
        } catch (error) {
            console.error('❌ Content Loader initialization failed:', error);
            throw error;
        }
    }

    /**
     * Get all main categories
     */
    getMainCategories() {
        if (!this.initialized) {
            throw new Error('Content Loader not initialized');
        }
        return this.content.mainCategories;
    }

    /**
     * Get a specific category by ID
     */
    getCategory(categoryId) {
        return this.content.mainCategories.find(cat => cat.id === categoryId);
    }

    /**
     * Get features configuration
     */
    getFeatures() {
        return this.content.features;
    }

    /**
     * Get UI configuration
     */
    getUIConfig() {
        return this.content.ui;
    }
}