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
    title: null,
    selectors: {
      modal: 'modal',
      modalBody: 'modal__body',
      modalClose: 'modal__close',
      modalOpen: 'modal__open',
      bodyLock: 'lock-body',
      modalTitle: 'modal__title',
      modalContent: 'modal__content',
    }
  }


  constructor(options) {
    console.log('%coptions', 'padding: 5px; background: hotpink; color: black;', this.options.selectors);
    this.options = { ...this.options, ...options };
    this.initModal();
  }

  initModal() {
    const { modal: modalClass, modalClose, modalBody } = this.options.selectors;
    const modalNode = document.querySelector(`.${modalClass}`);


    if (modalNode) {
      this.modalObject = modalNode;
      this.resetModal();

      this.modalObject.addEventListener('click', (event) => {
        if (!event.target.closest(`.${modalBody}`)) {
          this.closeModal();
        }
      });

      modalNode.querySelector('.modal__close')
        .addEventListener('click', this.closeModal.bind(this));

    }


  }

  setModalTitle() {
    const { title } = this.options;
    const { modalTitle } = this.options.selectors;

    if (!title) {
      return;
    }

    const titleNode = this.modalObject.querySelector(`.${modalTitle}`);

    if (modalTitle) {
      titleNode.innerText = title;
    }

  }

  setModalContent() {
    const { templateId } = this.options;
    const { modalContent } = this.options.selectors;

    const template = document.querySelector(`#${templateId}`);
    const clonedContent = template.content.cloneNode(true);
    const content = this.modalObject.querySelector(`.${modalContent}`);

    // content.insertAdjacentHTML('beforeend', clonedContent);
    content.append(clonedContent);
    // content.innerHTML = clonedContent;
  }
  openModal() {
    const { modalOpen } = this.options.selectors;
    this.resetModal();

    this.setModalTitle();
    this.setModalContent();

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

  resetModal() {
    const { modalContent, modalTitle } = this.options.selectors;
    this.modalObject.querySelector(`.${modalContent}`).innerText = '';
    this.modalObject.querySelector(`.${modalTitle}`).innerText = '';

  }
}

export default Modal;