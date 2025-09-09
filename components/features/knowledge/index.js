/**
 * SHIVAKALI ASHRAM - Knowledge Display Component
 * Renders subjects, articles, and knowledge content dynamically
 */

class KnowledgeRenderer {
    constructor(contentLoader) {
        this.contentLoader = contentLoader;
        this.currentView = 'subjects';
        this.currentSubject = null;
        this.currentArticle = null;
        this.init();
    }

    /**
     * Initialize the knowledge renderer
     */
    init() {
        console.log('📚 Initializing Knowledge Renderer...');
    }

    /**
     * Render the main subjects grid
     */
    async renderSubjectsGrid(containerId = 'categories-grid') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`❌ Container ${containerId} not found`);
            return;
        }

        try {
            // Show loading state
            container.innerHTML = this.createLoadingCard();

            // Load subjects
            const subjects = await this.contentLoader.getSubjects();
            
            if (subjects.length === 0) {
                container.innerHTML = this.createEmptyState('No subjects available');
                return;
            }

            // Render subjects
            const subjectsHTML = subjects.map(subject => this.createSubjectCard(subject)).join('');
            container.innerHTML = subjectsHTML;

            console.log(`✅ Rendered ${subjects.length} subjects`);

        } catch (error) {
            console.error('❌ Failed to render subjects grid:', error);
            container.innerHTML = this.createErrorState('Failed to load knowledge subjects');
        }
    }

    /**
     * Create HTML for a subject card
     */
    createSubjectCard(subject) {
        const iconMap = {
            'star': '⭐',
            'brain': '🧠',
            'energy': '⚡',
            'heart': '❤️',
            'eye': '👁️',
            'book': '📚'
        };

        const icon = iconMap[subject.icon] || '🕉️';
        const availabilityClass = subject.available !== false ? '' : 'unavailable';
        const stats = subject.meta ? subject.meta.totalArticles : 0;
        const readTime = subject.meta ? subject.meta.estimatedTime : 'Unknown';

        return `
            <div class="category-card ${subject.id}-card ${availabilityClass}" 
                 onclick="knowledgeRenderer.openSubject('${subject.id}')"
                 data-subject="${subject.id}">
                <div class="category-icon">${icon}</div>
                <h3 class="category-title">${subject.title}</h3>
                <p class="category-subtitle">${subject.description}</p>
                <p class="category-description">
                    ${subject.spiritual?.purpose || 'Explore the profound teachings of this spiritual tradition.'}
                </p>
                <div class="category-stats">
                    <div class="stat-item">
                        <div class="stat-number">${stats}</div>
                        <div class="stat-label">Articles</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${subject.spiritual?.antiquity || readTime}</div>
                        <div class="stat-label">${subject.spiritual?.antiquity ? 'History' : 'Read Time'}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${subject.available !== false ? '✅' : '⏳'}</div>
                        <div class="stat-label">${subject.available !== false ? 'Ready' : 'Soon'}</div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Open a subject and show its articles
     */
    async openSubject(subjectId) {
        console.log(`📖 Opening subject: ${subjectId}`);
        
        try {
            this.currentSubject = subjectId;
            this.currentView = 'subject';
            
            // Update URL hash
            window.location.hash = `subject=${subjectId}`;
            
            // Load subject and articles
            const subject = await this.contentLoader.getSubjectMeta(subjectId);
            const articles = await this.contentLoader.getSubjectArticles(subjectId);
            
            // Render subject view
            this.renderSubjectView(subject, articles);
            
        } catch (error) {
            console.error(`❌ Failed to open subject ${subjectId}:`, error);
            this.showErrorMessage(`Failed to load ${subjectId} content`);
        }
    }

    /**
     * Render the subject detail view with articles
     */
    renderSubjectView(subject, articles) {
        // Create subject page HTML
        const subjectHTML = `
            <div class="subject-page">
                <!-- Subject Header -->
                <div class="subject-header">
                    <button class="back-button" onclick="knowledgeRenderer.goBack()">
                        ← Back to All Subjects
                    </button>
                    <div class="subject-hero">
                        <h1 class="subject-title">${subject.title}</h1>
                        <p class="subject-description">${subject.description}</p>
                        <div class="subject-meta">
                            <span class="subject-tradition">📿 Tradition: ${subject.spiritual?.tradition || 'Vedic'}</span>
                            <span class="subject-articles">📚 ${articles.length} Articles</span>
                            <span class="subject-time">⏱️ ${subject.meta?.estimatedTime || '30 minutes'}</span>
                        </div>
                    </div>
                </div>
                
                <!-- Articles Grid -->
                <div class="articles-section">
                    <h2>📖 Articles & Teachings</h2>
                    <div class="articles-grid">
                        ${articles.map(article => this.createArticleCard(article)).join('')}
                    </div>
                </div>
            </div>
        `;

        // Replace main container content
        const mainContainer = document.querySelector('.container');
        if (mainContainer) {
            mainContainer.innerHTML = subjectHTML;
            window.scrollTo(0, 0);
        }
    }

    /**
     * Create HTML for an article card
     */
    createArticleCard(article) {
        const availabilityClass = article.available !== false ? '' : 'unavailable';
        const difficultyIcon = {
            'beginner': '🌱',
            'intermediate': '🌿', 
            'advanced': '🌳'
        };

        return `
            <div class="article-card ${availabilityClass}"
                 onclick="knowledgeRenderer.openArticle('${this.currentSubject}', '${article.id}')"
                 data-article="${article.id}">
                <div class="article-header">
                    <h3 class="article-title">${article.title}</h3>
                    <div class="article-meta">
                        <span class="difficulty">${difficultyIcon[article.meta?.difficulty] || '📖'}</span>
                        <span class="read-time">${article.meta?.readTime || 'Unknown'}</span>
                    </div>
                </div>
                <p class="article-summary">${article.summary}</p>
                <div class="article-footer">
                    <span class="article-author">by ${article.meta?.author || 'Acharya Anish'}</span>
                    <span class="article-status">${article.available !== false ? '✅ Ready' : '⏳ Coming Soon'}</span>
                </div>
            </div>
        `;
    }

    /**
     * Open and render a specific article
     */
    async openArticle(subjectId, articleId) {
        if (!articleId) return;
        
        console.log(`📄 Opening article: ${subjectId}/${articleId}`);
        
        try {
            this.currentArticle = articleId;
            this.currentView = 'article';
            
            // Update URL hash
            window.location.hash = `subject=${subjectId}&article=${articleId}`;
            
            // Load article content
            const article = await this.contentLoader.getArticle(subjectId, articleId);
            
            // Render article view
            this.renderArticleView(article, subjectId);
            
        } catch (error) {
            console.error(`❌ Failed to open article ${articleId}:`, error);
            this.showErrorMessage(`Failed to load article: ${articleId}`);
        }
    }

    /**
     * Render the article detail view
     */
    renderArticleView(article, subjectId) {
        const sectionsHTML = article.content.sections?.map(section => `
            <div class="article-section">
                <h3 class="section-heading">${section.heading}</h3>
                <div class="section-content">
                    <p>${section.content}</p>
                    ${section.subsections ? section.subsections.map(sub => `
                        <div class="subsection">
                            <h4 class="subsection-heading">${sub.heading}</h4>
                            <p>${sub.content}</p>
                        </div>
                    `).join('') : ''}
                </div>
            </div>
        `).join('') || '';

        const articleHTML = `
            <div class="article-page">
                <!-- Navigation -->
                <div class="article-nav">
                    <button class="back-button" onclick="knowledgeRenderer.goBack()">
                        ← Back to ${this.currentSubject}
                    </button>
                </div>
                
                <!-- Article Header -->
                <article class="article-content">
                    <header class="article-header">
                        <h1 class="article-title">${article.title}</h1>
                        ${article.subtitle ? `<p class="article-subtitle">${article.subtitle}</p>` : ''}
                        <div class="article-meta">
                            <span>📝 ${article.meta?.author || 'Acharya Anish'}</span>
                            <span>⏱️ ${article.meta?.readTime || 'Unknown'}</span>
                            <span>📊 ${article.meta?.difficulty || 'Beginner'}</span>
                        </div>
                    </header>
                    
                    <!-- Introduction -->
                    <div class="article-introduction">
                        <p class="article-summary">${article.summary}</p>
                        <p>${article.content.introduction}</p>
                    </div>
                    
                    <!-- Main Content -->
                    <div class="article-body">
                        ${sectionsHTML}
                    </div>
                    
                    <!-- Conclusion -->
                    ${article.content.conclusion ? `
                        <div class="article-conclusion">
                            <h3>Conclusion</h3>
                            <p>${article.content.conclusion}</p>
                        </div>
                    ` : ''}
                    
                    <!-- Resources -->
                    ${article.resources ? this.createResourcesSection(article.resources) : ''}
                </article>
            </div>
        `;

        // Replace main container content
        const mainContainer = document.querySelector('.container');
        if (mainContainer) {
            mainContainer.innerHTML = articleHTML;
            window.scrollTo(0, 0);
        }
    }

    /**
     * Create resources section HTML
     */
    createResourcesSection(resources) {
        return `
            <div class="article-resources">
                <h3>📚 Resources & Further Study</h3>
                
                ${resources.references?.length ? `
                    <div class="references">
                        <h4>References</h4>
                        <ul>
                            ${resources.references.map(ref => `
                                <li><strong>${ref.title}</strong> by ${ref.author} (${ref.type})</li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${resources.practicalExercises?.length ? `
                    <div class="exercises">
                        <h4>Practical Exercises</h4>
                        <ul>
                            ${resources.practicalExercises.map(ex => `<li>${ex}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;
    }

    /**
     * Go back to previous view
     */
    goBack() {
        if (this.currentView === 'article') {
            this.openSubject(this.currentSubject);
        } else if (this.currentView === 'subject') {
            this.renderMainPage();
        }
    }

    /**
     * Render main page (subjects grid)
     */
    renderMainPage() {
        this.currentView = 'subjects';
        this.currentSubject = null;
        this.currentArticle = null;
        window.location.hash = '';
        
        // Reload the original page content
        window.location.reload();
    }

    /**
     * Handle URL hash changes for navigation
     */
    handleHashChange() {
        const hash = window.location.hash.slice(1);
        const params = new URLSearchParams(hash);
        
        const subject = params.get('subject');
        const article = params.get('article');
        
        if (article && subject) {
            this.openArticle(subject, article);
        } else if (subject) {
            this.openSubject(subject);
        }
    }

    /**
     * Show error message
     */
    showErrorMessage(message) {
        const container = document.querySelector('.container');
        if (container) {
            container.innerHTML = this.createErrorState(message);
        }
    }

    /**
     * Create loading card HTML
     */
    createLoadingCard() {
        return `
            <div class="category-card loading-card">
                <div class="category-icon">⏳</div>
                <h3 class="category-title">Loading...</h3>
                <p class="category-description">Loading spiritual knowledge...</p>
            </div>
        `;
    }

    /**
     * Create empty state HTML
     */
    createEmptyState(message) {
        return `
            <div class="category-card empty-state">
                <div class="category-icon">📚</div>
                <h3 class="category-title">No Content Available</h3>
                <p class="category-description">${message}</p>
            </div>
        `;
    }

    /**
     * Create error state HTML
     */
    createErrorState(message) {
        return `
            <div class="category-card error-state">
                <div class="category-icon">❌</div>
                <h3 class="category-title">Error Loading Content</h3>
                <p class="category-description">${message}</p>
                <button onclick="window.location.reload()" class="retry-button">
                    🔄 Retry
                </button>
            </div>
        `;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KnowledgeRenderer;
} else if (typeof window !== 'undefined') {
    window.KnowledgeRenderer = KnowledgeRenderer;
}
