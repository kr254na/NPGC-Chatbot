const EmbeddingService = require("../service/embeddingService");
const {normalize} = require("../utils/normalizer");
const pool = require("../config/db");
const { findBestMatch } = require("../utils/matcher");
const RESPONSE_VARIANTS = require("../constants/responseVariants");
const { detectRuleBasedIntent } = require("../service/intentOverride");

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

let courses = [];

exports.handleChat = async (req, res) => {
  const rawMsg = req.body.message.toLowerCase().replace(/\./g, '');
  const lang = req.body.lang || "en";
  let context = req.body.context || { lastCourse: null,lastIntent:true, expectingFollowUp:false };
  const userMsg = normalize(rawMsg);

  if (["hi", "hello", "hey", "namaste"].includes(userMsg)) {
    return res.json({
      reply:
        lang === "hi"
          ? "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?"
          : "Hello! How can I help you?",
    });
  }

  try {
    const userVector = EmbeddingService.generateEmbedding(userMsg);
    const [intents] = await pool.execute(
      "SELECT Intent, TargetTable, Vector FROM chatbotknowledge"
    );
    let bestIntent = null;
    let highestScore = 0;
    for (const item of intents) {
      const intentVector = item.Vector;
      const score = EmbeddingService.calculateSimilarity(
        userVector,
        intentVector
      );
      if (score > highestScore) {
        highestScore = score;
        bestIntent = item;
      }
    }
    const ruleIntent = detectRuleBasedIntent(userMsg);
if (ruleIntent) {
  bestIntent = { Intent: ruleIntent.bestIntent.Intent };
  highestScore = ruleIntent.highestScore;
}

/*if(highestScore<0.2){
    
    if(context.lastIntent){
        bestIntent = {Intent: context.lastIntent};
        highestScore = 1;
    }
}*/

if (highestScore < 0.2 && context.lastIntent && context.expectingFollowUp) {
  bestIntent = { Intent: context.lastIntent };
  highestScore = 0.8;
}
console.log(bestIntent);

    if (highestScore < 0.2) {
    
      const isHi = lang === 'hi';
      
      return res.json({
        reply: isHi 
          ? "मैं आपकी निम्नलिखित विषयों में सहायता कर सकता हूँ:" 
          : "I can help you with the following topics:",
        buttons: [
          { 
            label: isHi ? "🎓 प्रवेश जानकारी" : "🎓 Admission", 
            value: isHi ? "प्रवेश जानकारी" : "admission" 
          },
          { 
            label: isHi ? "💰 शुल्क विवरण" : "💰 Fees", 
            value: isHi ? "शुल्क विवरण" : "fees" 
          },
          { 
            label: isHi ? "📘 पाठ्यक्रम" : "📘 Courses", 
            value: isHi ? "पाठ्यक्रम" : "course" 
          },
          { 
            label: isHi ? "👨‍🏫 शिक्षक वर्ग" : "👨‍🏫 Faculty", 
            value: isHi ? "शिक्षक वर्ग" : "faculty" 
          },
          { 
            label: isHi ? "🏫 नियुक्ति" : "🏫 Placement", 
            value: isHi ? "नियुक्ति" : "placement" 
          },
        ],
      });
    }
    const intent = bestIntent.Intent;
    let matchedCourse = null;
    if (
      [
        "COURSE_INFO",
        "FEE_QUERY",
        "ADMISSION_DEADLINE",
        "ADMISSION_ELIGIBILITY",
        "ADMISSION_ENTRANCE_EXAM",
        "ADMISSION_SEATS",
      ].includes(intent)
    ) {
      const [rows] = await pool.execute("SELECT c.course, c.duration, c.seats, c.eligibility, c.entrance, c.admissiondeadline, ct.type, d.deptName, f.fees  FROM course c join courseType ct on c.courseTypeId=ct.id left join department d on c.deptId=d.deptId left join fees f on c.courseId=f.courseId"); 
      courses=rows;
      matchedCourse = resolveCourse(userMsg, courses, context);

if (matchedCourse) {
  context.lastCourse = matchedCourse;
}

        
    } 
  

    if (intent === "FACULTY_BY_DEPT") {
        context.lastIntent = "FACULTY_BY_DEPT";
    const [departments] = await pool.execute(
        "SELECT deptId, deptName FROM department"
    );
    
    const { bestMatch: matchedDept, score } = findBestMatch(userMsg, departments, 'deptName');

    if (matchedDept && score > 2) {
        const [teachers] = await pool.execute(
            "SELECT name FROM faculty WHERE deptId = ?",
            [matchedDept.deptId]
        );

        const names = teachers.map((t) => t.name).join(", ");
        const hasTeachers = teachers.length > 0;
        context.expectingFollowUp = false;
        if (lang === 'hi') {
            return res.json({
                reply: `<b>${matchedDept.deptName}</b> विभाग के फैकल्टी सदस्य हैं: ${
                    hasTeachers ? names : "फिलहाल कोई सूचीबद्ध नहीं है"
                }।`,
                context
            });
        } else {
            return res.json({
                reply: `The faculty members in the <b>${matchedDept.deptName}</b> are: ${
                    hasTeachers ? names : "None listed at the moment"
                }.`,
                context
            });
        }
    }

     context.expectingFollowUp = true;
    return res.json({
        success: false,
        selection: "department",
        reply: lang === 'hi' 
            ? "आप किस विभाग के बारे में पूछ रहे हैं? (जैसे कंप्यूटर साइंस, कॉमर्स, या मैनेजमेंट)" 
            : "Which department are you inquiring about? (e.g., Computer Science, Commerce, or Management)",
        buttons: [
            { label: lang === 'hi' ? "कंप्यूटर साइंस" : "Computer Science", value: lang === 'hi' ? "कंप्यूटर साइंस" : "Computer Science" },
            { label: lang === 'hi' ? "कॉमर्स" : "Commerce", value: lang === 'hi' ? "कॉमर्स" : "Commerce" },
            { label: lang === 'hi' ? "मैनेजमेंट" : "Management", value: lang === 'hi' ? "मैनेजमेंट" : "Management" }
        ],
        context
    });
}
      
 if (intent === 'COURSE_INFO') {
    context.lastIntent = 'COURSE_INFO';
     context.expectingFollowUp = false;
        if (matchedCourse) {
          const template = getRandom(RESPONSE_VARIANTS.COURSE_INFO[lang]);
        const reply = template
            .replace(/{course}/g, matchedCourse.course)
            .replace(/{duration}/g, matchedCourse.duration)
            .replace(/{type}/g, matchedCourse.type)
            .replace(/{dept}/g, matchedCourse.deptName)
            .replace(/{eligibility}/g, matchedCourse.eligibility)
            .replace(/{entrance}/g, matchedCourse.entrance || "No Entrance")
            .replace(/{seats}/g, matchedCourse.seats)
            .replace(/{fees}/g, matchedCourse.fees ? Number(matchedCourse.fees).toLocaleString() : "Contact Office");
            return res.json({ reply, context});
        }
        context.expectingFollowUp = true;
        return res.json({ 
          reply: lang === 'hi' ? "कृपया कोर्स का नाम बताएं (जैसे BCA, BBA या B.Com)" : "Please mention the course name (e.g., BCA, BBA, or B.Com)",
         buttons: [
    { 
        label: lang === 'hi' ? "BCA विवरण" : "BCA Details", 
        value: lang === 'hi' ? "BCA विवरण" : "BCA course info", 
    },
    { 
        label: lang === 'hi' ? "B.Com विवरण" : "BCOM Details", 
        value: lang === 'hi' ? "B.Com विवरण" : "BCOM course info",
    },
    { 
        label: lang === 'hi' ? "BBA विवरण" : "BBA Details", 
        value: lang === 'hi' ? "BBA विवरण" : "BBA course info"
    }
],
context
         });
    }

  if (intent === "ADMISSION_ELIGIBILITY") {
    context.lastIntent = "ADMISSION_ELIGIBILITY";
     context.expectingFollowUp = false;
    if (matchedCourse ) {
        const template = getRandom(RESPONSE_VARIANTS.ADMISSION_ELIGIBILITY[lang]);
        const reply = template
            .replace(/{course}/g, matchedCourse.course)
            .replace(/{eligibility}/g, matchedCourse.eligibility);
        return res.json({ reply,context });
    }

   const isHi = lang === 'hi';
 context.expectingFollowUp = true;
return res.json({
    reply: isHi 
        ? "पात्रता (Eligibility) आपके द्वारा चुने गए कोर्स पर निर्भर करती है।<br>" +
          "आमतौर पर, स्नातक (UG) कोर्सेज के लिए 10+2 और स्नातकोत्तर (PG) कोर्सेज के लिए संबंधित स्नातक डिग्री की आवश्यकता होती है।<br>" +
          "सटीक जानकारी के लिए कृपया कोर्स का नाम बताएं।"
        : "Eligibility depends on the course you are applying for.<br>" +
          "Generally, undergraduate courses require 10+2 qualification and postgraduate courses require a relevant bachelor's degree.<br>" +
          "Please tell me the course name for exact eligibility.",
    buttons: [
        { 
            label: isHi ? "BCA पात्रता" : "BCA Eligibility", 
            value: isHi ? "BCA पात्रता" : "BCA Eligibility" 
        },
        { 
            label: isHi ? "BCom पात्रता" : "BCom Eligibility", 
            value: isHi ? "BCom पात्रता" : "BCom Eligibility" 
        },
        { 
            label: isHi ? "MA पात्रता" : "MA Eligibility", 
            value: isHi ? "MA पात्रता" : "MA Eligibility"
        }
    ],
    context
});
}
   if (intent === "ADMISSION_ENTRANCE_EXAM") {
    context.lastIntent = "ADMISSION_ENTRANCE_EXAM";
     context.expectingFollowUp = false;
    if (matchedCourse) {
        if (matchedCourse.entrance && matchedCourse.entrance !== 'No Entrance') {
            const template = getRandom(RESPONSE_VARIANTS.ADMISSION_ENTRANCE_EXAM[lang]);
            return res.json({ 
                reply: template
                    .replace(/{course}/g, matchedCourse.course)
                    .replace(/{entrance}/g, matchedCourse.entrance) ,
                    context
            });
        } else {
            const noExamReply = lang === 'hi' 
                ? `<b>${matchedCourse.course}</b> के लिए किसी प्रवेश परीक्षा की आवश्यकता नहीं है। यह मेरिट आधारित है।`
                : `<b>${matchedCourse.course}</b> does not require an entrance exam. Admission is merit-based.`;
            return res.json({ reply: noExamReply,context });
        }
    }

     context.expectingFollowUp = true;
    if (lang === 'hi') {
        return res.json({
            reply: "कुछ कोर्सेज के लिए प्रवेश परीक्षा अनिवार्य है जबकि अन्य मेरिट-आधारित हैं।<br>" +
                   "LUACMAT / LUACCAT जैसी परीक्षाएं विशिष्ट प्रोग्राम्स के लिए लागू हो सकती हैं।<br>" +
                   "सटीक विवरण के लिए कृपया कोर्स का नाम बताएं।",
            buttons: [
                { label: "BCA प्रवेश परीक्षा", value: "BCA प्रवेश परीक्षा" },
                { label: "BBA प्रवेश परीक्षा", value: "BBA प्रवेश परीक्षा" },
                { label: "BCom प्रवेश परीक्षा", value: "BCom प्रवेश परीक्षा"}
            ],
            context
        });
    } else {
        return res.json({
            reply: "Some courses require an entrance examination while others are merit-based.<br>" +
                   "Entrance exams such as LUACMAT / LUACCAT may be applicable for specific programs.<br>" +
                   "Please mention the course name to know exact details.",
            buttons: [
                { label: "BCA Entrance", value: "BCA entrance exam" },
                { label: "BBA Entrance", value: "BBA entrance exam" },
                { label: "B.Com Entrance", value: "B.Com entrance exam" }
            ],
            context
        });
    }
}

  if (intent === "ADMISSION_SEATS") {
    context.lastIntent = "ADMISSION_SEATS";
     context.expectingFollowUp = false;
    if (matchedCourse) {
        const template = getRandom(RESPONSE_VARIANTS.ADMISSION_SEATS[lang]);
        const reply = template
            .replace(/{course}/g, matchedCourse.course)
            .replace(/{seats}/g, matchedCourse.seats);
            
        return res.json({ reply, context});
    }
      context.expectingFollowUp = true;
    if (lang === 'hi') {
        return res.json({
            reply: "सीटों की उपलब्धता कोर्स और श्रेणी (category) के अनुसार भिन्न होती है।<br>" +
                   "कुल सीटें या वर्तमान रिक्ति की जांच के लिए कृपया कोर्स का नाम बताएं।",
            buttons: [
                { label: "BCA सीटें", value: "BCA seats" },
                { label: "B.Com सीटें", value: "B.Com seats" },
                { label: "BBA सीटें", value: "BBA seats" }
            ],
            context
        });
    } else {
        return res.json({
            reply: "Seat availability varies by course and category.<br>" +
                   "Please specify the course name to check total seats or current vacancy.",
            buttons: [
                { label: "BCA Seats", value: "BCA seats" },
                { label: "B.Com Seats", value: "B.Com seats" },
                { label: "BBA Seats", value: "BBA seats" }
            ]
        });
    }
}

    if (intent === "ADMISSION_DEADLINE") {
        context.lastIntent='ADMISSION_DEADLINE';
         context.expectingFollowUp = false;
    if (matchedCourse) {
        const template = getRandom(RESPONSE_VARIANTS.ADMISSION_DEADLINE[lang]);
        const reply = template
            .replace(/{course}/g, matchedCourse.course)
            .replace(/{deadline}/g, matchedCourse.admissiondeadline || (lang === 'hi' ? "कार्यालय से संपर्क करें" : "Contact Office"));
        
        return res.json({ reply, context });
    }

     context.expectingFollowUp = true;
    if (lang === 'hi') {
        return res.json({
            reply: "सटीक प्रवेश समय सीमा (Deadline) जानने के लिए कृपया कोर्स का नाम बताएं।",
            buttons: [
                { label: "BCA डेडलाइन", value: "BCA deadline" },
                { label: "B.Com डेडलाइन", value: "B.Com deadline" },
                { label: "BBA डेडलाइन", value: "BBA deadline" }
            ],
            context
        });
    } else {
        return res.json({
            reply: "Please mention the course name to know the exact admission deadline.",
            buttons: [
                { label: "BCA Deadline", value: "BCA deadline" },
                { label: "B.Com Deadline", value: "B.Com deadline" },
                { label: "BBA Deadline", value: "BBA deadline" }
            ],
            context
        });
    }
}

    if (intent === "FEE_QUERY") {
        context.lastIntent='FEE_QUERY';
         context.expectingFollowUp = false;
            if (matchedCourse) {
                const fees = matchedCourse.fees ? Number(matchedCourse.fees).toLocaleString() : (lang === 'hi' ? "अपडेट नहीं किया गया" : "not updated");
                const template = getRandom(RESPONSE_VARIANTS.FEE_QUERY[lang]);
                return res.json({ reply: template.replace(/{course}/g, matchedCourse.course).replace(/{fees}/g, fees),context });
            }
             context.expectingFollowUp = true;
            return res.json({ reply: lang === 'hi' ? "आप किस कोर्स की फीस जानना चाहते हैं?" : "Fees depend on the selected course. Which course fees do you want to know?" ,context});
        }

    if (intent === "FACULTY_BY_NAME") {
        context.lastIntent='FACULTY_BY_NAME';
         context.expectingFollowUp = false;
    const [facData] = await pool.execute(`
        SELECT f.name, d.deptName 
        FROM faculty f
        JOIN department d ON f.deptId = d.deptId
    `);
    const cleanMsg = userMsg
        .replace(/\b(dr|prof|mr|mrs|miss|ms|sir|maam|mam)\.?\b/gi, "")
        .trim();
    const { bestMatch: teacher, score } = findBestMatch(cleanMsg, facData, 'name');
    if (teacher && score >= 1) {
        const template = getRandom(RESPONSE_VARIANTS.FACULTY_BY_NAME[lang]);
        const reply = template
            .replace(/{name}/g, teacher.name)
            .replace(/{dept}/g, teacher.deptName);
        return res.json({ reply,context });
    }
     context.expectingFollowUp = true;
    return res.json({
        reply: `I couldn't find a specific faculty member matching that name. Please refer to our official directory:`,
        link: "https://www.npgc.in/Academics-Department.aspx",
        context
    });
}
 

    if (intent === "LIBRARY_QUERY") {
        context.lastIntent = null;
        context.lastCourse = null;
         context.expectingFollowUp = false;
      return res.json({
        reply: getRandom(RESPONSE_VARIANTS.LIBRARY_QUERY[lang]),
        link: "https://www.npgc.in/Library-AboutLibrary.aspx",
        context
    });
    }

    if (intent === "MARKS_QUERY") {
        context.lastIntent = null;
        context.lastCourse = null;
         context.expectingFollowUp = false;
      return res.json({
        reply: getRandom(RESPONSE_VARIANTS.MARKS_QUERY[lang]),
        link: "https://result.npgc.in/",
        context
    });
    }

    if (intent === "ATTENDANCE_QUERY") {
        context.lastIntent = null;
        context.lastCourse = null;
         context.expectingFollowUp = false;
     return res.json({
        reply: getRandom(RESPONSE_VARIANTS.ATTENDANCE_QUERY[lang]),
        context
    });
    }

    if (intent === "PLACEMENT_QUERY") {
        context.lastIntent = null;
        context.lastCourse = null;
         context.expectingFollowUp = false;
      return res.json({
        reply: getRandom(RESPONSE_VARIANTS.PLACEMENT_QUERY[lang]),
        link: "https://www.npgc.in/StudentSupport-Placements.aspx",
        context
    });
    }

    if (intent === "COLLEGE_ABOUT") {
        context.lastIntent = null;
        context.lastCourse = null;
         context.expectingFollowUp = false;
      return res.json({
        reply: getRandom(RESPONSE_VARIANTS.COLLEGE_ABOUT[lang]),
        link: "https://www.npgc.in/About-AboutTheCollege.aspx",
        context
    });
    }

    if (intent === "COLLEGE_CONTACT") {
        context.lastIntent = null;
        context.lastCourse = null;
         context.expectingFollowUp = false;
      return res.json({
        reply: getRandom(RESPONSE_VARIANTS.COLLEGE_CONTACT[lang]),
        context
    });
    }

    if (intent === "COLLEGE_TIMINGS") {
        context.lastIntent = null;
        context.lastCourse = null;
         context.expectingFollowUp = false;
      return res.json({
        reply: getRandom(RESPONSE_VARIANTS.COLLEGE_TIMINGS[lang]),
        context
    });
    }

    if (intent === "COLLEGE_AFFILIATION") {
        context.lastIntent = null;
        context.lastCourse = null;
         context.expectingFollowUp = false;
      return res.json({
        reply: getRandom(RESPONSE_VARIANTS.COLLEGE_AFFILIATION[lang]),
        context
    });
    }

    if (intent === "COLLEGE_TYPE") {
        context.lastIntent = null;
        context.lastCourse = null;
         context.expectingFollowUp = false;
      return res.json({
        reply: getRandom(RESPONSE_VARIANTS.COLLEGE_TYPE[lang]),
        context
    });
    }

    if (intent === "COLLEGE_ADDRESS") {
        context.lastIntent = null;
        context.lastCourse = null;
         context.expectingFollowUp = false;
      return res.json({
        reply: getRandom(RESPONSE_VARIANTS.COLLEGE_ADDRESS[lang]),
        context
    });
    }

    if (intent === "ID_CARD_QUERY") {
        context.lastIntent = null;
        context.lastCourse = null;
         context.expectingFollowUp = false;
      return res.json({
        reply: getRandom(RESPONSE_VARIANTS.ID_CARD_QUERY[lang]),
        context
    });
    }

    if (intent === "CERTIFICATE_QUERY") {
        context.lastIntent = null;
        context.lastCourse = null;
         context.expectingFollowUp = false;
      return res.json({
        reply: getRandom(RESPONSE_VARIANTS.CERTIFICATE_QUERY[lang]),
        context
    });
    }
   
    if (intent === "SCHOLARSHIP_QUERY") {
        context.lastIntent = null;
        context.lastCourse = null;
         context.expectingFollowUp = false;
      return res.json({
        reply: getRandom(RESPONSE_VARIANTS.SCHOLARSHIP_QUERY[lang]),
        context
    });
    }

    if (intent === "UNIFORM_QUERY") {
        context.lastIntent = null;
        context.lastCourse = null;
         context.expectingFollowUp = false;
      return res.json({
        reply: getRandom(RESPONSE_VARIANTS.UNIFORM_QUERY[lang]),
        context
    });
    }

    if (intent === "LIBRARY_CARD_QUERY") {
        context.lastIntent = null;
        context.lastCourse = null;
         context.expectingFollowUp = false;
      return res.json({
        reply: getRandom(RESPONSE_VARIANTS.LIBRARY_CARD_QUERY[lang]),
        context
    });
    }

    if (intent === "SUBJECT_CHOICE_QUERY") {
        context.lastIntent = null;
        context.lastCourse = null;
         context.expectingFollowUp = false;
      return res.json({
        reply: getRandom(RESPONSE_VARIANTS.SUBJECT_CHOICE_QUERY[lang]),
        context
    });
    }

  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred. Please try again later.");
  }
};

function resolveCourse(userMsg, courses, context) {
  if (!courses || courses.length === 0) return context.lastCourse;

  const shorthandMatch = courses.find(c => {
    const shorthand = c.course
      .split(' ')
      .filter(w => w !== 'of')
      .map(w => w[0])
      .join('')
      .toLowerCase();
    return userMsg.split(' ').includes(shorthand);
  });

  if (shorthandMatch) return shorthandMatch;

  const { bestMatch, score } = findBestMatch(userMsg, courses, 'course');
  if (bestMatch && score > 2) return bestMatch;

  return context.lastCourse; 
}
