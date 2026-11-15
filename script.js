
/* =========================================================
   JONES TECHNOLOGY 3.0
   A venture under Jones Group Holdings

   Modern Website Frontend Controller
   WhatsApp: +254 771 776 861
========================================================= */

"use strict";


/* =========================================================
   1. GLOBAL CONFIGURATION
========================================================= */

const JONES_CONFIG = Object.freeze({

    brand: "Jones Technology",

    parentCompany: "Jones Group Holdings",

    whatsappNumber: "254771776861",

    advertisementDelay: 5000,

    advertisementSessionKey: "jones_ad_dismissed",

    menuBreakpoint: 768,

    enableAdvertisement: true,

    enableScrollReveal: true

});


/* =========================================================
   2. ELEMENT AND UTILITY HELPERS
========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));


function getElement(id) {
    return document.getElementById(id);
}


function getValue(id) {

    const element = getElement(id);

    return element ? element.value.trim() : "";

}


function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


function isValidWhatsAppNumber(number) {

    return /^254\d{9}$/.test(number);

}


function showMessage(message) {

    window.alert(message);

}


function safelyStore(key, value) {

    try {

        sessionStorage.setItem(key, value);

    } catch (error) {

        console.warn("Session storage unavailable:", error);

    }

}


function safelyRead(key) {

    try {

        return sessionStorage.getItem(key);

    } catch (error) {

        console.warn("Session storage unavailable:", error);

        return null;

    }

}


/* =========================================================
   3. WHATSAPP COMMUNICATION SYSTEM
========================================================= */

function openWhatsApp(message) {

    const number = JONES_CONFIG.whatsappNumber;

    if (!isValidWhatsAppNumber(number)) {

        showMessage(
            "Jones Technology WhatsApp configuration is invalid."
        );

        return false;

    }

    if (!message || !message.trim()) {

        showMessage("Please enter a message.");

        return false;

    }

    const whatsappURL =
        "https://wa.me/" +
        number +
        "?text=" +
        encodeURIComponent(message);

    const newWindow = window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );

    if (!newWindow) {

        showMessage(
            "WhatsApp could not open automatically. " +
            "Please allow pop-ups and try again."
        );

        return false;

    }

    return true;

}


/* =========================================================
   4. MOBILE NAVIGATION SYSTEM
========================================================= */

function initializeNavigation() {

    const menuToggle = getElement("menuToggle");

    const navMenu = getElement("navMenu");

    if (!menuToggle || !navMenu) return;


    function setMenuState(isOpen) {

        navMenu.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";

    }


    menuToggle.addEventListener("click", function () {

        const isOpen =
            navMenu.classList.contains("active");

        setMenuState(!isOpen);

    });


    // Close after clicking a navigation link.

    $$("a", navMenu).forEach(function (link) {

        link.addEventListener("click", function () {

            setMenuState(false);

        });

    });


    // Close when clicking outside.

    document.addEventListener("click", function (event) {

        const insideMenu = navMenu.contains(event.target);

        const insideButton = menuToggle.contains(event.target);

        if (!insideMenu && !insideButton) {

            setMenuState(false);

        }

    });


    // Close with Escape.

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            setMenuState(false);

        }

    });


    // Reset navigation when switching to desktop layout.

    window.addEventListener("resize", function () {

        if (window.innerWidth > JONES_CONFIG.menuBreakpoint) {

            setMenuState(false);

        }

    });

}


/* =========================================================
   5. COPYRIGHT YEAR
========================================================= */

function initializeCopyright() {

    const yearElement = getElement("currentYear");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }

}


/* =========================================================
   6. DIRECT WHATSAPP BUTTONS
========================================================= */

function initializeWhatsAppButtons() {

    const directWhatsApp = getElement("directWhatsApp");

    const floatingWhatsApp = getElement("floatingWhatsApp");


    if (directWhatsApp) {

        directWhatsApp.addEventListener("click", function (event) {

            event.preventDefault();

            openWhatsApp(
                "Hello Jones Technology!\n\n" +
                "I would like to enquire about your digital services."
            );

        });

    }


    if (floatingWhatsApp) {

        floatingWhatsApp.addEventListener("click", function (event) {

            event.preventDefault();

            openWhatsApp(
                "Hello Jones Technology!\n\n" +
                "I am interested in working with your team."
            );

        });

    }

}


/* =========================================================
   7. FORM VALIDATION HELPERS
========================================================= */

