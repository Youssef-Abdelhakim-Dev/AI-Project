async function sendToAI() {
    const text = document.getElementById('userInput').value;
    const resultDiv = document.getElementById('result');

    if (!text) {
        resultDiv.innerText = "Please type something!";
        return;
    }

    resultDiv.innerText = "Thinking...";

    try {
        // We fetch from the Python server running on localhost:5000
        const response = await fetch('http://127.0.0.1:5000/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: text })
        });

        const data = await response.json();
        resultDiv.innerHTML = `Analysis: ${data.sentiment} <br> <small>Score: ${data.score}</small>`;
    } catch (error) {
        resultDiv.innerText = "Error: Is the Python server running?";
        console.error(error);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('analyzeBtn');
    if (btn) {
        btn.addEventListener('click', sendToAI);
    }
});