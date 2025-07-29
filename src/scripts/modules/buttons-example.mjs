export function buttonsExample() {
    console.log("buttonsExample");
  document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded");
    const testButtons = document.querySelectorAll('.js__test-js-btn');
    testButtons.forEach(button => {
      button.addEventListener('click', () => {
        console.log(`Button with text "${button.dataset.text}" clicked!`);
      });
    });
  });
}
