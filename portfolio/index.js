'use strict';

import i18Obj from './translate.js';

const body = document.querySelector('.body');
const iconBurger = document.querySelector('.icon-burger');
const headerNav = document.querySelector('.header-nav');
const darkness = document.querySelector('.darkness');
const portfolioBtns = document.querySelector('.toggle');
const btnToggle = portfolioBtns.querySelectorAll('.btn-toggle');
const collageItems = document.querySelectorAll('.collage-item');
const langButtons = document.querySelector('.languages-container');
const langButton = langButtons.querySelectorAll('.lang-btn');
const themeButton = body.querySelector('.theme-btn');
const sectionTitles = body.querySelectorAll('.section-title');
const sectionTitleWrappers = body.querySelectorAll('.section-title__wrapper');

let language = 'en';
let theme = 'dark';


iconBurger.addEventListener('click', function () {
	iconBurger.classList.toggle('opener');
	darkness.classList.toggle('darkness-active');
	headerNav.classList.toggle('open');
	body.classList.toggle('lock');
});

function closeMenu(event) {
	if (event.target.classList.contains('nav-link')) {
		iconBurger.classList.remove('opener');
		darkness.classList.remove('darkness-active');
		headerNav.classList.remove('open');
		body.classList.remove('lock');
	}
}
headerNav.addEventListener('click', closeMenu);

function changeImage(event) {
	if (event.target.classList.contains('btn-toggle')) {
		btnToggle.forEach(el => el.classList.remove('btn-active'));
		event.target.classList.add('btn-active');
		collageItems.forEach((img, index) => {
			img.src = `./assets/img/${event.target.dataset.i18n}/${index + 1}.jpg`;
			img.alt = `${(event.target.dataset.i18n).replace(/(^|\s)\S/, function (a) { return a.toUpperCase() })} photography`;
		})
	}
}

portfolioBtns.addEventListener('click', changeImage);

function preloadSummerImages() {
	for (let i = 1; i <= 6; i++) {
		const img = new Image();
		const seasons = ['winter', 'spring', 'summer', 'autumn'];
		seasons.forEach(el => img.src = `./assets/img/${el}/${i}.jpg`);
	}
}
preloadSummerImages();


function getTranslate(lang) {
	const internationalization = document.querySelectorAll('[data-i18n]');
	internationalization.forEach((el) => {
		if (el.dataset.i18n in i18Obj[lang]) {
			el.textContent = i18Obj[lang][el.dataset.i18n];
			if (el.placeholder) {
				el.placeholder = i18Obj[lang][el.dataset.i18n];
				el.textContent = ''
			}
		}
	})
	language = lang;
	if (lang === 'ru') {
		langButtons.querySelector('.ru-lang').classList.add('active-lang');
		langButtons.querySelector('.en-lang').classList.remove('active-lang');
	}
}

langButtons.addEventListener('click', function (event) {
	getTranslate(event.target.dataset.lang);
	langButton.forEach(el => el.classList.remove('active-lang'));
	event.target.classList.add('active-lang');
});


const themeElementsArr = [btnToggle, sectionTitles];

themeButton.addEventListener('click', function () {
	themeElementsArr.forEach(el => {
		el.forEach(elem => {
			elem.classList.toggle('light-theme');
		})
	})

	body.classList.toggle('light-theme');

	sectionTitleWrappers.forEach(el => {
		el.classList.toggle('section-title__wrapper_theme');
	})
	console.log(body.classList.contains('light-theme'));
	body.classList.contains('light-theme') ? theme = 'light' : theme = 'dark';
})

function turnOnLightTheme(themes) {
	if (themes === 'light') {
		themeElementsArr.forEach(el => {
			el.forEach(elem => {
				elem.classList.add('light-theme');
			})
		})

		body.classList.add('light-theme');

		sectionTitleWrappers.forEach(el => {
			el.classList.add('section-title__wrapper_theme');
		})
		theme = 'light';
	} else {
		themeElementsArr.forEach(el => {
			el.forEach(elem => {
				elem.classList.remove('light-theme');
			})
		})

		body.classList.remove('light-theme');

		sectionTitleWrappers.forEach(el => {
			el.classList.remove('section-title__wrapper_theme');
		})
		theme = 'dark';
	}
}


function setLocalStorage() {
	localStorage.setItem('language', language);
	localStorage.setItem('theme', theme);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
	if (localStorage.getItem('language')) {
		const language = localStorage.getItem('language');
		getTranslate(language);
	}
	if (localStorage.getItem('theme')) {
		const theme = localStorage.getItem('theme');
		turnOnLightTheme(theme);
	}
}
window.addEventListener('load', getLocalStorage)






console.log(`
1. Смена изображений в секции portfolio +25
 - при кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием +20
 - кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными +5
2. Перевод страницы на два языка +25
 - при клике по надписи ru англоязычная страница переводится на русский язык +10
 - при клике по надписи en русскоязычная страница переводится на английский язык +10
 - надписи en или ru, соответствующие текущему языку страницы, становятся активными т.е. выделяются стилем +5
3. Переключение светлой и тёмной темы +25
Внешний вид тёмной темы соответствует макету, который верстали в предыдущих частях задания, внешний вид светлой темы соответствует одному из двух вариантов макетов на выбор.
На страницу добавлен переключатель при клике по которому:
 - тёмная тема приложения сменяется светлой +10
 - светлая тема приложения сменяется тёмной +10
 - после смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и клике и при этом остаются видимыми на странице (нет ситуации с белым шрифтом на белом фоне) +5
Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5
Дополнительный функционал: сложные эффекты для кнопок при наведении и/или клике +5
Для получения максимального балла за пункт требований достаточно добавить кнопкам только один эффект.
`);