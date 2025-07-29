const modalTrigger = () => {
    const _dom = document.querySelector("body");
    const _modalBtns = document.querySelectorAll('.js-open-modal');
    const _modals = document.querySelectorAll('.modal');
    const _backdrop = document.querySelector(".modal-backdrop");

    // open modal automatically after some a certain time
    const openModalAutomatically = (modal) => {
        setTimeout(() => {
            modal.classList.add('d-block');

            modal.removeAttribute('aria-hidden');
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('role', 'dialog');

            _backdrop.classList.add('fade');

            setTimeout(() => {
                modal.classList.add('show');
                _backdrop.classList.add('show');
                _dom.classList.add("modal-open");
            }, 100);

        }, 500);

    }

    // open modal on button click
    const openModalOnClick = (modalBtn) => {
        modalBtn.addEventListener('click', (e) => {
            e.stopImmediatePropagation();

            const _modal = document.querySelector(e.target.getAttribute('data-target'));
            _modal.classList.add('d-block');

            _modal.removeAttribute('aria-hidden');
            _modal.setAttribute('aria-modal', 'true');
            _modal.setAttribute('role', 'dialog');

            _backdrop.classList.remove('hidden');
            _backdrop.classList.add('fade');

            setTimeout(() => {
                _modal.classList.add('show');
                _backdrop.classList.add('show');
                _dom.classList.add("modal-open");
            }, 100);

        });
    }

    // close modal
    const closeModal = (modal) => {
        modal.classList.remove('show');

        setTimeout(() => {
            modal.classList.remove('d-block');
            modal.removeAttribute('aria-modal');
            modal.removeAttribute('role');
            modal.setAttribute('aria-hidden', true);

            _backdrop.classList.remove('show');
            _backdrop.classList.add('hidden');
            _dom.classList.remove("modal-open");
        }, 100);
    }

    // close modal with Esc key
    const closeModalOnEsc = () => {
        document.addEventListener('keydown', (e) => {
            e.stopImmediatePropagation();

            if (e.keyCode === 'Escape' || e.key === 'Escape') {
                closeModal(document.querySelector('.modal.d-block'));
            }
        });
    }

    // close modalon outside click
    const closeModalOnOutsideClick = () => {
        document.addEventListener('click', (e) => {
            if (e.target === document.querySelector('.modal.d-block')) {
                closeModal(document.querySelector('.modal.d-block'));
            }
        });
    }

    // iterate through modals and trigger them
    if (_modals && _backdrop) {
        _modals.forEach((modal) => {

            // open modal automatically
            if (modal.classList.contains('js-auto')) {
                openModalAutomatically(modal);
            }

            // close Modal on X or Close btn
            const _modalsClose = modal.querySelectorAll('.js-close');
            _modalsClose.forEach((modalClose) => {
                if (modalClose) {
                    modalClose.addEventListener('click', () => {
                        closeModal(modal);
                    });
                }
            });

        });
    }

    // Open modal on button click
    if (_modalBtns) {
        _modalBtns.forEach((modalBtn) => {
            openModalOnClick(modalBtn);
        });
    }

    closeModalOnEsc();
    closeModalOnOutsideClick();

}

// Example Modal Module
export function initExampleModal() {
    modalTrigger();
} 