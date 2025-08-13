/**
 * Navbar Component JavaScript
 * Handles responsive hamburger menu functionality
 */

class Navbar {
  constructor() {
    this.navbar = document.getElementById('js__navbar');
    this.toggle = document.getElementById('js__navbar-toggle');
    this.menu = document.getElementById('js__navbar-menu');
    this.overlay = document.getElementById('js__navbar-overlay');
    this.mobileLinks = document.querySelectorAll('[data-mobile-nav-link]');
    
    this.isMenuOpen = false;
    this.scrollPosition = 0;
    
    this.init();
  }

  init() {
    if (!this.navbar || !this.toggle || !this.overlay) {
      console.warn('Navbar: Required elements not found');
      return;
    }

    this.bindEvents();
    this.handleResize();
    
    // Listen for window resize to close mobile menu on desktop
    window.addEventListener('resize', () => this.handleResize());
    
    // Handle escape key
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
    
    // Prevent scroll on touch devices when menu is open
    document.addEventListener('touchmove', (e) => this.preventScroll(e), { passive: false });
  }

  bindEvents() {
    // Toggle button click
    this.toggle.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleMenu();
    });

    // Overlay click to close menu
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.closeMenu();
      }
    });

    // Mobile menu links click
    this.mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMenu();
      });
    });

    // Handle focus trap in mobile menu
    this.overlay.addEventListener('keydown', (e) => this.handleFocusTrap(e));
  }

  toggleMenu() {
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    if (this.isMenuOpen) return;

    this.isMenuOpen = true;
    
    // Store current scroll position
    this.scrollPosition = window.pageYOffset;
    
    // Add classes
    this.overlay.classList.add('navbar__overlay--active');
    this.toggle.setAttribute('aria-expanded', 'true');
    
    // Lock body scroll
    document.body.classList.add('navbar-menu-open');
    document.body.style.top = `-${this.scrollPosition}px`;
    
    // Focus management
    setTimeout(() => {
      const firstFocusableElement = this.overlay.querySelector('a, button, input, [tabindex]');
      if (firstFocusableElement) {
        firstFocusableElement.focus();
      }
    }, 300); // Wait for animation
    
    // Analytics/tracking (if needed)
    this.trackEvent('mobile_menu_opened');
  }

  closeMenu() {
    if (!this.isMenuOpen) return;

    this.isMenuOpen = false;
    
    // Remove classes
    this.overlay.classList.remove('navbar__overlay--active');
    this.toggle.setAttribute('aria-expanded', 'false');
    
    // Unlock body scroll
    document.body.classList.remove('navbar-menu-open');
    document.body.style.top = '';
    
    // Restore scroll position
    window.scrollTo(0, this.scrollPosition);
    
    // Return focus to toggle button
    this.toggle.focus();
    
    // Analytics/tracking (if needed)
    this.trackEvent('mobile_menu_closed');
  }

  handleResize() {
    // Close mobile menu if window is resized to desktop size
    if (window.innerWidth >= 992 && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  handleKeydown(e) {
    // Close menu on Escape key
    if (e.key === 'Escape' && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  handleFocusTrap(e) {
    if (!this.isMenuOpen) return;

    const focusableElements = this.overlay.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  }

  preventScroll(e) {
    if (this.isMenuOpen) {
      e.preventDefault();
    }
  }

  // Utility method for analytics/tracking
  trackEvent(eventName, properties = {}) {
    // Implement your analytics tracking here
    // Example: gtag('event', eventName, properties);
    console.debug(`Navbar Event: ${eventName}`, properties);
  }

  // Public method to manually close menu (can be called from outside)
  close() {
    this.closeMenu();
  }

  // Public method to manually open menu (can be called from outside)
  open() {
    this.openMenu();
  }

  // Public method to check if menu is open
  isOpen() {
    return this.isMenuOpen;
  }

  // Cleanup method for SPA navigation
  destroy() {
    if (this.isMenuOpen) {
      this.closeMenu();
    }
    
    // Remove event listeners if needed for cleanup
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('keydown', this.handleKeydown);
    document.removeEventListener('touchmove', this.preventScroll);
  }
}

// Auto-initialize when DOM is loaded
function initNavbar() {
  if (typeof window !== 'undefined' && document.readyState !== 'loading') {
    new Navbar();
  } else if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
      new Navbar();
    });
  }
}

// Initialize
initNavbar();

// Export for manual initialization if needed
export default Navbar;
