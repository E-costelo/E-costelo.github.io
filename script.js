/* ==================================================
   ELVIS_COSTELO DIGITAL SERVICES
   MAIN JAVASCRIPT
   ================================================== */


/* ==================================================
   WHATSAPP DETAILS
   ================================================== */

const whatsappNumber = "254795873094";


/* ==================================================
   SERVICE PRICES
   ================================================== */

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


/* ==================================================
   GET SERVICE PRICE
   ================================================== */

function getServicePrice(serviceName) {

    return servicePrices[serviceName] || "PRICE TO BE CONFIRMED";

}


/* ==================================================
   PAYMENT MODAL
   ================================================== */

function openPaymentModal(serviceName) {

    const modal = document.getElementById("paymentModal");

    const serviceField =
        document.getElementById("paymentService");

    const amountField =
        document.getElementById("paymentAmount");


    if (!modal || !serviceField || !amountField) {

        alert(
            "Payment window could not be opened. Please refresh the page and try again."
        );

        return;

    }


    const price = getServicePrice(serviceName);


    serviceField.textContent = serviceName;

    amountField.textContent = price;


    /*
       Clear previous customer's information
       whenever a new payment window opens.
    */

    const nameField =
        document.getElementById("paymentName");

    const whatsappField =
        document.getElementById("paymentWhatsApp");

    const transactionField =
        document.getElementById("transactionCode");


    if (nameField) {
        nameField.value = "";
    }

    if (whatsappField) {
        whatsappField.value = "";
    }

    if (transactionField) {
        transactionField.value = "";
    }


    modal.classList.add("active");

    modal.setAttribute("aria-hidden", "false");


    /*
       Prevent the page behind the popup
       from scrolling.
    */

    document.body.style.overflow = "hidden";


    /*
       Put the cursor in the name field.
    */

    if (nameField) {

        setTimeout(function () {

            nameField.focus();

        }, 200);

    }

}


/* ==================================================
   CLOSE PAYMENT MODAL
   ================================================== */

function closePaymentModal() {

    const modal =
        document.getElementById("paymentModal");


    if (!modal) {
        return;
    }


    modal.classList.remove("active");

    modal.setAttribute("aria-hidden", "true");


    document.body.style.overflow = "";

}


/* ==================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE THE BOX
   ================================================== */

function setupModalBackgroundClose() {

    const modal =
        document.getElementById("paymentModal");


    if (!modal) {
        return;
    }


    modal.addEventListener("click", function (event) {

        if (event.target === modal) {

            closePaymentModal();

        }

    });

}


/* ==================================================
   CLOSE MODAL WITH ESCAPE KEY
   ================================================== */

function setupEscapeClose() {

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closePaymentModal();

        }

    });

}


/* ==================================================
   SUBMIT PAYMENT DETAILS
   ================================================== */

function submitPayment() {

    const nameField =
        document.getElementById("paymentName");

    const whatsappField =
        document.getElementById("paymentWhatsApp");

    const transactionField =
        document.getElementById("transactionCode");

    const serviceField =
        document.getElementById("paymentService");

    const amountField =
        document.getElementById("paymentAmount");


    if (
        !nameField ||
        !whatsappField ||
        !transactionField ||
        !serviceField ||
        !amountField
    ) {

        alert(
            "Payment form could not be loaded. Please refresh the page."
        );

        return;

    }


    const name =
        nameField.value.trim();

    const whatsapp =
        whatsappField.value.trim();

    const transactionCode =
        transactionField.value.trim();

    const service =
        serviceField.textContent.trim();

    const amount =
        amountField.textContent.trim();


    /* ----------------------------------------------
       VALIDATE CUSTOMER NAME
       ---------------------------------------------- */

    if (!name) {

        alert(
            "Please enter your full name."
        );

        nameField.focus();

        return;

    }


    /* ----------------------------------------------
       VALIDATE WHATSAPP NUMBER
       ---------------------------------------------- */

    if (!whatsapp) {

        alert(
            "Please enter your WhatsApp number."
        );

        whatsappField.focus();

        return;

    }


    /*
       Accept common Kenyan number formats,
       including:

       0712345678
       0112345678
       254712345678
       +254712345678

       We do not require the customer's number
       to be the same number used for payment.
    */

    const cleanWhatsApp =
        whatsapp.replace(/[\s\-()]/g, "");


    const kenyaNumberPattern =
        /^(?:0[17]\d{8}|254[17]\d{8}|\+254[17]\d{8})$/;


    if (!kenyaNumberPattern.test(cleanWhatsApp)) {

        alert(
            "Please enter a valid Kenyan WhatsApp number."
        );

        whatsappField.focus();

        return;

    }


    /* ----------------------------------------------
       VALIDATE TRANSACTION CODE
       ---------------------------------------------- */

    if (!transactionCode) {

        alert(
            "Please enter your M-PESA transaction code."
        );

        transactionField.focus();

        return;

    }


    /*
       M-PESA transaction codes are normally
       uppercase letters and numbers.

       We allow 8–15 characters so the system
       remains flexible.
    */

    const transactionPattern =
        /^[A-Z0-9]{8,15}$/i;


    if (!transactionPattern.test(transactionCode)) {

        alert(
            "Please enter a valid M-PESA transaction code."
        );

        transactionField.focus();

        return;

    }


    /* ----------------------------------------------
       CREATE WHATSAPP MESSAGE
       ---------------------------------------------- */

    const message =
        "🔔 NEW PAYMENT DETAILS\n\n" +

        "Customer Name: " +
        name +
        "\n" +

        "Customer WhatsApp: " +
        whatsapp +
        "\n" +

        "Service: " +
        service +
        "\n" +

        "Service Fee: " +
        amount +
        "\n" +

        "M-PESA Transaction Code: " +
        transactionCode +
        "\n\n" +

        "Please verify the payment in Pochi la Biashara.";


    /* ----------------------------------------------
       OPEN WHATSAPP
       ---------------------------------------------- */

    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        whatsappURL,
        "_blank"
    );


    /*
       Close the payment window after opening
       WhatsApp.
    */

    closePaymentModal();

}


