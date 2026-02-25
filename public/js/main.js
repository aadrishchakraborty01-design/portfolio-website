document.addEventListener("DOMContentLoaded", () => {
    // ---- DOM Elements ----
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");
    const submitBtn = document.getElementById("submitBtn");

    // ==============================================
    // CONTACT FORM SUBMISSION
    // ==============================================
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("formName").value.trim();
            const email = document.getElementById("formEmail").value.trim();
            const message = document.getElementById("formMessage").value.trim();

            if (!name || !email) {
                showFormStatus("Please fill in your name and email.", "error");
                return;
            }

            // Show loader
            const btnText = submitBtn.querySelector(".btn-text");
            const btnLoader = submitBtn.querySelector(".btn-loader");
            btnText.style.display = "none";
            btnLoader.style.display = "inline";
            submitBtn.disabled = true;

            try {
                const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, message }),
                });

                const data = await response.json();

                if (response.ok) {
                    showFormStatus(data.message || "Message sent successfully!", "success");
                    contactForm.reset();
                } else {
                    showFormStatus(data.message || "Something went wrong.", "error");
                }
            } catch (err) {
                showFormStatus("Network error.", "error");
            } finally {
                btnText.style.display = "inline";
                btnLoader.style.display = "none";
                submitBtn.disabled = false;
            }
        });
    }

    function showFormStatus(msg, type) {
        formStatus.textContent = msg;
        formStatus.className = "form-status " + type;
        formStatus.style.display = "block";
        setTimeout(() => {
            formStatus.style.display = "none";
        }, 5000);
    }
});
