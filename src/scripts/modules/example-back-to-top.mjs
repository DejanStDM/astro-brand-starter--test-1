// Example Back to Top Module
export function initExampleBackToTop() {
  const backToTop = () => {
    const btn = document.querySelector('.js__example-back-to-top');

    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  backToTop();
} 