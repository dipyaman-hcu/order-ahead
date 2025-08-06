document.addEventListener('DOMContentLoaded', function() {

    const navbar = document.querySelector('.navbar');
    const textOverlay = document.querySelector('.text-overlay');
    const menuSection = document.querySelector('.menu');
    
    // Show navbar after 2 seconds
    setTimeout(() => {
        navbar.classList.add('show');
    }, 2000);

    setTimeout(() => {
        textOverlay.classList.add('slide-in');
    }, 2000);
    
    // Hide navbar when scrolling to menu section
    window.addEventListener('scroll', () => {
        const menuTop = menuSection.offsetTop;
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // If we've scrolled past 50% of the first section, hide navbar
        if (scrollPosition > windowHeight * 0.5) {
            navbar.classList.remove('show');
        } else {
            // Show navbar when back at top
            navbar.classList.add('show');
        }
    });

    // Get all order-count containers
    const orderCounts = document.querySelectorAll('.order-count');
    
    orderCounts.forEach(orderCount => {
        const decreaseBtn = orderCount.querySelector('.btn-decrease');
        const increaseBtn = orderCount.querySelector('.btn-increase');
        const countDisplay = orderCount.querySelector('.count-display');
        
        let count = 0;
        
        // Decrease button
        decreaseBtn.addEventListener('click', () => {
            if (count > 0) {
                count--;
                countDisplay.textContent = count;
            }
        });
        
        // Increase button
        increaseBtn.addEventListener('click', () => {
            count++;
            countDisplay.textContent = count;
        });
    });
});

function smoothScrollToElement(target, duration =800) {
    const targetPosition = target.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Easing function for smooth animation
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Usage
let currentSection = 0;
const sections = document.querySelectorAll('.slider-wrapper, .menu');

window.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    if (e.deltaY > 0 && currentSection < sections.length - 1) {
        currentSection++;
        smoothScrollToElement(sections[currentSection], 800); 
    } else if (e.deltaY < 0 && currentSection > 0) {
        currentSection--;
        smoothScrollToElement(sections[currentSection], 800);
    }
}, { passive: false });