// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    navMenu.classList.toggle('active');
    toggle.classList.toggle('active');
}

// FAQ accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    document.querySelector('.mobile-menu-toggle').classList.remove('active');
                }
                
                // Scroll to target
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Focus on first input if target is contact-form-group
                if (href === '#contact-form-group') {
                    setTimeout(() => {
                        const firstInput = target.querySelector('input');
                        if (firstInput) {
                            firstInput.focus();
                        }
                    }, 500); // Wait for smooth scroll to complete
                }
            }
        });
    });
}

// Form submission handler
// Initialize EmailJS
(function() {
    emailjs.init({
        publicKey: "zZl0p0tskVOYRvs8c", // Replace with your EmailJS public key
    });
})();

// Sticky navbar
function initStickyNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
}

// Intersection Observer for animations
function initScrollAnimations() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Skip animations if user prefers reduced motion
        return;
    }
    
    // Detect mobile devices for optimized settings
    const isMobile = window.innerWidth <= 768;
    
    const observerOptions = {
        threshold: isMobile ? 0.1 : 0.15,
        rootMargin: isMobile ? '0px 0px -30px 0px' : '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a small delay to ensure smooth rendering on mobile
                if (isMobile) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, 50);
                } else {
                    entry.target.classList.add('animate-in');
                }
                // Unobserve after animation to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all main sections
    const sections = document.querySelectorAll(`
        .intro-section,
        .page-description,
        .doctors-section,
        .long-hair-compare,
        .why-skin-clinic,
        .clinic-services,
        .graft-compare,
        .long-hair-almi-section,
        .step-video,
        .home-review,
        .youtube-video,
        .hospital-location,
        .contact-divide
    `);
    
    sections.forEach(section => {
        section.classList.add('section-animate');
        observer.observe(section);
    });
    
    // Also observe individual cards with existing animation
    document.querySelectorAll('.feature-card, .service-card, .doctor-card, .why-card, .blog-card').forEach(el => {
        if (!el.closest('.section-animate')) {
            el.style.opacity = '0';
            el.style.transform = isMobile ? 'translateY(20px)' : 'translateY(30px)';
            el.style.transition = isMobile ? 'opacity 0.4s ease, transform 0.4s ease' : 'opacity 0.6s ease, transform 0.6s ease';
            
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (isMobile) {
                            setTimeout(() => {
                                entry.target.style.opacity = '1';
                                entry.target.style.transform = 'translateY(0)';
                            }, 50);
                        } else {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }
                        cardObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            cardObserver.observe(el);
        }
    });
}

// Scroll to top button
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    
    if (!scrollBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Floating CTA contact options toggle
function initFloatingCTA() {
    const floatingContact = document.getElementById('floating-contact');
    const floatingBtn = document.getElementById('floatingBtn');
    const contactOptions = document.getElementById('contactOptions');
    
    if (!floatingBtn || !contactOptions) return;
    
    floatingBtn.addEventListener('click', (e) => {
        e.preventDefault();
        floatingBtn.classList.toggle('active');
        floatingContact.classList.toggle('active');
        contactOptions.classList.toggle('active');
        
        // Change icon when active
        const icon = floatingBtn.querySelector('.floating-icon');
        if (floatingBtn.classList.contains('active')) {
            icon.textContent = '✕';
        } else {
            icon.textContent = '💬';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.floating-cta')) {
            floatingBtn.classList.remove('active');
            floatingContact.classList.remove('active');
            contactOptions.classList.remove('active');
            const icon = floatingBtn.querySelector('.floating-icon');
            icon.textContent = '💬';
        }
    });
}

// Parallax effect
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background img');
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Service card hover effects
function initServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02) rotate(1deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
    });
}

// Animated counter for stats
function initCounterAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                animateValue(entry.target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
}

