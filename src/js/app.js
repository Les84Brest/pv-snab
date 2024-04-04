import * as siteFunctions from "./modules/functions.js";
import { initSpollers } from "./modules/spollers.js";
import { initMenu } from "./modules/menu.js";
import Swiper, { Navigation, Pagination } from "swiper";
import Modal from "./modules/modal.js";


siteFunctions.isWebp();

document.addEventListener('DOMContentLoaded', function () {
    initMenu();
    initSpollers();


    //init modal for company data
    const modalOptions = {
        templateId: "company-data", // template tag with modal layout
        title: "Наши реквизиты",
        selectors: {
            modal: 'modal',
            modalBody: 'modal__body',
            modalClose: 'modal__close',
            modalOpen: 'modal__open',
            bodyLock: '_scroll-lock',
            modalTitle: 'modal__title',
            modalContent: 'modal__content'
        }
    }
    const companyDataModal = new Modal(modalOptions);
    const dataBtn = document.querySelector('.contacts__action-btn');
    dataBtn.addEventListener("click", function (e) {
        companyDataModal.openModal();

    });
});

