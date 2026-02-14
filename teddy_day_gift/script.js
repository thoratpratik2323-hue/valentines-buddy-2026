document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const overlay = document.getElementById('overlay');
    const enterBtn = document.getElementById('enterBtn');
    const mainContainer = document.getElementById('mainContainer');
    const teddyContainer = document.getElementById('teddyContainer');
    const messageCard = document.getElementById('messageCard');
    const closeBtn = document.getElementById('closeBtn');
    const instruction = document.getElementById('instruction');
    const reasonsContainer = document.getElementById('reasonsContainer');
    const reasonBtn = document.getElementById('reasonBtn');
    const reasonText = document.getElementById('reasonText');
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');

    // --- Message Elements for Typing Effect ---
    // We will clear these initially and type into them
    const msgLine1 = messageCard.querySelector('.message-text:nth-of-type(1)');
    const msgLine2 = messageCard.querySelector('.highlight');
    const msgSub = messageCard.querySelector('.message-sub');

    // Store original text
    const text1 = "To my cutest, cuddliest teddy...";
    const text2 = "I Love You, My Dear Bandriya! 🐵❤️";
    const subText = "You are my Jannu, Chutki, Teddy Bear, Bbu, Honey, Wifu, Home Minister, Icecream... & My Everything! I am always with you. ♾️";

    // --- State ---
    let isMessageOpen = false;
    let isPlaying = false;

    // --- Reasons Array ---
    const reasons = [
        "Because you make me smile every single day. 😊",
        "Because your hugs are the best medicine. 🧸",
        "Because you understand me like no one else. ❤️",
        "Because of your beautiful eyes. 👀✨",
        "Because you support my dreams. 🚀",
        "Because even your silences are comfortable. 🤫",
        "Because loving you is the easiest thing I've ever done. 💖",
        "Because you are my best friend. 👯‍♀️",
        "Because you make ordinary moments magical. ✨",
        "Because you have the kindest heart. 🌸",
        "Because you are my Ishu! 🥰"
    ];

    // --- Typewriter Function ---
    function typeWriter(element, text, speed, callback) {
        let i = 0;
        element.textContent = "";

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                if (callback) callback();
            }
        }
        type();
    }

    // --- ENTER BUTTON LOGIC ---
    enterBtn.addEventListener('click', () => {
        // 1. Play Music immediately on user gesture
        bgMusic.play().then(() => {
            isPlaying = true;
            musicBtn.textContent = "⏸️ Pause Music";
            musicBtn.classList.add('playing');
        }).catch(error => {
            console.log("Audio play failed on click:", error);
        });

        // 2. Hide Overlay
        overlay.classList.add('fade-out');

        // 3. Show Main Content
        setTimeout(() => {
            overlay.style.display = 'none';
            mainContainer.classList.remove('hidden-content');
            mainContainer.classList.add('visible');
        }, 800);
    });

    // --- Event Listeners ---

    // 1. Teddy Click -> Open Message & Start Typing
    teddyContainer.addEventListener('click', () => {
        if (isMessageOpen) return;
        isMessageOpen = true;

        // Show Card
        messageCard.classList.remove('hidden');
        messageCard.classList.add('show');
        instruction.style.opacity = '0';
        reasonsContainer.classList.add('hidden'); // Hide reasons if open

        // Reset Text for Typing
        msgLine1.textContent = '';
        msgLine2.textContent = '';
        msgSub.style.opacity = '0';

        // Start Typing Effect
        typeWriter(msgLine1, text1, 50, () => {
            // Typing Line 2
            typeWriter(msgLine2, text2, 80, () => {
                // Show Sub Text
                msgSub.textContent = subText;
                msgSub.style.opacity = '0';
                setTimeout(() => {
                    msgSub.style.transition = 'opacity 1s';
                    msgSub.style.opacity = '1';
                }, 100);
            });
        });

        // Burst of hearts from the center
        createBurst(window.innerWidth / 2, window.innerHeight / 2);
    });

    // 2. Close Button -> Hide Message & Show Reasons
    closeBtn.addEventListener('click', () => {
        messageCard.classList.remove('show');
        setTimeout(() => {
            messageCard.classList.add('hidden');
        }, 500); // Wait for transition

        isMessageOpen = false;

        // Hide instruction, Show Reasons Section
        instruction.style.display = 'none';
        reasonsContainer.classList.remove('hidden');
        reasonsContainer.style.display = 'block';
        setTimeout(() => {
            reasonsContainer.style.opacity = '1';
        }, 100);
    });

    // 3. Reasons Button -> Show Random Reason
    reasonBtn.addEventListener('click', () => {
        // Random reason logic
        const randomIndex = Math.floor(Math.random() * reasons.length);
        const reason = reasons[randomIndex];

        // Update text with animation reset
        reasonText.style.animation = 'none';
        reasonText.offsetHeight; /* trigger reflow */
        reasonText.style.animation = 'slideUp 0.5s ease-out';

        reasonText.textContent = reason;

        // Mini burst around the button (approximate center)
        createBurst(window.innerWidth / 2, window.innerHeight * 0.7);
    });

    // 4. Music Button -> Toggle Play/Pause
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.textContent = "🎵 Play Music";
            musicBtn.classList.remove('playing');
            isPlaying = false;
        } else {
            bgMusic.play().then(() => {
                musicBtn.textContent = "⏸️ Pause Music";
                musicBtn.classList.add('playing');
                isPlaying = true;
            }).catch(e => {
                console.log("Music toggle failed:", e);
            });
        }
    });

    // --- Floating Hearts Background ---
    setInterval(() => {
        createFloatingHeart();
    }, 800);

    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = ['❤️', '💖', '🧸', '💕', '🥰', '🌹'][Math.floor(Math.random() * 6)];

        // Random X Position
        const startX = Math.random() * window.innerWidth;
        heart.style.left = startX + 'px';

        // Start from bottom
        heart.style.top = '105vh';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';

        document.body.appendChild(heart);

        // Cleanup
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }

    function createBurst(x, y) {
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = ['❤️', '💖', '✨'][Math.floor(Math.random() * 3)];
            heart.style.position = 'fixed';
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';

            // Random direction
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 100 + 50; // pixels
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            heart.style.transition = 'all 1s ease-out';

            document.body.appendChild(heart);

            // Trigger animation
            requestAnimationFrame(() => {
                heart.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
                heart.style.opacity = '0';
            });

            // Cleanup
            setTimeout(() => {
                heart.remove();
            }, 1000);
        }
    }
});
