document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('mobile-menu-button');
    const navMenu = document.querySelector('.nav-menu');

    /* Re-create menu items if markup is empty (mobile view may wipe innerHTML) */
    if (navMenu && navMenu.children.length === 0) {
        navMenu.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="index.html">Overview</a></li>
            <li class="nav-item"><a class="nav-link" href="our-work.html">Our Work</a></li>
            <li class="nav-item"><a class="nav-link active" href="our-people.html">Our People</a></li>
            <li class="nav-item"><a class="nav-link" href="contact.html">Contact Us</a></li>`;
    }

    if (!menuButton || !navMenu) {
        console.error('Menu button or nav menu not found');
        return;
    }

    // Ensure initial state
    navMenu.classList.remove('active', 'show'); // ensure both are cleared
    menuButton.innerHTML = `
        <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor"/>
        </svg>`;

    // Define closeMenu function outside the loop
    function closeMenu() {
        navMenu.classList.remove('show');
        menuButton.innerHTML = `
            <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor"/>
            </svg>`;
    }

    function toggleMenu() {
        navMenu.classList.toggle('show');
        if (navMenu.classList.contains('show')) {
            /* Inline mobile-panel styles (does NOT change desktop navbar) */
            Object.assign(navMenu.style, {
                position: 'fixed',
                top: '80px',
                left: '0',
                width: '100%',
                background: 'rgba(0,0,0,0.95)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                padding: '20px 24px',
                zIndex: '2000',
                maxHeight: 'none',
                overflow: 'visible',
                opacity: '1',
                visibility: 'visible'
            });
            menuButton.innerHTML = `
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
                </svg>`;
        } else {
            navMenu.removeAttribute('style');
            closeMenu();
        }
    }

    // Remove existing listeners to prevent duplicates
    menuButton.removeEventListener('click', toggleMenu);
    menuButton.addEventListener('click', toggleMenu);

    // Close the menu when any nav link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.removeEventListener('click', closeMenu); // Remove any existing listeners
        link.addEventListener('click', closeMenu);
    });

    // Close menu on window resize to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            closeMenu();
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnButton = menuButton.contains(event.target);

        if (!isClickInsideNav && !isClickOnButton && navMenu.classList.contains('show')) {
            closeMenu();
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Form validation function
function validateForm(data) {
    const requiredFields = ['name', 'email', 'phone', 'subject', 'message'];
    let isValid = true;

    // Remove any existing error messages
    document.querySelectorAll('.error-message').forEach(msg => msg.remove());

    requiredFields.forEach(field => {
        const input = document.querySelector(`[name="${field}"]`);
        const value = data[field];

        if (!value || value.trim() === '') {
            showError(input, `${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
            isValid = false;
        }
    });

    // Email validation
    if (data.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            const emailInput = document.querySelector('[name="email"]');
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
    }

    // Phone validation
    if (data.phone) {
        const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(data.phone)) {
            const phoneInput = document.querySelector('[name="phone"]');
            showError(phoneInput, 'Please enter a valid phone number');
            isValid = false;
        }
    }

    return isValid;
}

function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#e53e3e';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;

    input.parentNode.appendChild(errorDiv);
    input.style.borderColor = '#e53e3e';

    // Remove error styling when user starts typing
    input.addEventListener('input', function() {
        this.style.borderColor = '#e5e5e5';
        const errorMsg = this.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    });
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #48bb78;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    successDiv.textContent = 'Thank you! Your message has been sent successfully.';

    document.body.appendChild(successDiv);

    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Add CSS animation for success message
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .team-card, .insight-card');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Call initMap when page loads
document.addEventListener('DOMContentLoaded', initMap);

// Counter animation for statistics (if present)
function animateCounters() {
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');

    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Lazy loading for images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));