// Example Hero Slider Module


export function  initHeroSlider2() {
    const slider = document.querySelector('.js__hero-slider-2');
    
    if (!slider) return;
    
    // Initialize Swiper for hero slider
    const swiper = new Swiper(slider, {
        navigation: false,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
        },
        effect: 'slide',
        speed: 800,
        grabCursor: true,
        spaceBetween: 0,
        slidesPerView: 1,
        
        // Add smooth transitions
        breakpoints: {
            768: {
                speed: 1000,
            }
        }
    });
    
    // Add pause on hover functionality
    slider.addEventListener('mouseenter', () => {
        swiper.autoplay.stop();
    });
    
    slider.addEventListener('mouseleave', () => {
        swiper.autoplay.start();
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (slider.contains(document.activeElement) || slider.matches(':hover')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                swiper.slidePrev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                swiper.slideNext();
            }
        }
    });
    
    // Add touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                swiper.slideNext();
            } else {
                // Swipe right - previous slide
                swiper.slidePrev();
            }
        }
    }
    
    // Add animation on slide change
    swiper.on('slideChangeTransitionStart', () => {
        const activeSlide = slider.querySelector('.swiper-slide-active');
        if (activeSlide) {
            // Add entrance animations
            const title = activeSlide.querySelector('.hero-slider-2__title');
            const subtitle = activeSlide.querySelector('.hero-slider-2__subtitle');
            const button = activeSlide.querySelector('.hero-slider-2__btn');
            const image = activeSlide.querySelector('.hero-slider-2__image');
            
            // Reset animations
            [title, subtitle, button, image].forEach(element => {
                if (element) {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(30px)';
                }
            });
            
            // Animate elements with staggered timing
            setTimeout(() => {
                if (title) {
                    title.style.transition = 'all 0.6s ease';
                    title.style.opacity = '1';
                    title.style.transform = 'translateY(0)';
                }
            }, 100);
            
            setTimeout(() => {
                if (subtitle) {
                    subtitle.style.transition = 'all 0.6s ease';
                    subtitle.style.opacity = '1';
                    subtitle.style.transform = 'translateY(0)';
                }
            }, 200);
            
            setTimeout(() => {
                if (button) {
                    button.style.transition = 'all 0.6s ease';
                    button.style.opacity = '1';
                    button.style.transform = 'translateY(0)';
                }
            }, 300);
            
            setTimeout(() => {
                if (image) {
                    image.style.transition = 'all 0.8s ease';
                    image.style.opacity = '1';
                    image.style.transform = 'translateY(0) scale(1)';
                }
            }, 400);
        }
    });
    
    // Initialize first slide animations
    const firstSlide = slider.querySelector('.swiper-slide-active');
    if (firstSlide) {
        setTimeout(() => {
            swiper.emit('slideChangeTransitionStart');
        }, 500);
    }
    
    // Add accessibility support
    slider.setAttribute('role', 'region');
    slider.setAttribute('aria-label', 'Hero Image Slider');
    
    // Add focus management
    const slides = slider.querySelectorAll('.swiper-slide');
    slides.forEach((slide, index) => {
        const button = slide.querySelector('.hero-slider-2__btn');
        if (button) {
            button.setAttribute('tabindex', index === 0 ? '0' : '-1');
        }
    });
    
    // Update focus on slide change
    swiper.on('slideChange', () => {
        slides.forEach((slide, index) => {
            const button = slide.querySelector('.hero-slider-2__btn');
            if (button) {
                button.setAttribute('tabindex', index === swiper.activeIndex ? '0' : '-1');
            }
        });
    });
}