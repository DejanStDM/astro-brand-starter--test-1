// Example Checkbox Module
export function initExampleCheckbox() {
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize checkboxes
    initCheckboxes();
    
    // Initialize toggles
    initToggles();
    
    // Add global form validation function
    window.validateForm = validateForm;
  });
}

function initCheckboxes() {
  // Find all custom checkboxes
  const checkboxes = document.querySelectorAll('.js__example-checkbox input[type="checkbox"]');
  
  if (checkboxes.length === 0) return;

  // Add event listeners to checkboxes
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', handleCheckboxChange);
    checkbox.addEventListener('focus', handleCheckboxFocus);
    checkbox.addEventListener('blur', handleCheckboxBlur);
  });
}

function initToggles() {
  // Find all custom toggles
  const toggles = document.querySelectorAll('.js__example-toggle input[type="checkbox"]');
  
  if (toggles.length === 0) return;

  // Add event listeners to toggles
  toggles.forEach(toggle => {
    toggle.addEventListener('change', handleToggleChange);
    toggle.addEventListener('focus', handleToggleFocus);
    toggle.addEventListener('blur', handleToggleBlur);
  });
}

function handleCheckboxChange(event) {
  const checkbox = event.target;
  const label = checkbox.nextElementSibling;
  
  // Add visual feedback
  if (checkbox.checked) {
    label.style.color = '#0099f7';
    label.style.fontWeight = '500';
  } else {
    label.style.color = '#333';
    label.style.fontWeight = 'normal';
  }
  
  // Log the change for demo purposes
  console.log(`Checkbox "${label.textContent.trim()}" is now ${checkbox.checked ? 'checked' : 'unchecked'}`);
}

function handleToggleChange(event) {
  const toggle = event.target;
  const label = toggle.nextElementSibling;
  
  // Add visual feedback
  if (toggle.checked) {
    label.style.color = '#0099f7';
    label.style.fontWeight = '500';
  } else {
    label.style.color = '#333';
    label.style.fontWeight = 'normal';
  }
  
  // Log the change for demo purposes
  console.log(`Toggle "${label.textContent.trim()}" is now ${toggle.checked ? 'enabled' : 'disabled'}`);
}

function handleCheckboxFocus(event) {
  const checkbox = event.target;
  const container = checkbox.closest('.custom-checkbox');
  
  if (container) {
    container.style.outline = '2px solid #0099f7';
    container.style.outlineOffset = '2px';
    container.style.borderRadius = '4px';
  }
}

function handleCheckboxBlur(event) {
  const checkbox = event.target;
  const container = checkbox.closest('.custom-checkbox');
  
  if (container) {
    container.style.outline = 'none';
  }
}

function handleToggleFocus(event) {
  const toggle = event.target;
  const container = toggle.closest('.custom-toggle');
  
  if (container) {
    container.style.outline = '2px solid #0099f7';
    container.style.outlineOffset = '2px';
    container.style.borderRadius = '4px';
  }
}

function handleToggleBlur(event) {
  const toggle = event.target;
  const container = toggle.closest('.custom-toggle');
  
  if (container) {
    container.style.outline = 'none';
  }
}

// Form validation function (made global for onclick)
function validateForm() {
  const requiredCheckbox = document.getElementById('demo-tick');
  const toggleCheckbox = document.getElementById('demo-toggle');
  const statusElement = document.getElementById('form-status');
  
  if (!requiredCheckbox || !statusElement) return;
  
  if (requiredCheckbox.checked) {
    statusElement.textContent = `✅ Form submitted successfully! Toggle is ${toggleCheckbox.checked ? 'enabled' : 'disabled'}.`;
    statusElement.className = 'example-checkbox__status success';
  } else {
    statusElement.textContent = '❌ Please accept the terms and conditions to continue.';
    statusElement.className = 'example-checkbox__status error';
    
    // Add visual feedback to the required checkbox
    const container = requiredCheckbox.closest('.custom-checkbox');
    if (container) {
      container.style.animation = 'shake 0.5s ease-in-out';
      setTimeout(() => {
        container.style.animation = '';
      }, 500);
    }
  }
} 