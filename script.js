import { GoogleGenerativeAI } from "@google/generative-ai";

// Replace with your restricted key
const API_KEY = "AIzaSyAJyFUUx0LN3alZmvHwL3q6_1GcO1HHR2M"; 

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

async function sendMessage() {
    const input = document.getElementById('user-input');
    const log = document.getElementById('chat-log');
    const text = input.value;
    if(!text) return;

    log.innerHTML += `<p><b>You:</b> ${text}</p>`;
    input.value = '';

    try {
        const result = await model.generateContent(text);
        const response = await result.response;
        log.innerHTML += `<p><b>Agent:</b> ${response.text()}</p>`;
    } catch (e) {
        log.innerHTML += `<p style="color:red">Error: ${e.message}</p>`;
    }
}

document.getElementById('send-btn').onclick = sendMessage;
