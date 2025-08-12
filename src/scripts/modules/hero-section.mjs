// Hero Section Slider Module
export function initHeroSlider() {
  const heroSwiper = new Swiper('.hero-swiper', {
    // Enable autoplay
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    
    // Enable loop
    loop: true,
    
    // Enable pagination
    pagination: {
      el: '.hero-pagination',
      clickable: true,
    },
    
    // Enable navigation
    navigation: {
      nextEl: '.hero-button-next',
      prevEl: '.hero-button-prev',
    },
    
    // Responsive breakpoints
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      1024: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
    },
    
    // Smooth transitions
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    
    // Speed
    speed: 800,
  });
  
  return heroSwiper;
}
