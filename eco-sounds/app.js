'use strict';


const body = document.querySelector('body');
const navButtons = document.querySelector('.nav__list');
const btnToggle = navButtons.querySelectorAll('.nav__btn');
const soundImage = document.querySelector('.sound-image');
const soundButton = document.querySelector('.sound-play');
const iconPlay = soundButton.querySelector('.icon-play');
const iconPause = soundButton.querySelector('.icon-pause');
const calendarClose = soundImage.querySelector('.calendar-close');
const calendarOn = soundImage.querySelector('.calendar-on');
const calendar = soundImage.querySelector('.calendar');
const audio = new Audio();

let isPlay = false;
audio.src = `./assets/audio/forest.mp3`;

function playAudio() {
	if (!isPlay) {
		audio.play()
		isPlay = true;
	} else {
		audio.pause();
		isPlay = false;
	}
}

function preloadImages() {
	let birds = ['drozd', 'forest', 'javoronok', 'slavka', 'solovey', 'zarynka'];
	birds.forEach(el => {
		const img = new Image();
		img.src = `./assets/img/${el}.jpg`;
	})
}
preloadImages();

function toggleBtn() {
	soundButton.classList.toggle('pause');
	soundButton.classList.contains('pause') ? (
		iconPlay.classList.add('unvisible'),
		iconPause.classList.remove('unvisible'),
		isPlay = false,
		playAudio()
	) : (
		iconPlay.classList.remove('unvisible'),
		iconPause.classList.add('unvisible'),
		isPlay = true,
		playAudio()
	);
}
soundButton.addEventListener('click', toggleBtn);

function changeSound(event) {
	if (event.target.parentNode.classList.contains('nav__btn')) {
		btnToggle.forEach(el => el.classList.remove('btn-active'));
		event.target.parentNode.classList.add('btn-active');
		soundImage.style.backgroundImage = `url(./assets/img/${event.target.dataset.bird}.jpg)`;
		body.style.backgroundImage = `url(./assets/img/${event.target.dataset.bird}.jpg)`;
		audio.src = `./assets/audio/${event.target.dataset.bird}.mp3`;
		soundButton.classList.remove('pause');
		toggleBtn()
	}
}
navButtons.addEventListener('click', changeSound);


calendarOn.addEventListener('click', function () {
	calendar.classList.remove('calendar-toggle');
	calendarOn.classList.add('calendar-toggle');
})

calendarClose.addEventListener('click', function () {
	calendar.classList.add('calendar-toggle');
	calendarOn.classList.remove('calendar-toggle');
})



console.log(`
Оценка за задание 70 баллов.
1. Вёрстка +10
 - есть не меньше пяти интерактивных элементов, с которыми пользователи могут взаимодействовать. Изменение внешнего вида самого элемента и состояния курсора при наведении, плавные анимации +5
 - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. При кликах по интерактивным элементам меняется изображение +10
3. При кликах по интерактивным элементам меняется звук +10
4. Активный в данный момент интерактивный элемент выделяется стилем +10
5. Кнопка Play/Pause +20
 - есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание звука +10
 - внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент звук +10
6. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
`)