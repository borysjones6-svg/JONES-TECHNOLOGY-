
/* ============================================
   JONES TECHNOLOGY
   J.A.R.V.I.S. — Version 2.1

   Jones Artificial Reasoning & Virtual
   Intelligence System

   Shared chatbot for:
   index.html
   project-status.html
============================================ */


/* ============================================
   1. CONFIGURATION
============================================ */

const JARVIS_CONFIG = {
    name: "J.A.R.V.I.S.",
    fullName: "Jones Artificial Reasoning & Virtual Intelligence System",
    version: "2.1",

    company: "Jones Technology",
    parent: "Jones Group Holdings",

    whatsapp: "254771776861",

    projectPage: "project-status.html",

    maxMessageLength: 1000
};


/* ============================================
   2. CHATBOT ELEMENTS
============================================ */

const jarvisElements = {
    toggle: document.getElementById("jtechChatToggle"),
    window: document.getElementById("jtechChatWindow"),
    close: document.getElementById("jtechChatClose"),
    minimize: document.getElementById("jtechChatMinimize"),

    messages: document.getElementById("jtechChatMessages"),
    form: document.getElementById("jtechChatForm"),
    input: document.getElementById("jtechChatInput")
};


/* ============================================
   3. PAGE DETECTION
============================================ */

const isProjectStatusPage =
    document.getElementById("projectLookupForm") !== null;


/* ============================================
   4. CONVERSATION STATE
============================================ */

const JARVIS_STATE = {
    messages: [],

    lastTopic: null,

    projectStep: null,

    projectReference: "",

    projectEmail: "",

    isProcessing: false
};


/* ============================================
   5. COMPANY KNOWLEDGE
============================================ */

const JARVIS_KNOWLEDGE = {

    greeting:
        "Hello! I am J.A.R.V.I.S., the digital assistant of Jones Technology. How can I assist you today?",

    identity:
        "I am J.A.R.V.I.S., which stands for Jones Artificial Reasoning & Virtual Intelligence System. I assist visitors and clients of Jones Technology.",

    parentCompany:
        "Jones Technology operates under Jones Group Holdings, the parent company.",

    groupVision:
        "Jones Group Holdings follows the vision: BUILDING TOMORROW. EMPOWERING GENERATIONS.",

    groupTagline:
        "The group tagline is INNOVATE. INVEST. IMPACT. INSPIRE.",

    groupStructure:
        "Jones Group Holdings is the parent company. Jones Technology is one of its ventures. I am the digital assistant serving Jones Technology.",

    technology:
        "Jones Technology is a digital innovation venture under Jones Group Holdings. It focuses on building modern digital solutions for businesses and individuals.",

    services:
        "Jones Technology offers digital services including:\n\n• Business websites\n• E-commerce websites\n• Personal portfolios\n• Web applications\n• Educational platforms\n• Graphics and digital design\n• Website maintenance\n• Custom digital solutions",

    pricing:
        "Our indicative website development prices in Kenya include:\n\n• Personal portfolios: KSh 2,000–5,000\n• Barbershops and salons: KSh 3,000–6,000\n• Restaurants and cafés: KSh 4,000–8,000\n• Shops and boutiques: KSh 5,000–12,000\n• Corporate websites: KSh 5,000–15,000\n• Schools and academies: KSh 6,000–15,000\n• Hotels and guest houses: KSh 6,000–15,000\n• Real estate websites: KSh 5,000–12,000\n• Clinics and healthcare: KSh 5,000–12,000\n\nFinal quotations depend on project requirements. Domain names, paid hosting and third-party services may cost extra.",

    process:
        "Our typical project process is:\n\n1. Client enquiry\n2. Requirements discussion\n3. Quotation and agreement\n4. Project development\n5. Testing and corrections\n6. Completion\n7. Website launch and handover\n8. Ongoing support where agreed.",

    payment:
        "Payment arrangements depend on the agreed quotation and project. A payment should only be treated as confirmed after it has been verified by authorised Jones Technology personnel.",

    receipt:
        "A receipt should only be issued after the payment has been verified. For payment confirmation or receipt assistance, please contact Jones Technology directly.",

    projectStatus:
        "I can guide you through checking your project status. I will need your project reference and the email address associated with your project. Actual records will be retrieved once the project database connection is active.",

    launch:
        "A website is launched after the agreed development work, testing and required approvals have been completed.",

    recruitment:
        "For recruitment, volunteering, trainee or freelance enquiries, please contact Jones Technology through the official WhatsApp channel.",

    domain:
        "A custom domain is a separate cost from website development. You can begin with a free hosting address and connect a custom domain later.",

    staff:
        "I can provide information about the organisation, but I do not currently have a verified staff directory. I will not invent staff names or positions.",

    departments:
        "I can explain the functions involved in our operations, but I do not have a verified list of formally appointed departments or department heads.",

    support:
        "For direct assistance, contact Jones Technology on WhatsApp: +254 771 776 861.",

    fallback:
        "I am not completely sure about that question yet. You can rephrase it or contact Jones Technology through WhatsApp for direct assistance."
};


