// Спойлеры.
// Могут работать в режиме аккордиона (окрыт может быть один) или отедльно на блок. Исопользуется делигирование событий
// Атрибуты блока
// data-spollers - инициирует блок спойлеров
// data-spollers-speed - кастомная скорость открытия / закрытия спойлера
// data-one-spoller - переводит блок в режим аккордиона
// Атрибуты вопроса - ответа
// data-spoller - должно быть указано у  вопроса он должен быть представлен тегом button

export function initSpollers() {
    const spollers = document.querySelectorAll('[data-spollers]');

    if (spollers.length > 0) {
        const spollersRegular = Array.from(spollers).filter((spoller) => {
            return !spoller.dataset.spollers.split(',')[0];
        })

        if (spollersRegular.length > 0) {
            processSpollers(spollersRegular);
        }
        const spollersMedia = Array.from(spollers).filter((spoller) => {
            return spoller.dataset.spollers.split(',')[0];
        })

        if (spollersMedia.length > 0) {
            //группировка по запросам
            const groupedMediaSpollers = spollersMedia.reduce((acc, spollerItem) => {
                const { spollers: params = null } = spollerItem.dataset;

                if (acc.hasOwnProperty(params)) {
                    return { ...acc, [params]: [...acc[params], spollerItem] };
                }

                return { ...acc, [params]: [spollerItem] }
            }, {});

            Object.entries(groupedMediaSpollers).forEach(mediaQuery => {
                const [key, spollersArray] = mediaQuery;
                const [value, type] = key.split(",");

                const mediaString = `(${type}-width: ${value}px)`;
                const matchMedia = window.matchMedia(mediaString);
                matchMedia.addEventListener("change", (event) => {
                    processSpollers(spollersArray, event.matches);
                });
                processSpollers(spollersArray, matchMedia.matches);
            });

        }
    }
}

function processSpollers(spollers, matchMedia = false) {
    spollers.forEach((spollerItem) => {
        if (matchMedia.matches || !matchMedia) {
            spollerItem.classList.add('_init');
            initSpollerBody(spollerItem);
            spollerItem.addEventListener("click", setSpollerAction);
        } else {
            spollerItem.classList.remove('_init');
            initSpollerBody(spollerItem, false);
            spollerItem.removeEventListener("click", setSpollerAction);
        }

    });
}

function initSpollerBody(spoller, hideSpollerBody = true) {
    const spollerTitles = spoller.querySelectorAll('[data-spoller]');

    if (spollerTitles.length > 0) {
        spollerTitles.forEach((titleItem) => {

            if (hideSpollerBody) {

                titleItem.removeAttribute('tabindex');
                if (!titleItem.classList.contains('_active')) {
                    titleItem.nextElementSibling.hidden = true;
                }
            } else {
                titleItem.setAttribute('tabindex', '-1');
                titleItem.nextElementSibling.hidden = false;
            }
        })
    }
}

function setSpollerAction(event) {
    const el = event.target;

    if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
        const spollerTitle = el.closest('[data-spoller]');
        const spollersBlock = spollerTitle.closest('[data-spollers]');
        const oneSpoller = spollersBlock.hasAttribute('data-one-spoller');
        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;

        if (!spollersBlock.querySelectorAll('._slide').length) {
            if (oneSpoller && !spollerTitle.classList.contains('_active')) {
                hideSpollersBody(spollersBlock);
            }
            spollerTitle.classList.toggle('_active');
            _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
        }

        event.preventDefault();
    }

}

function hideSpollersBody(spollersBlock) {
    const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
    const spollerSpeed = spollersBlock.dataset.spollersSpeed
        ? parseInt(spollersBlock.dataset.spollersSpeed)
        : 500;

    if (spollerActiveTitle && !spollersBlock.querySelectorAll('._slide').length) {
        spollerActiveTitle.classList.remove('_active');
        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
    }
}

export let _slideUp = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = `${target.offsetHeight}px`;
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = showmore ? `${showmore}px` : `0px`;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = !showmore ? true : false;
            !showmore ? target.style.removeProperty('height') : null;
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            !showmore ? target.style.removeProperty('overflow') : null;
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
            // Создаем событие
            document.dispatchEvent(new CustomEvent("slideUpDone", {
                detail: {
                    target: target
                }
            }));
        }, duration);
    }
}
export let _slideDown = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.hidden = target.hidden ? false : null;
        showmore ? target.style.removeProperty('height') : null;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = showmore ? `${showmore}px` : `0px`;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
            // Создаем событие
            document.dispatchEvent(new CustomEvent("slideDownDone", {
                detail: {
                    target: target
                }
            }));
        }, duration);
    }
}
export let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
}