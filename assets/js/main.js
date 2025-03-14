const bodyHidden = () => {
    document.querySelector('body').style.overflow = 'hidden';
}

const bodyVisible = () => {
    document.querySelector('body').style.overflow = 'visible';
}

const menu = document.querySelector('.menu');
const bars = document.querySelector('.header .bars');
const menuClose = document.querySelector('.menu-close');
const menuBg = document.querySelector('.menu-bg');

const menuHide = () => {
    menu.classList.remove('active');
    menu.classList.add('end-active');
    setTimeout(() => {
        menu.classList.remove('end-active');
        bodyVisible();
    }, 400);
}

bars.onclick = () => {
    menu.classList.add('active');
    bodyHidden();
}

menuClose.onclick = () => menuHide();
menuBg.onclick = () => menuHide();

const homeSelects = document.querySelectorAll('.home-body ul li');

if (homeSelects.length) {
    homeSelects.forEach(el => {
        el.onclick = () => {
            homeSelects.forEach(data => {
                if (data == el) {
                    data.classList.add('selected');
                } else {
                    data.classList.remove('selected');
                }
            })
        }
    })
}