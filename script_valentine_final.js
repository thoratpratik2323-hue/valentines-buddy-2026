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

// Audio initialization removed

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

    // Resume BG music check removed
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
        case 'hug': url = 'hug_day_gift/index.html'; break;
        case 'kiss': url = 'kiss_day_gift/index.html'; break;
        case 'promise': url = 'promise_day_gift/index.html'; break;
        case 'teddy': url = 'teddy_day_gift/index.html'; break;
        case 'proposal': url = 'propose_day_lanterns/index.html'; break;
        case 'valentine': url = 'valentines_day_gift/index.html'; break;
        case 'infinity': url = 'infinity_kiss/index.html'; break;
        case 'proposal2': url = 'wife_proposal_2/index.html'; break;
        case 'wife_proposal': url = 'wife_proposal/index.html'; break;
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

// Video Interaction (no bg music sync)
const spVideo = document.getElementById('special-video');

// Image Modal Functions
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');

function openModal(src) {
    modal.classList.add('show');
    modalImg.src = src;
}

function closeModal() {
    modal.classList.remove('show');
}

// Attach listeners to gallery images once loaded
document.addEventListener('DOMContentLoaded', () => {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            openModal(img.src);
        });
        img.style.cursor = 'pointer'; // Make it obvious clickable
    });
});

// Love Calculator Logic
function calculateLove() {
    const p1 = document.getElementById('your-name').value;
    const p2 = document.getElementById('partner-name').value;
    const resultDiv = document.getElementById('calc-result');

    if (!p1 || !p2) {
        alert("Please enter both names!");
        return;
    }

    // Fake Calculation Effect
    let percentage = 0;
    resultDiv.innerHTML = "Calculating... 💓";
    resultDiv.style.color = "#fff";

    const interval = setInterval(() => {
        percentage += Math.floor(Math.random() * 10);
        if (percentage > 100) percentage = 100;
        resultDiv.innerHTML = percentage + "%";

        if (percentage >= 100) {
            clearInterval(interval);
            showFinalResult(resultDiv);
        }
    }, 100);
}

function showFinalResult(div) {
    div.innerHTML = "100% ❤️ <br> <span style='font-size:1rem'>Match Made in Heaven!</span>";
    div.style.color = "#ffd700";
    confettiExplosion();
    updateBuddy("I knew it! You two are perfect! 💑");
}

// Name Proposal Logic
let proposalPlayer;
window.onYouTubeIframeAPIReady = function () {
    console.log("YouTube API Ready - Initializing Kesariya Player");
    proposalPlayer = new YT.Player('proposal-song-player', {
        height: '0',
        width: '0',
        videoId: 'BddP6PYo2gs', // Kesariya (Arijit Singh)
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'modestbranding': 1,
            'rel': 0
        },
        events: {
            'onReady': () => console.log("Player Ready"),
            'onError': (e) => console.log("Player Error", e)
        }
    });
}

function acceptNameProposal() {
    const middleName = document.getElementById('middle-name-display');
    const lastName = document.getElementById('last-name-display');
    const resultDiv = document.getElementById('proposal-result');

    // Play Song!
    if (proposalPlayer && proposalPlayer.playVideo) {
        proposalPlayer.playVideo();
    }

    // Trigger Flash Effect
    triggerFlash();

    // Reveal names
    middleName.style.opacity = 1;
    middleName.style.color = "#ff4081"; // Highlight middle name in pink
    lastName.style.opacity = 1;

    // Show result message
    resultDiv.innerHTML = "Ishika Pratik Thorat <br> <span style='font-size:1rem; color:#fff'>FOREVER! ❤️</span>";

    // Massive Celebration
    confettiExplosion();
    setTimeout(confettiExplosion, 500);
    setTimeout(confettiExplosion, 1000);

    updateBuddy("YAY! She said YES! Best Day Ever! 💍✨");

    // Show Contract after 2 seconds
    setTimeout(() => {
        document.getElementById('contract-modal').classList.remove('hidden');
        document.getElementById('contract-modal').classList.add('show');
    }, 2000);
}

function closeContract() {
    document.getElementById('contract-modal').classList.remove('show');
    document.getElementById('contract-modal').classList.add('hidden');

    // Stop song when closing if you want, or let it play
    // proposalPlayer.stopVideo(); 

    updateBuddy("I am the happiest Buddy in the world! 🥰");
}

function triggerFlash() {
    const flash = document.getElementById('flash-effect');
    flash.classList.remove('flash-active');
    void flash.offsetWidth; // trigger reflow
    flash.classList.add('flash-active');
}