/* ============================================
   6. BASIC TEXT UTILITIES
============================================ */

function jarvisNormalize(text) {
    return String(text || "")
        .toLowerCase()
        .trim()
        .replace(/[^\w\s@.-]/g, " ")
        .replace(/\s+/g, " ");
}


function jarvisContains(text, keywords) {
    return keywords.some(keyword =>
        text.includes(keyword)
    );
}


function jarvisEscapeHTML(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* ============================================
   7. CHAT MESSAGE DISPLAY
============================================ */

function jarvisAddMessage(message, sender = "bot") {

    const messages = jarvisElements.messages;

    if (!messages) return;

    const messageElement = document.createElement("div");

    messageElement.className =
        sender === "user"
            ? "jtech-message user-message"
            : "jtech-message bot-message";

    messageElement.textContent = message;

    messages.appendChild(messageElement);

    messages.scrollTop = messages.scrollHeight;

    JARVIS_STATE.messages.push({
        sender,
        message,
        time: new Date().toISOString()
    });
}



/* ============================================
   JARVIS CONTROLS — PROJECT PAGE FIX
============================================ */

document.addEventListener("click", function(event) {

    const closeButton = event.target.closest(
        "#jtechChatClose"
    );

    const minimizeButton = event.target.closest(
        "#jtechChatMinimize"
    );

    const toggleButton = event.target.closest(
        "#jtechChatToggle"
    );

    if (closeButton || minimizeButton) {

        event.preventDefault();
        event.stopPropagation();

        const chatWindow = document.getElementById(
            "jtechChatWindow"
        );

        if (chatWindow) {
            chatWindow.classList.remove("active");
            chatWindow.style.setProperty(
                "display",
                "none",
                "important"
            );

            chatWindow.setAttribute(
                "aria-hidden",
                "true"
            );
        }

        return;
    }

    if (toggleButton) {

        event.preventDefault();

        const chatWindow = document.getElementById(
            "jtechChatWindow"
        );

        if (chatWindow) {
            chatWindow.style.removeProperty("display");
            chatWindow.classList.add("active");
            chatWindow.setAttribute(
                "aria-hidden",
                "false"
            );
        }
    }

}, true);

/* ============================================
   9. WHATSAPP SUPPORT
============================================ */

function jarvisSendToWhatsApp(message = "") {

    const defaultMessage =
        "Hello Jones Technology. I need assistance.";

    const finalMessage = message || defaultMessage;

    const url =
        "https://wa.me/" +
        JARVIS_CONFIG.whatsapp +
        "?text=" +
        encodeURIComponent(finalMessage);

    window.open(url, "_blank", "noopener");
}


/* ============================================
   10. PROJECT TRACKING ENTRY
============================================ */

function jarvisStartProjectTracking() {

    JARVIS_STATE.projectReference = "";
    JARVIS_STATE.projectEmail = "";

    if (!isProjectStatusPage) {

        jarvisAddMessage(
            "I can help you check your project. Opening the Jones Technology project-status portal now.",
            "bot"
        );

        window.location.href = JARVIS_CONFIG.projectPage;

        return;
    }

    JARVIS_STATE.projectStep = "reference";

    jarvisAddMessage(
        "Let's check your project. Please enter your project reference number.",
        "bot"
    );
}


/* ============================================
   11. CANCEL PROJECT TRACKING
============================================ */

function jarvisCancelProjectTracking() {

    JARVIS_STATE.projectStep = null;

    JARVIS_STATE.projectReference = "";

    JARVIS_STATE.projectEmail = "";

    jarvisAddMessage(
        "Project tracking cancelled. What else can I help you with?",
        "bot"
    );
}


/* ============================================
   12. PROJECT TRACKING INPUT
============================================ */

function jarvisHandleProjectInformation(message) {

    const text = message.trim();

    const normalized = jarvisNormalize(text);

    if (
        normalized === "cancel" ||
        normalized === "stop" ||
        normalized === "exit" ||
        normalized === "back"
    ) {
        jarvisCancelProjectTracking();
        return true;
    }


    if (JARVIS_STATE.projectStep === "reference") {

        if (text.length < 3) {

            jarvisAddMessage(
                "That reference looks too short. Please enter your correct project reference.",
                "bot"
            );

            return true;
        }

        JARVIS_STATE.projectReference = text;

        JARVIS_STATE.projectStep = "email";

        jarvisAddMessage(
            "Thank you. Now enter the email address associated with this project.",
            "bot"
        );

        return true;
    }


    if (JARVIS_STATE.projectStep === "email") {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(text)) {

            jarvisAddMessage(
                "That email address doesn't look valid. Please enter a valid email address.",
                "bot"
            );

            return true;
        }

        JARVIS_STATE.projectEmail = text;

        JARVIS_STATE.projectStep = null;

        jarvisAddMessage(
            "Thank you. I am submitting your details to the project-status portal.",
            "bot"
        );

        jarvisSubmitProjectLookup();

        return true;
    }

    return false;
}


