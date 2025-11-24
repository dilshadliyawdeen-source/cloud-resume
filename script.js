// Matrix/Cyberpunk Background Effect
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
let mouse = { x: null, y: null };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 3 + 1; // Larger particles (1-4px)
        this.color = `rgba(0, 255, 157, ${Math.random() * 0.3 + 0.5})`; // Brighter (0.5-0.8 opacity)
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 80; i++) { // More particles
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    // Draw connections
    particles.forEach((p, index) => {
        p.update();
        p.draw();

        for (let j = index + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
                ctx.strokeStyle = `rgba(0, 255, 157, ${0.1 - dist / 1500})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }

        // Mouse interaction
        if (mouse.x != null) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 200) {
                ctx.strokeStyle = `rgba(0, 255, 157, ${0.2 - dist / 2000})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();

                // Subtle attraction
                if (dist < 200) {
                    p.vx -= dx * 0.0001;
                    p.vy -= dy * 0.0001;
                }
            }
        }
    });

    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    resize();
    initParticles();
});

resize();
initParticles();
animateParticles();

// Typing Effect for Terminal
const terminalText = document.querySelector('.typing-text');
// Simple reveal animation on load
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate skill bars if visible
                if (entry.target.classList.contains('skill-bar')) {
                    const progressBar = entry.target.querySelector('.progress-bar span');
                    const width = entry.target.getAttribute('data-level');
                    progressBar.style.width = width;
                }

                // Animate numbers
                if (entry.target.classList.contains('stat-number')) {
                    animateValue(entry.target, 0, parseFloat(entry.target.getAttribute('data-target')), 2000);
                    observer.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section, .skill-bar, .stat-number').forEach(el => {
        observer.observe(el);
    });
});

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerHTML = end; // Ensure final value is exact
        }
    };
    window.requestAnimationFrame(step);
}

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const icon = document.getElementById('theme-icon');

if (themeToggle && icon) {
    // Check for saved theme
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        icon.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');

        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            icon.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'dark');
            icon.textContent = '🌙';
        }
    });
}

// Visitor Counter (Mock for Demo)
const counterElement = document.getElementById('visitor-count');
if (counterElement) {
    // Simulate API call
    setTimeout(() => {
        let count = localStorage.getItem('visitorCount') || 1024;
        count = parseInt(count) + 1;
        localStorage.setItem('visitorCount', count);
        counterElement.innerText = count;
        counterElement.parentElement.classList.add('loaded');
    }, 1000);
}

// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