function animateValue(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const number = parseInt(text.replace(/[^0-9]/g, ''));
    
    if (isNaN(number)) return;
    
    const duration = 2000;
    const step = number / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        if (hasPlus) displayValue += '+';
        if (hasPercent) displayValue += '%';
        
        element.textContent = displayValue;
    }, 16);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Setup mobile menu toggle
    document.querySelector('.mobile-menu-toggle').addEventListener('click', toggleMobileMenu);
    
    // Initialize features
    initFAQ();
    initSmoothScroll();
    initContactForm();
    initContactForm2();
    initStickyNavbar();
    initScrollAnimations();
    initScrollToTop();
    initFloatingCTA();
    initParallax();
    initHeroSlider(); // Initialize hero slider
    initStatsAnimation(); // Initialize stats counter animation
    initAOS(); // Initialize AOS animations
    initGraftCompareSlider(); // Initialize graft compare slider
    initVideoRecordSlider(); // Initialize video record slider
    initReviewCarousel(); // Initialize Mission Impossible review carousel
    initLightbox(); // Initialize lightbox for reviews
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const navMenu = document.querySelector('.nav-menu');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !toggle.contains(e.target)) {
            navMenu.classList.remove('active');
            toggle.classList.remove('active');
        }
    });
    
    // Add hover effect to service cards
    initServiceCardEffects();
    
    // Add animated counter for stats
    initCounterAnimation();
});

// Hero Slider functionality
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.slider-control.prev');
    const nextBtn = document.querySelector('.slider-control.next');
    let currentSlide = 0;
    let slideInterval;
    
    // Show specific slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => {
            dot.classList.remove('active', 'w-active');
            dot.setAttribute('aria-pressed', 'false');
            dot.setAttribute('tabindex', '-1');
        });
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active', 'w-active');
        dots[index].setAttribute('aria-pressed', 'true');
        dots[index].setAttribute('tabindex', '0');
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Auto play
    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoPlay() {
        clearInterval(slideInterval);
    }
    
    // Event listeners for navigation buttons
    nextBtn.addEventListener('click', () => {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
    });
    
    prevBtn.addEventListener('click', () => {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
    });
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            currentSlide = index;
            showSlide(currentSlide);
            startAutoPlay();
        });
    });
    
    // Pause on hover
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', stopAutoPlay);
    heroSlider.addEventListener('mouseleave', startAutoPlay);
    
    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    heroSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    });
    
    heroSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right
            prevSlide();
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        }
    });
    
    // Start auto play
    startAutoPlay();
}

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const isDecimal = target % 1 !== 0;
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = isDecimal ? target.toFixed(1) : Math.ceil(target).toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = isDecimal ? start.toFixed(1) : Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Initialize Stats Counter Animation with Intersection Observer
function initStatsAnimation() {
    const statsSection = document.querySelector('.stats-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach((number, index) => {
                    const target = parseInt(number.dataset.count);
                    setTimeout(() => {
                        animateCounter(number, target, 2000);
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Simple AOS (Animate On Scroll) implementation
function initAOS() {
    const aosElements = document.querySelectorAll('[data-aos]');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    aosElements.forEach(element => {
        element.classList.add('aos-init');
        observer.observe(element);
    });
}

// Modal Functions
function showSuccessModal(title, message) {
    const modal = document.getElementById('successModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const closeBtn = document.getElementById('modalCloseBtn');
    
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.classList.add('show');
    
    // Close on button click
    closeBtn.onclick = function() {
        modal.classList.remove('show');
    }
    
    // Close on outside click
    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
        }
    });
}

function showErrorModal(title, message) {
    const modal = document.getElementById('errorModal');
    const modalTitle = document.getElementById('errorModalTitle');
    const modalMessage = document.getElementById('errorModalMessage');
    const closeBtn = document.getElementById('errorModalCloseBtn');
    
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.classList.add('show');
    
    // Close on button click
    closeBtn.onclick = function() {
        modal.classList.remove('show');
    }
    
    // Close on outside click
    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
        }
    });
}

// Graft Compare Slider
function initGraftCompareSlider() {
    const slider = document.querySelector('.graft-compare-slider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.graft-slide');
    const dots = slider.querySelectorAll('.graft-dot');
    const prevBtn = slider.querySelector('.graft-slider-prev');
    const nextBtn = slider.querySelector('.graft-slider-next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto-play slider
    const autoPlayInterval = setInterval(nextSlide, 4000);
    
    // Pause auto-play on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    // Resume auto-play on mouse leave (optional)
    slider.addEventListener('mouseleave', () => {
        // Uncomment the line below if you want to resume auto-play
        // setInterval(nextSlide, 4000);
    });
}

// Video Record Slider
function initVideoRecordSlider() {
    const slider = document.querySelector('.video-recond-banner-slide');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.w-slide');
    const dots = slider.querySelectorAll('.w-slider-dot');
    const prevBtn = slider.querySelector('.w-slider-arrow-left');
    const nextBtn = slider.querySelector('.w-slider-arrow-right');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('w-active');
            dot.setAttribute('aria-pressed', 'false');
        });
        
        // Show current slide
        slides[index].style.display = 'block';
        
        // Activate current dot
        if (dots[index]) {
            dots[index].classList.add('w-active');
            dots[index].setAttribute('aria-pressed', 'true');
        }
        
        // Update aria-label
        const ariaLabel = slider.querySelector('.w-slider-aria-label');
        if (ariaLabel) {
            ariaLabel.textContent = `Slide ${index + 1} of ${totalSlides}.`;
        }
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 2000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Event listeners for navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            currentSlide = index;
            showSlide(currentSlide);
            startAutoPlay();
        });
    });
    
    // Initialize
    showSlide(currentSlide);
    startAutoPlay();
    
    // Pause auto-play on hover
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);
}

