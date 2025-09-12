/**
 * SUB-CATEGORY CARD COMPONENT
 * Epic sub-category cards with stunning visuals and smooth interactions
 */

class SubCategoryCard {
    constructor(subCategory, parentCategory) {
        this.subCategory = subCategory;
        this.parentCategory = parentCategory;
        this.element = null;
        this.isExpanded = false;
    }

    /**
     * Create the sub-category card HTML structure
     */
    createElement() {
        const card = document.createElement('div');
        card.className = `sub-category-card ${this.subCategory.cardStyle || 'default-style'}`;
        card.setAttribute('data-subcategory-id', this.subCategory.id);
        
        // Apply gradient background
        card.style.background = this.subCategory.gradient;
        
        card.innerHTML = `
            <div class="sub-card-inner">
                <!-- Card Background Effects -->
                <div class="sub-card-background">
                    <div class="gradient-overlay"></div>
                    <div class="pattern-overlay"></div>
                    <div class="glow-effect"></div>
                </div>
                
                <!-- Main Card Content -->
                <div class="sub-card-content">
                    <!-- Header Section -->
                    <div class="sub-card-header">
                        <div class="sub-icon-group">
                            <span class="sub-main-icon">${this.subCategory.icon}</span>
                            <span class="sub-emoji-accent">${this.subCategory.emoji}</span>
                        </div>
                        <div class="sub-card-badge">
                            <div class="difficulty-badge">${this.subCategory.difficulty}</div>
                            <div class="content-count">${this.subCategory.contentCount}</div>
                        </div>
                    </div>
                    
                    <!-- Body Section -->
                    <div class="sub-card-body">
                        <h3 class="sub-card-title">${this.subCategory.title}</h3>
                        <h4 class="sub-card-subtitle">${this.subCategory.subtitle}</h4>
                        <div class="sub-card-description">
                            <p class="description-text">${this.subCategory.description}</p>
                        </div>
                        
                        <!-- Quick Stats -->
                        <div class="sub-card-stats">
                            <div class="stat-item">
                                <span class="stat-icon">⏱️</span>
                                <span class="stat-text">${this.subCategory.timeToMaster}</span>
                            </div>
                            <div class="stat-divider">•</div>
                            <div class="stat-item">
                                <span class="stat-icon">🎯</span>
                                <span class="stat-text">${this.subCategory.practicalApplications.length} applications</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Expandable Details Section -->
                    <div class="sub-card-details ${this.isExpanded ? 'expanded' : 'collapsed'}">
                        <!-- Key Topics Preview -->
                        <div class="key-topics-section">
                            <h5 class="section-title">🧠 Key Mastery Areas</h5>
                            <div class="topics-grid">
                                ${this.renderKeyTopics()}
                            </div>
                        </div>
                        
                        <!-- Practical Applications -->
                        <div class="applications-section">
                            <h5 class="section-title">⚡ Practical Applications</h5>
                            <div class="applications-list">
                                ${this.subCategory.practicalApplications.map(app => `
                                    <div class="application-item">
                                        <span class="app-bullet">▸</span>
                                        <span class="app-text">${app}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Unlocks Section -->
                        <div class="unlocks-section">
                            <h5 class="section-title">🔓 What You'll Unlock</h5>
                            <div class="unlocks-grid">
                                ${this.subCategory.unlocks.map(unlock => `
                                    <div class="unlock-item">
                                        <span class="unlock-icon">✨</span>
                                        <span class="unlock-text">${unlock}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Footer Actions -->
                    <div class="sub-card-footer">
                        <button class="expand-button" onclick="this.closest('.sub-category-card').querySelector('.sub-card-details').classList.toggle('expanded'); this.textContent = this.textContent.includes('More') ? 'Show Less Details ▲' : 'Show More Details ▼'">
                            Show More Details ▼
                        </button>
                        <button class="dive-deeper-button" onclick="SubCategoryCard.openDeepDive('${this.subCategory.id}', '${this.parentCategory.id}')">
                            <span class="button-icon">🚀</span>
                            <span class="button-text">DIVE DEEPER</span>
                            <span class="button-arrow">»</span>
                        </button>
                    </div>
                </div>
                
                <!-- Animated Border -->
                <div class="sub-card-border"></div>
            </div>
        `;
        
        this.element = card;
        this.attachEventListeners();
        return card;
    }

    /**
     * Render key topics in an organized grid
     */
    renderKeyTopics() {
        const maxPreview = 6; // Show first 6 topics
        const topics = this.subCategory.keyTopics.slice(0, maxPreview);
        
        return topics.map(topic => `
            <div class="topic-item">
                <span class="topic-bullet">🔸</span>
                <span class="topic-text">${topic}</span>
            </div>
        `).join('') + (this.subCategory.keyTopics.length > maxPreview ? `
            <div class="topic-item more-topics">
                <span class="topic-bullet">⋯</span>
                <span class="topic-text">+${this.subCategory.keyTopics.length - maxPreview} more advanced topics</span>
            </div>
        ` : '');
    }

    /**
     * Attach event listeners for interactions
     */
    attachEventListeners() {
        if (!this.element) return;

        // Hover effects
        this.element.addEventListener('mouseenter', () => {
            this.element.classList.add('hovered');
        });

        this.element.addEventListener('mouseleave', () => {
            this.element.classList.remove('hovered');
        });

        // Click effects
        this.element.addEventListener('click', (e) => {
            if (!e.target.closest('.sub-card-footer')) {
                this.element.classList.add('clicked');
                setTimeout(() => {
                    this.element.classList.remove('clicked');
                }, 200);
            }
        });

        // Touch support
        this.element.addEventListener('touchstart', () => {
            this.element.classList.add('touched');
        });

        this.element.addEventListener('touchend', () => {
            setTimeout(() => {
                this.element.classList.remove('touched');
            }, 150);
        });
    }

    /**
     * Static method to open deep dive view
     */
    static openDeepDive(subCategoryId, parentCategoryId) {
        console.log(`Opening deep dive for: ${subCategoryId} in ${parentCategoryId}`);
        
        // Create deep dive modal or navigate to detailed view
        const modal = document.createElement('div');
        modal.className = 'deep-dive-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <button class="modal-close" onclick="this.closest('.deep-dive-modal').remove()">×</button>
                <div class="deep-dive-content">
                    <h2>🚀 Deep Dive: ${subCategoryId}</h2>
                    <p>🔥 COMING SOON: Comprehensive deep-dive content system!</p>
                    <p>This will include:</p>
                    <ul>
                        <li>📚 Detailed study modules</li>
                        <li>🎯 Interactive exercises</li>
                        <li>📊 Progress tracking</li>
                        <li>💬 Community discussions</li>
                        <li>👨‍🏫 Expert guidance sessions</li>
                    </ul>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'flex';
    }

    /**
     * Get card element
     */
    getElement() {
        return this.element || this.createElement();
    }

    /**
     * Update card content dynamically
     */
    updateContent(newSubCategory) {
        this.subCategory = { ...this.subCategory, ...newSubCategory };
        if (this.element) {
            // Recreate element with new content
            const parent = this.element.parentNode;
            const newElement = this.createElement();
            if (parent) {
                parent.replaceChild(newElement, this.element);
            }
        }
    }

    /**
     * Animate card entrance
     */
    animateIn(delay = 0) {
        if (!this.element) return;
        
        this.element.style.opacity = '0';
        this.element.style.transform = 'translateY(30px) scale(0.95)';
        
        setTimeout(() => {
            this.element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            this.element.style.opacity = '1';
            this.element.style.transform = 'translateY(0) scale(1)';
        }, delay);
    }

    /**
     * Animate card exit
     */
    animateOut() {
        if (!this.element) return;
        
        return new Promise(resolve => {
            this.element.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 1, 1)';
            this.element.style.opacity = '0';
            this.element.style.transform = 'translateY(-20px) scale(0.95)';
            
            setTimeout(resolve, 400);
        });
    }
}

// Export for use in other components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SubCategoryCard;
} else if (typeof window !== 'undefined') {
    window.SubCategoryCard = SubCategoryCard;
}