document.addEventListener('DOMContentLoaded', () => {
    const menuOpener = document.querySelector('.menu-opener');
    const menu = document.querySelector('.menu');
    const navbar = document.querySelector('.navbar');
    const menuLinks = document.querySelectorAll('.menu a');
    const fadeZoomElements = document.querySelectorAll('.fade-zoom');
    const welcomeText = document.querySelector('.welcome-text');
    const startBuyingBtn = document.querySelector('.start-buying-btn');
    const welcomeSection = document.querySelector('.welcome-section');
    let lastScrollY = window.scrollY;

    const handleNavbarVisibility = () => {
        const welcomeSectionHeight = welcomeSection.offsetHeight;
        const fadeOutPoint = welcomeSectionHeight * 0.8; // Adjust this value to control when fading starts
        const currentScrollY = window.scrollY;

        if (currentScrollY > fadeOutPoint) {
            navbar.classList.remove('visible');
            navbar.classList.add('hidden'); // Fade out navbar
        } else if (currentScrollY < lastScrollY) {
            navbar.classList.remove('hidden');
            navbar.classList.add('visible'); // Fade in navbar when scrolling up
        }

        lastScrollY = currentScrollY; // Update the last scroll position
    };

    // Run on scroll
    window.addEventListener('scroll', handleNavbarVisibility);
    handleNavbarVisibility(); // Run on page load

    // Handle fade-zoom animation on scroll
    const handleScroll = () => {
        fadeZoomElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                element.classList.add('active');
            }
        });
    };

    const handleScrollFade = () => {
        const scrollY = window.scrollY;
        const fadePoint = 200; // Adjust this value to control when fading starts

        const opacity = Math.max(1 - scrollY / fadePoint, 0); // Calculate opacity
        welcomeText.style.opacity = opacity;
        welcomeText.style.transform = `translateY(${scrollY / 10}px)`; // Optional: Add slight movement
        startBuyingBtn.style.opacity = opacity;
    };

    window.addEventListener('scroll', handleScrollFade);

    // Initialize scroll-based animations
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Toggle the slide-in menu
    if (menuOpener && menu) {
        menuOpener.addEventListener('click', () => {
            menu.classList.toggle('active');
        });

        // Close the menu when a link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
            });
        });
    }

    // Add or remove the transparent-navbar class based on scroll position
    const toggleTransparentNavbar = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('transparent-navbar');
        } else {
            navbar.classList.remove('transparent-navbar');
        }
    };

    window.addEventListener('scroll', toggleTransparentNavbar);

    // Smooth scrolling for menu links
    menuLinks.forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});