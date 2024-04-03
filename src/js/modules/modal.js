/**
 * This is class to manage modal window
 * It waits
 * modalNode - selector for modal node
 * options - an object with
 *  template - template node with data to show in modal
 *  selectors - selector names which are responsible for manage modal states
*/
class Modal {
  modalObject = null;

  options = {
    templateId: null, // template tag with modal layout
    selectors: {
      modal: 'modal',
      modalBody: 'modal__body',
      modalClose: 'modal__close',
      modalOpen: 'modal__open',
      bodyLock: 'lock-body'
    }
  }

  constructor(options) {

    this.options = { ...this.options, ...options };
    this.initModal();
  }

  initModal() {
    const { modal: modalClass, modalClose, modalBody } = this.options.selectors;

    const modalNode = document.querySelector(`.${modalClass}`);

    if (modalNode) {
      this.modalObject = modalNode;

      this.modalObject.addEventListener('click', (event) => {
        console.log('%clistener works', 'padding: 5px; background: #3dd; color: #333333;');
        if (!event.target.closest(`.${modalBody}`)) {
          this.closeModal();
        }
      });

      modalNode.querySelector('.modal__close')
        .addEventListener('click', this.closeModal.bind(this));

    }
  }

  openModal() {
    const { modalOpen } = this.options.selectors;
    this.modalObject.classList.add(`${modalOpen}`);
    this.lockBody();
  }

  closeModal() {
    const { modalOpen } = this.options.selectors;
    this.modalObject.classList.remove(`${modalOpen}`);
    this.unlockBody();
  }

  lockBody() {
    const { bodyLock } = this.options.selectors;
    const scrollPadding = window.innerWidth - document.querySelector('.main').offsetWidth + 'px';
    document.body.style.paddingRight = scrollPadding;
    document.body.classList.add(`${bodyLock}`);
  }

  unlockBody() {
    const { bodyLock } = this.options.selectors;
    document.body.style.paddingRight = null;
    document.body.classList.remove(`${bodyLock}`);
  }
}

export default Modal;