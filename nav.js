// Light Work - Navigation Behavior

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('mainNav');
    let lastScroll = 0;
    let ticking = false;

    // Auto-hide navigation on scroll
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;

                // Hide nav when scrolling down past 100px
                if (currentScroll > lastScroll && currentScroll > 100) {
                    nav.classList.add('hidden');
                } else {
                    // Show nav when scrolling up
                    nav.classList.remove('hidden');
                }

                lastScroll = currentScroll;
                ticking = false;
            });

            ticking = true;
        }
    });

    // Show nav when mouse moves near top of viewport
    document.addEventListener('mousemove', (e) => {
        if (e.clientY < 50) {
            nav.classList.remove('hidden');
        }
    });

    // Highlight active page in navigation
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');

        // Check if link matches current page
        if (linkPath === currentPath ||
            (currentPath === '/' && linkPath === '/') ||
            (currentPath.includes(linkPath) && linkPath !== '/')) {
            link.classList.add('active');
        }
    });

    // Ensure nav is visible on page load for a few seconds
    setTimeout(() => {
        if (window.pageYOffset === 0) {
            nav.classList.remove('hidden');
        }
    }, 100);
});