/* ==================================================
   SERVICE CARD CONTROL
   ================================================== */

function setupServiceCards() {

    const serviceCards =
        document.querySelectorAll(".service-link");


    if (!serviceCards.length) {
        return;
    }


    serviceCards.forEach(function (card) {

        card.addEventListener("click", function (event) {

            event.preventDefault();


            const serviceName =
                card.getAttribute("data-service");


            if (!serviceName) {

                alert(
                    "Service information is missing."
                );

                return;

            }


            const price =
                getServicePrice(serviceName);


            /* ------------------------------------------
               FIXED PRICE SERVICES
               ------------------------------------------ */

            if (
                price !== "NEGOTIABLE" &&
                price !== "FEE VARIES"
            ) {

                openPaymentModal(serviceName);

                return;

            }


            /* ------------------------------------------
               NEGOTIABLE / VARIABLE SERVICES
               ------------------------------------------ */

            const message =
                "Hello Elvis_costelo Digital Services,\n\n" +

                "I would like to enquire about:\n" +

                serviceName +
                "\n\n" +

                "Please provide me with the price and details.\n\n" +

                "Thank you.";


            const quoteURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(message);


            window.open(
                quoteURL,
                "_blank"
            );

        });

    });

}


/* ==================================================
   GENERAL SERVICE REQUEST FORM
   ================================================== */

function setupServiceRequestForm() {

    const form =
        document.getElementById("serviceRequestForm");


    if (!form) {
        return;
    }


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const customerName =
            document
                .getElementById("customerName")
                .value
                .trim();


        const service =
            document
                .getElementById("serviceSelect")
                .value;


        const details =
            document
                .getElementById("serviceDetails")
                .value
                .trim();


        if (
            !customerName ||
            !service ||
            !details
        ) {

            alert(
                "Please complete all the fields before sending your request."
            );

            return;

        }


        const price =
            getServicePrice(service);


        /*
           If this is a fixed-price service,
           the customer should use the payment
           process rather than the general enquiry
           form.
        */

        if (
            price !== "NEGOTIABLE" &&
            price !== "FEE VARIES" &&
            price !== "PRICE TO BE CONFIRMED"
        ) {

            openPaymentModal(service);

            return;

        }


        /*
           Negotiable / variable services go
           directly to WhatsApp for quotation.
        */

        const message =
            "Hello Elvis_costelo Digital Services,\n\n" +

            "My name is " +
            customerName +
            ".\n" +

            "I need assistance with: " +
            service +
            ".\n\n" +

            "Details:\n" +
            details +
            "\n\n" +

            "Thank you.";


        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(message);


        window.open(
            whatsappURL,
            "_blank"
        );

    });

}


/* ==================================================
   START EVERYTHING AFTER PAGE LOAD
   ================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupServiceCards();

        setupServiceRequestForm();

        setupModalBackgroundClose();

        setupEscapeClose();

    }
);
