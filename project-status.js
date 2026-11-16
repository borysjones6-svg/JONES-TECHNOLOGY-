
/* =========================================
   JONES TECHNOLOGY
   PROJECT STATUS PORTAL
   PROJECT-STATUS.JS
   PART 1 OF 3
========================================= */

(() => {
    "use strict";

    /* =====================================
       1. CONFIGURATION
    ===================================== */

    const PORTAL_CONFIG = {
        databaseConnected: false,

        // Firebase integration will be added later.
        companyName: "Jones Technology",
        parentCompany: "Jones Group Holdings",

        currency: "KES"
    };


    /* =====================================
       2. GET HTML ELEMENTS
    ===================================== */

    const elements = {
        form: document.getElementById("projectLookupForm"),

        reference: document.getElementById("projectReference"),

        email: document.getElementById("clientEmail"),

        button: document.getElementById("lookupButton"),

        message: document.getElementById("lookupMessage"),

        result: document.getElementById("projectResult")
    };


    /* =====================================
       3. CHECK REQUIRED ELEMENTS
    ===================================== */

    function portalIsReady() {

        if (!elements.form) {
            console.error(
                "JONES TECHNOLOGY: Project lookup form not found."
            );

            return false;
        }

        if (
            !elements.reference ||
            !elements.email ||
            !elements.button
        ) {
            console.error(
                "JONES TECHNOLOGY: Some lookup form elements are missing."
            );

            return false;
        }

        return true;
    }


    /* =====================================
       4. SAFE HTML OUTPUT
    ===================================== */

    function escapeHTML(value) {

        return String(value ?? "").replace(
            /[&<>"']/g,
            character => {

                const replacements = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#039;"
                };

                return replacements[character];
            }
        );
    }


    /* =====================================
       5. DISPLAY LOOKUP MESSAGES
    ===================================== */

    function showMessage(message, type = "info") {

        if (!elements.message) return;

        elements.message.textContent = message;

        elements.message.classList.remove(
            "error",
            "success",
            "info"
        );

        elements.message.classList.add(type);

        elements.message.setAttribute(
            "role",
            type === "error" ? "alert" : "status"
        );
    }


    /* =====================================
       6. BUTTON LOADING STATE
    ===================================== */

    function setLoading(isLoading) {

        if (!elements.button) return;

        elements.button.disabled = isLoading;

        if (isLoading) {

            elements.button.dataset.originalText =
                elements.button.textContent.trim();

            elements.button.textContent = "Checking project...";

        } else {

            elements.button.textContent =
                elements.button.dataset.originalText ||
                "Track My Project";
        }
    }


    /* =====================================
       7. VALIDATE PROJECT REFERENCE
    ===================================== */

    function validateReference(reference) {

        if (!reference) {

            return {
                valid: false,
                message: "Please enter your project reference."
            };
        }

        if (reference.length < 4) {

            return {
                valid: false,
                message: "Your project reference is too short."
            };
        }

        if (reference.length > 60) {

            return {
                valid: false,
                message: "Your project reference is too long."
            };
        }

        return {
            valid: true,
            message: ""
        };
    }


    /* =====================================
       8. VALIDATE CLIENT EMAIL
    ===================================== */

    function validateEmail(email) {

        if (!email) {

            return {
                valid: false,
                message: "Please enter the email used for your project."
            };
        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            return {
                valid: false,
                message: "Please enter a valid email address."
            };
        }

        return {
            valid: true,
            message: ""
        };
    }


    /* =====================================
       9. VALIDATE LOOKUP INFORMATION
    ===================================== */

    function validateLookup(reference, email) {

        const referenceResult =
            validateReference(reference);

        if (!referenceResult.valid) {
            return referenceResult;
        }

        const emailResult =
            validateEmail(email);

        if (!emailResult.valid) {
            return emailResult;
        }

        return {
            valid: true,
            message: ""
        };
    }


    /* =====================================
       10. PROJECT DATABASE LOOKUP
    ===================================== */

    async function lookupProject(reference, email) {

        /*
           FIREBASE CONNECTION WILL BE ADDED
           IN A LATER DEVELOPMENT STAGE.

           This function intentionally returns
           no project records while the database
           is disconnected.

           Never display invented project data.
        */

        if (!PORTAL_CONFIG.databaseConnected) {

            return {
                success: false,

                connected: false,

                message:
                    "The project tracking database is not connected yet. Please contact Jones Technology for assistance."
            };
        }

        /*
           Future Firebase lookup goes here.

           The customer must only receive data
           belonging to their authorised account.
        */

        return {
            success: false,

            connected: true,

            message:
                "Project lookup is not configured yet."
        };
    }

  
    /* =====================================
       11. FORMAT CURRENCY
    ===================================== */

    function formatMoney(amount) {

        const value = Number(amount);

        if (!Number.isFinite(value)) {
            return "Not available";
        }

        return new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: PORTAL_CONFIG.currency,
            maximumFractionDigits: 2
        }).format(value);
    }


    /* =====================================
       12. FORMAT DATES
    ===================================== */

    function formatDate(dateValue) {

        if (!dateValue) {
            return "Not provided";
        }

        let date;

        // Support Firebase Timestamp objects.
        if (typeof dateValue.toDate === "function") {
            date = dateValue.toDate();
        } else if (typeof dateValue === "string" ||
                   typeof dateValue === "number") {
            date = new Date(dateValue);
        } else {
            return "Not available";
        }

        if (Number.isNaN(date.getTime())) {
            return "Not available";
        }

        return new Intl.DateTimeFormat("en-KE", {
            day: "numeric",
            month: "short",
            year: "numeric"
        }).format(date);
    }


    /* =====================================
       13. UPDATE TEXT ELEMENT
    ===================================== */

    function setText(id, value, fallback = "Not provided") {

        const element = document.getElementById(id);

        if (!element) return;

        element.textContent =
            value !== undefined &&
            value !== null &&
            value !== ""
                ? String(value)
                : fallback;
    }


    /* =====================================
       14. UPDATE PROJECT PROGRESS
    ===================================== */

    function renderProgress(project) {

        const progress = Number(project.progress);

        const safeProgress = Number.isFinite(progress)
            ? Math.min(100, Math.max(0, progress))
            : 0;

        const fill = document.getElementById("progressFill");

        const text = document.getElementById("progressText");

        const percentage =
            document.getElementById("progressPercentage");

        const progressOverview =
            document.getElementById("overviewProgress");

        const progressBar =
            document.getElementById("projectProgressBar");

        if (fill) {
            fill.style.width = safeProgress + "%";
        }

        if (text) {
            text.textContent =
                safeProgress + "% of project completed";
        }

        if (percentage) {
            percentage.textContent = safeProgress + "%";
        }

        if (progressOverview) {
            progressOverview.textContent = safeProgress + "%";
        }

        if (progressBar) {
            progressBar.setAttribute(
                "aria-valuenow",
                String(safeProgress)
            );
        }
    }


    /* =====================================
       15. PROJECT STATUS CONFIGURATION
    ===================================== */

    const PROJECT_STAGES = [
        "pending",
        "in progress",
        "completed",
        "launched"
    ];


    /* =====================================
       16. RENDER PROJECT TIMELINE
    ===================================== */

    function renderTimeline(project) {

        const status = String(
            project.status || "pending"
        ).toLowerCase().trim();

        const currentIndex = PROJECT_STAGES.indexOf(status);

        const stageElements = [
            "stepPending",
            "stepProgress",
            "stepCompleted",
            "stepLaunched"
        ];

        stageElements.forEach((id, index) => {

            const element = document.getElementById(id);

            if (!element) return;

            element.classList.remove(
                "active",
                "completed"
            );

            if (currentIndex === -1) return;

            if (index < currentIndex) {
                element.classList.add("completed");
            }

            if (index === currentIndex) {
                element.classList.add("active");
            }
        });
    }


    /* =====================================
       17. RENDER PROJECT STATUS
    ===================================== */

    function renderStatus(project) {

        const status = String(
            project.status || "Pending"
        );

        setText("resultProjectStatus", status);

        setText("resultStatusBadge", status);

        setText("overviewStatus", status);

        const badge =
            document.getElementById("resultStatusBadge");

        if (badge) {

            badge.dataset.status =
                status.toLowerCase().replace(/\s+/g, "-");
        }

        renderTimeline(project);
    }


    /* =====================================
       18. RENDER PROJECT INFORMATION
    ===================================== */

    function renderProjectInformation(project) {

        setText(
            "resultProjectName",
            project.name
        );

        setText(
            "resultProjectReference",
            project.reference
        );

        setText(
            "resultProjectType",
            project.type
        );

        setText(
            "resultUpdated",
            formatDate(project.updatedAt)
        );

        setText(
            "resultStartDate",
            formatDate(project.startDate)
        );

        setText(
            "resultExpectedDate",
            formatDate(project.expectedDate)
        );

        setText(
            "resultProjectManager",
            project.projectManager
        );

        setText(
            "resultLaunchStatus",
            project.launchStatus
        );

        const websiteAddress =
            document.getElementById("resultWebsiteAddress");

        if (websiteAddress) {

            websiteAddress.textContent =
                "Not provided";

            websiteAddress.removeAttribute("href");

            const address = project.websiteAddress;

            if (address) {

                try {

                    const url = new URL(address);

                    if (
                        url.protocol === "https:" ||
                        url.protocol === "http:"
                    ) {

                        websiteAddress.href = url.href;

                        websiteAddress.textContent =
                            url.hostname;

                        websiteAddress.target = "_blank";

                        websiteAddress.rel =
                            "noopener noreferrer";
                    }

                } catch (error) {

                    console.warn(
                        "Invalid project website address."
                    );
                }
            }
        }
    }


    /* =====================================
       19. RENDER PROJECT UPDATES
    ===================================== */

    function renderUpdates(project) {

        const container =
            document.getElementById("projectUpdates");

        if (!container) return;

        const updates = Array.isArray(project.updates)
            ? project.updates
            : [];

        if (updates.length === 0) {

            container.innerHTML = `
                <div class="empty-state">
                    No project updates are available yet.
                </div>
            `;

            return;
        }

        container.innerHTML = updates.map(update => {

            return `
                <article class="project-update-item">

                    <strong>
                        ${escapeHTML(update.title || "Project update")}
                    </strong>

                    <p>
                        ${escapeHTML(update.message || "")}
                    </p>

                    <small>
                        ${escapeHTML(formatDate(update.date))}
                    </small>

                </article>
            `;

        }).join("");
    }


    /* =====================================
       20. RENDER PAYMENT INFORMATION
    ===================================== */

    function renderPayments(project) {

        const payment = project.payment || {};

        const total = Number(payment.total);

        const paid = Number(payment.paid);

        const balance = Number(payment.balance);

        setText(
            "resultTotal",
            formatMoney(payment.total)
        );

        setText(
            "resultPaid",
            formatMoney(payment.paid)
        );

        setText(
            "resultBalance",
            formatMoney(payment.balance)
        );

        setText(
            "resultPaymentStatus",
            payment.status || "Not available"
        );

        setText(
            "overviewPayment",
            payment.status || "Not available"
        );

        /*
           We do not calculate or mark a payment
           as verified from a customer-side input.

           The trusted payment records must come
           from the authorised database.
        */

        if (
            Number.isFinite(total) &&
            Number.isFinite(paid) &&
            Number.isFinite(balance) &&
            (total < 0 || paid < 0 || balance < 0)
        ) {

            console.warn(
                "Payment data contains an invalid negative amount."
            );
        }

        renderPaymentHistory(payment);
        renderReceipts(payment);
    }


    /* =====================================
       21. RENDER PAYMENT HISTORY
    ===================================== */

    function renderPaymentHistory(payment) {

        const container =
            document.getElementById("paymentHistory");

        if (!container) return;

        const history = Array.isArray(payment.history)
            ? payment.history
            : [];

        if (history.length === 0) {

            container.innerHTML = `
                <div class="empty-state">
                    No verified payment records available.
                </div>
            `;

            return;
        }

        container.innerHTML = history.map(record => {

            return `
                <div class="payment-history-item">

                    <span>
                        ${escapeHTML(formatDate(record.date))}
                    </span>

                    <strong>
                        ${escapeHTML(formatMoney(record.amount))}
                    </strong>

                </div>
            `;

        }).join("");
    }


    /* =====================================
       22. RENDER RECEIPTS
    ===================================== */

    function renderReceipts(payment) {

        const container =
            document.getElementById("receiptList");

        if (!container) return;

        const receipts = Array.isArray(payment.receipts)
            ? payment.receipts
            : [];

        if (receipts.length === 0) {

            container.innerHTML = `
                <div class="empty-state">
                    No receipts are available yet.
                </div>
            `;

            return;
        }

        container.innerHTML = receipts.map(receipt => {

            let receiptLink = "";

            if (receipt.url) {

                try {

                    const url = new URL(receipt.url);

                    if (
                        url.protocol === "https:" ||
                        url.protocol === "http:"
                    ) {

                        receiptLink = `
                            <a
                                href="${escapeHTML(url.href)}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View receipt
                            </a>
                        `;
                    }

                } catch (error) {

                    console.warn(
                        "Invalid receipt URL."
                    );
                }
            }

            return `
                <div class="receipt-item">

                    <strong>
                        ${escapeHTML(receipt.number || "Receipt")}
                    </strong>

                    ${receiptLink}

                </div>
            `;

        }).join("");
    }


    /* =====================================
       23. RENDER COMPLETE DASHBOARD
    ===================================== */

    function renderDashboard(project) {

        if (!project || typeof project !== "object") {
            return false;
        }

        renderProjectInformation(project);

        renderStatus(project);

        renderProgress(project);

        renderUpdates(project);

        renderPayments(project);

        if (elements.result) {

            elements.result.hidden = false;

            elements.result.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        return true;
    }

  
    /* =====================================
       24. RESET DASHBOARD
    ===================================== */

    function resetDashboard() {

        if (!elements.result) return;

        elements.result.hidden = true;

        // Clear any previously displayed project data.
        const ids = [
            "resultProjectName",
            "resultProjectReference",
            "resultProjectType",
            "resultProjectStatus",
            "resultUpdated",
            "resultStartDate",
            "resultExpectedDate",
            "resultProjectManager",
            "resultTotal",
            "resultPaid",
            "resultBalance",
            "resultPaymentStatus",
            "resultLaunchStatus",
            "resultWebsiteAddress",
            "overviewProgress",
            "overviewStatus",
            "overviewPayment",
            "progressPercentage",
            "progressText"
        ];

        ids.forEach(id => {

            const element = document.getElementById(id);

            if (element) {
                element.textContent = "Not available";
            }
        });

        const fill = document.getElementById("progressFill");

        if (fill) {
            fill.style.width = "0%";
        }

        [
            "projectUpdates",
            "paymentHistory",
            "receiptList"
        ].forEach(id => {

            const container = document.getElementById(id);

            if (container) {
                container.replaceChildren();
            }
        });
    }


    /* =====================================
       25. HANDLE FORM SUBMISSION
    ===================================== */

    let lookupInProgress = false;

    async function handleLookup(event) {

        event.preventDefault();

        if (lookupInProgress) return;

        const reference =
            elements.reference.value.trim();

        const email =
            elements.email.value.trim().toLowerCase();

        /* VALIDATION */

        const validation =
            validateLookup(reference, email);

        if (!validation.valid) {

            showMessage(
                validation.message,
                "error"
            );

            if (!reference) {
                elements.reference.focus();
            } else {
                elements.email.focus();
            }

            return;
        }

        /* START LOOKUP */

        lookupInProgress = true;

        setLoading(true);

        resetDashboard();

        showMessage(
            "Checking your project information...",
            "info"
        );

        try {

            const result = await lookupProject(
                reference,
                email
            );

            if (!result || typeof result !== "object") {

                throw new Error(
                    "Invalid response from the project lookup system."
                );
            }

            if (!result.success) {

                showMessage(
                    result.message ||
                    "We could not retrieve your project information.",
                    "error"
                );

                return;
            }

            /* DISPLAY VERIFIED PROJECT */

            const rendered = renderDashboard(result.project);

            if (!rendered) {

                throw new Error(
                    "The project information could not be displayed."
                );
            }

            showMessage(
                "Your project information has been retrieved.",
                "success"
            );

        } catch (error) {

            console.error(
                "JONES TECHNOLOGY PROJECT LOOKUP ERROR:",
                error
            );

            showMessage(
                "Something went wrong. Please try again or contact Jones Technology.",
                "error"
            );

        } finally {

            lookupInProgress = false;

            setLoading(false);
        }
    }


    /* =====================================
       26. INPUT CLEANUP
    ===================================== */

    function setupInputCleanup() {

        if (elements.reference) {

            elements.reference.addEventListener(
                "input",
                () => {

                    elements.reference.value =
                        elements.reference.value
                            .replace(/[<>]/g, "");
                }
            );
        }

        if (elements.email) {

            elements.email.addEventListener(
                "input",
                () => {

                    elements.email.value =
                        elements.email.value.trimStart();
                }
            );
        }
    }


    /* =====================================
       27. FORM EVENT LISTENERS
    ===================================== */

    function setupForm() {

        if (!portalIsReady()) return;

        elements.form.addEventListener(
            "submit",
            handleLookup
        );

        setupInputCleanup();
    }


    /* =====================================
       28. PORTAL INITIALISATION
    ===================================== */

    function initialisePortal() {

        resetDashboard();

        setupForm();

        console.log(
            "JONES TECHNOLOGY PROJECT PORTAL INITIALISED."
        );

        console.log(
            "Database connection:",
            PORTAL_CONFIG.databaseConnected
                ? "Connected"
                : "Not connected"
        );
    }


    /* =====================================
       29. PUBLIC PORTAL METHODS
    ===================================== */

    window.JonesProjectPortal = {

        initialise: initialisePortal,

        renderDashboard: renderDashboard,

        resetDashboard: resetDashboard,

        formatMoney: formatMoney,

        formatDate: formatDate

    };


    /* =====================================
       30. START PORTAL
    ===================================== */

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initialisePortal,
            { once: true }
        );

    } else {

        initialisePortal();
    }


    /* =====================================
       END OF PROJECT STATUS JAVASCRIPT
       JONES TECHNOLOGY
    ===================================== */

})();