// Mission Impossible Review Carousel
function initReviewCarousel() {
    const carousel = document.querySelector('.carousel-horizontal-content');
    
    if (!carousel) return;
    
    // Clone items for infinite scroll effect
    const items = Array.from(carousel.children);
    items.forEach(item => {
        const clone = item.cloneNode(true);
        carousel.appendChild(clone);
    });
}

// Lightbox functionality
function initLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-image');
    const reviewItems = document.querySelectorAll('.review-carousel');
    const closeBtn = document.querySelector('.lightbox-close');
    
    if (!modal || !modalImg) return;
    
    // Open lightbox on image click
    reviewItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-image');
            modal.style.display = 'block';
            modalImg.src = imgSrc;
        });
    });
    
    // Close lightbox
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Contact Form Handler
function initContactForm() {
    const form = document.getElementById('contact-form');
    const popup = document.getElementById('success-popup');
    const closeBtn = popup ? popup.querySelector('.popup-close') : null;
    
    // Validation function
    function validateForm() {
        let isValid = true;
        
        // Clear all previous errors
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
        document.querySelectorAll('.form-group input').forEach(input => {
            input.classList.remove('error');
        });
        
        // Validate name
        const name = document.getElementById('name');
        if (!name.value.trim()) {
            document.getElementById('name-error').textContent = 'กรุณาตอบคำถาม';
            name.classList.add('error');
            isValid = false;
        }
        
        // Validate lastname
        const lastname = document.getElementById('lastname');
        if (!lastname.value.trim()) {
            document.getElementById('lastname-error').textContent = 'กรุณาตอบคำถาม';
            lastname.classList.add('error');
            isValid = false;
        }
        
        // Validate phone
        const phone = document.getElementById('phone');
        const phoneValue = phone.value.trim();
        if (!phoneValue) {
            document.getElementById('phone-error').textContent = 'กรุณาระบุเบอร์โทรศัพท์ให้ถูกต้อง';
            phone.classList.add('error');
            isValid = false;
        } else if (!/^[0-9]{9,10}$/.test(phoneValue)) {
            document.getElementById('phone-error').textContent = 'กรุณาระบุเบอร์โทรศัพท์ให้ถูกต้อง';
            phone.classList.add('error');
            isValid = false;
        }

        // Validate line
        const line = document.getElementById('line');
        if (!line.value.trim()) {
            document.getElementById('line-error').textContent = 'กรุณาตอบคำถาม';
            line.classList.add('error');
            isValid = false;
        }
        
        // Validate email (optional but must be valid format if provided)
        const email = document.getElementById('email');
        const emailValue = email.value.trim();
        if (!emailValue) {
            document.getElementById('email-error').textContent = 'กรุณาระบุอีเมลที่ถูกต้อง';
            email.classList.add('error');
            isValid = false;
        } else if (emailValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
            document.getElementById('email-error').textContent = 'กรุณาระบุอีเมลที่ถูกต้อง';
            email.classList.add('error');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Only allow numbers in phone field
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
    
    // Clear error on input
    document.querySelectorAll('.form-group input').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
            const errorId = this.id + '-error';
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    });
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateForm()) {
                return;
            }
            
            // Get the submit button to show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'กำลังส่ง...';
            submitBtn.disabled = true;
            
            // EmailJS service configuration
            const serviceID = 'service_61h530m';
            const templateID = 'template_mhfpagj';
            
            // Get form data
            const templateParams = {
                title: 'ติดต่อจากเว็บไซต์ Drtop-hair (นุ้ย)',
                name: `${document.getElementById('name').value} ${document.getElementById('lastname').value}`,
                phone: document.getElementById('phone').value,
                line: document.getElementById('line').value,
                email: document.getElementById('email').value,
                to_email: 'theskinclinic.bangkok@gmail.com'
            };
            
            // Send email using EmailJS
            emailjs.send(serviceID, templateID, templateParams)
                .then(() => {
                    // Success - redirect to thank you page
                    window.location.href = 'thankyou.html';
                }, (error) => {
                    // Error message
                    const errorTitle = 'เกิดข้อผิดพลาด';
                    const errorMsg = 'กรุณาลองใหม่อีกครั้ง หรือติดต่อผ่าน Line: @teamdoctor';
                    
                    showErrorModal(errorTitle, errorMsg);
                    console.error('EmailJS error:', error);
                    
                    // Reset button state on error
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
}

// Contact Form 2 Handler
function initContactForm2() {
    const form = document.getElementById('contact-form-2');
    const popup = document.getElementById('success-popup');
    const closeBtn = popup ? popup.querySelector('.popup-close') : null;
    
    // Validation function
    function validateForm() {
        let isValid = true;
        
        // Clear all previous errors
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
        document.querySelectorAll('.form-group input').forEach(input => {
            input.classList.remove('error');
        });
        
        // Validate name
        const name = document.getElementById('name2');
        if (!name.value.trim()) {
            document.getElementById('name2-error').textContent = 'กรุณาตอบคำถาม';
            name.classList.add('error');
            isValid = false;
        }
        
        // Validate lastname
        const lastname = document.getElementById('lastname2');
        if (!lastname.value.trim()) {
            document.getElementById('lastname2-error').textContent = 'กรุณาตอบคำถาม';
            lastname.classList.add('error');
            isValid = false;
        }
        
        // Validate phone
        const phone = document.getElementById('phone2');
        const phoneValue = phone.value.trim();
        if (!phoneValue) {
            document.getElementById('phone2-error').textContent = 'กรุณาระบุเบอร์โทรศัพท์ให้ถูกต้อง';
            phone.classList.add('error');
            isValid = false;
        } else if (!/^[0-9]{9,10}$/.test(phoneValue)) {
            document.getElementById('phone2-error').textContent = 'กรุณาระบุเบอร์โทรศัพท์ให้ถูกต้อง';
            phone.classList.add('error');
            isValid = false;
        }

        // Validate line
        const line = document.getElementById('line2');
        if (!line.value.trim()) {
            document.getElementById('line-error').textContent = 'กรุณาตอบคำถาม';
            line.classList.add('error');
            isValid = false;
        }
        
        // Validate email (optional but must be valid format if provided)
        const email = document.getElementById('email2');
        const emailValue = email.value.trim();
        if (!emailValue) {
            document.getElementById('email-error').textContent = 'กรุณาระบุอีเมลที่ถูกต้อง';
            email.classList.add('error');
            isValid = false;
        } else if (emailValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
            document.getElementById('email2-error').textContent = 'กรุณาระบุอีเมลที่ถูกต้อง';
            email.classList.add('error');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Only allow numbers in phone field
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
    
    // Clear error on input
    document.querySelectorAll('.form-group input').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
            const errorId = this.id + '-error';
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    });
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateForm()) {
                return;
            }
            
            // Get the submit button to show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'กำลังส่ง...';
            submitBtn.disabled = true;
            
            // EmailJS service configuration
            const serviceID = 'service_61h530m';
            const templateID = 'template_mhfpagj';
            
            // Get form data
            const templateParams = {
                title: 'ติดต่อจากเว็บไซต์ Drtop-hair (จ๊ะจ๋า)',
                name: `${document.getElementById('name2').value} ${document.getElementById('lastname2').value}`,
                phone: document.getElementById('phone2').value,
                line: document.getElementById('line2').value,
                email: document.getElementById('email2').value,
                to_email: 'theskinclinic.bangkok@gmail.com'
            };
            
            // Send email using EmailJS
            emailjs.send(serviceID, templateID, templateParams)
                .then(() => {
                    // Success - redirect to thank you page
                    window.location.href = 'thankyou.html';
                }, (error) => {
                    // Error message
                    const errorTitle = 'เกิดข้อผิดพลาด';
                    const errorMsg = 'กรุณาลองใหม่อีกครั้ง หรือติดต่อผ่าน Line: @teamdoctor';
                    
                    showErrorModal(errorTitle, errorMsg);
                    console.error('EmailJS error:', error);
                })
                .finally(() => {
                    // Reset button state
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
}
