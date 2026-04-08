
function toggleChat() {
    const widget = document.getElementById("chat-widget");
    const botIcon = document.getElementById("bot-icon");
    const closeIcon = document.getElementById("close-icon");

    if (widget.style.display === "none" || widget.style.display === "") {
        widget.style.display = "flex";  
        botIcon.style.display = "none";    
        closeIcon.style.display = "block"; 
        setTimeout(() => document.getElementById("user-input").focus(), 200);
    } else {
        widget.style.display = "none";     
        botIcon.style.display = "block";   
        closeIcon.style.display = "none";   
    }
}

const placeholderSuggestions = {
    en: [
        "Fee Structure?",
        "Who is Shalini Ma'am?",
        "Tell me about college.",
        "Admission deadline?",
        "ID Card process?",
        "Elective Subjects?",
        "College contact?",
        "Dress Code?",
        "Seats in BCA?",
        "College type?",
        "College affiliation?",
        "Transfer Certificate?",
        "Character Certificate?",
        "Library card process?",
        "Where is the college?",
        "College timings?",
        "Scholarship details?",
        "Eligibility Criteria?",
        "Library Details?",
        "End Semester Result?",
        "Attendance Criteria?",
        "College Placement?",
        "Entrance Exam?",
        "College Faculty?",
        "Admission Deadline?"

    ],
    hi: [
        "फीस की संरचना क्या है?",
    "शालिनी मैम कौन हैं?",
    "कॉलेज के बारे में जानकारी?",
    "प्रवेश की अंतिम तिथि क्या है?",
    "आईडी कार्ड की प्रक्रिया?",
    "इलेक्टिव (Elective) विषय क्या हैं?",
    "कॉलेज का संपर्क नंबर?",
    "ड्रेस कोड (Dress Code) के नियम?",
    "BCA में कितनी सीटें हैं?",
    "कॉलेज का प्रकार (सरकारी/निजी)?",
    "कॉलेज की संबद्धता (Affiliation)?",
    "ट्रांसफर सर्टिफिकेट (TC) कैसे लें?",
    "चरित्र प्रमाण पत्र की प्रक्रिया?",
    "लाइब्रेरी कार्ड कैसे जारी कराएं?",
    "कॉलेज कहाँ स्थित है?",
    "कॉलेज खुलने का समय?",
    "छात्रवृत्ति (Scholarship) का विवरण?",
    "पात्रता मानदंड (Eligibility)?",
    "पुस्तकालय का विवरण?",
    "सेमेस्टर परीक्षा का परिणाम?",
    "उपस्थिति (Attendance) के नियम?",
    "कॉलेज प्लेसमेंट की जानकारी?",
    "प्रवेश परीक्षा (Entrance Exam)?",
    "कॉलेज फैकल्टी के बारे में?"
    ]
};

let placeholderIndex = 0;
let placeholderInterval;

function startPlaceholderRotation() {
    const inputField = document.getElementById("user-input");
    const langKey = currentLangCode.split('-')[0]; // Gets 'en' or 'hi'
    
    // Clear any existing interval to prevent speed-up bugs
    if (placeholderInterval) clearInterval(placeholderInterval);

    placeholderInterval = setInterval(() => {
        const suggestions = placeholderSuggestions[langKey];
        inputField.placeholder = suggestions[placeholderIndex];
        
        placeholderIndex = (placeholderIndex + 1) % suggestions.length;
    }, 2000); 
}

// Call this when the page loads
window.onload = () => {
    startPlaceholderRotation();
};

// Also update the interval whenever the language is changed
function updateAppLanguage() {
    currentLangCode = document.getElementById("lang-select").value;
    recognition.lang = currentLangCode; 
    
    placeholderIndex = 0; // Reset index for the new language
    startPlaceholderRotation(); // Restart with new language list
    
    clearChat();
}

// Valid Topics List
const validTopics = [
    // --- Core Admissions & Fees ---
    "fee", "fees", "pay", "admission", "admit", "entrance", "deadline", "last date", 
    "eligibility", "criteria", "merit", "cutoff", "seat", "vacancy", "form",

    // --- Courses & Departments ---
    "course", "subject", "bca", "bba", "bcom", "mcom", "ma", "msc", "ba", "bsc", 
    "bvoc", "mvoc", "diploma", "pgdrm", "adda", "forensic", "blockchain",
    "department", "faculty", "teacher", "prof", "hod",

    // --- NEP 2020 Specifics ---
    "minor", "vocational", "co-curricular", "elective", "nep", "subject choice",

    // --- Admin & Counter Queries ---
    "id card", "identity", "icard", "library card", "lib card", "membership",
    "scholarship", "vazifa", "uniform", "dress", "tc", "cc", "transfer certificate", 
    "character certificate", "migration", "verification", "original document",
    "window", "counter", "receipt",

    // --- Student Life & Results ---
    "marks", "result", "score", "cgpa", "sgpa", "attendance", "present", "absent",
    "placement", "job", "salary", "package", "internship", "company",
    "library", "book", "issue", "return", "canteen", "hostel", "sports",

    // --- College Info ---
    "about", "npgc", "address", "location", "where", "timing", "time", "open", 
    "close", "affiliation", "affiliated", "university", "contact", "phone", 
    "email", "helpline",

    // --- Greetings ---
    "hi", "hello", "hey", "namaste", "good morning", "morning"
];

