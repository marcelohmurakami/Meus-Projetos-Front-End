'use strict';

// 1° passo: IMPLEMENTAR FUNCIONALIDADES DOS LINKS E BOTÃO DO NAV
const navLinks = document.querySelector('.nav__links');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnOpenAcc = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');

navLinks.addEventListener('click', function(e) {
    e.preventDefault();
    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' }); 
    };
});

btnOpenAcc.forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    })
});

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});


// 2° passo: IMPLEMENTAR O LEARN MORE QUE SCROLLA ATÉ A PRIMEIRA SESSÃO
const btnLearn = document.querySelector('.btn--text');
btnLearn.addEventListener('click', function(e) {
    const section = document.querySelector('#section--1');
    section.scrollIntoView({ behavior: 'smooth' });
});


// 3° passo: IMPLEMENTAR IMAGENS APARECENDO AOS POUCOS
const allImgs = document.querySelectorAll('img[data-src]');
const imgObserve = new IntersectionObserver (loadimg, {
    root: null,
    threshold: 0,
    rootMargin: '0px'
})
const observeImgs = allImgs.forEach(img => {
    imgObserve.observe(img);
});

function loadimg (entries, observe) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log(entry, "1 ", entry.target.src, "2 ", entry.target.dataset.src);
            entry.target.src = entry.target.dataset.src;

            entry.target.addEventListener('load', function () {
                entry.target.classList.remove('lazy-img');
            })
            observe.unobserve(entry.target)
        }
    })
}


// 4° passo: IMPLEMENTAR BOTÕES DAS OPERAÇÕES
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e) {
    const content = e.target;
    console.log(content);
    
    if (content.classList.contains('operations__tab')) {
        tabs.forEach(tab => {
            console.log(tab);
            tab.classList.remove('operations__tab--active')
        });

        tabsContent.forEach(tabCon => {
            tabCon.classList.remove('operations__content--active');
        });

        content.classList.add('operations__tab--active');
        console.log(content.dataset.tab);
        console.log(document.querySelector(`.operations__content--${content.dataset.tab}`))
        document.querySelector(`.operations__content--${content.dataset.tab}`).classList.add('operations__content--active')
    }
})


// 5° passo: IMPLEMENTAR A PASSAGEM DE IMAGENS E OS DOTS
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let curSlide = 0;
const slideTam = slides.length;
console.log(slideTam);

const organize = function (slide) {
    slides.forEach((s, i) => {
        s.style.transform = `translateX(${100 * (i - slide)}%)`
    })
}
organize(0);

const nextSlide = function () {
    if (curSlide === slideTam - 1) {
        curSlide = 0
    } else {
        curSlide++
    }
    console.log(curSlide);
    organize(curSlide);
    activeDot(curSlide);
}
btnRight.addEventListener('click', nextSlide);

const prevSlide = function () {
    if (curSlide === 0) {
        curSlide = 2
    } else {
        curSlide--
    }
    console.log(curSlide);
    organize(curSlide);
    activeDot(curSlide);
}
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Arrowleft') {
        prevSlide();
    } else if (e.key === 'Arrowright') {
        nextSlide();
    }
});


const dots = document.querySelector('.dots');
const createDots = function () {
    slides.forEach((_, i) => {
        dots.insertAdjacentHTML(
            'beforeend',
            `<button class="dots__dot" data-slide="${i}"></button>`
        );
    });
};
createDots();

const activeDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
        dot.classList.remove('dots__dot--active');
    });

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};
activeDot(0);

dots.addEventListener('click', function(e) {
    if (e.target.classList.contains('dots__dot')) {
        curSlide = Number(e.target.dataset.slide);

        organize(curSlide);
        activeDot(curSlide);
    }
});


// 6° PASSO: Implementar fade nos items do menu
const nave = document.querySelector('.nav');

const handleOver = function(e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        console.log(link);
        const links = nave.querySelectorAll('.nav__link');
        console.log(links);
        links.forEach(l => {
            if (l !== link) {
                l.style.opacity = this;
            }
        })
    }
}
nave.addEventListener('mouseover', handleOver.bind(0.5));
nave.addEventListener('mouseout', handleOver.bind(1));