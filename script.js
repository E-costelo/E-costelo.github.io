document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("serviceRequestForm");

    if (!form) {
        return;
    }

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const customerName = document
            .getElementById("customerName")
            .value
            .trim();

        const service = document
            .getElementById("serviceSelect")
            .value;

        const details = document
            .getElementById("serviceDetails")
            .value
            .trim();

        if (!customerName || !service || !details) {

            alert("Please complete all the fields before sending your request.");

            return;
        }

        const message =
            "Hello Elvis_costelo Digital Services,%0A%0A" +
            "My name is " + encodeURIComponent(customerName) + ".%0A" +
            "I need assistance with: " + encodeURIComponent(service) + ".%0A%0A" +
            "Details:%0A" + encodeURIComponent(details) + "%0A%0A" +
            "Thank you.";

        const whatsappURL =
            "https://wa.me/254795873094?text=" + message;

        window.open(whatsappURL, "_blank");

    });

});
// ===============================
// ELVIS_COSTELO SERVICE PRICES
// ===============================

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


// Get the price of a selected service
function getServicePrice(serviceName) {

    return servicePrices[serviceName] || "PRICE TO BE CONFIRMED";

}
// ===============================
// PAYMENT POPUP
// ===============================

function openPaymentModal(serviceName) {

    const modal = document.getElementById("paymentModal");
    const serviceField = document.getElementById("paymentService");
    const amountField = document.getElementById("paymentAmount");

    if (!modal || !serviceField || !amountField) {
        return;
    }

    const price = getServicePrice(serviceName);

    serviceField.textContent = serviceName;
    amountField.textContent = price;

    modal.classList.add("active");

}


function closePaymentModal() {

    const modal = document.getElementById("paymentModal");

    if (modal) {
        modal.classList.remove("active");
    }

}


function submitPayment() {

    const name = document
        .getElementById("paymentName")
        .value
        .trim();

    const whatsapp = document
        .getElementById("paymentWhatsApp")
        .value
        .trim();

    const transactionCode = document
        .getElementById("transactionCode")
        .value
        .trim();

    const service = document
        .getElementById("paymentService")
        .textContent;

    const amount = document
        .getElementById("paymentAmount")
        .textContent;


    if (!name || !whatsapp || !transactionCode) {

        alert(
            "Please enter your name, WhatsApp number and M-PESA transaction code."
        );

        return;
    }


    const message =
        "🔔 NEW PAYMENT DETAILS%0A%0A" +
        "Customer: " + encodeURIComponent(name) + "%0A" +
        "WhatsApp: " + encodeURIComponent(whatsapp) + "%0A" +
        "Service: " + encodeURIComponent(service) + "%0A" +
        "Amount: " + encodeURIComponent(amount) + "%0A" +
        "M-PESA Transaction Code: " +
        encodeURIComponent(transactionCode);


    const whatsappURL =
        "https://wa.me/254795873094?text=" + message;


    window.open(whatsappURL, "_blank");

}
// ===============================
// SERVICE CARD PAYMENT CONTROL
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const serviceCards = document.querySelectorAll(".service-link");

    serviceCards.forEach(function (card) {

        const serviceTitle = card.querySelector("h3");

        if (!serviceTitle) {
            return;
        }

        const serviceName = serviceTitle.textContent.trim();
        const price = getServicePrice(serviceName);

        card.addEventListener("click", function (event) {

            // NEGOTIABLE / FEE VARIES
            // → Continue directly to WhatsApp
            if (
                price === "NEGOTIABLE" ||
                price === "FEE VARIES"
            ) {
                return;
            }

            // FIXED PRICE
            // → Open payment popup
            event.preventDefault();

            openPaymentModal(serviceName);

        });

    });

});
// ===============================
// SERVICE CARD PAYMENT CONTROL
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const serviceCards = document.querySelectorAll(".service-link");

    serviceCards.forEach(function (card) {

        const serviceTitle = card.querySelector("h3");

        if (!serviceTitle) {
            return;
        }

        const serviceName = serviceTitle.textContent.trim();
        const price = getServicePrice(serviceName);

        card.addEventListener("click", function (event) {

            // NEGOTIABLE / FEE VARIES
            // → Open the existing WhatsApp link normally
            if (
                price === "NEGOTIABLE" ||
                price === "FEE VARIES"
            ) {
                return;
            }

            // FIXED PRICE
            // → Stop the normal WhatsApp link
            // → Open the payment popup instead
            event.preventDefault();

            openPaymentModal(serviceName);

        });

    });

});
