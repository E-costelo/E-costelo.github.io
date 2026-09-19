/* =========================================================
   ELVIS_COSTELO DIGITAL SERVICES
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
   OPEN PAYMENT MODAL
========================================================= */

function openPaymentModal(service) {

    const price = getServicePrice(service);

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


    document.getElementById("paymentService").textContent = service;

    document.getElementById("paymentAmount").textContent = price;

    const modal = document.getElementById("paymentModal");

    modal.classList.add("active");

    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

}


/* =========================================================
   CLOSE PAYMENT MODAL
========================================================= */

function closePaymentModal() {

    const modal = document.getElementById("paymentModal");

    modal.classList.remove("active");

    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}


/* =========================================================
   SUBMIT PAYMENT
========================================================= */

function submitPayment() {

    const name =
        document.getElementById("paymentName").value.trim();

    const customerWhatsApp =
        document.getElementById("paymentWhatsApp").value.trim();

    const transactionCode =
        document.getElementById("transactionCode").value.trim().toUpperCase();

    const service =
        document.getElementById("paymentService").textContent;

    const amount =
        document.getElementById("paymentAmount").textContent;


    if (!name) {

        alert("Please enter your name.");

        return;
    }


    const phonePattern =
        /^(?:0[17]\d{8}|254[17]\d{8}|\+254[17]\d{8})$/;


    if (!phonePattern.test(customerWhatsApp)) {

        alert(
            "Please enter a valid Kenyan WhatsApp number."
        );

        return;
    }


    const transactionPattern =
        /^[A-Z0-9]{8,15}$/i;


    if (!transactionPattern.test(transactionCode)) {

        alert(
            "Please enter a valid M-PESA transaction code."
        );

        return;
    }


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


    cards.forEach(card => {

        const button =
            card.querySelector(".service-button");


        if (!button) return;


        button.addEventListener("click", function(event) {

            event.preventDefault();

            const service =
                card.getAttribute("data-service");

            openPaymentModal(service);

        });

    });

}


/* =========================================================
   REQUEST FORM
========================================================= */

function setupServiceRequestForm() {

    const form =
        document.getElementById("serviceRequestForm");


    if (!form) return;


    form.addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("requestName").value.trim();

        const phone =
            document.getElementById("requestWhatsApp").value.trim();

        const service =
            document.getElementById("requestService").value;

        const message =
            document.getElementById("requestMessage").value.trim();


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
   MODAL BACKGROUND
========================================================= */

function setupModal() {

    const modal =
        document.getElementById("paymentModal");


    if (!modal) return;


    modal.addEventListener("click", function(event) {

        if (event.target === modal) {

            closePaymentModal();

        }

    });


    document.addEventListener("keydown", function(event) {

        if (event.key === "Escape") {

            closePaymentModal();

        }

    });

}


/* =========================================================
   NAV ACTIVE STATE
========================================================= */

function setupNavigation() {

    const links =
        document.querySelectorAll(".nav-links a");


    links.forEach(link => {

        link.addEventListener("click", function() {

            links.forEach(item =>
                item.classList.remove("active")
            );

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

});
