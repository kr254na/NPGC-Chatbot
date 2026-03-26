let chatContext = { lastCourse: null , lastIntent: null};

const GREETINGS = {
    en: ["hi", "hello", "hey", "namaste", "good morning"],
    hi: ["नमस्ते", "हेलो", "सुप्रभात", "प्रणाम", "नमस्कार"]
};

const GREETING_REPLIES = {
    en: [
        "Hello! How can I help you today?",
        "Hi there! What would you like to know?",
        "Hey! I'm here to help"
    ],
    hi: [
        "नमस्ते! मैं आज आपकी कैसे सहायता कर सकता हूँ?",
        "नमस्ते! आप क्या जानना चाहेंगे?",
        "प्रणाम! मैं आपकी मदद के लिए यहाँ हूँ।"
    ]
};

function isGreeting(message) {
  return GREETINGS.some(
    (greet) => message === greet || message.startsWith(greet + " ")
  );
}

function getRandomReply(list) {
  return list[Math.floor(Math.random() * list.length)];
}
async function send() {
    const inputField = document.getElementById("user-input");
    let message = inputField.value.trim();
    if (!message) return;

    addMessage(message, "user");
    inputField.value = "";
    const typing = showTyping();
    const langKey = currentLangCode.split('-')[0];

    try {
        const response = await fetch("http://localhost:8080/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                message: message, 
                lang: langKey,
                context: chatContext
            }), 
        });

        const data = await response.json();
        if (data.context) {
            chatContext = data.context;
        }

        setTimeout(() => {
            typing.remove();
            addMessage(data.reply, "bot", data.buttons || [], data.link);
            speak(data.reply); 
        }, 900);
    } catch (error) {
        typing.remove();
        addMessage("Server Error", "bot");
    }
}

function clearChat() {
    const box = document.getElementById("chat-box");
    const langKey = currentLangCode.split('-')[0];
    chatContext = { lastCourse: null };
    const welcomeMsg = {
        en: `👋 Hi! I’m the <b>NPGC Assistant</b>.<br>Ask me about <b>fees, courses, faculty, or admissions</b>.`,
        hi: `👋 नमस्ते! मैं <b>NPGC सहायक</b> हूँ।<br>मुझसे <b>शुल्क विवरण, पाठ्यक्रम, शिक्षक वर्ग या प्रवेश</b> के बारे में पूछें।`
    };

    box.innerHTML = `<div class="msg bot">${welcomeMsg[langKey]}</div>`;
}


function addMessage(text, sender, buttons = [], link = null) {
  const box = document.getElementById("chat-box");

  const div = document.createElement("div");
  div.className = `msg ${sender}`;
if (sender === "bot") {
  if (link) {
    div.innerHTML = `${text}<br>
      <a href="${link}" target="_blank"
      style="color:var(--primary-red);text-decoration:underline;">
      ${link}</a>`;
  } else {
    div.innerHTML = text; 
  }
} else {
  div.innerText = text; 
}


  box.appendChild(div);

  if (buttons.length) {
    const btnWrap = document.createElement("div");
    btnWrap.className = "btn-wrap";

    buttons.forEach((b) => {
      const btn = document.createElement("button");
      btn.innerText = b.label;
      btn.onclick = () => sendButton(b.value);
      btnWrap.appendChild(btn);
    });

    box.appendChild(btnWrap);
  }

  box.scrollTop = box.scrollHeight;
}

function sendButton(value) {
  document.getElementById("user-input").value = value;
  send();
}

document
  .getElementById("user-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      send();
    }
  });

function showTyping() {
  const box = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.className = "msg bot typing";
  div.innerHTML = "<span></span><span></span><span></span>";
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
  return div;
}
function updateAppLanguage() {
    currentLangCode = document.getElementById("lang-select").value;
    recognition.lang = currentLangCode; 
    
    clearChat();
}

function startListening() {
    const micBtn = document.getElementById("mic-btn");
    
    recognition.lang = currentLangCode; 
    
    micBtn.style.background = "var(--dark-red)"; 
    micBtn.innerHTML = "🛑"; 
    
    recognition.start();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById("user-input").value = transcript;
        micBtn.style.background = ""; 
        micBtn.innerHTML = "🎤";
        send();
    };

    recognition.onerror = (event) => {
        console.error("Speech error:", event.error);
        micBtn.style.background = "";
        micBtn.innerHTML = "🎤";
    };

    recognition.onend = () => {
        micBtn.style.background = "";
        micBtn.innerHTML = `<i class="fa-solid fa-microphone"></i>`;
    };
}

function speak(text) {
    if (!isVoiceEnabled) return;

    window.speechSynthesis.cancel();

    const cleanText = text.replace(/<\/?[^>]+(>|$)/g, ""); 
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    utterance.lang = currentLangCode; 
  
    const voices = window.speechSynthesis.getVoices();
    if (currentLangCode === 'hi-IN') {
      
        const hindiVoice = voices.find(
          v => v.lang.includes('hi'));
        if (hindiVoice) utterance.voice = hindiVoice;
        utterance.pitch = 1.0;
    }
    if(currentLangCode == 'en-IN')
    {
      const englishVoice = voices.find(
          v => v.name.includes('Microsoft Mark'));
        if (englishVoice) utterance.voice = englishVoice;
        utterance.pitch = 2.0;
    }
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
}

window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
};
let isVoiceEnabled = false;
let currentLangCode = 'en-IN';
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false;
recognition.interimResults = false;

function toggleVoiceOutput() {
    isVoiceEnabled = !isVoiceEnabled;
    const btn = document.getElementById("voice-toggle");
    btn.innerHTML = isVoiceEnabled ? "🔊" : "🔈";
    if (!isVoiceEnabled) window.speechSynthesis.cancel();
}