function validateRequiredFields(fields) {

    for (const field of fields) {

        const element = getElement(field.id);

        if (!element) {

            console.error(
                "Missing form element:",
                field.id
            );

            showMessage(
                "A form field is missing. Please contact the website administrator."
            );

            return false;

        }

        if (!element.value.trim()) {

            showMessage(field.message);

            element.focus();

            return false;

        }

    }

    return true;

}


function validateEmailField(email, elementId) {

    if (!isValidEmail(email)) {

        showMessage("Please enter a valid email address.");

        const element = getElement(elementId);

        if (element) element.focus();

        return false;

    }

    return true;

}


/* =========================================================
   8. CUSTOMER PROJECT ENQUIRY FORM
========================================================= */

function initializeContactForm() {

    const contactForm = getElement("contactForm");

    if (!contactForm) return;


    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name = getValue("clientName");

        const email = getValue("clientEmail");

        const service = getValue("projectType");

        const details = getValue("clientMessage");


        const requiredFields = [

            {
                id: "clientName",
                message: "Please enter your full name."
            },

            {
                id: "clientEmail",
                message: "Please enter your email address."
            },

            {
                id: "projectType",
                message: "Please select your requested service."
            },

            {
                id: "clientMessage",
                message: "Please describe your project."
            }

        ];


        if (!validateRequiredFields(requiredFields)) return;


        if (!validateEmailField(email, "clientEmail")) return;


        const message = [

            "NEW PROJECT ENQUIRY",

            "",

            "Business: " + JONES_CONFIG.brand,

            "Parent company: " + JONES_CONFIG.parentCompany,

            "",

            "CLIENT INFORMATION",

            "Name: " + name,

            "Email: " + email,

            "",

            "PROJECT INFORMATION",

            "Requested service: " + service,

            "",

            "Project description:",

            details,

            "",

            "Source: Official Jones Technology Website",

            "Status: New enquiry — quotation not yet confirmed."

        ].join("\n");


        openWhatsApp(message);

    });

}


/* =========================================================
   9. RECRUITMENT APPLICATION SYSTEM
========================================================= */

function initializeRecruitmentForm() {

    const recruitmentForm = getElement("recruitmentForm");

    if (!recruitmentForm) return;


    recruitmentForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name = getValue("applicantName");

        const email = getValue("applicantEmail");

        const location = getValue("applicantLocation");

        const role = getValue("applicantRole");

        const skills = getValue("applicantSkills");

        const experience = getValue("applicantExperience");

        const portfolio = getValue("applicantPortfolio");

        const reason = getValue("applicantMessage");


        const requiredFields = [

            {
                id: "applicantName",
                message: "Please enter your full name."
            },

            {
                id: "applicantEmail",
                message: "Please enter your email."
            },

            {
                id: "applicantLocation",
                message: "Please enter your location."
            },

            {
                id: "applicantRole",
                message: "Please select an opportunity."
            },

            {
                id: "applicantSkills",
                message: "Please describe your skills."
            },

            {
                id: "applicantExperience",
                message: "Please select your experience level."
            },

            {
                id: "applicantMessage",
                message: "Please explain why you want to join."
            }

        ];


        if (!validateRequiredFields(requiredFields)) return;


        if (!validateEmailField(email, "applicantEmail")) return;


        const message = [

            "JONES TECHNOLOGY — TEAM APPLICATION",

            "",

            "Hello Jones Technology team.",

            "I would like to apply to join your team.",

            "",

            "APPLICANT DETAILS",

            "Full name: " + name,

            "Email: " + email,

            "Location: " + location,

            "",

            "APPLICATION DETAILS",

            "Opportunity: " + role,

            "Skills: " + skills,

            "Experience: " + experience,

            "Portfolio / GitHub: " +
                (portfolio || "Not provided"),

            "",

            "WHY I WANT TO JOIN:",

            reason,

            "",

            "I understand that submitting this application " +
            "does not guarantee employment or paid work.",

            "",

            "Source: Jones Technology Official Website"

        ].join("\n");


        openWhatsApp(message);

    });

}


/* =========================================================
   10. ADVERTISEMENT POPUP SYSTEM
========================================================= */

