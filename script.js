// Initial Greeting
const greetingElement = document.getElementById('buddy-message');
const buddyAvatar = document.querySelector('.buddy-avatar i');

const ishusNicknames = ["Ishu", "Bandariya", "Chutki", "Teddy", "Icecream", "My Queen"];

const compliments = [
    "Ishu, you light up my world like nobody else. ✨",
    "Every moment with you is a treasure, my dear Chutki. 💎",
    "Your smile is my favorite thing, my sweet Icecream. 🍦",
    "I love you more than code loves logic, my cute Bandariya. 🐵❤️",
    "You are the CSS to my HTML - you make everything beautiful, Ishu. 🎨",
    "Thinking of you keeps me awake. Dreaming of you keeps me asleep. Being with you keeps me alive, my Teddy. 🧸",
    "You are my today and all of my tomorrows, Ishika. 📅",
    "If I had a flower for every time I thought of you... I could walk through my garden forever. 🌸",
    "My heart is and always will be yours. 🔒",
    "You are perfect just the way you are, meri Pyaari Bandariya. 💖"
];

const surpriseActions = [
    () => { confettiExplosion(); showMessage("Celebrate our love, Ishu! 🎉"); },
    () => { showMessage("Close your eyes, Chutki... 🙈 <br> (Imagine a warm hug!)"); },
    () => { showMessage("You are the most beautiful Icecream I know. 🍦👑"); },
    () => { backgroundChange(); showMessage("You color my world, Teddy! 🌈"); },
    () => { showMessage("I promise to always be by your side, Bandariya. 🤝"); }
];

// Set initial greeting based on time
function setGreeting() {
    const now = new Date();
    const isValentines = now.getMonth() === 1 && now.getDate() === 14; // Month is 0-indexed (Feb is 1)

    if (isValentines) {
        greetingElement.innerHTML = `Happy Valentine's Day, My Queen! 🌹❤️<br>I am your Love Buddy, ready to make today magical! ✨`;
        confettiExplosion();
        return;
    }

    const hour = now.getHours();
    let timeGreeting = "Hello";
    if (hour < 12) timeGreeting = "Good Morning";
    else if (hour < 18) timeGreeting = "Good Afternoon";
    else timeGreeting = "Good Evening";

    const randomNickname = ishusNicknames[Math.floor(Math.random() * ishusNicknames.length)];

    greetingElement.innerHTML = `${timeGreeting}, ${randomNickname}! ❤️ <br> I am your personal Love Buddy. How can I spoil you today? ✨`;
}

// Call on load
setGreeting();

// Initialize Audio on First Interaction (to respect autoplay policies)
document.body.addEventListener('click', function () {
    const audio = document.getElementById('bg-music');
    if (audio.paused) {
        audio.play().catch(err => console.log("Audio play failed: ", err));
    }
}, { once: true });

// Navigation Functions
function showSection(sectionId) {
    // Hide main menu grid
    document.querySelector('.menu-grid').classList.add('hidden');

    // Show specific section
    document.getElementById(sectionId).classList.remove('hidden');

    // Update Buddy Message
    if (sectionId === 'gift-vault') {
        updateBuddy("Here are the treasures you've unlocked! 🗝️");
    } else if (sectionId === 'our-journey') {
        updateBuddy("Look how far we've come... and it's just the beginning. 🚀");
    } else if (sectionId === 'special-note') {
        updateBuddy("I have something to show you... ❤️ Watch closely.");
    }
}

function goHome() {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(el => el.classList.add('hidden'));

    // Stop any videos
    const video = document.getElementById('special-video');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }

    // Show menu
    document.querySelector('.menu-grid').classList.remove('hidden');

    // Reset Buddy
    updateBuddy("Welcome back, my love! What's next? 💕");

    // Resume BG music if it was paused by the video logic
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic && bgMusic.paused) {
        bgMusic.play().catch(e => console.log("Bg music interaction needed"));
    }
}

// Interaction Functions
function updateBuddy(text) {
    greetingElement.style.opacity = 0;
    setTimeout(() => {
        greetingElement.innerHTML = text;
        greetingElement.style.opacity = 1;
    }, 300);

    // Bounce animation
    buddyAvatar.classList.remove('fa-bounce');
    void buddyAvatar.offsetWidth; // trigger reflow
    buddyAvatar.classList.add('fa-bounce');
}

function triggerCompliment() {
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    updateBuddy(randomCompliment);
}

function triggerGrandSurprise() {
    const randomAction = surpriseActions[Math.floor(Math.random() * surpriseActions.length)];
    randomAction();
}

function showMessage(msg) {
    updateBuddy(msg);
}

function openGift(giftName) {
    // Logic to open other projects
    // Assuming they are in sibling directories
    let url = '';
    switch (giftName) {
        case 'hug': url = '../hug_day_gift/index.html'; break;
        case 'kiss': url = '../kiss_day_gift/index.html'; break;
        case 'promise': url = '../promise_day_gift/index.html'; break;
        case 'teddy': url = '../teddy_day_gift/index.html'; break;
        case 'proposal': url = '../propose_day_lanterns/index.html'; break;
        case 'valentine': url = '../valentines_day_gift/index.html'; break;
        case 'infinity': url = '../infinity_kiss/index.html'; break;
        case 'proposal2': url = '../wife_proposal_2/index.html'; break;
        case 'video_page': url = '../video-page/index.html'; break;
        default: url = '#';
    }

    if (url !== '#') {
        window.open(url, '_blank');
        updateBuddy(`Opening ${giftName} gift... Enjoy! 🎁`);
    } else {
        updateBuddy("This gift is locked for now! 🔒");
    }
}

// Visual Effects
function backgroundChange() {
    document.body.style.background = `linear-gradient(${Math.random() * 360}deg, #1a1a2e, #3a0ca3)`;
    updateBuddy("I changed the colors for you, my sweet Icecream! 🍦");
}

// Simple Confetti Implementation (No external lib needed for basic effect)
function confettiExplosion() {
    const colors = ['#ff4081', '#ffd700', '#ffffff'];
    for (let i = 0; i < 50; i++) {
        createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
    }
}

function createConfettiPiece(color) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = color;
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.zIndex = '1000';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(confetti);

    const animationDuration = Math.random() * 2 + 1; // 1-3s

    confetti.animate([
        { transform: `translateY(0) rotate(0)`, opacity: 1 },
        { transform: `translateY(100vh) rotate(${Math.random() * 500}deg)`, opacity: 0 }
    ], {
        duration: animationDuration * 1000,
        easing: 'linear',
        fill: 'forwards'
    });

    setTimeout(() => {
        confetti.remove();
    }, animationDuration * 1000);
}

// Video & Audio Interaction
const spVideo = document.getElementById('special-video');
const bgMusic = document.getElementById('bg-music');

if (spVideo && bgMusic) {
    spVideo.addEventListener('play', () => {
        bgMusic.pause();
    });

    spVideo.addEventListener('pause', () => {
        // Optional: resume if you want, or let user resume manually via goHome which handles it
    });

    spVideo.addEventListener('ended', () => {
        bgMusic.play().catch(e => console.log("Bg resume failed"));
    });
}
