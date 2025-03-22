document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const body = document.body;

    // Mobile menu functionality
    hamburger.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent click from bubbling up
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
        body.classList.toggle("menu-open");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
            body.classList.remove("menu-open");
        }
    });

    // Prevent clicks inside the menu from closing it
    navLinks.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
            // Close menu when clicking a link
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
            body.classList.remove("menu-open");
            
            // Handle smooth scrolling
            e.preventDefault();
            const targetId = e.target.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 70;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }
        e.stopPropagation(); // Prevent click from bubbling up
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

    // Handle active state for navigation links
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    function setActiveLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove("active");
                    if (item.getAttribute("href") === "#" + sectionId) {
                        item.classList.add("active");
                    }
                });
            }
        });
    }

    // Update active state on scroll
    window.addEventListener("scroll", setActiveLink);
    setActiveLink();
});
  