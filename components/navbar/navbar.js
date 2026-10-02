/**
 * Navbar Component Logic
 */

export function initNavbar() {
    const toggleBtn = document.getElementById('navbar-toggle');
    const menu = document.getElementById('navbar-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    if (!toggleBtn || !menu) return;

    // Mobile menu toggle
    toggleBtn.addEventListener('click', () => {
        const isOpen = menu.classList.contains('open');
        if (isOpen) {
            menu.classList.remove('open');
            toggleBtn.classList.remove('open');
        } else {
            menu.classList.add('open');
            toggleBtn.classList.add('open');
        }
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
            toggleBtn.classList.remove('open');
        });
    });

    // Scroll Spy for active section highlighting
    function onScroll() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}
