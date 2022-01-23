'use strict';

const body = document.querySelector('body');
const iconBurger = document.querySelector('.icon-burger');
const headerNav = document.querySelector('.header-nav');
const darkness = document.querySelector('.darkness');

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