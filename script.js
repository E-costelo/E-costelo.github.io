const whatsappNumber = "254795873094";

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
   GET SERVICE PRICE
========================================================= */

function getServicePrice(serviceName) {
    return servicePrices[serviceName] || "NEGOTIABLE";
}


/* =========================================================
   OPEN SERVICE PAYMENT / QUOTE
========================================================= */

function openPaymentModal(serviceName) {

    const price = getServicePrice(serviceName);

    /*
       NEGOTIABLE / FEE VARIES
       -----------------------
       Send customer directly to WhatsApp.
    */

    if (
        price === "NEGOTIABLE" ||
        price === "FEE VARIES"
    ) {

        const message =
            "Hello Elvis_costelo Digital Services 👋\n\n" +
            "I would like to inquire about the following service:\n\n" +
            "Service: " + serviceName + "\n" +
            "Fee: " + price + "\n\n" +
            "Please provide the quotation and further details.\n\n" +
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

        return;
    }


    /*
       FIXED PRICE
       -----------
       Open payment popup.
    */

    const modal =
        document.getElementById("paymentModal");

    const serviceElement =
        document.getElementById("paymentService");

    const priceElement =
        document.getElementById("paymentPrice");


    if (!modal) {
        return;
    }


    if (serviceElement) {
        serviceElement.textContent =
            serviceName;
    }


    if (priceElement) {
        priceElement.textContent =
            price;
    }


    modal.classList.add("active");

    document.body.classList.add("modal-open");
}


/* =========================================================
   CLOSE PAYMENT MODAL
========================================================= */

function closePaymentModal() {

    const modal =
        document.getElementById("paymentModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

    document.body.classList.remove("modal-open");
}


/* =========================================================
   CLOSE WHEN CLICKING OUTSIDE MODAL
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById("paymentModal");

        if (!modal) {
            return;
        }

        if (
            event.target === modal
        ) {
            closePaymentModal();
        }

    }
);


/* =========================================================
   CLOSE WITH ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {
            closePaymentModal();
        }

    }
);


/* =========================================================
   SUBMIT PAYMENT DETAILS
========================================================= */

function submitPayment() {

    const service =
        document
            .getElementById("paymentService")
            .textContent
            .trim();

    const price =
        document
            .getElementById("paymentPrice")
            .textContent
            .trim();

    const name =
        document
            .getElementById("paymentName")
            .value
            .trim();

    const customerWhatsApp =
        document
            .getElementById("paymentWhatsApp")
            .value
            .trim();

    const transactionCode =
        document
            .getElementById("transactionCode")
            .value
            .trim()
            .toUpperCase();


    /* =====================================================
       VALIDATE FULL NAME
    ====================================================== */

    if (!name) {

        alert(
            "Please enter your full name."
        );

        return;
    }


    /* =====================================================
       VALIDATE WHATSAPP NUMBER
    ====================================================== */

    const phonePattern =
        /^(?:0[17]\d{8}|254[17]\d{8}|\+254[17]\d{8})$/;

    if (
        !phonePattern.test(
            customerWhatsApp
        )
    ) {

        alert(
            "Please enter a valid Kenyan WhatsApp number."
        );

        return;
    }


    /* =====================================================
       VALIDATE TRANSACTION CODE
    ====================================================== */

    const transactionPattern =
        /^[A-Z0-9]{8,15}$/i;

    if (
        !transactionPattern.test(
            transactionCode
        )
    ) {

        alert(
            "Please enter a valid M-PESA transaction code."
        );

        return;
    }


    /* =====================================================
       WHATSAPP MESSAGE
    ====================================================== */

    const message =
        "NEW PAYMENT DETAILS\n\n" +

        "Customer Name: " +
        name +
        "\n" +

        "Customer WhatsApp: " +
        customerWhatsApp +
        "\n" +

        "Service: " +
        service +
        "\n" +

        "Service Fee: " +
        price +
        "\n" +

        "M-PESA Transaction Code: " +
        transactionCode +
        "\n\n" +

        "Please verify the payment in Pochi la Biashara.";


    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


    /*
       OPEN WHATSAPP
    */

    window.open(
        whatsappURL,
        "_blank"
    );


    /*
       CLOSE POPUP AFTER SUBMISSION
    */

    closePaymentModal();
}


/* =========================================================
   SERVICE CARD INTERACTION
   Allows clicking the service card itself.
========================================================= */

function setupServiceCards() {

    const serviceCards =
        document.querySelectorAll(
            ".service-card"
        );


    serviceCards.forEach(
        function (card) {

            card.addEventListener(
                "click",
                function (event) {

                    /*
                       Don't trigger twice when
                       the button itself is clicked.
                    */

                    if (
                        event.target.closest("button")
                    ) {
                        return;
                    }


                    const serviceName =
                        card.dataset.service;


                    if (serviceName) {

                        openPaymentModal(
                            serviceName
                        );

                    }

                }
            );

        }
    );
}


/* =========================================================
   REQUEST SERVICE FORM
========================================================= */

function setupServiceRequestForm() {

    const form =
        document.getElementById(
            "serviceRequestForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("requestName")
                    .value
                    .trim();


            const whatsapp =
                document
                    .getElementById("requestWhatsApp")
                    .value
                    .trim();


            const service =
                document
                    .getElementById("requestService")
                    .value
                    .trim();


            const details =
                document
                    .getElementById("requestMessage")
                    .value
                    .trim();


            if (!name) {

                alert(
                    "Please enter your full name."
                );

                return;
            }


            if (!whatsapp) {

                alert(
                    "Please enter your WhatsApp number."
                );

                return;
            }


            if (!service) {

                alert(
                    "Please select a service."
                );

                return;
            }


            const message =
                "NEW SERVICE REQUEST\n\n" +

                "Customer Name: " +
                name +
                "\n" +

                "WhatsApp Number: " +
                whatsapp +
                "\n" +

                "Service Required: " +
                service +
                "\n\n" +

                "Additional Details:\n" +
                (
                    details ||
                    "No additional details provided."
                );


            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(message);


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );
}


/* =========================================================
   INITIALIZE WEBSITE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupServiceCards();

        setupServiceRequestForm();

    }
);
