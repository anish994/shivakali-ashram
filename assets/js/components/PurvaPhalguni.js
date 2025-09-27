class PurvaPhalguniCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }

                .card {
                    background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(255, 142, 83, 0.05));
                    border: 1px solid rgba(255, 107, 107, 0.2);
                    border-radius: 20px;
                    padding: 2rem;
                    color: #ffffff;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(circle at center, rgba(255, 107, 107, 0.2) 0%, transparent 70%);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 35px rgba(255, 107, 107, 0.3);
                    border-color: rgba(255, 107, 107, 0.4);
                }

                .card:hover::before {
                    opacity: 1;
                }

                .nakshatra-symbol {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                    display: block;
                    animation: float 3s ease-in-out infinite;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }

                .card-title {
                    font-family: 'Orbitron', monospace;
                    font-size: 1.5rem;
                    margin-bottom: 0.5rem;
                    background: linear-gradient(135deg, #FF6B6B, #FF8E53);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .card-subtitle {
                    color: #b19cd9;
                    font-style: italic;
                    margin-bottom: 1rem;
                }

                .qualities {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                    margin-top: 1rem;
                }

                .quality-tag {
                    background: rgba(255, 107, 107, 0.2);
                    border: 1px solid rgba(255, 107, 107, 0.3);
                    border-radius: 15px;
                    padding: 4px 12px;
                    font-size: 0.85rem;
                    color: #ffffff;
                }

                @media (max-width: 768px) {
                    .card {
                        padding: 1.5rem;
                    }

                    .nakshatra-symbol {
                        font-size: 2.5rem;
                    }

                    .card-title {
                        font-size: 1.3rem;
                    }
                }
            </style>

            <div class="card" role="button" tabindex="0">
                <span class="nakshatra-symbol">⭐</span>
                <h3 class="card-title">PURVA PHALGUNI</h3>
                <p class="card-subtitle">The Former Red One</p>
                <p>Star of Joy • Divine Pleasure • Creative Celebration</p>
                <div class="qualities">
                    <span class="quality-tag">Joy Creation</span>
                    <span class="quality-tag">Creative Expression</span>
                    <span class="quality-tag">Sacred Play</span>
                </div>
            </div>
        `;
    }

    addEventListeners() {
        const card = this.shadowRoot.querySelector('.card');
        card.addEventListener('click', () => {
            window.location.href = 'purva-phalguni.html';
        });

        // Keyboard accessibility
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.location.href = 'purva-phalguni.html';
            }
        });
    }
}

customElements.define('purva-phalguni-card', PurvaPhalguniCard);
