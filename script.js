/* =========================================================
   ELVIS_COSTELO DIGITAL SERVICES
   COMPLETE WEBSITE JAVASCRIPT
   Payment flow:
   - Fixed-price services → Payment popup
   - Variable/negotiable services → WhatsApp directly
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       BASIC SETTINGS
    ========================= */

    const whatsappNumber = "254795873094";
    const pochiNumber = "0142453589";

    /* =========================
       SERVICE PRICES
    ========================= */

    const servicePrices = {
        "KRA Services": "KSh 250",
        "E-Citizen Services": "FEE VARIES",
        "Good Conduct Certificate Assistance": "KSh 250",
        "CRB Clearance & Services": "KSh 300",
        "EACC Clearance": "KSh 300",
        "Company Registration": "KSh 20,000",
        "NSSF & SHIF E-Slip": "KSh 300",
        "TSC Number Application": "KSh 1,000",
        "TSC Wealth Declaration & Related Services": "KSh 300",
        "HELB Loan Application": "KSh 1,000",
        "HELB Compliance Certificate": "KSh 300",
        "ALL NTSA Services": "KSh 300",
        "Driving Licence Services": "KSh 300",
        "Passport Application Assistance": "KSh 1,000",
        "Temporary Passport Application": "KSh 300",
        "Migration Services": "FEE VARIES",
        "Website Design": "NEGOTIABLE",
        "Web Designing": "NEGOTIABLE",
        "Poster Design": "NEGOTIABLE",
        "Business Cards": "NEGOTIABLE",
        "Tags & Branding Materials": "NEGOTIABLE",
        "CV Writing": "KSh 300",
        "Abroad Jobs Agency Linking": "NEGOTIABLE",
        "Application Assistance": "NEGOTIABLE"
    };


    /* =========================
       NORMALIZE SERVICE NAME
       Helps prevent small spacing/
       capitalization mismatches
    ========================= */

    function normalizeServiceName(service) {
        return String(service || "")
            .trim()
            .replace(/\s+/g, " ")
            .toLowerCase();
    }


    const normalizedPrices = {};

    Object.keys(servicePrices).forEach(service => {
        normalizedPrices[normalizeServiceName(service)] = servicePrices[service];
    });


    function getServicePrice(service) {
        return normalizedPrices[normalizeServiceName(service)] || "FEE VARIES";
    }


    function isVariablePrice(price) {
        const value = String(price).toUpperCase();

        return (
            value.includes("NEGOTIABLE") ||
            value.includes("VARIES") ||
            value.includes("FEE TO BE CONFIRMED")
        );
    }


    /* =========================
       WHATSAPP
    ========================= */

    function openWhatsApp(message) {
        const url =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");
    }


    /* =========================
       VARIABLE / NEGOTIABLE
       SERVICES
    ========================= */

    function requestVariableService(service) {

        const message =
            `Hello Elvis_costelo Digital Services 👋\n\n` +
            `I would like to inquire/request the following service:\n\n` +
            `Service: ${service}\n` +
            `Price: ${getServicePrice(service)}\n\n` +
            `Please assist me with the quotation and requirements.`;

        openWhatsApp(message);
    }


    /* =========================
       PAYMENT MODAL
       Created automatically.
       No HTML/CSS changes required.
    ========================= */

    function createPaymentModal() {

        if (document.getElementById("costeloPaymentModal")) {
            return document.getElementById("costeloPaymentModal");
        }

        const modal = document.createElement("div");

        modal.id = "costeloPaymentModal";

        modal.innerHTML = `
            <div class="costelo-payment-overlay">

                <div class="costelo-payment-box">

                    <button
                        type="button"
                        class="costelo-payment-close"
                        id="costeloPaymentClose"
                        aria-label="Close payment popup">
                        &times;
                    </button>

                    <div class="costelo-payment-header">
                        <h2>Complete Your Request</h2>
                        <p>Payment & Service Verification</p>
                    </div>

                    <div class="costelo-service-summary">

                        <div>
                            <span>Service</span>
                            <strong id="costeloPaymentService">
                                -
                            </strong>
                        </div>

                        <div>
                            <span>Amount to Pay</span>
                            <strong id="costeloPaymentAmount">
                                -
                            </strong>
                        </div>

                    </div>

                    <div class="costelo-pochi-box">

                        <div class="costelo-pochi-title">
                            PAY VIA M-PESA
                        </div>

                        <div class="costelo-pochi-label">
                            Pochi la Biashara
                        </div>

                        <div class="costelo-pochi-number">
                            ${pochiNumber}
                        </div>

                        <p>
                            Pay the amount above using your own phone.
                            After completing the payment, return here and
                            enter your details below.
                        </p>

                    </div>

                    <form id="costeloPaymentForm">

                        <label for="costeloClientName">
                            Full Names
                        </label>

                        <input
                            type="text"
                            id="costeloClientName"
                            name="clientName"
                            placeholder="Enter your full names"
                            autocomplete="name"
                            required
                        >

                        <label for="costeloClientWhatsApp">
                            WhatsApp Number
                        </label>

                        <input
                            type="tel"
                            id="costeloClientWhatsApp"
                            name="clientWhatsApp"
                            placeholder="e.g. 0712345678"
                            autocomplete="tel"
                            required
                        >

                        <label for="costeloTransactionCode">
                            M-PESA Transaction Code
                        </label>

                        <input
                            type="text"
                            id="costeloTransactionCode"
                            name="transactionCode"
                            placeholder="Enter M-PESA transaction code"
                            autocomplete="off"
                            required
                        >

                        <button
                            type="submit"
                            class="costelo-payment-submit">
                            Submit Payment Details
                        </button>

                    </form>

                    <p class="costelo-payment-note">
                        After submission, your payment details will be sent
                        to Elvis_costelo Digital Services for verification.
                    </p>

                </div>

            </div>
        `;

        document.body.appendChild(modal);

        /* =========================
           MODAL INTERNAL STYLING
           Only for the dynamically
           created payment popup.
           Existing website CSS is untouched.
        ========================= */

        const style = document.createElement("style");

        style.id = "costeloPaymentStyles";

        style.textContent = `

            #costeloPaymentModal {
                display: none;
                position: fixed;
                inset: 0;
                z-index: 99999;
            }

            #costeloPaymentModal.active {
                display: block;
            }

            .costelo-payment-overlay {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.88);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                overflow-y: auto;
            }

            .costelo-payment-box {
                position: relative;
                width: min(520px, 100%);
                max-height: 94vh;
                overflow-y: auto;
                background: #ffffff;
                color: #111111;
                border: 2px solid #d4af37;
                border-radius: 18px;
                padding: 28px;
                box-shadow:
                    0 0 25px rgba(212, 175, 55, 0.35),
                    0 20px 70px rgba(0, 0, 0, 0.65);
            }

            .costelo-payment-close {
                position: absolute;
                top: 12px;
                right: 15px;
                width: 38px;
                height: 38px;
                border: none;
                border-radius: 50%;
                background: #111111;
                color: #d4af37;
                font-size: 27px;
                line-height: 1;
                cursor: pointer;
            }

            .costelo-payment-header {
                text-align: center;
                margin-bottom: 20px;
                padding-right: 25px;
            }

            .costelo-payment-header h2 {
                margin: 0;
                color: #111111;
                font-size: 24px;
            }

            .costelo-payment-header p {
                margin: 6px 0 0;
                color: #777777;
                font-size: 14px;
            }

            .costelo-service-summary {
                display: grid;
                gap: 10px;
                margin-bottom: 18px;
            }

            .costelo-service-summary > div {
                background: #f7f7f7;
                border: 1px solid #d4af37;
                border-radius: 10px;
                padding: 12px 14px;
            }

            .costelo-service-summary span {
                display: block;
                font-size: 12px;
                color: #777777;
                margin-bottom: 4px;
            }

            .costelo-service-summary strong {
                display: block;
                font-size: 16px;
                color: #111111;
            }

            .costelo-pochi-box {
                background: #111111;
                color: #ffffff;
                border: 1px solid #d4af37;
                border-radius: 12px;
                padding: 18px;
                text-align: center;
                margin-bottom: 20px;
            }

            .costelo-pochi-title {
                color: #d4af37;
                font-weight: 700;
                font-size: 13px;
                letter-spacing: 1px;
                margin-bottom: 8px;
            }

            .costelo-pochi-label {
                font-size: 14px;
                color: #dddddd;
            }

            .costelo-pochi-number {
                font-size: 28px;
                font-weight: 800;
                color: #d4af37;
                margin: 7px 0;
                letter-spacing: 1px;
            }

            .costelo-pochi-box p {
                margin: 8px 0 0;
                color: #dddddd;
                font-size: 13px;
                line-height: 1.5;
            }

            #costeloPaymentForm label {
                display: block;
                font-weight: 700;
                font-size: 14px;
                margin: 12px 0 6px;
                color: #222222;
            }

            #costeloPaymentForm input {
                width: 100%;
                box-sizing: border-box;
                padding: 13px 14px;
                border: 1px solid #cccccc;
                border-radius: 9px;
                background: #ffffff;
                color: #111111;
                font-size: 15px;
                outline: none;
            }

            #costeloPaymentForm input:focus {
                border-color: #d4af37;
                box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.15);
            }

            .costelo-payment-submit {
                width: 100%;
                margin-top: 20px;
                padding: 14px 18px;
                border: 1px solid #d4af37;
                border-radius: 10px;
                background: #111111;
                color: #d4af37;
                font-weight: 800;
                font-size: 15px;
                cursor: pointer;
                transition: 0.2s ease;
            }

            .costelo-payment-submit:hover {
                background: #d4af37;
                color: #111111;
            }

            .costelo-payment-note {
                text-align: center;
                color: #777777;
                font-size: 12px;
                line-height: 1.5;
                margin: 14px 0 0;
            }

            @media (max-width: 500px) {

                .costelo-payment-box {
                    padding: 22px 17px;
                    border-radius: 15px;
                }

                .costelo-pochi-number {
                    font-size: 23px;
                }

            }

        `;

        document.head.appendChild(style);

        /* Close button */
        document
            .getElementById("costeloPaymentClose")
            .addEventListener("click", closePaymentModal);

        /* Click outside popup */
        modal.addEventListener("click", event => {
            if (event.target === modal) {
                closePaymentModal();
            }
        });

        /* Form submission */
        document
            .getElementById("costeloPaymentForm")
            .addEventListener("submit", submitPaymentDetails);

        return modal;
    }


    /* =========================
       OPEN PAYMENT POPUP
    ========================= */

    function openPaymentModal(service) {

        const price = getServicePrice(service);

        const modal = createPaymentModal();

        document.getElementById("costeloPaymentService").textContent =
            service;

        document.getElementById("costeloPaymentAmount").textContent =
            price;

        document.getElementById("costeloClientName").value = "";
        document.getElementById("costeloClientWhatsApp").value = "";
        document.getElementById("costeloTransactionCode").value = "";

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

        setTimeout(() => {
            document.getElementById("costeloClientName").focus();
        }, 100);
    }


    /* =========================
       CLOSE PAYMENT POPUP
    ========================= */

    function closePaymentModal() {

        const modal = document.getElementById("costeloPaymentModal");

        if (modal) {
            modal.classList.remove("active");
        }

        document.body.style.overflow = "";
    }


    /* =========================
       SUBMIT PAYMENT DETAILS
    ========================= */

    function submitPaymentDetails(event) {

        event.preventDefault();

        const service =
            document.getElementById("costeloPaymentService").textContent.trim();

        const amount =
            document.getElementById("costeloPaymentAmount").textContent.trim();

        const fullName =
            document.getElementById("costeloClientName").value.trim();

        const whatsapp =
            document.getElementById("costeloClientWhatsApp").value.trim();

        const transactionCode =
            document.getElementById("costeloTransactionCode").value.trim();


        /* =========================
           VALIDATION
        ========================= */

        if (!fullName) {
            alert("Please enter your full names.");
            return;
        }


        if (!whatsapp) {
            alert("Please enter your WhatsApp number.");
            return;
        }


        const phoneDigits = whatsapp.replace(/\D/g, "");

        if (phoneDigits.length < 9 || phoneDigits.length > 12) {
            alert("Please enter a valid WhatsApp number.");
            return;
        }


        if (!transactionCode) {
            alert("Please enter your M-PESA transaction code.");
            return;
        }


        if (transactionCode.length < 8) {
            alert("Please enter the correct M-PESA transaction code.");
            return;
        }


        /* =========================
           SEND DETAILS TO ELVIS
        ========================= */

        const message =
            `PAYMENT VERIFICATION REQUEST\n\n` +
            `Service: ${service}\n` +
            `Amount: ${amount}\n\n` +
            `CLIENT DETAILS\n` +
            `Full Names: ${fullName}\n` +
            `WhatsApp Number: ${whatsapp}\n` +
            `M-PESA Transaction Code: ${transactionCode}\n\n` +
            `Pochi la Biashara: ${pochiNumber}\n\n` +
            `The client has submitted payment details for manual verification.`;

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


        /* =========================
           CLOSE POPUP
        ========================= */

        closePaymentModal();


        /* =========================
           OPEN ELVIS WHATSAPP
        ========================= */

        window.open(whatsappURL, "_blank");
    }


    /* =========================
       SERVICE CARD SETUP
    ========================= */

    function setupServiceCards() {

        const cards =
            document.querySelectorAll(".service-card[data-service]");


        cards.forEach(card => {

            const service =
                card.getAttribute("data-service")?.trim();

            if (!service) return;


            /* Look for the actual request/inquire
               button inside the service card */

            const button =
                card.querySelector(
                    ".service-button, " +
                    ".service-btn, " +
                    ".request-service, " +
                    ".request-btn, " +
                    "button"
                );


            if (!button) return;


            /* Prevent duplicate listeners */

            if (button.dataset.costeloBound === "true") {
                return;
            }

            button.dataset.costeloBound = "true";


            button.addEventListener("click", event => {

                event.preventDefault();
                event.stopPropagation();

                const price = getServicePrice(service);


                /* VARIABLE / NEGOTIABLE
                   → DIRECT WHATSAPP */

                if (isVariablePrice(price)) {

                    requestVariableService(service);

                    return;
                }


                /* FIXED PRICE
                   → PAYMENT POPUP */

                openPaymentModal(service);

            });

        });
    }


    /* =========================
       SERVICE REQUEST FORM
    ========================= */

    function setupServiceRequestForm() {

        const form =
            document.querySelector(
                "#serviceRequestForm, " +
                "#requestForm, " +
                ".service-request-form"
            );

        if (!form) return;


        if (form.dataset.costeloBound === "true") {
            return;
        }

        form.dataset.costeloBound = "true";


        form.addEventListener("submit", event => {

            event.preventDefault();

            const formData = new FormData(form);

            const name =
                formData.get("name") ||
                formData.get("fullName") ||
                "";

            const phone =
                formData.get("phone") ||
                formData.get("whatsapp") ||
                "";

            const service =
                formData.get("service") ||
                "General Service Request";

            const message =
                `Hello Elvis_costelo Digital Services 👋\n\n` +
                `I would like to request a service.\n\n` +
                `Name: ${name}\n` +
                `WhatsApp: ${phone}\n` +
                `Service: ${service}`;

            openWhatsApp(message);
        });
    }


    /* =========================
       NAVIGATION
    ========================= */

    function setupNavigation() {

        const navLinks =
            document.querySelectorAll('a[href^="#"]');

        navLinks.forEach(link => {

            link.addEventListener("click", event => {

                const targetID =
                    link.getAttribute("href");

                if (!targetID || targetID === "#") {
                    return;
                }

                const target =
                    document.querySelector(targetID);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });
    }


    /* =========================
       ESC KEY
    ========================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closePaymentModal();
        }

    });


    /* =========================
       START EVERYTHING
    ========================= */

    setupServiceCards();
    setupServiceRequestForm();
    setupNavigation();

});
