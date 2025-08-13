export function initHeroSlider() {
  // Initialize Swiper for hero slider
  const slider = document.querySelector('.js__hero-slider');
  
  if (!slider) {
    console.warn('Hero slider element not found');
    return;
  }

  // Create Swiper instance
  const swiper = new Swiper(slider, {
    // Basic settings
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    
    // Navigation
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    // Pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    
    // Effects
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    
    // Speed
    speed: 1000,
    
    // Responsive breakpoints
    breakpoints: {
      768: {
        effect: 'slide',
        fadeEffect: {
          crossFade: false
        }
      }
    }
  });

  // Enhanced slide change animations
  swiper.on('slideChange', function () {
    const activeSlide = this.slides[this.activeIndex];
    
    if (activeSlide) {
      // Animate text elements
      const title = activeSlide.querySelector('.hero-slider__title');
      const subtitle = activeSlide.querySelector('.hero-slider__subtitle');
      const button = activeSlide.querySelector('.hero-slider__btn');
      const image = activeSlide.querySelector('.hero-slider__image');
      
      // Reset animations
      [title, subtitle, button, image].forEach(el => {
        if (el) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(30px)';
        }
      });
      
      // Staggered animation
      setTimeout(() => {
        if (title) {
          title.style.transition = 'all 0.6s ease';
          title.style.opacity = '1';
          title.style.transform = 'translateY(0)';
        }
      }, 200);
      
      setTimeout(() => {
        if (subtitle) {
          subtitle.style.transition = 'all 0.6s ease';
          subtitle.style.opacity = '1';
          subtitle.style.transform = 'translateY(0)';
        }
      }, 400);
      
      setTimeout(() => {
        if (button) {
          button.style.transition = 'all 0.6s ease';
          button.style.opacity = '1';
          button.style.transform = 'translateY(0)';
        }
      }, 600);
      
      setTimeout(() => {
        if (image) {
          image.style.transition = 'all 0.8s ease';
          image.style.opacity = '1';
          image.style.transform = 'translateY(0) scale(1)';
        }
      }, 800);
    }
  });

  // Initialize first slide animations
  swiper.on('init', function () {
    const firstSlide = this.slides[0];
    if (firstSlide) {
      const title = firstSlide.querySelector('.hero-slider__title');
      const subtitle = firstSlide.querySelector('.hero-slider__subtitle');
      const button = firstSlide.querySelector('.hero-slider__btn');
      const image = firstSlide.querySelector('.hero-slider__image');
      
      // Set initial state
      [title, subtitle, button, image].forEach(el => {
        if (el) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(30px)';
        }
      });
      
      // Animate in
      setTimeout(() => {
        if (title) {
          title.style.transition = 'all 0.6s ease';
          title.style.opacity = '1';
          title.style.transform = 'translateY(0)';
        }
      }, 300);
      
      setTimeout(() => {
        if (subtitle) {
          subtitle.style.transition = 'all 0.6s ease';
          subtitle.style.opacity = '1';
          subtitle.style.transform = 'translateY(0)';
        }
      }, 500);
      
      setTimeout(() => {
        if (button) {
          button.style.transition = 'all 0.6s ease';
          button.style.opacity = '1';
          button.style.transform = 'translateY(0)';
        }
      }, 700);
      
      setTimeout(() => {
        if (image) {
          image.style.transition = 'all 0.8s ease';
          image.style.opacity = '1';
          image.style.transform = 'translateY(0) scale(1)';
        }
      }, 900);
    }
  });

  // Enhanced button interactions
  swiper.slides.forEach((slide, index) => {
    const button = slide.querySelector('.hero-slider__btn');
    
    if (button) {
      // Add click tracking
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Track slide index for analytics
        console.log(`Hero slider button clicked on slide ${index + 1}`);
        
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    }
  });

  // Add CSS for ripple animation
  if (!document.querySelector('#hero-slider-ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'hero-slider-ripple-styles';
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Pause autoplay on hover
  slider.addEventListener('mouseenter', () => {
    swiper.autoplay.stop();
  });
  
  slider.addEventListener('mouseleave', () => {
    swiper.autoplay.start();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      swiper.slidePrev();
    } else if (e.key === 'ArrowRight') {
      swiper.slideNext();
    }
  });

  // Touch gesture enhancements
  let startX = 0;
  let startY = 0;
  
  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });
  
  slider.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = startX - endX;
    const diffY = startY - endY;
    
    // Only trigger if horizontal swipe is more significant than vertical
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        swiper.slideNext();
      } else {
        swiper.slidePrev();
      }
    }
  });

  // Performance optimization: pause animations when not visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        swiper.autoplay.start();
      } else {
        swiper.autoplay.stop();
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(slider);

  // Return swiper instance for external control if needed
  return swiper;
}
