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
/* =================================================
   CUSTOMER REVIEWS
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const stars = document.querySelectorAll(".star");
    const ratingInput = document.getElementById("reviewRating");
    const reviewForm = document.getElementById("customerReviewForm");

    let selectedRating = 0;


    /* =================================================
       STAR RATING
    ================================================== */

    stars.forEach(function (star) {

        star.addEventListener("click", function () {

            selectedRating = Number(this.dataset.rating);

            if (ratingInput) {
                ratingInput.value = selectedRating;
            }

            stars.forEach(function (item) {

                const itemRating =
                    Number(item.dataset.rating);

                if (itemRating <= selectedRating) {
                    item.classList.add("active");
                } else {
                    item.classList.remove("active");
                }

            });

        });

    });


    /* =================================================
       REVIEW SUBMISSION
    ================================================== */

    if (reviewForm) {

        reviewForm.addEventListener("submit", async function (event) {

            event.preventDefault();


            const name =
                document.getElementById("reviewName").value.trim();

            const service =
                document.getElementById("reviewService").value;

            const comment =
                document.getElementById("reviewComment").value.trim();


            /* CHECK RATING */

            if (selectedRating === 0) {

                alert(
                    "Please select a star rating before submitting your review."
                );

                return;

            }


            /* SUPABASE CONNECTION */

            const supabaseURL =
                "https://zpxaohasvkyohodwbazo.supabase.co";

            const supabaseKey =
                "sb_publishable_frGDzHBQMpHiYwlbjZZstA_FxJj-nRF";


            /* SAVE REVIEW TO SUPABASE */

            try {

                const response = await fetch(
                    supabaseURL + "/rest/v1/reviews",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json",
                            "apikey": supabaseKey,
                            "Authorization":
                                "Bearer " + supabaseKey,
                            "Prefer": "return=minimal"
                        },

                        body: JSON.stringify({

                            customer_name: name,

                            service: service,

                            rating: selectedRating,

                            comment: comment,

                            approved: false

                        })

                    }
                );


                /* DATABASE ERROR */

                if (!response.ok) {

                    const errorText =
                        await response.text();

                    console.error(
                        "Supabase review error:",
                        errorText
                    );

                    alert(
                        "We could not save your review. Please try again."
                    );

                    return;

                }


                /* =================================================
                   WHATSAPP NOTIFICATION
                ================================================== */

                const whatsappNumber =
                    "254795873094";


                const message =
                    "⭐ CUSTOMER REVIEW%0A%0A" +

                    "Name: " +
                    encodeURIComponent(name) +
                    "%0A" +

                    "Service: " +
                    encodeURIComponent(service) +
                    "%0A" +

                    "Rating: " +
                    selectedRating +
                    "/5 ⭐%0A" +

                    "Review: " +
                    encodeURIComponent(comment);


                const whatsappURL =
                    "https://wa.me/" +
                    whatsappNumber +
                    "?text=" +
                    message;


                window.open(
                    whatsappURL,
                    "_blank"
                );


                /* SUCCESS */

                alert(
                    "Thank you for your review! Your feedback has been submitted successfully."
                );


                /* RESET FORM */

                reviewForm.reset();

                selectedRating = 0;

                if (ratingInput) {
                    ratingInput.value = "";
                }

                stars.forEach(function (item) {

                    item.classList.remove("active");

                });

            }


            /* ERROR */

            catch (error) {

                console.error(
                    "Review submission error:",
                    error
                );

                alert(
                    "Something went wrong while submitting your review. Please try again."
                );

            }

        });

    }

});
