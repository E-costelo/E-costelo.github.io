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
