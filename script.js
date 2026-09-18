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
