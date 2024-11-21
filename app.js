const quote = "Speech-to-Text App";
let index = 0;

function typeEffect() {
    if (index < quote.length) {
        document.getElementById("quote").innerHTML += quote.charAt(index);
        index++;
        setTimeout(typeEffect, 50);
    }
}

typeEffect();
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert('Sorry, your browser doesn’t support speech recognition.');
} else {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    const startBtn = document.getElementById('start-btn');
    const transcriptDiv = document.getElementById('transcript');

    startBtn.addEventListener('click', () => {
        recognition.start();
        transcriptDiv.textContent = "Listening...";
        startBtn.classList.add('active');

        setTimeout(() => {
            startBtn.classList.remove('active');
        }, 200);
    });

    recognition.addEventListener('result', (event) => {
        const lastResult = event.results[event.results.length - 1][0].transcript;
        transcriptDiv.textContent = lastResult;
    });

    recognition.addEventListener('error', (event) => {
        transcriptDiv.textContent = `Error: ${event.error}`;
    });

    recognition.addEventListener('end', () => {
        transcriptDiv.textContent += ' (Stopped)';
    });
}

