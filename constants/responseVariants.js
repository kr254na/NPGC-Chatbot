const RESPONSE_VARIANTS = {
    COURSE_INFO: {
        en: [
            "Here are the details for <b>{course}</b>:<br>It's a {duration} year {type} program in the {dept} department.<br>Eligibility requires {eligibility}, and the entrance is {entrance}.<br>Total seats: {seats}.<br>Current fees: ₹{fees}.",
            "I found the following for <b>{course}</b>:<br>This {duration}-year {type} course is managed by the {dept} department.<br>You'll need {eligibility} to apply.<br>Entrance: {entrance}.<br>Seats available: {seats}.<br>Fees: ₹{fees}.",
            "Interested in <b>{course}</b>?<br> It's a {type} program lasting {duration} years.<br>Managed by the {dept} department, it requires {eligibility}.<br>Entrance exam: {entrance}.<br> There are {seats} seats with a fee of ₹{fees}."
        ],
        hi: [
            "<b>{course}</b> का विवरण यहाँ है:<br>यह {dept} विभाग में {duration} साल का {type} प्रोग्राम है।<br>पात्रता के लिए {eligibility} की आवश्यकता है, और प्रवेश परीक्षा {entrance} है।<br>कुल सीटें: {seats}।<br>वर्तमान फीस: ₹{fees}।",
            "मुझे <b>{course}</b> के लिए यह जानकारी मिली:<br>यह {duration} वर्षीय {type} कोर्स {dept} विभाग द्वारा संचालित है।<br>आवेदन के लिए आपको {eligibility} की आवश्यकता होगी।<br>प्रवेश परीक्षा: {entrance}। सीटें: {seats}। फीस: ₹{fees}।",
            "<b>{course}</b> में रुचि है?<br>यह {duration} साल का {type} प्रोग्राम है।<br>{dept} विभाग द्वारा संचालित, इसके लिए {eligibility} की आवश्यकता है।<br>प्रवेश परीक्षा: {entrance}। इसमें ₹{fees} फीस के साथ {seats} सीटें हैं।"
        ]
    },
    ADMISSION_SEATS: {
        en: [
            "The number of seats in {course} is <b>{seats}</b>.",
            "For <b>{course}</b>, the college has an intake of <b>{seats}</b> students.",
            "There are currently <b>{seats}</b> seats allocated for the {course} program."
        ],
        hi: [
            "<b>{course}</b> में सीटों की संख्या <b>{seats}</b> है।",
            "<b>{course}</b> के लिए, कॉलेज में <b>{seats}</b> छात्रों की प्रवेश क्षमता है।",
            "वर्तमान में <b>{course}</b> प्रोग्राम के लिए <b>{seats}</b> सीटें आवंटित हैं।"
        ]
    },
    FEE_QUERY: {
        en: [
            "The fees for {course} is <b>₹{fees}</b>.",
            "For the {course} program, the current fee structure is <b>₹{fees}</b>.",
            "You'll need to pay <b>₹{fees}</b> for the {course} course."
        ],
        hi: [
            "<b>{course}</b> की फीस <b>₹{fees}</b> है।",
            "<b>{course}</b> प्रोग्राम के लिए, वर्तमान शुल्क संरचना <b>₹{fees}</b> है।",
            "आपको <b>{course}</b> कोर्स के लिए <b>₹{fees}</b> का भुगतान करना होगा।"
        ]
    },
    ADMISSION_ELIGIBILITY: {
        en: [
            "To qualify for <b>{course}</b>, you need: <b>{eligibility}</b>.",
            "The eligibility criteria for the <b>{course}</b> program is <b>{eligibility}</b>.",
            "For <b>{course}</b>, candidates must meet these requirements: <b>{eligibility}</b>."
        ],
        hi: [
            "<b>{course}</b> के लिए पात्र होने के लिए, आपको <b>{eligibility}</b> की आवश्यकता है।",
            "<b>{course}</b> प्रोग्राम के लिए पात्रता मानदंड <b>{eligibility}</b> है।",
            "<b>{course}</b> के लिए, उम्मीदवारों को इन शर्तों को पूरा करना होगा: <b>{eligibility}</b>।"
        ]
    },
    ADMISSION_DEADLINE: {
        en: [
            "The last date to apply for <b>{course}</b> is <b>{deadline}</b>.",
            "Make sure to submit your application for <b>{course}</b> by <b>{deadline}</b>.",
            "The admission deadline for <b>{course}</b> is currently set for <b>{deadline}</b>."
        ],
        hi: [
            "<b>{course}</b> के लिए आवेदन करने की अंतिम तिथि <b>{deadline}</b> है।",
            "सुनिश्चित करें कि आप <b>{course}</b> के लिए अपना आवेदन <b>{deadline}</b> तक जमा कर दें।",
            "<b>{course}</b> के लिए प्रवेश की समय सीमा वर्तमान में <b>{deadline}</b> निर्धारित है।"
        ]
    },
    FACULTY_BY_NAME: {
        en: [
            "<b>{name}</b> is part of the <b>{dept}</b>.",
            "I found <b>{name}</b> in the <b>{dept}</b>.",
            "<b>{name}</b> serves in the <b>{dept}</b>."
        ],
        hi: [
            "<b>{name}</b>, <b>{dept}</b> विभाग का हिस्सा हैं।",
            "मुझे <b>{name}</b> की जानकारी <b>{dept}</b> विभाग में मिली।",
            "<b>{name}</b>, <b>{dept}</b> विभाग में कार्यरत हैं।"
        ]
    },
    ADMISSION_ENTRANCE_EXAM: {
        en: [
            "The entrance examination for <b>{course}</b> is <b>{entrance}</b>.",
            "To get into <b>{course}</b>, you'll need to appear for the <b>{entrance}</b> exam.",
            "Admission to <b>{course}</b> is conducted via the <b>{entrance}</b> entrance test."
        ],
        hi: [
            "<b>{course}</b> के लिए प्रवेश परीक्षा <b>{entrance}</b> है।",
            "<b>{course}</b> में प्रवेश पाने के लिए, आपको <b>{entrance}</b> परीक्षा में शामिल होना होगा।",
            "<b>{course}</b> में प्रवेश <b>{entrance}</b> प्रवेश परीक्षा के माध्यम से आयोजित किया जाता है।"
        ]
    },
    PLACEMENT_QUERY: {
        en: [
            "💼 Our Placement Cell is very active! The highest package reached <b>10 LPA</b> with Jaro Education, and the average is <b>4 LPA</b>. You can check more here:",
            "💼 Great news! NPGC graduates see an average package of <b>4 LPA</b>, with top offers going up to <b>10 LPA</b>. Details available at this link:",
            "💼 Career opportunities at NPGC are excellent. With a peak package of <b>10 LPA</b> recently, our students are placed in top firms. See the full list here:"
        ],
        hi: [
            "💼 हमारा नियोजन प्रकोष्ठ बहुत सक्रिय है! उच्चतम पैकेज Jaro Education के साथ <b>10 LPA</b> तक पहुँचा है, और औसत <b>4 LPA</b> है। अधिक जानकारी यहाँ देखें:",
            "💼 अच्छी खबर! NPGC स्नातकों का औसत पैकेज <b>4 LPA</b> है, जिसमें उच्चतम ऑफर <b>10 LPA</b> तक जाते हैं। विवरण इस लिंक पर उपलब्ध है:",
            "💼 NPGC में करियर के अवसर बेहतरीन हैं। हाल ही में <b>10 LPA</b> के उच्चतम पैकेज के साथ, हमारे छात्रों को शीर्ष कंपनियों में नियुक्त किया गया है। पूरी सूची यहाँ देखें:"
        ]
    },
    ATTENDANCE_QUERY: {
        en: [
            "📊 Regular attendance is key. You need a <b>minimum of 75%</b> attendance to be eligible for exams.",
            "📊 Per college rules, <b>75% attendance</b> is mandatory for every student to appear in the final examinations.",
            "📊 Please ensure your attendance stays above <b>75%</b>, as this is the minimum requirement for exam clearance."
        ],
        hi: [
            "📊 नियमित उपस्थिति महत्वपूर्ण है। परीक्षाओं के लिए पात्र होने के लिए आपको <b>न्यूनतम 75%</b> उपस्थिति की आवश्यकता है।",
            "📊 कॉलेज के नियमों के अनुसार, प्रत्येक छात्र के लिए अंतिम परीक्षाओं में बैठने के लिए <b>75% उपस्थिति</b> अनिवार्य है।",
            "📊 कृपया सुनिश्चित करें कि आपकी उपस्थिति <b>75%</b> से ऊपर रहे, क्योंकि यह परीक्षा पास करने के लिए न्यूनतम आवश्यकता है।"
        ]
    },
    MARKS_QUERY: {
        en: [
            "📝 You can view your semester results, CGPA, and SGPA on the student portal using your roll number here:",
            "📝 Results and detailed marks are published online. Check yours on the official result portal:",
            "📝 To see your latest score and academic standing, please visit the NPGC results page:"
        ],
        hi: [
            "📝 आप छात्र पोर्टल पर अपने रोल नंबर का उपयोग करके अपने सेमेस्टर परिणाम, CGPA और SGPA यहाँ देख सकते हैं:",
            "📝 परिणाम और विस्तृत अंक ऑनलाइन प्रकाशित किए जाते हैं। आधिकारिक परिणाम पोर्टल पर अपना परिणाम देखें:",
            "📝 अपना नवीनतम स्कोर और शैक्षणिक स्थिति देखने के लिए, कृपया NPGC परिणाम पृष्ठ पर जाएँ:"
        ]
    },
    LIBRARY_QUERY: {
        en: [
            "📚 Our library is well-stocked with journals and textbooks. You can issue books using your ID card. More info here:",
            "📚 The college library offers a vast collection of digital and physical resources. Visit the counter for issues/returns or check online:",
            "📚 Need a book? The NPGC library counter is open for students with valid cards. Details on library rules here:"
        ],
        hi: [
            "📚 हमारा पुस्तकालय पत्रिकाओं और पाठ्यपुस्तकों से सुसज्जित है। आप अपने आईडी कार्ड का उपयोग करके किताबें जारी करवा सकते हैं। अधिक जानकारी यहाँ:",
            "📚 कॉलेज पुस्तकालय डिजिटल और भौतिक संसाधनों का एक विशाल संग्रह प्रदान करता है। इश्यू/रिटर्न के लिए काउंटर पर जाएँ या ऑनलाइन देखें:",
            "📚 किताब चाहिए? वैध कार्ड वाले छात्रों के लिए NPGC लाइब्रेरी काउंटर खुला है। लाइब्रेरी के नियमों का विवरण यहाँ देखें:"
        ]
    },
    COLLEGE_ABOUT: {
        en: [
            "<b>National Post Graduate College (NPGC)</b> was established in 1967 and is the only autonomous co-educational college of Lucknow University. It is known for its academic excellence and disciplined environment.",
            "Established by Chandra Bhanu Gupta, <b>NPGC</b> is a premier institution in Lucknow that offers various UG and PG courses with an Autonomous status granted by the UGC.",
            "<b>NPGC</b> is a leading college in Uttar Pradesh, awarded with the status of 'College with Potential for Excellence' by the UGC and accredited with an 'A' grade by NAAC."
        ],
        hi: [
            "<b>नेशनल पोस्ट ग्रेजुएट कॉलेज (NPGC)</b> की स्थापना 1967 में हुई थी। यह लखनऊ विश्वविद्यालय का एकमात्र स्वायत्त (Autonomous) सह-शिक्षा कॉलेज है, जो अपनी शैक्षणिक उत्कृष्टता के लिए जाना जाता है।",
            "चंद्र भानु गुप्त द्वारा स्थापित, <b>NPGC</b> लखनऊ का एक प्रमुख संस्थान है जो यूजीसी द्वारा दी गई स्वायत्त स्थिति के साथ विभिन्न स्नातक और स्नातकोत्तर पाठ्यक्रम प्रदान करता है।",
            "<b>NPGC</b> उत्तर प्रदेश का एक अग्रणी कॉलेज है, जिसे यूजीसी द्वारा 'College with Potential for Excellence' का दर्जा दिया गया है और NAAC द्वारा 'A' ग्रेड से मान्यता प्राप्त है।"
        ]
    },
    COLLEGE_CONTACT: {
        en: [
            "You can reach the college office at <b>0522-2618312</b> or <b>0522-2619628</b>. For email inquiries, you can write to <b>support@npgc.in</b>.",
            "For admission and general queries, contact <b>0522-2618312</b>. Official website: <b>www.npgc.in</b>.",
            "Need help? Contact the college administration at <b>0522-2619628</b> or email them at <b>info@npgc.in</b>."
        ],
        hi: [
            "आप कॉलेज कार्यालय से <b>0522-2618312</b> या <b>0522-2619628</b> पर संपर्क कर सकते हैं। ईमेल पूछताछ के लिए आप <b>support@npgc.in</b> पर लिख सकते हैं।",
            "प्रवेश और सामान्य प्रश्नों के लिए, <b>0522-2618312</b> पर संपर्क करें। आधिकारिक वेबसाइट: <b>www.npgc.in</b>।",
            "सहायता के लिए, कॉलेज प्रशासन से <b>0522-2619628</b> पर संपर्क करें या उन्हें <b>info@npgc.in</b> पर ईमेल करें।"
        ]
    },
    COLLEGE_TIMINGS: {
        en: [
            "The standard office timings for <b>NPGC</b> are from <b>10:00 AM to 4:00 PM</b> on all working days.",
            "College classes usually run from <b>9:00 AM</b> onwards. The administrative office is available between <b>10:00 AM and 4:00 PM</b>.",
            "You can visit the college campus between <b>10:00 AM and 4:00 PM</b>, Monday through Saturday."
        ],
        hi: [
            "<b>NPGC</b> के लिए कार्यालय का समय सभी कार्य दिवसों में <b>सुबह 10:00 से शाम 4:00 बजे</b> तक है।",
            "कॉलेज की कक्षाएं आमतौर पर <b>सुबह 9:00 बजे</b> से शुरू होती हैं। प्रशासनिक कार्यालय <b>सुबह 10:00 से शाम 4:00 बजे</b> के बीच उपलब्ध है।",
            "आप सोमवार से शनिवार तक <b>सुबह 10:00 बजे से शाम 4:00 बजे</b> के बीच कॉलेज परिसर का दौरा कर सकते हैं।"
        ]
    },
    COLLEGE_AFFILIATION: {
        en: [
            "<b>NPGC</b> is an autonomous college permanently affiliated with the <b>University of Lucknow</b>.",
            "The college is recognized by the <b>UGC</b> under sections 2(f) and 12(B) and is affiliated with <b>Lucknow University</b>.",
            "It holds <b>Autonomous Status</b> granted by the University Grants Commission (UGC) and is affiliated with the <b>University of Lucknow</b>."
        ],
        hi: [
            "<b>NPGC</b> एक स्वायत्त कॉलेज है जो स्थायी रूप से <b>लखनऊ विश्वविद्यालय</b> से संबद्ध है।",
            "कॉलेज यूजीसी की धारा 2(f) और 12(B) के तहत मान्यता प्राप्त है और <b>लखनऊ विश्वविद्यालय</b> से संबद्ध है।",
            "इसे विश्वविद्यालय अनुदान आयोग (UGC) द्वारा <b>स्वायत्त दर्जा</b> प्राप्त है और यह <b>लखनऊ विश्वविद्यालय</b> से संबद्ध है।"
        ]
    },
    COLLEGE_TYPE: {
        en: [
            "NPGC is a <b>Private-Aided (Government Aided)</b> Autonomous co-educational college.",
            "It is a <b>Co-educational Autonomous</b> institution supported by the government.",
            "The college is an <b>Autonomous Government-Aided</b> institution, meaning it follows its own curriculum while receiving state support."
        ],
        hi: [
            "NPGC एक <b>निजी-सहायता प्राप्त (सरकारी सहायता प्राप्त)</b> स्वायत्त सह-शिक्षा कॉलेज है।",
            "यह सरकार द्वारा समर्थित एक <b>सह-शिक्षा स्वायत्त</b> संस्थान है।",
            "कॉलेज एक <b>स्वायत्त सरकारी सहायता प्राप्त</b> संस्थान है, जिसका अर्थ है कि यह राज्य सहायता प्राप्त करते हुए अपने स्वयं के पाठ्यक्रम का पालन करता है।"
        ]
    },
    COLLEGE_ADDRESS: {
        en: [
            "The college is located at: <b>2, Rana Pratap Marg, Hazratganj, Lucknow, Uttar Pradesh - 226001</b>.",
            "Address: <b>National Post Graduate College, 2, Rana Pratap Marg, near Saharaganj Mall, Lucknow</b>.",
            "You can find us at <b>2, Rana Pratap Marg, Lucknow</b>. It is situated in the heart of the city near Hazratganj."
        ],
        hi: [
            "कॉलेज यहाँ स्थित है: <b>2, राणा प्रताप मार्ग, हजरतगंज, लखनऊ, उत्तर प्रदेश - 226001</b>।",
            "पता: <b>नेशनल पोस्ट ग्रेजुएट कॉलेज, 2, राणा प्रताप मार्ग, सहारागंज मॉल के पास, लखनऊ</b>।",
            "आप हमें <b>2, राणा प्रताप मार्ग, लखनऊ</b> पर पा सकते हैं। यह हजरतगंज के पास शहर के बीचों-बीच स्थित है।"
        ]
    },
    ID_CARD_QUERY: {
        en: [
            "To get your ID card, visit the <b>Window No. 4</b> with your fee receipt",
            "Please head to <b>Window No. 4</b> in the admin block for ID card issuance. Make sure to carry your fee payment receipt",
            "New students can collect their Identity Cards from <b>Window No. 4</b> after showing their admission fee receipt"
        ],
        hi: [
            "अपना आईडी कार्ड प्राप्त करने के लिए, अपनी फीस रसीद के साथ <b>खिड़की नंबर 4</b> पर जाएं।",
            "आईडी कार्ड जारी करने के लिए कृपया एडमिन ब्लॉक में <b>खिड़की नंबर 4</b> पर संपर्क करें। अपनी फीस रसीद साथ लाना न भूलें।",
            "नए छात्र अपनी प्रवेश शुल्क रसीद दिखाकर <b>खिड़की नंबर 4</b> से अपना पहचान पत्र प्राप्त कर सकते हैं।"
        ]
    },
    CERTIFICATE_QUERY: {
        en: [
            "For Character or Transfer Certificates, apply at the <b>Admin Block Counter</b>. It usually takes 3-5 working days to process.",
            "You can apply for TC or Character Certificates at the <b>Admin Counter</b>. Processing generally takes about 3 to 5 business days.",
            "To request a Transfer (TC) or Character Certificate, please submit an application at the <b>Admin Block</b>. Your certificate will be ready in 3-5 days."
        ],
        hi: [
            "चरित्र या स्थानांतरण प्रमाण पत्र (TC) के लिए, <b>एडमिन ब्लॉक काउंटर</b> पर आवेदन करें। इसमें आमतौर पर 3-5 कार्य दिवस लगते हैं।",
            "आप <b>एडमिन काउंटर</b> पर टीसी या चरित्र प्रमाण पत्र के लिए आवेदन कर सकते हैं। इसे तैयार होने में आमतौर पर 3 से 5 कार्य दिवस लगते हैं।",
            "स्थानांतरण (TC) या चरित्र प्रमाण पत्र के लिए कृपया <b>एडमिन ब्लॉक</b> में आवेदन जमा करें। आपका प्रमाण पत्र 3-5 दिनों में तैयार हो जाएगा।"
        ]
    },
    SCHOLARSHIP_QUERY: {
        en: [
            "Information regarding the UP Scholarship is available at <b>Window No. 3</b>. Ensure your Aadhaar is linked to your bank account.",
            "For scholarship-related queries, please visit <b>Window No. 3</b>. Important: Your Aadhaar Card must be linked with your bank account for processing.",
            "Students interested in the UP Scholarship should check details at <b>Window No. 3</b>. Keep your Aadhaar and bank details updated in the records."
        ],
        hi: [
            "यूपी छात्रवृत्ति के संबंध में जानकारी <b>खिड़की नंबर 3</b> पर उपलब्ध है। सुनिश्चित करें कि आपका आधार बैंक खाते से लिंक है।",
            "छात्रवृत्ति से संबंधित जानकारी के लिए कृपया <b>खिड़की नंबर 3</b> पर जाएं। ध्यान दें: प्रक्रिया के लिए आपका आधार कार्ड बैंक खाते से लिंक होना अनिवार्य है।",
            "यूपी छात्रवृत्ति में रुचि रखने वाले छात्र <b>खिड़की नंबर 3</b> पर विवरण देख सकते हैं। रिकॉर्ड में अपना आधार और बैंक विवरण अपडेट रखें।"
        ]
    },
    UNIFORM_QUERY: {
        en: [
            "Students must adhere to the college dress code.",
            "Students are required to attend college in the prescribed formal uniform to maintain the decorum and discipline of the institution.",
            "Wearing the official college uniform is mandatory for all students during academic hours and official events. It serves as a symbol of your identity as a student of this autonomous college."
        ],
        hi: [
            "छात्रों को कॉलेज ड्रेस कोड का पालन करना चाहिए: सफेद शर्ट, ग्रे पैंट और कॉलेज टाई। बुधवार को विभाग के नियमों के अनुसार कैजुअल की अनुमति हो सकती है।",
            "संस्थान की गरिमा और अनुशासन बनाए रखने के लिए छात्रों को निर्धारित औपचारिक ड्रेस कोड में कॉलेज आना अनिवार्य है।",
            "शैक्षणिक समय और आधिकारिक कार्यक्रमों के दौरान सभी छात्रों के लिए आधिकारिक कॉलेज यूनिफॉर्म पहनना अनिवार्य है। यह इस स्वायत्त कॉलेज के छात्र के रूप में आपकी पहचान के प्रतीक के रूप में कार्य करता है।"
        ]
    },
    LIBRARY_CARD_QUERY: {
        en: [
            "To get your library card issued, please visit the library with your original <b>fee receipt</b>.",
            "Library cards are issued at the library upon showing your <b>current semester fee receipt</b>.",
            "Please bring your <b>fee receipt</b> to the library to apply for your library membership card."
        ],
        hi: [
            "लाइब्रेरी कार्ड जारी करवाने के लिए कृपया अपनी मूल <b>फीस रसीद</b> के साथ लाइब्रेरी पर जाएं।",
            "लाइब्रेरी कार्ड आपकी <b>वर्तमान सेमेस्टर की फीस रसीद</b> दिखाने पर लाइब्रेरी में जारी किए जाते हैं।",
            "अपना लाइब्रेरी सदस्यता कार्ड बनवाने के लिए कृपया अपनी <b>फीस रसीद</b> लाइब्रेरी पर लाएं।"
        ]
    },
    SUBJECT_CHOICE_QUERY: {
        en: [
            "Per NEP guidelines, you must select one <b>Minor</b> subject (outside your department), one <b>Vocational</b> subject (from any department), and one mandatory <b>Co-curricular</b> subject each semester.",
            "Each semester, students are required to opt for: 1. A <b>Minor Elective</b> (different from your main dept), 2. a <b>Vocational Course</b> (of your choice), and 3. a compulsory <b>Co-curricular</b> paper.",
            "To complete your registration, ensure you choose one <b>Minor</b> subject from another department and one <b>Vocational</b> subject. Note that the <b>Co-curricular</b> subject is mandatory for all students every semester."
        ],
        hi: [
            "NEP दिशानिर्देशों के अनुसार, आपको प्रत्येक सेमेस्टर में एक <b>माइनर</b> विषय (अपने विभाग के बाहर से), एक <b>वोकेशनल</b> विषय और एक अनिवार्य <b>को-करिकुलर</b> विषय चुनना होगा।",
            "प्रत्येक सेमेस्टर में छात्रों को चुनना अनिवार्य है: 1. एक <b>माइनर इलेक्टिव</b> (आपके मुख्य विभाग से अलग), 2. एक <b>वोकेशनल कोर्स</b> (आपकी पसंद का), और 3. एक अनिवार्य <b>को-करिकुलर</b> पेपर।",
            "अपना पंजीकरण पूरा करने के लिए, सुनिश्चित करें कि आप दूसरे विभाग से एक <b>माइनर</b> विषय और एक <b>वोकेशनल</b> विषय चुनें। ध्यान दें कि <b>को-करिकुलर</b> विषय हर सेमेस्टर में सभी छात्रों के लिए अनिवार्य है।"
        ]
    }
};

module.exports = RESPONSE_VARIANTS;