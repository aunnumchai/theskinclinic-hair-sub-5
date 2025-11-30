// Training Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const trainingSlider = document.querySelector('.training-slider-track');
    const trainingSlides = document.querySelectorAll('.training-slide');
    const prevBtn = document.querySelector('.training-prev');
    const nextBtn = document.querySelector('.training-next');
    const dots = document.querySelectorAll('.training-dot');
    
    if (!trainingSlider || trainingSlides.length === 0) return;
    
    let currentIndex = 0;
    const totalSlides = trainingSlides.length;
    
    // Initialize - set center slide
    function updateSlider() {
        const isMobile = window.innerWidth <= 768;
        const slideWidth = trainingSlides[0].offsetWidth;
        const gap = 20;
        
        if (isMobile) {
            // Mobile: show one slide at a time, centered
            const offset = -(currentIndex * (slideWidth + gap));
            trainingSlider.style.transform = `translateX(${offset}px)`;
            
            // Update center class
            trainingSlides.forEach((slide, index) => {
                slide.classList.toggle('center', index === currentIndex);
            });
        } else {
            // Desktop: show 3 slides with center one enlarged
            let displayIndex = currentIndex;
            
            // For first slide, keep it at position 0
            if (currentIndex === 0) {
                displayIndex = 0;
            }
            // For last two slides, adjust to show them properly
            else if (currentIndex >= totalSlides - 2) {
                displayIndex = totalSlides - 3;
            }
            // For middle slides, center them
            else {
                displayIndex = currentIndex - 1;
            }
            
            const offset = -(displayIndex * (slideWidth + gap));
            trainingSlider.style.transform = `translateX(${offset}px)`;
            
            // Update center class based on actual currentIndex
            trainingSlides.forEach((slide, index) => {
                slide.classList.toggle('center', index === currentIndex);
            });
        }
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function nextSlide() {
        const isMobile = window.innerWidth <= 768;
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }
    
    function prevSlide() {
        const isMobile = window.innerWidth <= 768;
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Dots click event
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            // Reset auto play
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextSlide, 4000);
        });
    });
    
    // Auto play
    let autoPlayInterval = setInterval(nextSlide, 4000);
    
    // Pause on hover
    if (trainingSlider) {
        trainingSlider.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        trainingSlider.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(nextSlide, 4000);
        });
    }
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateSlider();
        }, 250);
    });
    
    // Initialize
    updateSlider();
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
});
