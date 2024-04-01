import { isMobile } from "./functions.js";
import { _slideToggle, _slideUp, _slideDown } from "./spollers.js";

const TOUCH_CLASS = '_touch';
const SUBMENU_ARROW_CLASS = 'submenu-arrow';
const MENU_LINK_CLASS = 'header__link';
const BURGER_CLASS = 'header__burger';
const MENU_BODY_CLASS = 'header__menu';
const HEADER_CLASS = 'header';

// fixed menu constants
const SHOW_MENU_DISTANCE = 500;

//open / close mobile menu
const burgerBtn = document.querySelector(`.${BURGER_CLASS}`);
const menuBody = document.querySelector(`.${MENU_BODY_CLASS}`);
const burgerIcon = burgerBtn.children[0];
const headerNode = document.querySelector(`.${HEADER_CLASS}`);

//custom  button in hero section 
const heroBurger = document.querySelector('.connect-hero__menu-btn');


// monitorEvents(window, ['slideDownDone', 'slideUpDone']);


export function initMenu() {

    isMobile.any() && document.body.classList.add(TOUCH_CLASS);

    const submenuArrows = document.querySelectorAll(`.${SUBMENU_ARROW_CLASS}`);

    if (submenuArrows.length > 0) {
        for (const arrow of submenuArrows) {
            arrow.addEventListener('click', (e) => {
                const node = e.target;
                node.parentElement.classList.toggle('_active');
            })
        }
    }

    //smoth scrool to page object

    const smoothScrollLinks = document.querySelectorAll(`.${MENU_LINK_CLASS}[data-goto]`);
    if (smoothScrollLinks.length > 0) {
        for (const link of smoothScrollLinks) {
            link.addEventListener("click", onMenuLinkClick);
        }
    }

    burgerBtn.addEventListener("click", function (e) {
        e.currentTarget.classList.toggle('_active');
        menuBody.classList.toggle('_active');

        // change burget icon

        burgerIcon.className = burgerBtn.classList.contains('_active') ? '_icon-close' : '_icon-menu';

        //body lockscroll
        document.body.classList.toggle('_scroll-lock');

    });

    //Hero button

    headerNode.hidden = true;
    const showMobileHeaderMatchMedia = window.matchMedia('(max-width: 768px)');
    showMobileHeaderMatchMedia.addEventListener("change", function (e) {

        if (e.matches) {
            headerNode.hidden = null;
            return;
        }

    })

    if (showMobileHeaderMatchMedia.matches) {
        headerNode.hidden = null;
        return;
    }



    heroBurger.addEventListener("slideUpDone", function (e) {
        console.log('Up works');
    });



    heroBurger.addEventListener("click", function (e) {
        e.currentTarget.classList.toggle('_active');

        const burgerIcon = e.currentTarget.children[0];
       


        _slideToggle(headerNode, 500);
    });


    // document.addEventListener("slideDownDone", function (e) {
    //     console.log("Сработало событие 'slideDownDone'", e.detail.target);
    //     burgerIcon.className = heroBurger.classList.contains('_active') ? '_icon-close' : '_icon-menu';
    // });
    // document.addEventListener("slideUpDone", function (e) {
    //     console.log("Сработало событие 'slideDownDone'", e.detail.target);
    //     burgerIcon.className = heroBurger.classList.contains('_active') ? '_icon-close' : '_icon-menu';
    // });



    //hide menu on scroll down and show on
    hideHeaderOnScroll();
}

function onMenuLinkClick(event) {
    const menuLink = event.target;

    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
        const gotoBlock = document.querySelector(menuLink.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset - document.querySelector('header').offsetHeight;

        //close menu
        if (burgerBtn.classList.contains('_active')) {
            document.body.classList.remove('_scroll-lock');
            burgerBtn.classList.remove('_active');
            menuBody.classList.remove('_active');
            burgerIcon.className = '_icon-menu';
        }


        window.scrollTo({
            top: gotoBlockValue,
            behavior: 'smooth'
        })
        event.preventDefault();
    }
}

function hideHeaderOnScroll() {
    const DOWN = 'down';
    const UP = 'up';

    let prevScrollPos = window.pageYOffset;
    let prevScrollDirection = DOWN;

    window.addEventListener("scroll", windowScrollHandler);

    function windowScrollHandler(e) {
        const currentScrollPos = window.pageYOffset;
        const currentScrollDirection = (prevScrollPos > currentScrollPos) ? UP : DOWN;


        // add width 100%  to header if more than 1 screen is scrolled
        if (currentScrollPos > window.innerHeight) {

            headerNode.style.width = "100%";
        } else {
            headerNode.style.width = null;
        }
        // If scrolling up, show the header

        if (currentScrollDirection == UP && currentScrollDirection != prevScrollDirection) {
            prevScrollDirection = currentScrollDirection;
            prevScrollPos = currentScrollPos;
            _slideDown(headerNode, 500);
            return;
        }
        if (currentScrollDirection == DOWN && currentScrollDirection != prevScrollDirection) {
            prevScrollDirection = currentScrollDirection;
            prevScrollPos = currentScrollPos;
            _slideUp(headerNode, 500);
            return;
        }

        // Update the previous scroll position
        prevScrollPos = currentScrollPos;
    }

}