const hintElement = document.getElementById("input-hint");
const userInput = document.getElementById("user-input");

userInput.addEventListener("input", (e) => {
    const text = e.target.value.toLowerCase().trim();
    const lang = currentLangCode.split('-')[0];

    // 1. Validation for gibberish (e.g., "asdfghjkl")
    const isGibberish = text.length > 5 && !/[aeiouy]/.test(text); 

    // 2. Validation for irrelevant input
    const hasValidKeyword = validTopics.some(topic => text.includes(topic));

    if (text.length > 10 && !hasValidKeyword) {
        showHint(lang === 'hi' ? 
            "कृपया फीस, प्रवेश या कोर्स जैसे विषयों के बारे में पूछें।" : 
            "Try asking about Fees, Admissions, or Courses.");
    } 
    else if (isGibberish) {
        showHint(lang === 'hi' ? 
            "कृपया सही शब्द लिखें।" : 
            "Please type a valid question.");
    }
    else {
        hideHint();
    }
});

function showHint(message) {
    hintElement.innerText = message;
    hintElement.style.display = "block";
}

function hideHint() {
    hintElement.style.display = "none";
}

// Ensure hint hides when message is sent
const originalSend = send;
send = async function() {
    hideHint();
    await originalSend();
};

const courseNames = [
    "BCA", "BCom", "BSc", "BBA MS", "BBA DB", "BA", "BCom Ecommerce","B.Com Hons", "BVoc Banking", "Bvoc Software Dev", "BAJMC", "BPH", 
    "MA Anthropology","MA Economics","MA English",
    "MA Geography","MA Political Science","MA Psychology",
    "MSc Chemistry","MSc Geoinformatics","MCom", "MVoc Software Dev", "MVoc Banking","MPH", "Forensic Science Course", "Psychological Counselling Course", "Diploma in Data Analytics Course", "Blockchain Course", "Diploma in Analytical Techniques Course",
    "Robotics and AI Course", "PGDRM", "PGDRS", "Diploma in Banking", "Effective Communication Course"
];

const autocompleteSuggestions = {
    en: [
        ...courseNames.map(c => `${c} Fees`),
        ...courseNames.map(c => `${c} Eligibility`),
        ...courseNames.map(c => `${c} Admission`),
        "Scholarship details",
        "Library card process", "ID Card Window", "College Timings", "College Location",
        "Who is Shalini Ma'am?", "Faculty Members", "Placement Package",
        "Minor Subjects", "Vocational Course", "Co-curricular subject",
        "Uniform Dress Code", "Transfer Certificate", "Character Certificate",
        "Admission Deadline", "Entrance Exam Date", "Semester Result",
        "Attendance Criteria", "About College", "College Faculty", "Seats in BCA?"
    ],
    hi: [
        ...courseNames.map(c => `${c} की फीस`),
        ...courseNames.map(c => `${c} के लिए पात्रता`),
        ...courseNames.map(c => `${c} में प्रवेश`),
        "छात्रवृत्ति का विवरण",
        "लाइब्रेरी कार्ड की प्रक्रिया", "आईडी कार्ड (ID Card) विंडो", "कॉलेज खुलने का समय", "कॉलेज कहाँ स्थित है?",
        "शालिनी मैम कौन हैं?", "शिक्षकगण", "प्लेसमेंट पैकेज (Placement)",
        "माइनर विषय (Minor)", "वोकेशनल कोर्स (Vocational)", "को-करिकुलर विषय",
        "ड्रेस कोड के नियम", "ट्रांसफर सर्टिफिकेट (TC)", "चरित्र प्रमाण पत्र (CC)",
        "प्रवेश की अंतिम तिथि", "प्रवेश परीक्षा की तारीख", "सेमेस्टर का परिणाम",
        "उपस्थिति (Attendance) के नियम", "कॉलेज के बारे में", "कॉलेज फैकल्टी", "BCA में कितनी सीटें हैं?"
    ]
};

const input = document.getElementById("user-input");
const listContainer = document.getElementById("autocomplete-list");

// ui.js - Updated Listener

input.addEventListener("input", function() {
    const val = this.value;
    closeAllLists();
    if (!val || val.length < 2) return false;

    // Get current language (en or hi)
    const langKey = currentLangCode.split('-')[0];
    const currentSuggestions = autocompleteSuggestions[langKey] || autocompleteSuggestions['en'];

    const filtered = currentSuggestions.filter(item => 
        item.toLowerCase().includes(val.toLowerCase())
    );

    if (filtered.length > 0) {
        listContainer.style.display = "block";
        filtered.forEach(item => {
            const b = document.createElement("div");
            const regex = new RegExp(`(${val})`, "gi");
            b.innerHTML = item.replace(regex, "<strong>$1</strong>");
            
            b.addEventListener("click", function() {
                input.value = item;
                closeAllLists();
                send(); 
            });
            listContainer.appendChild(b);
        });
    }
});

function closeAllLists() {
    listContainer.innerHTML = "";
    listContainer.style.display = "none";
}

// Close list if user clicks outside
document.addEventListener("click", function (e) {
    if (e.target !== input) closeAllLists();
});

// Integration with your existing send function
const originalSendForAutocomplete = send;
send = async function() {
    closeAllLists();
    await originalSendForAutocomplete();
};