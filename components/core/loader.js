/**
 * SHIVAKALI ASHRAM - Core Content Loader
 * Handles dynamic loading of knowledge configuration and content files
 */

class ContentLoader {
    constructor() {
        this.config = null;
        this.subjects = new Map();
        this.articles = new Map();
        this.cache = new Map();
        this.loadingPromises = new Map();
    }

    /**
     * Initialize the content system by loading master configuration
     */
    async init() {
        console.log('🕉️ Initializing Shivakali Ashram Content System...');
        
        try {
            this.config = await this.loadJSON('knowledge/config.json');
            console.log('✅ Master configuration loaded:', this.config.subjects.length, 'subjects available');
            return this.config;
        } catch (error) {
            console.error('❌ Failed to load master configuration:', error);
            throw new Error('Content system initialization failed');
        }
    }

    /**
     * Load and parse JSON file with error handling and caching
     */
    async loadJSON(path) {
        // Check cache first
        if (this.cache.has(path)) {
            return this.cache.get(path);
        }

        // Check if already loading to prevent duplicate requests
        if (this.loadingPromises.has(path)) {
            return this.loadingPromises.get(path);
        }

        // Start loading
        const loadPromise = this._fetchJSON(path);
        this.loadingPromises.set(path, loadPromise);

        try {
            const data = await loadPromise;
            this.cache.set(path, data);
            this.loadingPromises.delete(path);
            return data;
        } catch (error) {
            this.loadingPromises.delete(path);
            throw error;
        }
    }

