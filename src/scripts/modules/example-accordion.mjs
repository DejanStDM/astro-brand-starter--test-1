// Example Accordion Module
export function initExampleAccordion() {
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', () => {
    // Find all accordions on the page
    const accordionElements = document.querySelectorAll('.js__example-accordion');
    
    if (accordionElements.length === 0) return;

    // Initialize each accordion
    accordionElements.forEach((accordionElement) => {
      initAccordion(accordionElement);
    });
  });
}

function initAccordion(accordionElement) {
  // Transitioning to prevent jumping on multiple clicks
  let transitioning = false;
  const accordionItems = accordionElement.querySelectorAll('.accordion-header');
  let targetElmHeight;

  // Closing function
  function closeAccordionItems(trigger) {
    trigger.forEach(element => {
      element.classList.remove('active');
      const targetElm = element.closest('.accordion-item').querySelector('.accordion-body');
      targetElmHeight = targetElm.scrollHeight;
      targetElm.style.height = targetElmHeight + 'px';
      targetElm.offsetHeight; // Force reflow
      targetElm.classList.add('collapsing');
      targetElm.style.height = '';

      setTimeout(() => {
        targetElm.classList.remove('collapsing', 'open');
        transitioning = false;
      }, 300);
    });
  }

  // Open item on click
  accordionItems.forEach(element => {
    element.addEventListener('click', () => {
      const targetAccordion = element.closest('.accordion');
      const targetAccordionBody = element.closest('.accordion-item').querySelector('.accordion-body');
      const targetAccordionBodyContent = targetAccordionBody.querySelector('.accordion-body__inner');

      if (transitioning) return false;
      transitioning = true;

      if (element.classList.contains('active')) {
        closeAccordionItems([element]);
      } else {
        // Check if this is a single accordion (close others) or multiple accordion
        if (targetAccordion.getAttribute('data-accordion') !== 'multiple') {
          // Single accordion - close other open items
          if (targetAccordion.querySelectorAll('.accordion-header.active').length > 0) {
            closeAccordionItems(targetAccordion.querySelectorAll('.accordion-header.active'));
          }
        }

        element.classList.add('active');
        targetAccordionBody.classList.add('collapsing', 'open');
        targetElmHeight = targetAccordionBodyContent.scrollHeight;
        targetAccordionBody.style.height = targetElmHeight + 'px';

        setTimeout(() => {
          targetAccordionBody.classList.remove('collapsing');
          targetAccordionBody.style.height = '';
          transitioning = false;
        }, 300);
      }
    });
  });
} 