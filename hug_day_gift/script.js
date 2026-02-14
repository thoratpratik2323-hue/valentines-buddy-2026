document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION ---
    const SECRET_QUESTION = "What is my nickname for you?";
    const SECRET_ANSWER = "poku"; // Case-insensitive
    // ---------------------

    const questionDisplay = document.getElementById('question-display');
    const passwordInput = document.getElementById('password-input');
    const unlockBtn = document.getElementById('unlock-btn');
    const safeDoor = document.querySelector('.safe-door');
    const safeContent = document.querySelector('.safe-content');
    const statusText = document.querySelector('.status-text');
    const safeContainer = document.querySelector('.safe-container');

    // New Elements
    const bgMusic = document.getElementById('bg-music');
    const overlayContent = document.getElementById('overlay-content');
    const speakHeart = document.getElementById('speak-heart');

    // Note Modal Elements
    const noteModal = document.getElementById('note-modal');
    const noteText = document.getElementById('note-text');

    // Set the question
    questionDisplay.textContent = SECRET_QUESTION;

    unlockBtn.addEventListener('click', checkAnswer);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkAnswer();
    });

    // Speak removed per request
    speakHeart.addEventListener('click', () => {
        // Extra confetti burst from heart
        confetti({
            particleCount: 30,
            spread: 60,
            origin: { y: 0.6 }
        });
    });

    // Make functions global so HTML onclick works
    window.openNote = function (text) {
        noteText.textContent = text;
        noteModal.classList.remove('hidden'); // Remove hidden utility if present
        noteModal.classList.add('show-modal'); // Add visibility class
    }

    window.closeNote = function () {
        noteModal.classList.remove('show-modal');
        setTimeout(() => {
            // Optional: add hidden back after transition if needed, but opacity 0 is fine
        }, 300);
    }

    // Close modal on outside click
    window.onclick = function (event) {
        if (event.target == noteModal) {
            closeNote();
        }
    }

    function checkAnswer() {
        const userAnswer = passwordInput.value.trim().toLowerCase();

        if (userAnswer === SECRET_ANSWER.toLowerCase()) {
            unlockSafe();
        } else {
            rejectAnswer();
        }
    }

    function unlockSafe() {
        // Visual updates
        statusText.textContent = "ACCESS GRANTED";
        statusText.classList.add('unlocked');
        statusText.style.color = '#2ecc71';
        questionDisplay.textContent = "OPENING...";

        // Disable input
        passwordInput.disabled = true;
        unlockBtn.disabled = true;

        // Open door animation
        safeDoor.classList.add('open');

        // Show content inside safe
        safeContent.style.opacity = '1';

        // Play Music
        bgMusic.volume = 0.5;
        bgMusic.play().catch(e => console.log("Audio play failed:", e));

        // Trigger Main Celebration Sequence
        launchConfetti();

        // Reveal Bonus Content after delay
        setTimeout(() => {
            // FADE OUT SAFE COMPLETELY
            safeContainer.classList.add('fade-out');

            // Show overlay (coupons, photos) centrally
            overlayContent.classList.remove('hidden');
            overlayContent.classList.add('visible');

        }, 1500);
    }

    function rejectAnswer() {
        // Shake animation
        safeContainer.classList.add('shake');
        passwordInput.style.borderColor = '#e74c3c';
        statusText.textContent = "ACCESS DENIED";

        // Remove shake class after animation
        setTimeout(() => {
            safeContainer.classList.remove('shake');
            passwordInput.style.borderColor = '#445';
            statusText.textContent = "LOCKED";
        }, 500);

        passwordInput.value = '';
        passwordInput.focus();
    }

    function launchConfetti() {
        var duration = 3 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 60 };

        var random = function (min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function () {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }
});
