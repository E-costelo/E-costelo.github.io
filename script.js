/* =========================================================
   ELVIS_COSTELO DIGITAL SERVICES
   SERVICE REQUEST + PAYMENT SYSTEM
========================================================= */

const whatsappNumber = "254795873094";


/* =========================================================
   SERVICE PRICES
========================================================= */

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


/* =========================================================
   GET PRICE
========================================================= */

function getServicePrice(service) {

    return servicePrices[service] || "FEE VARIES";

}


/* =========================================================
   OPEN SERVICE REQUEST
========================================================= */

function openPaymentModal(service) {

    if (!service) {
        alert("Please select a service.");
        return;
    }

    const price = getServicePrice(service);


    /* -----------------------------------------------------
       NEGOTIABLE / VARIABLE SERVICES
       Send directly to WhatsApp for quotation
    ----------------------------------------------------- */

    if (
        price === "NEGOTIABLE" ||
        price === "FEE VARIES"
    ) {

        const message =
`Hello Elvis_costelo Digital Services,

I would like to request:

Service: ${service}

Please provide the applicable service fee and further instructions.`;

        window.open(
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
            "_blank"
        );

        return;
    }


    /* -----------------------------------------------------
       FIXED PRICE SERVICES
       OPEN PAYMENT MODAL
    ----------------------------------------------------- */

    const serviceElement =
        document.getElementById("paymentService");

    const amountElement =
        document.getElementById("paymentAmount");

    const modal =
        document.getElementById("paymentModal");


    if (!serviceElement || !amountElement || !modal) {

        console.error(
            "Payment modal elements are missing from index.html."
        );

        alert(
            "The payment section could not be opened. Please refresh the page and try again."
        );

        return;
    }


    serviceElement.textContent = service;

    amountElement.textContent = price;

    modal.classList.add("active");

    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

}


/* =========================================================
   CLOSE PAYMENT MODAL
========================================================= */

function closePaymentModal() {

    const modal =
        document.getElementById("paymentModal");


    if (!modal) return;


    modal.classList.remove("active");

    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}


/* =========================================================
   SUBMIT PAYMENT
========================================================= */

function submitPayment() {

    const nameElement =
        document.getElementById("paymentName");

    const whatsappElement =
        document.getElementById("paymentWhatsApp");

    const transactionElement =
        document.getElementById("transactionCode");

    const serviceElement =
        document.getElementById("paymentService");

    const amountElement =
        document.getElementById("paymentAmount");


    if (
        !nameElement ||
        !whatsappElement ||
        !transactionElement ||
        !serviceElement ||
        !amountElement
    ) {

        alert(
            "Payment form is incomplete. Please refresh the page and try again."
        );

        return;
    }


    const name =
        nameElement.value.trim();

    const customerWhatsApp =
        whatsappElement.value.trim();

    const transactionCode =
        transactionElement.value.trim().toUpperCase();

    const service =
        serviceElement.textContent;

    const amount =
        amountElement.textContent;


    /* -----------------------------------------------------
       NAME
    ----------------------------------------------------- */

    if (!name) {

        alert("Please enter your name.");

        nameElement.focus();

        return;
    }


    /* -----------------------------------------------------
       WHATSAPP NUMBER
    ----------------------------------------------------- */

    const phonePattern =
        /^(?:0[17]\d{8}|254[17]\d{8}|\+254[17]\d{8})$/;


    if (!phonePattern.test(customerWhatsApp)) {

        alert(
            "Please enter a valid Kenyan WhatsApp number."
        );

        whatsappElement.focus();

        return;
    }


    /* -----------------------------------------------------
       M-PESA TRANSACTION CODE
    ----------------------------------------------------- */

    const transactionPattern =
        /^[A-Z0-9]{8,15}$/i;


    if (!transactionPattern.test(transactionCode)) {

        alert(
            "Please enter a valid M-PESA transaction code."
        );

        transactionElement.focus();

        return;
    }


    /* -----------------------------------------------------
       WHATSAPP PAYMENT MESSAGE
    ----------------------------------------------------- */

    const message =
`NEW PAYMENT DETAILS

Customer Name: ${name}

Customer WhatsApp: ${customerWhatsApp}

Service: ${service}

Service Fee: ${amount}

M-PESA Transaction Code: ${transactionCode}

Please verify the payment in Pochi la Biashara.`;


    window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
        "_blank"
    );

}


/* =========================================================
   SERVICE CARDS
========================================================= */

function setupServiceCards() {

    const cards =
        document.querySelectorAll(".service-card[data-service]");


    console.log(
        "Elvis_costelo: Service cards found:",
        cards.length
    );


    cards.forEach(card => {

        const service =
            card.getAttribute("data-service");


        if (!service) return;


        /* -------------------------------------------------
           FIND THE REQUEST BUTTON

           Supports different button classes so the
           functionality doesn't break because of naming.
        ------------------------------------------------- */

        const button =
            card.querySelector(
                ".service-button, .service-btn, .request-service, .request-btn, button, a"
            );


        if (button) {

            button.addEventListener("click", function(event) {

                event.preventDefault();

                event.stopPropagation();

                openPaymentModal(service);

            });

        }


        /* -------------------------------------------------
           FALLBACK

           If the card itself is clickable and there is
           no request button, allow the card to open it.
        ------------------------------------------------- */

        if (!button) {

            card.addEventListener("click", function(event) {

                if (
                    event.target.closest("a") ||
                    event.target.closest("button")
                ) {
                    return;
                }

                openPaymentModal(service);

            });

        }

    });

}


/* =========================================================
   REQUEST SERVICE FORM
========================================================= */

function setupServiceRequestForm() {

    const form =
        document.getElementById("serviceRequestForm");


    if (!form) return;


    form.addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("requestName")?.value.trim();

        const phone =
            document.getElementById("requestWhatsApp")?.value.trim();

        const service =
            document.getElementById("requestService")?.value;

        const message =
            document.getElementById("requestMessage")?.value.trim();


        if (!name || !phone || !service) {

            alert(
                "Please complete all required fields."
            );

            return;
        }


        const whatsappMessage =
`Hello Elvis_costelo Digital Services,

I would like to request your assistance.

Name: ${name}

WhatsApp: ${phone}

Service: ${service}

Additional Details:
${message || "None"}`;


        window.open(
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
            "_blank"
        );

    });

}


/* =========================================================
   MODAL
========================================================= */

function setupModal() {

    const modal =
        document.getElementById("paymentModal");


    if (!modal) return;


    /* Close when clicking outside the modal box */

    modal.addEventListener("click", function(event) {

        if (event.target === modal) {

            closePaymentModal();

        }

    });


    /* Close with ESC key */

    document.addEventListener("keydown", function(event) {

        if (event.key === "Escape") {

            closePaymentModal();

        }

    });

}


/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {

    const links =
        document.querySelectorAll(".nav-links a");


    if (!links.length) return;


    links.forEach(link => {

        link.addEventListener("click", function() {

            links.forEach(item => {

                item.classList.remove("active");

            });

            this.classList.add("active");

        });

    });

}


/* =========================================================
   START EVERYTHING
========================================================= */

document.addEventListener("DOMContentLoaded", function() {

    setupServiceCards();

    setupServiceRequestForm();

    setupModal();

    setupNavigation();

    console.log(
        "Elvis_costelo Digital Services loaded successfully."
    );

});
