// Sample import of example module
import { exampleFunction } from "./modules/module-example.mjs";
import { buttonsExample } from "./modules/buttons-example.mjs";
import { initExampleSlider } from "./modules/example-slider.mjs";
import { countDownTimer } from "./modules/example-count-down.mjs";
import { initExampleAccordion } from "./modules/example-accordion.mjs";
import { initExampleBackToTop } from "./modules/example-back-to-top.mjs";
import { initExampleCheckbox } from "./modules/example-checkbox.mjs";
import { initExampleFloatingLabels } from "./modules/example-floating-labels.mjs";
import { initExampleModal } from "./modules/example-modal.mjs";
import { initHeroSlider } from './modules/hero-section.mjs';
import { initExampleHeroSlider } from "./modules/example-hero-slider.mjs";

exampleFunction();
buttonsExample();
initExampleSlider();
initExampleAccordion();
initExampleCheckbox();
initExampleFloatingLabels();
initExampleModal();
initExampleHeroSlider();

// Initialize countdown timer and back-to-top
document.addEventListener('DOMContentLoaded', () => {
    // Start the countdown timer
    countDownTimer();
    
          // Initialize back-to-top
      initExampleBackToTop();
      
      // Initialize hero slider if element exists
      if (document.querySelector('.hero-swiper')) {
          initHeroSlider();
      }
      
      // Set up date input functionality
    const dateInput = document.getElementById("date");
    const counterWrapper = document.querySelector(".counter-wrapper");

    if (dateInput && counterWrapper) {
        dateInput.addEventListener("change", () => {
            counterWrapper.dataset.countDownTo = dateInput.value;
            countDownTimer();
        });
    }
});