function initializeAdvertisement() {

    const adPopup = getElement("adPopup");

    const closeAd = getElement("closeAd");


    if (!adPopup || !closeAd) return;


    if (!JONES_CONFIG.enableAdvertisement) return;


    let adTimer;


    function openAdvertisement() {

        if (safelyRead(JONES_CONFIG.advertisementSessionKey)) {

            return;

        }


        adPopup.classList.add("show");

        adPopup.setAttribute("aria-hidden", "false");

    }


    function closeAdvertisement() {

        adPopup.classList.remove("show");

        adPopup.setAttribute("aria-hidden", "true");

        safelyStore(
            JONES_CONFIG.advertisementSessionKey,
            "true"
        );

    }


    // Show once per browser session.

    if (!safelyRead(JONES_CONFIG.advertisementSessionKey)) {

        adTimer = setTimeout(
            openAdvertisement,
            JONES_CONFIG.advertisementDelay
        );

    }


    closeAd.addEventListener("click", function () {

        clearTimeout(adTimer);

        closeAdvertisement();

    });


    // Close by clicking outside the advertisement content.

    adPopup.addEventListener("click", function (event) {

        if (event.target === adPopup) {

            clearTimeout(adTimer);

            closeAdvertisement();

        }

    });


    // Close using Escape.

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            adPopup.classList.contains("show")
        ) {

            clearTimeout(adTimer);

            closeAdvertisement();

        }

    });

}


/* =========================================================
   11. SCROLL REVEAL EFFECT
========================================================= */

function initializeScrollReveal() {

    if (!JONES_CONFIG.enableScrollReveal) return;


    if (!("IntersectionObserver" in window)) return;


    const revealElements = $$(".reveal");


    if (revealElements.length === 0) return;


    const observer = new IntersectionObserver(

        function (entries, currentObserver) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    currentObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


    revealElements.forEach(function (element) {

        observer.observe(element);

    });

}


/* =========================================================
   12. FAQ ACCORDION ENHANCEMENT
========================================================= */

// Works with native HTML <details> elements.
// No special JavaScript markup is required.

function initializeFAQ() {

    const faqItems = $$("details.faq-item");


    faqItems.forEach(function (item) {

        item.addEventListener("toggle", function () {

            if (!item.open) return;


            faqItems.forEach(function (otherItem) {

                if (otherItem !== item) {

                    otherItem.open = false;

                }

            });

        });

    });

}


/* =========================================================
   13. BACK TO TOP BUTTON
========================================================= */

function initializeBackToTop() {

    const backToTop = getElement("backToTop");

    if (!backToTop) return;


    backToTop.addEventListener("click", function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });


    function updateButton() {

        const visible = window.scrollY > 400;

        backToTop.classList.toggle("visible", visible);

        backToTop.setAttribute(
            "aria-hidden",
            String(!visible)
        );

    }


    window.addEventListener("scroll", updateButton, {
        passive: true
    });


    updateButton();

}


/* =========================================================
   14. ACTIVE NAVIGATION LINK
========================================================= */

function initializeActiveNavigation() {

    if (!("IntersectionObserver" in window)) return;


    const sections = $$("main section[id]");

    const navLinks = $$("#navMenu a[href^='#']");


    if (!sections.length || !navLinks.length) return;


    const observer = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) return;


                navLinks.forEach(function (link) {

                    const isCurrent =
                        link.getAttribute("href") ===
                        "#" + entry.target.id;


                    if (isCurrent) {

                        link.setAttribute(
                            "aria-current",
                            "location"
                        );

                    } else {

                        link.removeAttribute("aria-current");

                    }

                });

            });

        },

        {
            rootMargin: "-35% 0px -55% 0px"
        }

    );


    sections.forEach(function (section) {

        observer.observe(section);

    });

}


/* =========================================================
   15. EXTERNAL LINK SAFETY
========================================================= */

function initializeExternalLinks() {

    $$("a[target='_blank']").forEach(function (link) {

        const relValues = new Set(
            (link.getAttribute("rel") || "").split(/\s+/).filter(Boolean)
        );

        relValues.add("noopener");
        relValues.add("noreferrer");

        link.setAttribute(
            "rel",
            Array.from(relValues).join(" ")
        );

    });

}


/* =========================================================
   16. WEBSITE INITIALIZATION
========================================================= */

function initializeJonesTechnology() {

    console.log(
        "Initializing Jones Technology 3.0..."
    );


    initializeNavigation();

    initializeCopyright();

    initializeWhatsAppButtons();

    initializeContactForm();

    initializeRecruitmentForm();

    initializeAdvertisement();

    initializeScrollReveal();

    initializeFAQ();

    initializeBackToTop();

    initializeActiveNavigation();

    initializeExternalLinks();


    console.log(
        "JONES TECHNOLOGY 3.0 READY"
    );

    console.log(
        "Parent company: " + JONES_CONFIG.parentCompany
    );

    console.log(
        "WhatsApp: +" + JONES_CONFIG.whatsappNumber
    );

}


/* =========================================================
   17. START APPLICATION
========================================================= */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initializeJonesTechnology,
        { once: true }
    );

} else {

    initializeJonesTechnology();

}
