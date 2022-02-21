'use strict';

const cardsField = document.querySelector('.cards')
const cards = document.querySelectorAll('.card');
const scoreField = document.querySelector('.score-wrapper');
const lastScores = scoreField.querySelector('.last-scores');
const bestScores = scoreField.querySelector('.best-scores');
const congratulation = scoreField.querySelector('.congratulation');
const buttonScore = scoreField.querySelector('.button-score');
const greetings = document.querySelector('.greetings');
const buttonGreetings = greetings.querySelector('.button-greetings');

let hasTurnedCard = false;
let lockField = false;
let firstCard;
let secondCard;
let counter = 0;
let scoresArray = [];

function turnCard() {
	if (lockField) return;
	if (this === firstCard) return;
	this.classList.add('turn');
	this.classList.add('no-event');
	counter++
	if (!hasTurnedCard) {
		hasTurnedCard = true;
		firstCard = this;
		return;
	}
	secondCard = this;

	checkForMutch();

	if (counter >= 20) {
		let turnCardCount = 0
		cards.forEach(card => {
			if (card.classList.contains('turn')) turnCardCount++
		});
		if (turnCardCount === 20) {
			scoresArray.push(counter);
			showResult()
		}
	};
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

function mixing() {
	cards.forEach(card => {
		let randomOrder = Math.floor(Math.random() * 20);
		card.style.order = randomOrder;
	})
};

function showResult() {
	setTimeout(() => {
		congratulation.textContent = `Congratulations! Your score ${counter}!`;
		createLastScoresTable();
		createTopScoresTable();
		cardsField.classList.add('invisible');
		scoreField.classList.remove('invisible');
	}, 1000);
}

function createLastScoresTable() {
	scoresArray.splice(0, scoresArray.length - 10);
	lastScores.insertAdjacentHTML('beforeend', `
<caption class="table-caption">Last 10 games</caption>
<tr>
	<th>Game</th>
	<th>Score</th>
</tr>
<tr>
	<td>1</td>
	<td>${scoresArray[0] ? scoresArray[0] : '0'}</td>
</tr>
<tr>
	<td>2</td>
	<td>${scoresArray[1] ? scoresArray[1] : '0'}</td>
</tr>
<tr>
	<td>3</td>
	<td>${scoresArray[2] ? scoresArray[2] : '0'}</td>
</tr>
<tr>
	<td>4</td>
	<td>${scoresArray[3] ? scoresArray[3] : '0'}</td>
</tr>
<tr>
	<td>5</td>
	<td>${scoresArray[4] ? scoresArray[4] : '0'}</td>
</tr>
<tr>
	<td>6</td>
	<td>${scoresArray[5] ? scoresArray[5] : '0'}</td>
</tr>
<tr>
	<td>7</td>
	<td>${scoresArray[6] ? scoresArray[6] : '0'}</td>
</tr>
<tr>
	<td>8</td>
	<td>${scoresArray[7] ? scoresArray[7] : '0'}</td>
</tr>
<tr>
	<td>9</td>
	<td>${scoresArray[8] ? scoresArray[8] : '0'}</td>
</tr>
<tr>
	<td>10</td>
	<td>${scoresArray[9] ? scoresArray[9] : '0'}</td>
</tr>
	`)
}


function createTopScoresTable() {
	let topScoresArray = scoresArray.slice();
	topScoresArray.sort((a, b) => a - b);
	bestScores.insertAdjacentHTML('beforeend', `
<caption class="table-caption">Top 10 results</caption>
<tr>
	<th>Game</th>
	<th>Score</th>
</tr>
<tr>
	<td>1</td>
	<td>${topScoresArray[0] ? topScoresArray[0] : '0'}</td>
</tr>
<tr>
	<td>2</td>
	<td>${topScoresArray[1] ? topScoresArray[1] : '0'}</td>
</tr>
<tr>
	<td>3</td>
	<td>${topScoresArray[2] ? topScoresArray[2] : '0'}</td>
</tr>
<tr>
	<td>4</td>
	<td>${topScoresArray[3] ? topScoresArray[3] : '0'}</td>
</tr>
<tr>
	<td>5</td>
	<td>${topScoresArray[4] ? topScoresArray[4] : '0'}</td>
</tr>
<tr>
	<td>6</td>
	<td>${topScoresArray[5] ? topScoresArray[5] : '0'}</td>
</tr>
<tr>
	<td>7</td>
	<td>${topScoresArray[6] ? topScoresArray[6] : '0'}</td>
</tr>
<tr>
	<td>8</td>
	<td>${topScoresArray[7] ? topScoresArray[7] : '0'}</td>
</tr>
<tr>
	<td>9</td>
	<td>${topScoresArray[8] ? topScoresArray[8] : '0'}</td>
</tr>
<tr>
	<td>10</td>
	<td>${topScoresArray[9] ? topScoresArray[9] : '0'}</td>
</tr>
	`)
}

buttonGreetings.addEventListener('click', function (event) {
	event.preventDefault();
	mixing();
	greetings.classList.add('invisible');
	cardsField.classList.remove('invisible');
	cards.forEach(card => card.addEventListener('click', turnCard));
});

buttonScore.addEventListener('click', function (event) {
	event.preventDefault();
	cards.forEach(card => {
		card.classList.remove('turn');
		card.classList.remove('no-event');
	});
	mixing();
	scoreField.classList.add('invisible');
	cardsField.classList.remove('invisible');
	cards.forEach(card => card.addEventListener('click', turnCard));
	lastScores.textContent = '';
	bestScores.textContent = '';
	counter = 0;
});

cards.forEach(card => card.addEventListener('click', turnCard));


