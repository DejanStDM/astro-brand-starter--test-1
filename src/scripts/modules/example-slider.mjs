// Example Slider Module
export function initExampleSlider() {
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize slider
    initSlider();
  });
}

function initSlider() {
  const slider = document.querySelector('.js__example-slider');
  
  if (!slider) return;

  // Initialize Swiper
  const swiper = new Swiper(slider, {
    loop: true,
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
  });

  // Add slide counter functionality
  updateSlideCounter(swiper);
  swiper.on('slideChange', () => {
    updateSlideCounter(swiper);
  });

  // Add pause on hover
  slider.addEventListener('mouseenter', () => {
    swiper.autoplay.stop();
  });
  
  slider.addEventListener('mouseleave', () => {
    swiper.autoplay.start();
  });

  // Add keyboard navigation
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
}

function updateSlideCounter(swiper) {
  const counter = document.querySelector('.example-slider__counter-current');
  if (counter) {
    const current = swiper.realIndex + 1;
    counter.textContent = current;
  }
} 