document.addEventListener('DOMContentLoaded', () => {
    const indicator = document.getElementById('slotsIndicator');
    const closeButton = indicator.querySelector('.slots-close');
    let hasShown = false;

    // Function to show the indicator
    function showIndicator() {
        if (!hasShown && !indicator.classList.contains('show')) {
            // Add class with a slight delay to ensure smooth animation
            requestAnimationFrame(() => {
                indicator.classList.add('show');
                hasShown = true;
                // Add padding to body to prevent content jump
                const headerHeight = indicator.offsetHeight;
                document.body.style.transition = 'padding-top 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
                document.body.style.paddingTop = `${headerHeight}px`;
            });
        }
    }

    // Show after 20 seconds
    setTimeout(showIndicator, 20000);

    // Show on scroll (if not already shown and after initial delay)
    let scrollTimeout;
    let initialDelay = true;
    
    setTimeout(() => {
        initialDelay = false;
    }, 20000);

    window.addEventListener('scroll', () => {
        if (!hasShown && !initialDelay) {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (window.scrollY > 100) {
                    showIndicator();
                }
            }, 100);
        }
    });

    // Close button functionality with smooth transition
    closeButton.addEventListener('click', () => {
        indicator.classList.remove('show');
        
        // Smooth transition for body padding
        document.body.style.paddingTop = '0';
        
        // Wait for transition to complete before resetting
        setTimeout(() => {
            document.body.style.transition = '';
        }, 1200);

        // Smooth scroll to top if near top
        if (window.scrollY < 200) {
            window.scrollTo({ 
                top: 0, 
                behavior: 'smooth'
            });
        }
    });
}); 