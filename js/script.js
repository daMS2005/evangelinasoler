document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const body = document.body;

    // Mobile menu functionality
    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("active");
        body.classList.toggle("menu-open");
    });

    // Close mobile menu when clicking a link
    navLinks.addEventListener("click", function (e) {
        if (e.target.tagName === "A") {
            navLinks.classList.remove("active");
            hamburger.classList.remove("active");
            body.classList.remove("menu-open");
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (e) {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove("active");
            hamburger.classList.remove("active");
            body.classList.remove("menu-open");
        }
    });

    // Smooth scrolling for navigation links
    const links = document.querySelectorAll("nav a[href^='#']");
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-links a");

    function setActiveNavItem() {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href").slice(1) === current) {
                item.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", setActiveNavItem);
    window.addEventListener("load", setActiveNavItem);
});
  