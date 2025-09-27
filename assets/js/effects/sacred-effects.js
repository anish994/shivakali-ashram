/**
 * 🕉️ SACRED KNOWLEDGE HUB - Advanced Visual Effects
 * 
 * Creates an immersive, living interface with:
 * - Particle constellations
 * - Energy flow connections
 * - Sacred geometry transformations
 * - Quantum field interactions
 */

class SacredEffects {
    constructor() {
        // Core configuration
        this.config = {
            particles: {
                count: 100,
                size: 2,
                speed: 0.5,
                connectionRadius: 100,
                color: 'rgba(255, 215, 0, 0.3)'
            },
            sacred: {
                baseFrequency: 432, // Hz
                harmonics: [1, 1.5, 2, 2.5, 3], // Harmonic series
                volume: 0.03 // Very subtle
            }
        };

        // Audio context for sacred sounds
        this.audioCtx = null;
        this.oscillators = new Map();
        
        // Particle system
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        
        // Initialize
        this.initializeEffects();
    }

    /**
     * Initialize all visual effects
     */
    async initializeEffects() {
        this.createQuantumField();
        this.createParticleConstellation();
        this.createSacredGeometry();
        this.initializeAudioContext();
        this.attachEventListeners();
    }

    /**
     * Create quantum field effect
     */
    createQuantumField() {
        const field = document.createElement('div');
        field.className = 'quantum-field';
        document.querySelector('.vedic-knowledge-container').prepend(field);

        // Add quantum distortion points
        for (let i = 0; i < 5; i++) {
            const distortion = document.createElement('div');
            distortion.className = 'quantum-distortion';
            distortion.style.setProperty('--delay', `${i * 1.618}s`);
            field.appendChild(distortion);
        }
    }

    /**
     * Create particle constellation system
     */
    createParticleConstellation() {
        const canvas = document.createElement('canvas');
        canvas.className = 'constellation-canvas';
        document.querySelector('.vedic-knowledge-container').prepend(canvas);
        
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        // Create particles
        for (let i = 0; i < this.config.particles.count; i++) {
            this.particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * this.config.particles.speed,
                vy: (Math.random() - 0.5) * this.config.particles.speed,
                size: this.config.particles.size,
                connection: false
            });
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw particles
            this.particles.forEach(particle => {
                // Move
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = this.config.particles.color;
                ctx.fill();
            });

            // Draw connections
            this.particles.forEach((p1, i) => {
                this.particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.config.particles.connectionRadius) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 215, 0, ${0.3 * (1 - distance / this.config.particles.connectionRadius)})`;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };
        animate();
    }

    /**
     * Create sacred geometry animations
     */
    createSacredGeometry() {
        const geometry = document.createElement('div');
        geometry.className = 'sacred-geometry';
        document.querySelector('.vedic-knowledge-container').prepend(geometry);

        // Create multiple layers of rotating patterns
        const patterns = [
            { angle: 0, speed: 1 },
            { angle: 45, speed: -0.5 },
            { angle: 90, speed: 0.25 }
        ];

        patterns.forEach(pattern => {
            const layer = document.createElement('div');
            layer.className = 'geometry-layer';
            layer.style.transform = `rotate(${pattern.angle}deg)`;
            layer.style.animation = `rotateGeometry ${pattern.speed * 20}s linear infinite`;
            geometry.appendChild(layer);
        });
    }

    /**
     * Initialize audio context for sacred sounds
     */
    async initializeAudioContext() {
        // Only create audio context on first user interaction
        document.addEventListener('click', () => {
            if (!this.audioCtx) {
                this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
        }, { once: true });
    }

    /**
     * Play sacred frequency
     */
    playSacredSound(baseFrequency) {
        if (!this.audioCtx) return;

        // Stop any playing sound
        this.stopSacredSound();

        // Create harmonics
        this.config.sacred.harmonics.forEach(harmonic => {
            const oscillator = this.audioCtx.createOscillator();
            const gainNode = this.audioCtx.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.value = baseFrequency * harmonic;
            
            gainNode.gain.value = 0;
            gainNode.gain.linearRampToValueAtTime(
                this.config.sacred.volume / harmonic,
                this.audioCtx.currentTime + 0.1
            );
            gainNode.gain.linearRampToValueAtTime(
                0,
                this.audioCtx.currentTime + 2
            );

            oscillator.connect(gainNode);
            gainNode.connect(this.audioCtx.destination);

            oscillator.start();
            oscillator.stop(this.audioCtx.currentTime + 2);

            this.oscillators.set(harmonic, { oscillator, gainNode });
        });
    }

    /**
     * Stop sacred sound
     */
    stopSacredSound() {
        this.oscillators.forEach(({ oscillator, gainNode }) => {
            gainNode.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + 0.1);
            setTimeout(() => oscillator.stop(), 100);
        });
        this.oscillators.clear();
    }

    /**
     * Attach interaction event listeners
     */
    attachEventListeners() {
        // Track mouse movement for particle effects
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Handle Veda card interactions
        document.querySelectorAll('.veda-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                const frequency = parseFloat(card.dataset.frequency) || 432;
                this.playSacredSound(frequency);
                this.highlightConstellationArea(card);
            });

            card.addEventListener('mouseleave', () => {
                this.stopSacredSound();
                this.resetConstellationHighlight();
            });
        });

        // Handle scroll-based effects
        window.addEventListener('scroll', () => {
            this.updateParallaxEffects();
        }, { passive: true });
    }

    /**
     * Highlight constellation area around element
     */
    highlightConstellationArea(element) {
        const rect = element.getBoundingClientRect();
        const area = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            radius: Math.max(rect.width, rect.height)
        };

        // Increase particle density in this area
        this.particles.forEach(particle => {
            const dx = particle.x - area.x;
            const dy = particle.y - area.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < area.radius) {
                particle.connection = true;
                particle.size = this.config.particles.size * 1.5;
            }
        });
    }

    /**
     * Reset constellation highlight
     */
    resetConstellationHighlight() {
        this.particles.forEach(particle => {
            particle.connection = false;
            particle.size = this.config.particles.size;
        });
    }

    /**
     * Update parallax effects on scroll
     */
    updateParallaxEffects() {
        const scrolled = window.pageYOffset;
        const cards = document.querySelectorAll('.veda-card');

        cards.forEach((card, index) => {
            const speed = 1 + (index % 3) * 0.1;
            const yOffset = scrolled * speed;
            card.style.transform = `translateY(${yOffset}px)`;
        });
    }
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SacredEffects;
} else {
    window.SacredEffects = SacredEffects;
}