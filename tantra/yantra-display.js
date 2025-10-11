// ===== YANTRA DISPLAY & RENDERING FUNCTIONS =====
// Mobile-optimized, beautiful UI for all content sections

// ===== GALLERY RENDERING =====
function generateAllCategories() {
    if (typeof completeYantraLibrary === 'undefined') return '';
    
    let html = '';
    
    // Planetary Yantras
    html += generateCategorySection(
        '🪐 Navagraha - Planetary Yantras',
        'Nine cosmic forces that shape destiny',
        completeYantraLibrary.planetary,
        'planetary',
        'violet'
    );
    
    // Deity Yantras
    html += generateCategorySection(
        '🕉️ Deity Yantras',
        'Divine forms for worship and meditation',
        completeYantraLibrary.deity,
        'deity',
        'amber'
    );
    
    // Specialized Yantras
    html += generateCategorySection(
        '⚡ Specialized Purpose Yantras',
        'Targeted solutions for specific needs',
        completeYantraLibrary.specialized,
        'specialized',
        'pink'
    );
    
    // Chakra Yantras
    html += generateCategorySection(
        '🌈 Chakra Yantras',
        'Seven energy centers of consciousness',
        completeYantraLibrary.chakra,
        'chakra',
        'green'
    );
    
    // Directional Yantras
    html += generateCategorySection(
        '🧭 Directional Guardians (Dikpala)',
        'Ten directions protected by cosmic guardians',
        completeYantraLibrary.directional,
        'directional',
        'blue'
    );
    
    // Master Yantras
    html += generateCategorySection(
        '👑 Master Yantras',
        'Advanced practices for spiritual mastery',
        completeYantraLibrary.master,
        'master',
        'yellow'
    );
    
    // Forbidden Yantras Warning
    html += `
        <div class="bg-red-900/20 border-2 border-red-600/50 rounded-xl p-6 sm:p-8 backdrop-blur-sm animate-pulse-slow">
            <div class="text-center space-y-4">
                <h2 class="text-3xl sm:text-4xl font-bold text-red-400 flex items-center justify-center gap-3">
                    <span>⚠️</span>
                    <span style="font-family: var(--heading-font);">Forbidden & Dangerous Yantras</span>
                    <span>⚠️</span>
                </h2>
                <p class="text-lg sm:text-xl text-red-300 max-w-2xl mx-auto">
                    EXTREME CAUTION: These yantras involve dark practices with severe karmic consequences
                </p>
                <p class="text-red-400 font-semibold">
                    Educational awareness only - See Forbidden Arts section for details
                </p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                ${completeYantraLibrary.forbidden.map(yantra => `
                    <div class="bg-red-950/40 p-4 rounded-lg border border-red-800/50 hover:border-red-600 transition">
                        <h3 class="text-xl font-bold text-red-300 mb-2">${yantra.name}</h3>
                        <p class="text-sm text-red-400 mb-2"><strong>Purpose:</strong> ${yantra.purpose}</p>
                        <p class="text-xs text-red-500"><strong>Danger:</strong> ${yantra.danger}</p>
                        <p class="text-xs text-red-600 font-bold mt-2">⚠️ ${yantra.warning}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    return html;
}

function generateCategorySection(title, subtitle, yantras, type, color) {
    const colorMap = {
        violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400', glow: 'rgba(139, 92, 246, 0.3)' },
        amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', glow: 'rgba(245, 158, 11, 0.3)' },
        pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-400', glow: 'rgba(236, 72, 153, 0.3)' },
        green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', glow: 'rgba(34, 197, 94, 0.3)' },
        blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', glow: 'rgba(59, 130, 246, 0.3)' },
        yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', glow: 'rgba(234, 179, 8, 0.3)' }
    };
    
    const colors = colorMap[color] || colorMap.violet;
    
    return `
        <div class="space-y-6 animate-slideIn">
            <div class="text-center ${colors.bg} ${colors.border} border rounded-xl p-6 backdrop-blur-sm">
                <h2 class="text-3xl sm:text-4xl font-bold ${colors.text} mb-2" style="font-family: var(--heading-font);">
                    ${title}
                </h2>
                <p class="text-base sm:text-lg text-gray-300">${subtitle}</p>
                <p class="text-sm text-gray-400 mt-2">${yantras.length} Yantras</p>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                ${yantras.map((yantra, idx) => generateYantraCard(yantra, type, colors, idx)).join('')}
            </div>
        </div>
    `;
}

