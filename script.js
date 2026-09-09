console.log("SCRIPT.JS IS LOADED");

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
const scrollTopBtn = document.querySelector(".scroll-top");

window.addEventListener("scroll", () => {

    // Back to Top button
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add("show-scroll");
    } else {
        scrollTopBtn.classList.remove("show-scroll");
    }

    // Active navigation
    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});

const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector("nav ul");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}

const viewProjectsBtn = document.querySelector("#view-projects-btn");
const projectsSection = document.querySelector("#projects");

viewProjectsBtn.addEventListener("click", () => {
    projectsSection.scrollIntoView({
        behavior: "smooth"
    });
});

const contactMeBtn = document.querySelector("#contact-me");
const contactSection = document.querySelector("#contact");

contactMeBtn.addEventListener("click", () => {
    contactSection.scrollIntoView({
        behavior: "smooth"
    });
});

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        console.log("FORM SUBMIT EVENT FIRED");

        const submitBtn = contactForm.querySelector(".message-btn");
        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                contactForm.reset();
                submitBtn.textContent = "Message Sent ✓";

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2500);

            } else {
                submitBtn.textContent = "Failed to Send";

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2500);
            }

        } catch (error) {
            submitBtn.textContent = "Failed to Send";

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2500);
        }
    });
}