/* ============================================
   13. SUBMIT PROJECT LOOKUP
============================================ */

function jarvisSubmitProjectLookup() {

    const form =
        document.getElementById("projectLookupForm");

    const referenceInput =
        document.getElementById("projectReference");

    const emailInput =
        document.getElementById("clientEmail");

    if (!form || !referenceInput || !emailInput) {

        jarvisAddMessage(
            "I couldn't find the project lookup form. Please refresh the page or contact support.",
            "bot"
        );

        return;
    }

    referenceInput.value =
        JARVIS_STATE.projectReference;

    emailInput.value =
        JARVIS_STATE.projectEmail;

    if (typeof form.requestSubmit === "function") {

        form.requestSubmit();

    } else {

        form.dispatchEvent(
            new Event("submit", {
                bubbles: true,
                cancelable: true
            })
        );
    }

    jarvisAddMessage(
        "Your details have been submitted to the portal. The portal will display a genuine project result only when its database connection is active.",
        "bot"
    );
}


/* ============================================
   14. JARVIS ANSWER ENGINE
============================================ */

function jarvisGetAnswer(message) {

    const text = jarvisNormalize(message);

    if (!text) {
        return JARVIS_KNOWLEDGE.fallback;
    }

    if (jarvisContains(text, [
        "hello", "hi", "hey", "good morning",
        "good afternoon", "good evening"
    ])) {
        return JARVIS_KNOWLEDGE.greeting;
    }

    if (jarvisContains(text, [
        "who are you", "your name",
        "what is jarvis", "what does jarvis mean"
    ])) {
        return JARVIS_KNOWLEDGE.identity;
    }

    if (jarvisContains(text, [
        "parent company", "who owns",
        "jones group holdings", "parent organisation"
    ])) {
        return JARVIS_KNOWLEDGE.parentCompany;
    }

    if (jarvisContains(text, [
        "vision", "group vision"
    ])) {
        return JARVIS_KNOWLEDGE.groupVision;
    }

    if (jarvisContains(text, [
        "tagline", "slogan"
    ])) {
        return JARVIS_KNOWLEDGE.groupTagline;
    }

    if (jarvisContains(text, [
        "structure", "company structure",
        "group structure"
    ])) {
        return JARVIS_KNOWLEDGE.groupStructure;
    }

    if (jarvisContains(text, [
        "staff", "employees", "team members",
        "who works", "staff members"
    ])) {
        return JARVIS_KNOWLEDGE.staff;
    }

    if (jarvisContains(text, [
        "departments", "department", "divisions"
    ])) {
        return JARVIS_KNOWLEDGE.departments;
    }

    if (jarvisContains(text, [
        "track my project", "project status",
        "check my project", "project progress",
        "where is my project", "my website progress"
    ])) {
        return JARVIS_KNOWLEDGE.projectStatus;
    }

    if (jarvisContains(text, [
        "payment", "pay", "deposit",
        "balance", "paid"
    ])) {
        return JARVIS_KNOWLEDGE.payment;
    }

    if (jarvisContains(text, [
        "receipt", "payment confirmation",
        "proof of payment"
    ])) {
        return JARVIS_KNOWLEDGE.receipt;
    }

    if (jarvisContains(text, [
        "launch", "launched", "publish",
        "go live", "deployment"
    ])) {
        return JARVIS_KNOWLEDGE.launch;
    }

    if (jarvisContains(text, [
        "services", "what do you offer",
        "what do you do", "website services"
    ])) {
        return JARVIS_KNOWLEDGE.services;
    }

    if (jarvisContains(text, [
        "price", "pricing", "cost",
        "how much", "charges", "quotation"
    ])) {
        return JARVIS_KNOWLEDGE.pricing;
    }

    if (jarvisContains(text, [
        "process", "how does it work",
        "how do i order", "steps"
    ])) {
        return JARVIS_KNOWLEDGE.process;
    }

    if (jarvisContains(text, [
        "recruitment", "job", "vacancy",
        "volunteer", "internship", "freelance"
    ])) {
        return JARVIS_KNOWLEDGE.recruitment;
    }

    if (jarvisContains(text, [
        "domain", "hosting", "website address"
    ])) {
        return JARVIS_KNOWLEDGE.domain;
    }

    if (jarvisContains(text, [
        "contact", "whatsapp", "support",
        "talk to someone", "human"
    ])) {
        return JARVIS_KNOWLEDGE.support;
    }

    if (jarvisContains(text, [
        "jones technology", "about the company",
        "what is your company"
    ])) {
        return JARVIS_KNOWLEDGE.technology;
    }

    return JARVIS_KNOWLEDGE.fallback;
}


