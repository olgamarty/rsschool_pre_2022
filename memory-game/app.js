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
let scoresArray = JSON.parse(localStorage.getItem('score')) || [];

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
	}, 700);
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

function setLocalStorage() {
	localStorage.setItem('score', JSON.stringify(scoresArray));
}
window.addEventListener('beforeunload', setLocalStorage);


console.log(`
Оценка за задание 60 баллов.
1. Вёрстка +10
- реализован интерфейс игры +5
- в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. Логика игры. Карточки, по которым кликнул игрок, переворачиваются согласно правилам игры +10
3. Игра завершается, когда открыты все карточки +10
4. По окончанию игры выводится её результат - количество ходов, которые понадобились для завершения игры +10
5. Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр +10
6. По клику на карточку – она переворачивается плавно, если пара не совпадает – обе карточки так же плавно переварачиваются рубашкой вверх +10
7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
- высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо
`)
