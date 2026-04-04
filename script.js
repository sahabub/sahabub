document.addEventListener('DOMContentLoaded', () => {
    /* =========================================================================
       DYNAMIC YEAR IN FOOTER
       ========================================================================= */
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    /* =========================================================================
       MOBILE NAVIGATION
       ========================================================================= */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    /* =========================================================================
       SCROLLED NAVBAR
       ========================================================================= */
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* =========================================================================
       SMOOTH SCROLLING (For browsers that don't support scroll-behavior)
       ========================================================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    /* =========================================================================
       SCROLL REVEAL ANIMATIONS
       ========================================================================= */
    // Add reveal class to sections
    const revealElements = document.querySelectorAll('section > .container');
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    /* =========================================================================
       SKILL BAR ANIMATION
       ========================================================================= */
    const skillBars = document.querySelectorAll('.progress');
    const skillsSection = document.getElementById('skills');
    let animated = false;

    const animateSkills = () => {
        if (!skillsSection || animated) return;
        
        const sectionPos = skillsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;

        if (sectionPos < screenPos) {
            skillBars.forEach(bar => {
                const targetWidth = bar.parentElement.previousElementSibling.lastElementChild.textContent;
                bar.style.width = targetWidth; // width is defined inline inside HTML too, but this triggers CSS transition if initially 0
            });
            animated = true;
        }
    };

    // Initially hide skill bar widths to animate them on scroll
    skillBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.setAttribute('data-width', targetWidth);
        bar.style.width = '0';
    });

    window.addEventListener('scroll', () => {
        animateSkills();
    });
    
    // Check if wait till scroll isn't needed
    animateSkills();

    /* =========================================================================
       EMAILJS FORM HANDLING & PHONE INPUT
       ========================================================================= */
    const phoneInputField = document.querySelector("#phone");
    const phoneInput = window.intlTelInput(phoneInputField, {
        initialCountry: "bd",
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@23.0.4/build/js/utils.js",
    });

    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = phoneInput.getNumber();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !phone || !message) {
                showMessage('Please fill in all fields.', 'error');
                return;
            }

            // Disable button and show sending state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-circle-notch fa-spin"></i>';

            // EmailJS Template Parameters matching the requested template
            const templateParams = {
                name: name,
                email: email,
                phone: phone,
                message: message,
                to_email: 'mdsahabubaiam01@gmail.com'
            };

            // Update with your real Template ID once created
            const serviceID = 'service_j5otvzb';
            const templateID = 'template_tu7rrsi';

            // Check if EmailJS is properly initialized (so the user doesn't get a silent failure)
            if (typeof emailjs === 'undefined') {
                showMessage('Email service is not loaded correctly. Please try again later.', 'error');
                resetButton(originalBtnText);
                return;
            }

            // Send email
            emailjs.send(serviceID, templateID, templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showMessage('Your message has been sent successfully! I will get back to you soon.', 'success');
                    contactForm.reset();
                    resetButton(originalBtnText);
                }, function(error) {
                    console.error('FAILED...', error);
                    // Provide a helpful message even if keys aren't set yet for testing
                    if (serviceID === 'YOUR_SERVICE_ID') {
                        showMessage('Form validated! (EmailJS is not configured yet. Connect keys to send live emails).', 'success');
                        contactForm.reset();
                    } else {
                        showMessage('Oops! Something went wrong. Please try again or email me directly.', 'error');
                    }
                    resetButton(originalBtnText);
                });
        });
    }

    function showMessage(msg, type) {
        formMessage.textContent = msg;
        formMessage.className = `form-message ${type}`;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }

    function resetButton(originalText) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
});
