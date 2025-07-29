// Example Floating Labels Module
export function initExampleFloatingLabels() {
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize floating labels
    initFloatingLabels();
    
    // Initialize form handling
    initFormHandling();
  });
}

function initFloatingLabels() {
  // Find all floating label containers
  const floatingLabels = document.querySelectorAll('.js__example-floating-label');
  
  if (floatingLabels.length === 0) return;

  // Initialize each floating label
  floatingLabels.forEach(container => {
    const input = container.querySelector('input, select, textarea');
    const label = container.querySelector('label');
    
    if (!input || !label) return;

    // Handle initial state
    handleFloatingLabelState(input, label);
    
    // Add event listeners
    input.addEventListener('focus', () => handleFloatingLabelState(input, label));
    input.addEventListener('blur', () => handleFloatingLabelState(input, label));
    input.addEventListener('input', () => handleFloatingLabelState(input, label));
    input.addEventListener('change', () => handleFloatingLabelState(input, label));
    
    // For select elements, also listen to change events
    if (input.tagName === 'SELECT') {
      input.addEventListener('change', () => handleFloatingLabelState(input, label));
    }
  });
}

function handleFloatingLabelState(input, label) {
  const hasValue = input.value && input.value.trim() !== '';
  const isFocused = input === document.activeElement;
  const isSelect = input.tagName === 'SELECT';
  const hasSelectedOption = isSelect && input.selectedIndex > 0;
  
  // Determine if label should be floating
  const shouldFloat = hasValue || isFocused || (isSelect && hasSelectedOption);
  
  if (shouldFloat) {
    label.classList.add('floating');
  } else {
    label.classList.remove('floating');
  }
  
  // Add visual feedback for focus state
  if (isFocused) {
    input.parentElement.classList.add('focused');
  } else {
    input.parentElement.classList.remove('focused');
  }
}

function initFormHandling() {
  const form = document.querySelector('.example-floating-labels__form');
  
  if (!form) return;

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleFormSubmission(form);
  });

  // Handle form reset
  form.addEventListener('reset', (e) => {
    // Reset floating labels after a short delay to allow form reset
    setTimeout(() => {
      const floatingLabels = form.querySelectorAll('.js__example-floating-label');
      floatingLabels.forEach(container => {
        const input = container.querySelector('input, select, textarea');
        const label = container.querySelector('label');
        if (input && label) {
          handleFloatingLabelState(input, label);
        }
      });
    }, 10);
  });
}

function handleFormSubmission(form) {
  const formData = new FormData(form);
  const data = {};
  
  // Collect form data
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }
  
  // Simple validation
  const errors = validateForm(data);
  
  if (errors.length === 0) {
    // Show success message
    showFormMessage('✅ Form submitted successfully!', 'success');
    console.log('Form data:', data);
  } else {
    // Show error message
    showFormMessage(`❌ Please fix the following errors: ${errors.join(', ')}`, 'error');
  }
}

function validateForm(data) {
  const errors = [];
  
  // Check required fields
  if (!data.floatingName || data.floatingName.trim() === '') {
    errors.push('Name is required');
  }
  
  if (!data.floatingEmail || data.floatingEmail.trim() === '') {
    errors.push('Email is required');
  } else if (!isValidEmail(data.floatingEmail)) {
    errors.push('Please enter a valid email address');
  }
  
  if (!data.floatingPassword || data.floatingPassword.trim() === '') {
    errors.push('Password is required');
  } else if (data.floatingPassword.length < 6) {
    errors.push('Password must be at least 6 characters');
  }
  
  if (data.floatingPassword !== data.floatingConfirmPassword) {
    errors.push('Passwords do not match');
  }
  
  return errors;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showFormMessage(message, type) {
  // Remove existing message
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create new message
  const messageElement = document.createElement('div');
  messageElement.className = `form-message form-message--${type}`;
  messageElement.textContent = message;
  
  // Add styles
  messageElement.style.cssText = `
    padding: 0.75rem;
    border-radius: 0.375rem;
    margin-top: 1rem;
    font-weight: 500;
    ${type === 'success' 
      ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
      : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
    }
  `;
  
  // Insert message after form
  const form = document.querySelector('.example-floating-labels__form');
  form.appendChild(messageElement);
  
  // Remove message after 5 seconds
  setTimeout(() => {
    if (messageElement.parentNode) {
      messageElement.remove();
    }
  }, 5000);
} 