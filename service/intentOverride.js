function detectRuleBasedIntent(userMsg) {
    // Initialize with default values
    let bestIntent = null;
    let highestScore = 0;

    // Helper function to update if a match is found
    const setIntent = (intentName) => {
        bestIntent = { Intent: intentName };
        highestScore = 1;
    };

    // --- ACADEMIC & ADMISSION ---
    if (userMsg.includes("eligibility")) setIntent("ADMISSION_ELIGIBILITY");

    if (userMsg.includes("entrance") || userMsg.includes("admission test")) {
        setIntent("ADMISSION_ENTRANCE_EXAM");
    }

    if (userMsg.includes("seat") || userMsg.includes("seats") || userMsg.includes("vacancy")) {
        setIntent("ADMISSION_SEATS");
    }

    if (userMsg.includes("fee") || userMsg.includes("fees") || userMsg.includes("price") || userMsg.includes("cost")) {
        setIntent("FEE_QUERY");
    }

    if (userMsg.includes("faculty") && userMsg.includes("department")) {
        setIntent("FACULTY_BY_DEPT");
    }

    // --- FACILITIES ---
    if (userMsg.includes("library") || userMsg.includes("book") || userMsg.includes("issue") || userMsg.includes("return")) {
        setIntent("LIBRARY_QUERY");
    }

    if (userMsg.includes("marks") || userMsg.includes("score") || userMsg.includes("result") || userMsg.includes("cgpa")) {
        setIntent("MARKS_QUERY");
    }

    if (userMsg.includes("attendance") || userMsg.includes("present") || userMsg.includes("absent")) {
        setIntent("ATTENDANCE_QUERY");
    }

    if (userMsg.includes("placement") || userMsg.includes("job") || userMsg.includes("salary") || userMsg.includes("package")) {
        setIntent("PLACEMENT_QUERY");
    }

    if (userMsg.includes("deadline") || userMsg.includes("last date") || userMsg.includes("closing date")) {
        setIntent("ADMISSION_DEADLINE");
    }

    // --- COLLEGE GENERAL INFO ---
    if (userMsg.includes("about college") || userMsg.includes("about npgc") || userMsg.includes("history")) {
        setIntent("COLLEGE_ABOUT");
    }

    if (userMsg.includes("contact") || userMsg.includes("phone") || userMsg.includes("email") || userMsg.includes("call")) {
        setIntent("COLLEGE_CONTACT");
    }

    if (userMsg.includes("address") || userMsg.includes("location") || userMsg.includes("where is") || userMsg.includes("situated")) {
        setIntent("COLLEGE_ADDRESS");
    }

    if (userMsg.includes("timing") || userMsg.includes("time") || userMsg.includes("open") || userMsg.includes("close")) {
        setIntent("COLLEGE_TIMINGS");
    }

    if (userMsg.includes("affiliation") || userMsg.includes("affiliated") || userMsg.includes("recognised") || userMsg.includes("ugc")) {
        setIntent("COLLEGE_AFFILIATION");
    }

    if (userMsg.includes("college type") || userMsg.includes("government") || userMsg.includes("private") || userMsg.includes("aided")) {
        setIntent("COLLEGE_TYPE");
    }

    
    if (userMsg.includes("id card") || userMsg.includes("identity card") || userMsg.includes("i card")) {
        setIntent("ID_CARD_QUERY");
    }

    if (userMsg.includes("character certificate") || userMsg.includes("cc") || userMsg.includes("transfer certificate") ||      userMsg.includes("tc")) {
        setIntent("CERTIFICATE_QUERY");
    }

if(userMsg.includes("scholarship") || userMsg.includes("up scholarship") || userMsg.includes("financial aid")) {
    setIntent("SCHOLARSHIP_QUERY");
}

if (userMsg.includes("uniform") || userMsg.includes("dress code")) {
    setIntent("UNIFORM_QUERY");
}
if (userMsg.includes("library card")) {
    setIntent("LIBRARY_CARD_QUERY");
}
if (userMsg.includes("minor") || userMsg.includes("vocational") || userMsg.includes("co-curricular") || userMsg.includes("subject choice")) {
    setIntent("SUBJECT_CHOICE_QUERY");
}


    // --- FACULTY BY NAME REGEX ---
    const isWhoIsName = /^who is\s+[a-z]{3,}/i.test(userMsg) && !userMsg.includes("department");
    if (isWhoIsName) {
        setIntent("FACULTY_BY_NAME");
    }

    // Return null if no intent was found, otherwise return the object
    return bestIntent ? { bestIntent, highestScore } : null;
}

module.exports = { detectRuleBasedIntent };