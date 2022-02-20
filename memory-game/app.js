'use strict';

const cards = document.querySelectorAll('.card');

let hasTurnedCard = false;
let lockField = false;
let firstCard;
let secondCard;

function turnCard(event) {
	if (lockField) return;
	if (this === firstCard) return;
	this.classList.add('turn');
	this.classList.add('no-event');
	if (!hasTurnedCard) {
		hasTurnedCard = true;
		firstCard = this;
		return;
	}
	secondCard = this;

	checkForMutch();

}

function checkForMutch() {
	if (firstCard.dataset.hero === secondCard.dataset.hero) {
		firstCard.removeEventListener('click', turnCard);
		secondCard.removeEventListener('click', turnCard);
		resetField();
		return;
	}
	unturnCards();
}

function unturnCards() {
	lockField = true;
	setTimeout(() => {
		firstCard.classList.remove('turn');
		secondCard.classList.remove('turn');
		firstCard.classList.remove('no-event');
		secondCard.classList.remove('no-event');
		resetField();
	}, 800);
}

function resetField() {
	[hasTurnedCard, lockField] = [false, false];
	[firstCard, secondCard] = [null, null];
}

cards.forEach(card => card.addEventListener('click', turnCard));

(function mixing() {
	cards.forEach(card => {
		let randomOrder = Math.floor(Math.random() * 20);
		card.style.order = randomOrder;
	})
})();