function generateYantraCard(yantra, type, colors, index) {
    let cardContent = `
        <div class="bg-gray-800/60 backdrop-blur-md rounded-xl p-4 sm:p-6 border ${colors.border} hover:${colors.bg} 
                    transition-all duration-300 transform hover:scale-105 hover:shadow-2xl 
                    animate-fadeIn" 
             style="animation-delay: ${index * 50}ms; box-shadow: 0 4px 20px ${colors.glow};">
    `;
    
    switch(type) {
        case 'planetary':
            cardContent += `
                <h3 class="text-xl sm:text-2xl font-bold text-white mb-3">${yantra.name}</h3>
                <div class="space-y-2 text-sm sm:text-base">
                    <p class="text-gray-300"><span class="font-semibold ${colors.text}">Deity:</span> ${yantra.deity}</p>
                    <p class="text-gray-400"><strong>Purpose:</strong> ${yantra.purpose}</p>
                    <p class="text-purple-400 text-xs sm:text-sm mt-3"><strong>Mantra:</strong> ${yantra.mantra}</p>
                    <div class="flex items-center gap-2 mt-3">
                        <span class="px-3 py-1 rounded-full text-xs ${colors.bg} ${colors.text} border ${colors.border}">
                            ${yantra.grid}
                        </span>
                        <span class="px-3 py-1 rounded-full text-xs bg-gray-700/50 text-gray-300">
                            ${yantra.color}
                        </span>
                    </div>
                </div>
            `;
            break;
            
        case 'deity':
            cardContent += `
                <h3 class="text-xl sm:text-2xl font-bold text-white mb-3">${yantra.name}</h3>
                <div class="space-y-2 text-sm sm:text-base">
                    <p class="text-gray-300"><span class="font-semibold ${colors.text}">Deity:</span> ${yantra.deity}</p>
                    <p class="text-gray-400"><strong>Purpose:</strong> ${yantra.purpose}</p>
                    ${yantra.benefits ? `<p class="text-green-400 text-xs sm:text-sm mt-2">✨ <strong>Benefits:</strong> ${yantra.benefits}</p>` : ''}
                    ${yantra.mantra ? `<p class="text-purple-400 text-xs mt-3"><strong>Mantra:</strong> ${yantra.mantra}</p>` : ''}
                    ${yantra.warning ? `<p class="text-red-400 text-xs mt-2">⚠️ ${yantra.warning}</p>` : ''}
                </div>
            `;
            break;
            
        case 'specialized':
            cardContent += `
                <h3 class="text-xl sm:text-2xl font-bold text-white mb-3">${yantra.name}</h3>
                <div class="space-y-2 text-sm sm:text-base">
                    <p class="text-gray-300"><span class="font-semibold ${colors.text}">Type:</span> ${yantra.type}</p>
                    <p class="text-gray-400"><strong>Purpose:</strong> ${yantra.purpose}</p>
                    <p class="text-green-400 text-sm mt-2">✨ ${yantra.benefit}</p>
                    ${yantra.warning ? `<p class="text-red-400 text-xs mt-2">⚠️ ${yantra.warning}</p>` : ''}
                </div>
            `;
            break;
            
        case 'chakra':
            cardContent += `
                <h3 class="text-xl sm:text-2xl font-bold text-white mb-3">${yantra.name}</h3>
                <div class="space-y-2 text-sm sm:text-base">
                    <p class="text-gray-300"><span class="font-semibold ${colors.text}">Chakra:</span> ${yantra.chakra}</p>
                    <p class="text-gray-400"><strong>Element:</strong> ${yantra.element}</p>
                    <div class="flex items-center gap-2 mt-2">
                        <span class="px-3 py-1 rounded-full text-xs bg-${yantra.color.toLowerCase()}-500/20 text-${yantra.color.toLowerCase()}-400 border border-${yantra.color.toLowerCase()}-500/30">
                            ${yantra.color}
                        </span>
                        <span class="px-3 py-1 rounded-full text-xs ${colors.bg} ${colors.text}">
                            ${yantra.bija}
                        </span>
                    </div>
                    <p class="text-gray-400 text-sm mt-2">${yantra.purpose}</p>
                </div>
            `;
            break;
            
        case 'directional':
            cardContent += `
                <h3 class="text-xl sm:text-2xl font-bold text-white mb-3">${yantra.name}</h3>
                <div class="space-y-2 text-sm sm:text-base">
                    <p class="text-gray-300"><span class="font-semibold ${colors.text}">Direction:</span> ${yantra.direction}</p>
                    <p class="text-gray-400"><strong>Guardian:</strong> ${yantra.deity}</p>
                    <p class="text-blue-400"><strong>Element:</strong> ${yantra.element}</p>
                    <p class="text-green-400 text-sm mt-2">✨ ${yantra.benefit}</p>
                </div>
            `;
            break;
            
        case 'master':
            cardContent += `
                <h3 class="text-xl sm:text-2xl font-bold text-yellow-400 mb-3">${yantra.name}</h3>
                <div class="space-y-2 text-sm sm:text-base">
                    <p class="text-gray-300"><span class="font-semibold text-yellow-400">Type:</span> ${yantra.type}</p>
                    <p class="text-gray-400"><strong>Purpose:</strong> ${yantra.purpose}</p>
                    <p class="text-red-400 text-sm mt-2"><strong>Difficulty:</strong> ${yantra.difficulty}</p>
                    ${yantra.power ? `<p class="text-yellow-400 text-sm mt-2">⚡ ${yantra.power}</p>` : ''}
                </div>
            `;
            break;
    }
    
    cardContent += `</div>`;
    return cardContent;
}

