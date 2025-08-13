// Blog Preview Slider Module
export function initBlogPreviewSlider() {
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize blog preview slider
    initSlider();
  });
}

function initSlider() {
  const slider = document.querySelector('.js__blog-preview-slider');
  
  if (!slider) return;

  // Initialize Swiper for blog preview
  const swiper = new Swiper(slider, {
    loop: false,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    effect: 'slide',
    speed: 600,
    grabCursor: true,
    spaceBetween: 30,
    
    // Responsive breakpoints
    breakpoints: {
      // Mobile: 1 slide per view
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // Tablet: 2 slides per view
      768: {
        slidesPerView: 2,
        spaceBetween: 25,
      },
      // Desktop: 3 slides per view
      992: {
        slidesPerView: 3,
        spaceBetween: 30,
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

  // Add accessibility support
  slider.setAttribute('role', 'region');
  slider.setAttribute('aria-label', 'Blog Preview Slider');
}