/* ============================================
   15. HANDLE USER MESSAGES
============================================ */

function jarvisHandleMessage(message) {

    const text = String(message || "").trim();

    if (!text) return;

    if (text.length > JARVIS_CONFIG.maxMessageLength) {

        jarvisAddMessage(
            "Your message is too long. Please shorten it and try again.",
            "bot"
        );

        return;
    }

    jarvisAddMessage(text, "user");

    if (JARVIS_STATE.projectStep) {

        jarvisHandleProjectInformation(text);

        return;
    }

    const normalized = jarvisNormalize(text);

    if (jarvisContains(normalized, [
        "track my project",
        "project status",
        "check my project",
        "project progress",
        "where is my project",
        "my website progress"
    ])) {

        jarvisStartProjectTracking();

        return;
    }

    const answer = jarvisGetAnswer(text);

    jarvisAddMessage(answer, "bot");
}


/* ============================================
   16. CHAT FORM EVENT
============================================ */

if (jarvisElements.form) {

    jarvisElements.form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const message =
                jarvisElements.input.value.trim();

            if (!message) return;

            jarvisElements.input.value = "";

            jarvisHandleMessage(message);
        }
    );
}



/* ============================================
   17. FIXED CHAT WINDOW CONTROLS
============================================ */

// Open / close using the floating JARVIS button
document.addEventListener("click", function(event) {

    const toggle = event.target.closest("#jtechChatToggle");
    const close = event.target.closest("#jtechChatClose");
    const minimize = event.target.closest("#jtechChatMinimize");

    // Open chatbot
    if (toggle) {
        event.preventDefault();
        jarvisOpen();
        return;
    }

    // Close chatbot
    if (close) {
        event.preventDefault();
        jarvisClose();
        return;
    }

    // Minimize chatbot
    if (minimize) {
        event.preventDefault();
        jarvisClose();
        return;
    }

});



/* ============================================
   18. QUICK REPLIES
============================================ */

document.addEventListener("click", function(event) {

    const button =
        event.target.closest("[data-jtech-question]");

    if (!button) return;

    const question =
        button.getAttribute("data-jtech-question");

    if (!question) return;

    jarvisOpen();

    jarvisHandleMessage(question);
});


/* ============================================
   19. ESCAPE KEY
============================================ */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        jarvisClose();
    }
});


/* ============================================
   20. PUBLIC JARVIS API
============================================ */

window.JARVIS = {

    name: JARVIS_CONFIG.name,

    version: JARVIS_CONFIG.version,

    open: jarvisOpen,

    close: jarvisClose,

    send: jarvisHandleMessage,

    getAnswer: jarvisGetAnswer,

    startProjectTracking: jarvisStartProjectTracking,

    cancelProjectTracking: jarvisCancelProjectTracking,

    sendToWhatsApp: jarvisSendToWhatsApp,

    getMessages: function() {
        return [...JARVIS_STATE.messages];
    },

    getState: function() {
        return {
            projectStep: JARVIS_STATE.projectStep,
            projectReference: JARVIS_STATE.projectReference,
            isProjectStatusPage: isProjectStatusPage
        };
    }
};


/* ============================================
   21. INITIAL GREETING
============================================ */

if (
    jarvisElements.messages &&
    jarvisElements.messages.children.length === 0
) {

    jarvisAddMessage(
        JARVIS_KNOWLEDGE.greeting,
        "bot"
    );
}


console.log(
    "J.A.R.V.I.S. Version " +
    JARVIS_CONFIG.version +
    " initialized successfully."
);