    /**
     * Internal JSON fetching with proper error handling
     */
    async _fetchJSON(path) {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log(`📖 Loaded: ${path}`);
            return data;
        } catch (error) {
            console.error(`❌ Failed to load ${path}:`, error);
            throw new Error(`Failed to load content from ${path}: ${error.message}`);
        }
    }

    /**
     * Get all available subjects with their metadata
     */
    async getSubjects() {
        if (!this.config) {
            await this.init();
        }

        const subjects = [];
        for (const subjectConfig of this.config.subjects) {
            if (subjectConfig.enabled) {
                try {
                    const subjectMeta = await this.getSubjectMeta(subjectConfig.id);
                    subjects.push({
                        ...subjectConfig,
                        ...subjectMeta
                    });
                } catch (error) {
                    console.warn(`⚠️ Failed to load subject ${subjectConfig.id}:`, error);
                    // Include subject in list but mark as unavailable
                    subjects.push({
                        ...subjectConfig,
                        available: false,
                        error: error.message
                    });
                }
            }
        }

        return subjects;
    }

    /**
     * Load subject metadata
     */
    async getSubjectMeta(subjectId) {
        const cacheKey = `subject-meta-${subjectId}`;
        if (this.subjects.has(cacheKey)) {
            return this.subjects.get(cacheKey);
        }

        try {
            const metaPath = `knowledge/subjects/${subjectId}/meta.json`;
            const metadata = await this.loadJSON(metaPath);
            metadata.available = true;
            
            this.subjects.set(cacheKey, metadata);
            return metadata;
        } catch (error) {
            console.error(`❌ Failed to load metadata for subject ${subjectId}:`, error);
            throw error;
        }
    }

    /**
     * Load all articles for a specific subject
     */
    async getSubjectArticles(subjectId) {
        const cacheKey = `articles-${subjectId}`;
        if (this.articles.has(cacheKey)) {
            return this.articles.get(cacheKey);
        }

        try {
            const subjectMeta = await this.getSubjectMeta(subjectId);
            const articles = [];

            for (const articleId of subjectMeta.articles.articles) {
                try {
                    const articlePath = `knowledge/subjects/${subjectId}/articles/${articleId}.json`;
                    const articleData = await this.loadJSON(articlePath);
                    articles.push(articleData);
                } catch (error) {
                    console.warn(`⚠️ Failed to load article ${articleId}:`, error);
                    // Add placeholder for missing article
                    articles.push({
                        id: articleId,
                        title: `Article: ${articleId}`,
                        summary: 'This article is currently unavailable.',
                        available: false,
                        error: error.message
                    });
                }
            }

            this.articles.set(cacheKey, articles);
            return articles;
        } catch (error) {
            console.error(`❌ Failed to load articles for subject ${subjectId}:`, error);
            throw error;
        }
    }

    /**
     * Load a specific article by subject and article ID
     */
    async getArticle(subjectId, articleId) {
        const cacheKey = `article-${subjectId}-${articleId}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            const articlePath = `knowledge/subjects/${subjectId}/articles/${articleId}.json`;
            const article = await this.loadJSON(articlePath);
            return article;
        } catch (error) {
            console.error(`❌ Failed to load article ${subjectId}/${articleId}:`, error);
            throw error;
        }
    }

    /**
     * Search across all loaded content
     */
    async searchContent(query, options = {}) {
        const { 
            subjectId = null, 
            maxResults = 20, 
            minScore = 0.3 
        } = options;

        const results = [];
        const searchTerm = query.toLowerCase();

        try {
            // Get subjects to search
            const subjects = subjectId ? 
                [await this.getSubjectMeta(subjectId)] : 
                await this.getSubjects();

            for (const subject of subjects) {
                if (!subject.available) continue;

                // Search subject metadata
                const subjectScore = this._calculateSearchScore(searchTerm, subject);
                if (subjectScore >= minScore) {
                    results.push({
                        type: 'subject',
                        id: subject.id,
                        title: subject.title,
                        description: subject.description,
                        score: subjectScore,
                        url: `#subject=${subject.id}`
                    });
                }

                // Search articles within subject
                try {
                    const articles = await this.getSubjectArticles(subject.id);
                    for (const article of articles) {
                        if (!article.available) continue;

                        const articleScore = this._calculateSearchScore(searchTerm, article);
                        if (articleScore >= minScore) {
                            results.push({
                                type: 'article',
                                id: article.id,
                                subject: subject.id,
                                subjectTitle: subject.title,
                                title: article.title,
                                summary: article.summary,
                                score: articleScore,
                                readTime: article.meta?.readTime || 'Unknown',
                                url: `#subject=${subject.id}&article=${article.id}`
                            });
                        }
                    }
                } catch (error) {
                    console.warn(`⚠️ Failed to search articles in ${subject.id}:`, error);
                }
            }

            // Sort by score and limit results
            results.sort((a, b) => b.score - a.score);
            return results.slice(0, maxResults);

        } catch (error) {
            console.error('❌ Search failed:', error);
            return [];
        }
    }

    /**
     * Calculate search relevance score
     */
    _calculateSearchScore(searchTerm, item) {
        let score = 0;

        // Title match (highest weight)
        if (item.title?.toLowerCase().includes(searchTerm)) {
            score += 1.0;
        }

        // Description/summary match
        if (item.description?.toLowerCase().includes(searchTerm) || 
            item.summary?.toLowerCase().includes(searchTerm)) {
            score += 0.7;
        }

        // Keywords match
        if (item.classification?.keywords?.some(keyword => 
            keyword.toLowerCase().includes(searchTerm))) {
            score += 0.5;
        }

        // Tags match
        if (item.classification?.tags?.some(tag => 
            tag.toLowerCase().includes(searchTerm))) {
            score += 0.4;
        }

        return score;
    }

    /**
     * Get content statistics
     */
    async getStats() {
        try {
            const subjects = await this.getSubjects();
            let totalArticles = 0;
            let availableSubjects = 0;

            for (const subject of subjects) {
                if (subject.available) {
                    availableSubjects++;
                    totalArticles += subject.meta?.totalArticles || 0;
                }
            }

            return {
                totalSubjects: subjects.length,
                availableSubjects,
                totalArticles,
                cacheSize: this.cache.size,
                lastUpdated: new Date().toISOString()
            };
        } catch (error) {
            console.error('❌ Failed to get content statistics:', error);
            return {
                totalSubjects: 0,
                availableSubjects: 0,
                totalArticles: 0,
                cacheSize: this.cache.size,
                error: error.message
            };
        }
    }

    /**
     * Clear cache for fresh loading
     */
    clearCache() {
        this.cache.clear();
        this.subjects.clear();
        this.articles.clear();
        this.loadingPromises.clear();
        console.log('🧹 Content cache cleared');
    }

    /**
     * Preload critical content for better performance
     */
    async preload() {
        try {
            console.log('🚀 Preloading critical content...');
            await this.getSubjects();
            console.log('✅ Critical content preloaded successfully');
        } catch (error) {
            console.error('❌ Preloading failed:', error);
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentLoader;
} else if (typeof window !== 'undefined') {
    window.ContentLoader = ContentLoader;
}
