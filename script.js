
/* =========================================
   JONES TECHNOLOGY
   A venture under Jones Group Holdings
   Website JavaScript
========================================= */


/* 1. WHATSAPP CONFIGURATION */

const WHATSAPP_NUMBER = "254118561249";


/* 2. MOBILE NAVIGATION */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        const isOpen = navMenu.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";

    });

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.textContent = "☰";

        });

    });

    document.addEventListener("click", function (event) {

        const clickedInsideMenu = navMenu.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {

            navMenu.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.textContent = "☰";

        }

    });

}


/* 3. AUTOMATIC COPYRIGHT YEAR */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* 4. WHATSAPP HELPER FUNCTION */

function openWhatsApp(message) {

    if (!/^254\d{9}$/.test(WHATSAPP_NUMBER)) {

        alert("Please check the WhatsApp number in script.js.");

        return;

    }

    const encodedMessage = encodeURIComponent(message);

    const whatsappURL =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodedMessage;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");

}


/* 5. DIRECT WHATSAPP CONTACT */

const directWhatsApp = document.getElementById("directWhatsApp");

if (directWhatsApp) {

    directWhatsApp.addEventListener("click", function (event) {

        event.preventDefault();

        const message =
            "Hello Jones Technology! " +
            "I would like to enquire about your digital services.";

        openWhatsApp(message);

    });

}


/* 6. FLOATING WHATSAPP BUTTON */

const floatingWhatsApp = document.getElementById("floatingWhatsApp");

if (floatingWhatsApp) {

    floatingWhatsApp.addEventListener("click", function (event) {

        event.preventDefault();

        const message =
            "Hello Jones Technology! " +
            "I am interested in working with you.";

        openWhatsApp(message);

    });

}


/* 7. CONTACT FORM */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document
            .getElementById("clientName")
            .value
            .trim();

        const email = document
            .getElementById("clientEmail")
            .value
            .trim();

        const projectType = document
            .getElementById("projectType")
            .value;

        const message = document
            .getElementById("clientMessage")
            .value
            .trim();

        if (!name || !email || !projectType || !message) {

            alert("Please complete all the contact form fields.");

            return;

        }

        const whatsappMessage =
            "NEW PROJECT ENQUIRY\n\n" +
            "Business: Jones Technology\n" +
            "Parent company: Jones Group Holdings\n\n" +
            "Client name: " + name + "\n" +
            "Client email: " + email + "\n" +
            "Requested service: " + projectType + "\n\n" +
            "Project details:\n" + message + "\n\n" +
            "Sent through the Jones Technology website.";

        openWhatsApp(whatsappMessage);

    });

}


/* 8. WEBSITE READY */

console.log(
    "Jones Technology website is ready. " +
    "A venture under Jones Group Holdings."
);


const adPopup = document.getElementById("adPopup");
const closeAd = document.getElementById("closeAd");

function openAdvertisement() {
    if (!adPopup) return;
    adPopup.classList.add("show");
    adPopup.setAttribute("aria-hidden", "false");
}

function closeAdvertisement() {
    if (!adPopup) return;
    adPopup.classList.remove("show");
    adPopup.setAttribute("aria-hidden", "true");
}

if (adPopup && closeAd) {
    setTimeout(openAdvertisement, 5000);
    closeAd.addEventListener("click", closeAdvertisement);

    adPopup.addEventListener("click", function(event) {
        if (event.target === adPopup) {
            closeAdvertisement();
        }
    });
}


/* =========================
   JONES TECHNOLOGY RECRUITMENT
========================= */

const recruitmentForm = document.getElementById("recruitmentForm");

if (recruitmentForm) {
    recruitmentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const applicantName =
            document.getElementById("applicantName").value.trim();

        const applicantEmail =
            document.getElementById("applicantEmail").value.trim();

        const applicantLocation =
            document.getElementById("applicantLocation").value.trim();

        const applicantRole =
            document.getElementById("applicantRole").value;

        const applicantSkills =
            document.getElementById("applicantSkills").value.trim();

        const applicantExperience =
            document.getElementById("applicantExperience").value;

        const applicantPortfolio =
            document.getElementById("applicantPortfolio").value.trim();

        const applicantMessage =
            document.getElementById("applicantMessage").value.trim();

        const message = [
            "JONES TECHNOLOGY — TEAM APPLICATION",
            "",
            "Hello Jones Technology team, I would like to apply to join the team.",
            "",
            "Full name: " + applicantName,
            "Email: " + applicantEmail,
            "Location: " + applicantLocation,
            "Preferred opportunity: " + applicantRole,
            "Skills / interests: " + applicantSkills,
            "Experience level: " + applicantExperience,
            "Portfolio / GitHub: " + (applicantPortfolio || "Not provided"),
            "",
            "Why I want to join:",
            applicantMessage,
            "",
            "I understand that submitting an application does not guarantee employment or paid work."
        ].join("\n");

        const whatsappURL =
            "https://wa.me/" +
            WHATSAPP_NUMBER +
            "?text=" +
            encodeURIComponent(message);

        window.open(whatsappURL, "_blank");
    });
}

