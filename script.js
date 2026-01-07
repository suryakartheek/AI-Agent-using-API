import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCjDh2tKSYQA7CPF2s8PaScUKLiex5WQ1E"; 
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    systemInstruction: "Your name is Matrix, a friendly and helpful AI agent. Use emojis occasionally." 
});

const log = document.getElementById('chat-log');
const input = document.getElementById('user-input');

// 1. Function to show the "Thinking" dots
function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'ai-msg loading';
    loadingDiv.id = 'loading-indicator';
    loadingDiv.innerHTML = `<span></span><span></span><span></span>`;
    log.appendChild(loadingDiv);
    log.scrollTop = log.scrollHeight;
}

// 2. Function to create the typewriter "Loveable" typing effect
function typeEffect(element, text) {
    let i = 0;
    element.innerHTML = ""; // Clear bubble first
    const interval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            log.scrollTop = log.scrollHeight;
        } else {
            clearInterval(interval);
        }
    }, 20); // Speed of typing (ms)
}

async function handleChat() {
    const text = input.value;
    if (!text) return;

    // Display User Message
    log.innerHTML += `<div class="user-msg">${text}</div>`;
    input.value = '';

    // Show AI "Thinking"
    showLoading();

    try {
        const result = await model.generateContent(text);
        const responseText = result.response.text();

        // Remove loading dots
        document.getElementById('loading-indicator').remove();

        // Create new AI bubble and apply typing effect
        const aiBubble = document.createElement('div');
        aiBubble.className = 'ai-msg';
        log.appendChild(aiBubble);
        
        typeEffect(aiBubble, responseText);

    } catch (err) {
        document.getElementById('loading-indicator').remove();
        log.innerHTML += `<div class="ai-msg" style="color:#ff5555">Error: ${err.message}</div>`;
    }
}

document.getElementById('send-btn').onclick = handleChat;
input.addEventListener('keypress', (e) => { if(e.key === 'Enter') handleChat(); });
