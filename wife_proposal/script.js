// Configuration
const mediaFiles = [
    { type: 'image', src: 'assets/photo_2026-02-11_20-21-06.jpg' },
    { type: 'image', src: 'assets/photo_2026-02-11_20-21-17.jpg' },
    { type: 'image', src: 'assets/photo_2026-02-11_20-21-20.jpg' },
    { type: 'video', src: 'assets/video_2026-02-11_20-21-30.mp4' },
    { type: 'image', src: 'assets/photo_2026-02-11_20-21-22.jpg' },
    { type: 'image', src: 'assets/photo_2026-02-11_20-21-25.jpg' },
    { type: 'video', src: 'assets/video_2026-02-11_20-21-33.mp4' },
    { type: 'image', src: 'assets/photo_2026-02-11_20-21-28.jpg' },
    { type: 'video', src: 'assets/video_2026-02-11_20-21-38.mp4' }
];

const loveMessages = [
    "Be ready to see 8th Ajuba my dear wifuu...",
    "Hotyy hyee hayee kya bate...",
    "Me to gaal hoke hoke maar jauga kabhi! ❤️",
    "You are my best friend, my love.",
    "So, I have one question to ask..."
];

// YouTube Config
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: '2Vv-BfVoq4g', // Ed Sheeran - Perfect (Lyrics)
        playerVars: {
            'playsinline': 1,
            'controls': 0,
            'loop': 1,
            'start': 20
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // Player is ready, but we wait for user interaction to play
}

// DOM Elements
const introScreen = document.getElementById('intro-screen');
const mainScreen = document.getElementById('main-screen');
const startBtn = document.getElementById('start-btn');
const mediaContainer = document.getElementById('media-display');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const typingTextElement = document.getElementById('typing-text');
const proposeRevealBtn = document.getElementById('propose-reveal-btn');
const proposalModal = document.getElementById('proposal-modal');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

let currentMediaIndex = 0;
let messageIndex = 0;

// Init
document.addEventListener('DOMContentLoaded', () => {
    // Background Hearts
    createFloatingHearts();

    // Start Interaction
    startBtn.addEventListener('click', () => {
        // 1. Play Music & Voice Note
        const voiceNote = new Audio('assets/voice_note.mp3');
        voiceNote.volume = 1.0;

        if (player && player.playVideo) {
            player.playVideo();
            player.setVolume(20); // Start low for voice
        }

        // Try playing voice
        voiceNote.play().then(() => {
            // Voice playing
            voiceNote.onended = () => {
                // Restore volume
                if (player && player.setVolume) player.setVolume(50);
            };
        }).catch(e => {
            console.log("Voice note skipped/error:", e);
            // If failed, restore volume immediately
            if (player && player.setVolume) player.setVolume(50);
        });

        // 2. Transition Screens
        introScreen.style.opacity = 0;
        setTimeout(() => {
            introScreen.classList.add('hidden');
            introScreen.classList.remove('active');

            mainScreen.classList.remove('hidden');
            mainScreen.classList.add('active'); // Triggers CSS animations

            // 3. Start Content
            loadMedia(currentMediaIndex);
            startTypewriter();
        }, 800);
    });

    // Gallery Controls
    prevBtn.addEventListener('click', () => {
        currentMediaIndex = (currentMediaIndex - 1 + mediaFiles.length) % mediaFiles.length;
        loadMedia(currentMediaIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentMediaIndex = (currentMediaIndex + 1) % mediaFiles.length;
        loadMedia(currentMediaIndex);
    });


    // Proposal Reveal
    proposeRevealBtn.addEventListener('click', () => {
        proposalModal.classList.remove('hidden');
        proposalModal.style.display = 'flex'; // Ensure flex
        // Confetti burst?
    });

    // The Yes Button
    yesBtn.addEventListener('click', () => {
        // Confetti Explosion
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

        function random(min, max) { return Math.random() * (max - min) + min; }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);

        // Visual Celebration
        document.body.innerHTML = `
            <div style="
                display:flex;
                justify-content:center;
                align-items:center;
                height:100vh;
                background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);
                color:#ff004f;
                font-family:'Great Vibes', cursive;
                text-align:center;
                flex-direction:column;
                animation: fadeIn 2s ease;
            ">
                <h1 style="font-size:5rem; margin-bottom:1rem;">SHE SAID YES! ❤️💍</h1>
                <p style="font-size:2rem; font-family:'Quicksand', sans-serif; color:#333;">(Now go kiss her!)</p>
            </div>
            <style>@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }</style>
        `;
    });

    // The No Button (Playful evasion)
    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('click', moveNoButton); // Just in case click
});

function loadMedia(index) {
    const file = mediaFiles[index];
    mediaContainer.innerHTML = ''; // Clear previous

    const element = document.createElement(file.type === 'video' ? 'video' : 'img');
    element.src = file.src;

    // Add fade effect
    element.style.opacity = 0;

    if (file.type === 'video') {
        element.controls = true;
        element.muted = false; // Let user unmute? better to be muted by default for autoplay policy
        // element.autoplay = true; // Chrome might block unmuted autoplay
        // Let's try muted autoplay
        element.autoplay = true;
        element.muted = true; // Start muted
        element.loop = false; // Must be false to trigger 'ended'
    }

    mediaContainer.appendChild(element);

    // Trigger fade in
    requestAnimationFrame(() => {
        element.style.transition = 'opacity 1s ease';
        element.style.opacity = 1;
    });

    // Cycle Logic
    if (file.type === 'image') {
        setTimeout(() => {
            nextSlide();
        }, 4000); // 4 seconds for images
    } else {
        // Normal flow: wait for end
        element.onended = () => {
            nextSlide();
        };
    }
}

function nextSlide() {
    currentMediaIndex = (currentMediaIndex + 1) % mediaFiles.length;
    // Clear any existing timeouts if we manually navigate? 
    // Ideally yes, but for simplicity let's just reload.
    loadMedia(currentMediaIndex);
}

function startTypewriter() {
    let currentMsg = loveMessages[messageIndex];
    let charIndex = 0;

    typingTextElement.innerHTML = '';

    function type() {
        if (charIndex < currentMsg.length) {
            typingTextElement.innerHTML += currentMsg.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100); // Typing speed
        } else {
            // Message complete, wait and switch
            setTimeout(nextMessage, 4000);
        }
    }

    type();
}

function nextMessage() {
    messageIndex = (messageIndex + 1) % loveMessages.length;
    startTypewriter();
}

function moveNoButton() {
    // Move the "No" button to a random spot
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

    noBtn.style.position = 'fixed'; // Make it break out of flow
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

// Background Hearts
function createFloatingHearts() {
    const bg = document.getElementById('background-animation');
    const heartSymbols = ['❤️', '💖', '💕', '🌹', '✨'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 5 + 5 + 's'; // 5-10s
        heart.style.fontSize = Math.random() * 2 + 1 + 'rem';

        bg.appendChild(heart);

        // Cleanup
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }, 500); // New heart every 500ms
}
