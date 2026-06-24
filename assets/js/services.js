// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ULTRA-PREMIUM SERVICES SECTION JAVASCRIPT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

(function() {
    'use strict';

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // NEURAL NETWORK GENERATOR
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    function createNeuralNetwork() {
        const network = document.getElementById('neuralNetwork');
        if (!network) return;

        const nodeCount = 30;
        const nodes = [];

        // Create nodes
        for (let i = 0; i < nodeCount; i++) {
            const node = document.createElement('div');
            node.className = 'neural-node';
            node.style.left = Math.random() * 100 + '%';
            node.style.top = Math.random() * 100 + '%';
            node.style.animationDelay = Math.random() * 8 + 's';
            network.appendChild(node);
            nodes.push({
                element: node,
                x: parseFloat(node.style.left),
                y: parseFloat(node.style.top)
            });
        }

        // Create connections
        nodes.forEach((node, i) => {
            const nearbyNodes = nodes.filter((n, j) => {
                if (i === j) return false;
                const distance = Math.sqrt(
                    Math.pow(n.x - node.x, 2) + 
                    Math.pow(n.y - node.y, 2)
                );
                return distance < 30;
            });

            nearbyNodes.slice(0, 2).forEach(nearby => {
                const connection = document.createElement('div');
                connection.className = 'neural-connection';
                
                const distance = Math.sqrt(
                    Math.pow(nearby.x - node.x, 2) + 
                    Math.pow(nearby.y - node.y, 2)
                );
                
                const angle = Math.atan2(nearby.y - node.y, nearby.x - node.x) * 180 / Math.PI;
                
                connection.style.width = distance + '%';
                connection.style.left = node.x + '%';
                connection.style.top = node.y + '%';
                connection.style.transform = `rotate(${angle}deg)`;
                connection.style.animationDelay = Math.random() * 3 + 's';
                
                network.appendChild(connection);
            });
        });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // PARTICLE SYSTEM
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    function createParticles() {
        const particleSystem = document.getElementById('particleSystem');
        if (!particleSystem) return;

        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (10 + Math.random() * 10) + 's';
            particleSystem.appendChild(particle);
        }
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // DATA STREAMS
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    function createDataStreams() {
        const container = document.getElementById('dataStreams');
        if (!container) return;

        const streamCount = 8;

        for (let i = 0; i < streamCount; i++) {
            const stream = document.createElement('div');
            stream.className = 'data-stream';
            stream.style.left = (i * 12.5) + '%';
            stream.style.animationDelay = Math.random() * 3 + 's';
            stream.style.animationDuration = (2 + Math.random() * 2) + 's';
            container.appendChild(stream);
        }
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // CURSOR SPOTLIGHT EFFECT
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    function initCursorSpotlight() {
        const spotlight = document.getElementById('cursorSpotlight');
        if (!spotlight) return;

        let mouseX = 0, mouseY = 0;
        let spotlightX = 0, spotlightY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateSpotlight() {
            spotlightX += (mouseX - spotlightX) * 0.1;
            spotlightY += (mouseY - spotlightY) * 0.1;
            
            spotlight.style.left = spotlightX + 'px';
            spotlight.style.top = spotlightY + 'px';
            
            requestAnimationFrame(animateSpotlight);
        }

        animateSpotlight();
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // MAGNETIC HOVER EFFECT
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    function initMagneticCards() {
        const cards = document.querySelectorAll('.service-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateY(-10px) 
                    scale(1.02)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // INTERSECTION OBSERVER FOR WIDGETS
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    function initWidgetAnimations() {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.widget').forEach(widget => {
            observer.observe(widget);
        });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // INITIALIZE ALL SYSTEMS
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    function init() {
        createNeuralNetwork();
        createParticles();
        createDataStreams();
        initCursorSpotlight();
        initMagneticCards();
        initWidgetAnimations();
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
