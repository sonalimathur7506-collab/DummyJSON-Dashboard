// Mobile Menu

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("show");

});

// Close menu after clicking a link

const links = document.querySelectorAll(".nav-links a");

links.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

    });

});

// Active Page Highlight

const currentPage = window.location.pathname.split("/").pop();

links.forEach((link) => {

    if (link.getAttribute("href") === currentPage) {

        link.classList.add("active");

    }

});

// Card Animation

const cards = document.querySelectorAll(".card");

cards.forEach((card, index) => {

    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";

    setTimeout(() => {

        card.style.transition = "0.5s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";

    }, index * 200);

});
