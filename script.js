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
    "E-Citizen Services": "FEE TO BE CONFIRMED",
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
    "Migration Services": "FEE TO BE CONFIRMED",
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
   GET SERVICE PRICE
========================================================= */

function getServicePrice(service) {

    return servicePrices[service] || "FEE TO BE CONFIRMED";

}


/* =========================================================
   OPEN PAYMENT SECTION
   ALL SERVICES COME HERE
========================================================= */

function openPaymentModal(service) {

    if (!service) {
        alert("Please select a service.");
        return;
    }

    const price = getServicePrice(service);

    const paymentService =
        document.getElementById("paymentService");

    const paymentAmount =
        document.getElementById("paymentAmount");

    const paymentModal =
        document.getElementById("paymentModal");


    /* Make sure the payment section exists */

    if (!paymentModal) {

        console.error(
            "Payment modal was not found in index.html."
        );

        alert(
            "Payment section could not be opened. Please refresh the page."
        );

        return;
    }


    /* Put selected service inside payment section */

    if (paymentService) {
        paymentService.textContent = service;
    }


    /* Put service price inside payment section */

    if (paymentAmount) {
        paymentAmount.textContent = price;
    }


    /* Open payment section */

    paymentModal.classList.add("active");

    paymentModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";


    /* Scroll payment section into view */

    setTimeout(function() {

        paymentModal.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 100);

}


/* =========================================================
   CLOSE PAYMENT SECTION
========================================================= */

function closePaymentModal() {

    const paymentModal =
        document.getElementById("paymentModal");


    if (!paymentModal) return;


    paymentModal.classList.remove("active");

    paymentModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}


/* =========================================================
   SUBMIT PAYMENT DETAILS
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


    /* Check payment fields exist */

    if (
        !nameElement ||
        !whatsappElement ||
        !transactionElement ||
        !serviceElement ||
        !amountElement
    ) {

        alert(
            "Payment form could not be loaded correctly. Please refresh the page."
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
        serviceElement.textContent.trim();

    const amount =
        amountElement.textContent.trim();


    /* =====================================================
       NAME VALIDATION
    ===================================================== */

    if (!name) {

        alert(
            "Please enter your full name."
        );

        nameElement.focus();

        return;
    }


    /* =====================================================
       WHATSAPP VALIDATION
    ===================================================== */

    const phonePattern =
        /^(?:0[17]\d{8}|254[17]\d{8}|\+254[17]\d{8})$/;


    if (!phonePattern.test(customerWhatsApp)) {

        alert(
            "Please enter a valid Kenyan WhatsApp number."
        );

        whatsappElement.focus();

        return;
    }


    /* =====================================================
       M-PESA TRANSACTION CODE VALIDATION
    ===================================================== */

    const transactionPattern =
        /^[A-Z0-9]{8,15}$/;


    if (!transactionPattern.test(transactionCode)) {

        alert(
            "Please enter a valid M-PESA transaction code."
        );

        transactionElement.focus();

        return;
    }


    /* =====================================================
       CREATE PAYMENT MESSAGE
    ===================================================== */

    const message =
`NEW PAYMENT DETAILS

Customer Name: ${name}

Customer WhatsApp: ${customerWhatsApp}

Service Requested: ${service}

Service Fee: ${amount}

M-PESA Transaction Code: ${transactionCode}

Payment Method: Pochi la Biashara

Please verify the payment before processing the customer's service.`;


    /* =====================================================
       SEND PAYMENT DETAILS TO ELVIS
    ===================================================== */

    window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
        "_blank"
    );


    /* =====================================================
       CLOSE PAYMENT SECTION
    ===================================================== */

    setTimeout(function() {

        closePaymentModal();

    }, 300);

}


/* =========================================================
   SERVICE CARDS
========================================================= */

function setupServiceCards() {

    const cards =
        document.querySelectorAll(
            ".service-card[data-service]"
        );


    console.log(
        "Elvis_costelo service cards detected:",
        cards.length
    );


    cards.forEach(function(card) {

        const service =
            card.getAttribute("data-service");


        if (!service) return;


        /*
         * Find the service request/inquire button.
         *
         * We support the existing service button and
         * common button structures without changing HTML.
         */

        const button =
            card.querySelector(
                ".service-button, .service-btn, button, a"
            );


        if (!button) {

            console.warn(
                "No request button found for:",
                service
            );

            return;
        }


        /* Prevent duplicate click listeners */

        if (button.dataset.paymentListener === "true") {
            return;
        }


        button.dataset.paymentListener = "true";


        button.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                event.stopPropagation();

                openPaymentModal(service);

            }
        );

    });

}


/* =========================================================
   REQUEST SERVICE FORM
========================================================= */

function setupServiceRequestForm() {

    const form =
        document.getElementById(
            "serviceRequestForm"
        );


    if (!form) return;


    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const nameElement =
                document.getElementById(
                    "requestName"
                );

            const phoneElement =
                document.getElementById(
                    "requestWhatsApp"
                );

            const serviceElement =
                document.getElementById(
                    "requestService"
                );

            const messageElement =
                document.getElementById(
                    "requestMessage"
                );


            const name =
                nameElement ?
                nameElement.value.trim() :
                "";

            const phone =
                phoneElement ?
                phoneElement.value.trim() :
                "";

            const service =
                serviceElement ?
                serviceElement.value :
                "";

            const additionalDetails =
                messageElement ?
                messageElement.value.trim() :
                "";


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
${additionalDetails || "None"}`;


            window.open(
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
                "_blank"
            );

        }
    );

}


/* =========================================================
   PAYMENT MODAL CONTROLS
========================================================= */

function setupModal() {

    const paymentModal =
        document.getElementById(
            "paymentModal"
        );


    if (!paymentModal) return;


    /* Close when clicking outside modal content */

    paymentModal.addEventListener(
        "click",
        function(event) {

            if (
                event.target === paymentModal
            ) {

                closePaymentModal();

            }

        }
    );


    /* Close using ESC */

    document.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Escape"
            ) {

                closePaymentModal();

            }

        }
    );

}


/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {

    const links =
        document.querySelectorAll(
            ".nav-links a"
        );


    if (!links.length) return;


    links.forEach(function(link) {

        link.addEventListener(
            "click",
            function() {

                links.forEach(
                    function(item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                this.classList.add(
                    "active"
                );

            }
        );

    });

}


/* =========================================================
   START EVERYTHING
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        setupServiceCards();

        setupServiceRequestForm();

        setupModal();

        setupNavigation();


        console.log(
            "Elvis_costelo Digital Services loaded successfully."
        );

    }
);