// ===== CREATION GUIDE RENDERING =====
function generateCreationContent() {
    if (typeof creationGuideData === 'undefined') return '';
    
    const data = creationGuideData;
    
    return `
        <div class="max-w-6xl mx-auto space-y-12 animate-fadeIn">
            <!-- Header -->
            <div class="text-center">
                <h1 class="text-4xl sm:text-6xl font-bold mb-4" style="font-family: var(--heading-font); background: linear-gradient(135deg, #f59e0b, #ec4899, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                    🎨 ${data.introduction.title}
                </h1>
                <p class="text-xl sm:text-2xl text-amber-300 mb-4">${data.introduction.subtitle}</p>
                <p class="text-base sm:text-lg text-gray-300 max-w-4xl mx-auto">${data.introduction.description}</p>
                <div class="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg max-w-2xl mx-auto">
                    <p class="text-red-400 font-semibold">⚠️ ${data.introduction.warning}</p>
                </div>
            </div>

            <!-- Quick Summary -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                ${data.introduction.importance.map((point, idx) => `
                    <div class="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 hover:bg-amber-500/20 transition">
                        <p class="text-sm text-gray-300">${point}</p>
                    </div>
                `).join('')}
            </div>

            <!-- Learning Path Overview -->
            <div class="bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-500/30 rounded-xl p-6 sm:p-8">
                <h2 class="text-3xl sm:text-4xl font-bold text-violet-400 mb-6 text-center" style="font-family: var(--heading-font);">
                    📚 Progressive Learning Path
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="text-center">
                        <div class="text-5xl mb-3">🌱</div>
                        <h3 class="text-xl font-bold text-green-400 mb-2">Beginner</h3>
                        <p class="text-sm text-gray-300">${data.step_by_step_yantras.beginner.length} Yantras</p>
                        <p class="text-xs text-gray-400 mt-2">15-45 minutes each</p>
                    </div>
                    <div class="text-center">
                        <div class="text-5xl mb-3">🌿</div>
                        <h3 class="text-xl font-bold text-blue-400 mb-2">Intermediate</h3>
                        <p class="text-sm text-gray-300">${data.step_by_step_yantras.intermediate.length} Yantras</p>
                        <p class="text-xs text-gray-400 mt-2">1-3 hours each</p>
                    </div>
                    <div class="text-center">
                        <div class="text-5xl mb-3">🌳</div>
                        <h3 class="text-xl font-bold text-purple-400 mb-2">Advanced</h3>
                        <p class="text-sm text-gray-300">${data.step_by_step_yantras.advanced.length} Yantras</p>
                        <p class="text-xs text-gray-400 mt-2">Multiple sessions</p>
                    </div>
                </div>
            </div>

            <!-- Step-by-Step Yantras -->
            ${generateStepByStepSection(data.step_by_step_yantras)}

            <!-- Pro Tips -->
            <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 sm:p-8">
                <h2 class="text-3xl sm:text-4xl font-bold text-yellow-400 mb-6" style="font-family: var(--heading-font);">
                    💡 Master-Level Secrets
                </h2>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    ${data.pro_tips.wisdom.slice(0, 6).map((tip, idx) => `
                        <div class="bg-gray-800/60 rounded-lg p-5 border border-yellow-500/20 hover:border-yellow-500/40 transition">
                            <h3 class="text-lg font-bold text-yellow-300 mb-2">🔑 ${tip.tip}</h3>
                            <p class="text-sm text-gray-300">${tip.detail}</p>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Final Wisdom -->
            <div class="text-center bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-amber-500/10 border border-purple-500/30 rounded-xl p-8">
                <p class="text-lg sm:text-xl text-purple-300 italic">
                    "${data.resources.final_wisdom}"
                </p>
            </div>
        </div>
    `;
}

function generateStepByStepSection(yantras) {
    let html = '';
    
    // Beginner
    html += `
        <div class="space-y-6">
            <h2 class="text-3xl sm:text-4xl font-bold text-green-400 text-center mb-6" style="font-family: var(--heading-font);">
                🌱 Beginner Yantras
            </h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                ${yantras.beginner.map(yantra => `
                    <div class="bg-green-900/20 border border-green-500/30 rounded-xl p-6 hover:bg-green-900/30 transition">
                        <h3 class="text-2xl font-bold text-white mb-2">${yantra.name}</h3>
                        <div class="flex items-center gap-3 mb-4 text-sm">
                            <span class="px-3 py-1 rounded-full bg-green-500/20 text-green-400">${yantra.difficulty}</span>
                            <span class="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">⏱️ ${yantra.time}</span>
                        </div>
                        <p class="text-gray-300 mb-4">${yantra.purpose}</p>
                        <div class="space-y-2">
                            <p class="text-sm font-semibold text-green-400">Steps:</p>
                            <ol class="list-decimal list-inside text-sm text-gray-300 space-y-1">
                                ${yantra.steps.map(step => `<li>${step}</li>`).join('')}
                            </ol>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    return html;
}

// ===== FORBIDDEN ARTS RENDERING =====
function generateForbiddenContent() {
    if (typeof forbiddenArtsData === 'undefined') return '';
    
    const data = forbiddenArtsData;
    
    return `
        <div class="max-w-6xl mx-auto space-y-12 animate-fadeIn">
            <!-- Warning Header -->
            <div class="bg-red-900/30 border-2 border-red-600 rounded-xl p-6 sm:p-8 animate-pulse-slow">
                <h1 class="text-4xl sm:text-6xl font-bold text-red-400 mb-6 text-center" style="font-family: var(--heading-font);">
                    ⚠️ ${data.disclaimer.title} ⚠️
                </h1>
                <div class="space-y-3">
                    ${data.disclaimer.warnings.map(warning => `
                        <p class="text-red-300 text-sm sm:text-base flex items-start gap-2">
                            <span class="text-red-500 font-bold">•</span>
                            <span>${warning}</span>
                        </p>
                    `).join('')}
                </div>
                <div class="mt-6 p-4 bg-red-950/50 rounded-lg">
                    <p class="text-red-400 font-semibold text-center">${data.disclaimer.purpose}</p>
                    <p class="text-red-300 text-sm text-center mt-2 italic">"${data.disclaimer.wisdom}"</p>
                </div>
            </div>

            <!-- Introduction -->
            <div class="bg-gray-800/60 border border-red-500/30 rounded-xl p-6 sm:p-8">
                <h2 class="text-3xl sm:text-4xl font-bold text-red-400 mb-4" style="font-family: var(--heading-font);">
                    ${data.introduction.title}
                </h2>
                <p class="text-xl text-red-300 mb-4">${data.introduction.subtitle}</p>
                <p class="text-gray-300 text-base leading-relaxed">${data.introduction.overview}</p>
            </div>

            <!-- Why Study -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
                    <h3 class="text-2xl font-bold text-blue-400 mb-4">Why Study Forbidden Practices?</h3>
                    <ul class="space-y-2">
                        ${data.introduction.why_study_forbidden.map(reason => `
                            <li class="text-sm text-gray-300 flex items-start gap-2">
                                <span class="text-blue-400">✓</span>
                                <span>${reason}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="bg-purple-900/20 border border-purple-500/30 rounded-xl p-6">
                    <h3 class="text-2xl font-bold text-purple-400 mb-4">Types of Forbidden Practices</h3>
                    <ul class="space-y-2">
                        ${Object.entries(data.introduction.types_of_forbidden).map(([key, value]) => `
                            <li class="text-sm text-gray-300">
                                <span class="font-semibold text-purple-300">${key}:</span> ${value}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>

            <!-- Protection Knowledge -->
            <div class="bg-green-900/20 border border-green-500/30 rounded-xl p-6 sm:p-8">
                <h2 class="text-3xl sm:text-4xl font-bold text-green-400 mb-6 text-center" style="font-family: var(--heading-font);">
                    🛡️ ${data.categories.protection_knowledge.title}
                </h2>
                <p class="text-xl text-green-300 mb-6 text-center">${data.categories.protection_knowledge.subtitle}</p>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    ${data.categories.protection_knowledge.general_immunity.principles.map(principle => `
                        <div class="bg-gray-800/60 rounded-lg p-5 border border-green-500/20">
                            <h3 class="text-lg font-bold text-green-300 mb-2">🔰 ${principle.principle}</h3>
                            <p class="text-sm text-gray-300 mb-2">${principle.description}</p>
                            <p class="text-xs text-green-400 italic">"${principle.power}"</p>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Final Wisdom -->
            <div class="text-center bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-amber-500/10 border border-purple-500/30 rounded-xl p-8">
                <h2 class="text-3xl font-bold text-purple-400 mb-4" style="font-family: var(--heading-font);">
                    ${data.conclusion.title}
                </h2>
                <p class="text-lg text-purple-300 italic mb-6">
                    "${data.conclusion.ultimate_truth}"
                </p>
            </div>
        </div>
    `;
}
