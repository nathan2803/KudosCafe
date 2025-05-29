document.addEventListener('DOMContentLoaded', () => {
    // Navigation toggle
    const hamburger = document.getElementById('hamburgerBtn');
    const headerNav = document.getElementById('headerNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('mainHeader');

    // Toggle navigation
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        headerNav.classList.toggle('active');
    });

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            headerNav.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!headerNav.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            headerNav.classList.remove('active');
        }
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroContent = document.querySelector('.hero-content');
            
            // Parallax effect
            // Keep background permanently visible
            heroContent.style.opacity = '1';
        });
    }

    // Reveal animations on scroll
    const sections = document.querySelectorAll('.about-section, .featured-section, .reviews-section');
    const reviewCards = document.querySelectorAll('.review-card');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');

                // If this is the reviews section, add staggered animation to cards
                if (section.classList.contains('reviews-section')) {
                    reviewCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, 100 * index);
                    });
                }
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on initial load
});