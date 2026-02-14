document.addEventListener('DOMContentLoaded', () => {

    const envelopeStage = document.getElementById('envelope-stage');
    const envelope = document.querySelector('.envelope');
    const flap = document.querySelector('.flap');
    const seal = document.querySelector('.seal');
    const finalStage = document.getElementById('final-stage');
    const kissStage = document.getElementById('kiss-stage');

    let stage = 0;

    window.openKiss = function () {
        if (stage !== 0) return;
        stage = 1;

        // Open Envelope
        envelope.classList.add('open'); // Flap opens
        seal.style.transform = 'scale(0)'; // Seal disappears

        // After card pulls out, launch kiss
        setTimeout(() => {
            launchFlyingKiss();
        }, 800);
    }

    function launchFlyingKiss() {
        // Hide envelope
        envelopeStage.classList.add('hidden');

        // Show Flying Emoji
        // Ideally we create a new element dynamically or use the styled div kiss-stage
        // Let's use confetti-like effect but with kisses

        // SHOW KISS STAGE
        kissStage.classList.remove('hidden');
        kissStage.style.display = 'flex';

        // Emoji flies (CSS animation runs automatically)
        const emoji = document.querySelector('.flying-emoji');

        // On animation end (3s) -> TRANSITION TO FINAL
        setTimeout(() => {
            kissStage.classList.add('hidden');
            showFinalStage();
        }, 2800); // slightly before end
    }

    function showFinalStage() {
        finalStage.classList.remove('hidden');
        finalStage.style.display = 'flex';

        // Burst of kisses
        for (let i = 0; i < 20; i++) {
            setTimeout(() => createKissMark(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            ), i * 100);
        }
    }

    // Interactive Shower
    window.showerKisses = function () {
        // Burst sound if possible (omitted for simplicity)
        // Vibrate
        if (navigator.vibrate) navigator.vibrate(100);

        // Create random kiss marks
        for (let i = 0; i < 5; i++) {
            createKissMark(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }

        // Change text occasionally
        const messages = [
            "Muah! 😘",
            "Love You! ❤️",
            "Tightest Hug & Kiss! 🤗",
            "You are sweet! 🍬",
            "FOREVER MINE! 💍"
        ];
        const msgEl = document.querySelector('.message');
        if (Math.random() > 0.7) {
            msgEl.textContent = messages[Math.floor(Math.random() * messages.length)];
        }
    }

    function createKissMark(x, y) {
        const kiss = document.createElement('div');
        kiss.classList.add('kiss-mark');
        kiss.innerHTML = Math.random() > 0.5 ? '💋' : '😘';

        // Random style
        const size = Math.random() * 2 + 1 + 'rem';
        const rotate = Math.random() * 60 - 30 + 'deg';

        kiss.style.left = x + 'px';
        kiss.style.top = y + 'px';
        kiss.style.fontSize = size;
        kiss.style.transform = `rotate(${rotate})`;

        document.body.appendChild(kiss);

        // Remove after animation
        setTimeout(() => kiss.remove(), 2000);
    }

});
