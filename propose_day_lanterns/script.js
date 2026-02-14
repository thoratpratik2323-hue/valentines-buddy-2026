/* Canvas Lanterns Effect */
const canvas = document.getElementById('lanternCanvas');
const ctx = canvas.getContext('2d');

let lanterns = [];
let isReleasing = false;

// Resize
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Lantern Object
class Lantern {
    constructor(x, y, scale = 1, speed = 1) {
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.speed = speed;
        this.wobble = Math.random() * 2;
        this.color = `hsl(${Math.random() * 40 + 20}, 100%, 70%)`; // Warm colors
        this.opacity = 0;
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;

        ctx.beginPath();
        // Top cap
        ctx.moveTo(this.x - 5 * this.scale, this.y - 30 * this.scale);
        ctx.lineTo(this.x + 5 * this.scale, this.y - 30 * this.scale);

        // Body (Curve out and in)
        ctx.quadraticCurveTo(this.x + 15 * this.scale, this.y - 15 * this.scale, this.x + 5 * this.scale, this.y);
        ctx.lineTo(this.x - 5 * this.scale, this.y);
        ctx.quadraticCurveTo(this.x - 15 * this.scale, this.y - 15 * this.scale, this.x - 5 * this.scale, this.y - 30 * this.scale);

        ctx.fill();

        // Glow
        ctx.shadowBlur = 20 * this.scale;
        ctx.shadowColor = this.color;

        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
    }

    update() {
        this.y -= this.speed;
        this.x += Math.sin(this.wobble) * 0.5;
        this.wobble += 0.05;

        // Fade in
        if (this.opacity < 1) this.opacity += 0.02;

        // Reset if out of screen (loop)
        if (this.y < -50) {
            this.y = canvas.height + 50;
            this.x = Math.random() * canvas.width;
        }
    }
}

// Animation Loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear screen

    lanterns.forEach(l => {
        l.draw();
        l.update();
    });

    requestAnimationFrame(animate);
}

// Start with just a few ambient stars/glows?
function initBackground() {
    // Add some random stars
    // (Implementation optional, keeping it simple for now)
}

// Trigger Event
function releaseLanterns() {
    if (isReleasing) return;
    isReleasing = true;

    // Remove instructions
    document.querySelector('.instruction').style.opacity = 0;
    setTimeout(() => {
        document.querySelector('.instruction').style.display = 'none';
    }, 1000);

    // Create MANY lanterns
    // 1. Burst from center
    const centerX = canvas.width / 2;
    const centerY = canvas.height * 0.8;

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const x = Math.random() * canvas.width;
            const y = canvas.height + Math.random() * 100;
            const scale = Math.random() * 0.5 + 0.5;
            const speed = Math.random() * 2 + 1;
            lanterns.push(new Lantern(x, y, scale, speed));
        }, i * 50); // Staggered release
    }

    // Show Proposal after delay
    setTimeout(() => {
        const prop = document.querySelector('.proposal-content');
        prop.style.display = 'block';
        setTimeout(() => {
            prop.classList.add('visible');
            prop.style.opacity = 1;
        }, 100);
    }, 4000); // 4 seconds after start
}

// Proposal Logic
function acceptProposal() {
    // Hide buttons
    document.querySelector('.proposal-content .buttons').style.display = 'none';
    document.querySelector('.proposal-content h1').innerText = "YES! 💖";
    document.querySelector('.proposal-content p').innerText = "Forever & Always!";

    // More lanterns!
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = canvas.height + Math.random() * 100;
        lanterns.push(new Lantern(x, y, Math.random() * 0.8 + 0.2, Math.random() * 3 + 2));
    }
}

function dodgeNo(btn) {
    const x = (Math.random() - 0.5) * 300;
    const y = (Math.random() - 0.5) * 300;
    btn.style.transform = `translate(${x}px, ${y}px)`;
}

// Start loop
animate();
