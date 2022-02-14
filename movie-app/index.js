'use strict';

const API_KEY = '93fa84c8-0195-4d4c-960f-81d5c1e177ee';
const API_URL_TOP100 = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';
const API_URL_ONE_MOVIE = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';
const API_URL_ACTORS = 'https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=';
const API_URL_REVIEWS = 'https://kinopoiskapiunofficial.tech/api/v1/reviews?filmId=';

const moviesElement = document.querySelector('.movies');
const formSearch = document.querySelector('form');
const headerSearch = document.querySelector('.header__search');
const searchClear = document.querySelector('.search-clear');
const popupWindow = document.querySelector('.popup');
const popupInfoWrapper = popupWindow.querySelector('.popup__info-wrapper');
const popupTitle = popupWindow.querySelector('.popup__title');
const popupMovieDescription = popupWindow.querySelector('.popup__movie-description');
const commentsList = popupWindow.querySelector('.comments-list');
const popupClose = popupWindow.querySelector('.popup__close');
const popupFormButton = popupWindow.querySelector('.popup__form-button');
const popupCommentField = document.getElementById('comment-textarea');
const popupAuthorCommentField = document.getElementById('comment-input');


// Получаем топ фильмов
getMovies(API_URL_TOP100);

async function getMovies(url) {
	try {
		const response = await fetch(url, {
			headers: {
				"Content-Type": "application/json",
				"X-API-KEY": API_KEY,
			},
		});
		const responseData = await response.json();
		showMovies(responseData);
	} catch (error) {
		getErrorText(moviesElement);
		console.error(error);
	}
}

// Раскрашиваем рейтинг фильму
function getClassByRate(vote) {
	if (vote >= 7) {
		return "green";
	} else if (vote > 5) {
		return "orange";
	} else {
		return "red";
	}
}

// Создаем карточки фильмов
function showMovies(data) {

	// Очищаем предыдущие фильмы
	moviesElement.innerHTML = "";

	data.films.forEach((movie) => {
		const movieElem = document.createElement("div");
		movieElem.classList.add("movie");
		movieElem.innerHTML = `
			<div class="movie__picture-inner">
				<a href="#popup" data-idMovie="${movie.filmId}"><img
					src="${movie.posterUrlPreview}"
					class="movie__picture"
					alt="${movie.nameRu}"
				/></a>
				<div class="movie__picture_darkened popup-link"></div>
			</div>
			<div class="movie__info">
				<div class="movie__title">${movie.nameRu}</div>
				<div class="movie__category">${movie.genres.map((genre) => ` ${genre.genre}`)}</div>
				${movie.rating > 0 ?
				`
					<div class="movie__rating movie__rating_${getClassByRate(
					movie.rating)}">${movie.rating}</div>
				` : ""
			}
				</div>
				`;
		moviesElement.appendChild(movieElem);


		// Открываем модальное окно по клику
		const actionMovie = movieElem.querySelector('.popup-link');
		actionMovie.addEventListener('click', function (event) {
			event.preventDefault();

			const infoOneMovie = `${API_URL_ONE_MOVIE}${movie.filmId} `; //url API с инфо о конкретном фильме
			const infoActors = `${API_URL_ACTORS}${movie.filmId} `; //url API с инфо об актерах и режиссерах
			const infoReviews = `${API_URL_REVIEWS}${movie.filmId}& page=1`; //url API с рецензиями

			// Получаем информацию о конкретном фильме
			getOneMovie(infoOneMovie);

			async function getOneMovie(url) {
				try {
					const response = await fetch(url, {
						headers: {
							"Content-Type": "application/json",
							"X-API-KEY": API_KEY,
						},
					});
					const oneMovieData = await response.json();

					// Создаем контент попапа
					popupTitle.textContent = `${movie.nameRu} `;

					popupInfoWrapper.insertAdjacentHTML('beforeend', `
						<div class="popup__image-inner" >
							<img class="popup__image"
								src="${oneMovieData.posterUrlPreview}" alt="${oneMovieData.nameRu}">
						</div>
						<div class="popup__table-wraper">
							<table class="popup__table">
								<tr class="popup__table-row">
									<th class="popup__table-cell">Название: </th>
									<th class="popup__table-cell">${oneMovieData.nameRu}</th>
								</tr>
								<tr class="popup__table-row">
									<th class="popup__table-cell">Оригинальное название: </th>
									<th class="popup__table-cell">${oneMovieData.nameOriginal !== null ? oneMovieData.nameOriginal : "-"}</th>
								</tr>
								<tr class="popup__table-row">
									<th class="popup__table-cell">Год: </th>
									<th class="popup__table-cell">${oneMovieData.year}</th>
								</tr>
								<tr class="popup__table-row">
									<th class="popup__table-cell">Страна: </th>
									<th class="popup__table-cell">${oneMovieData.countries.map((country) => ` ${country.country}`)}</th>
								</tr>
								<tr class="popup__table-row">
									<th class="popup__table-cell">Жанр: </th>
									<th class="popup__table-cell">${oneMovieData.genres.map((genre) => ` ${genre.genre}`)}</th>
								</tr>
								<tr class="popup__table-row">
									<th class="popup__table-cell">Слоган: </th>
									<th class="popup__table-cell">${oneMovieData.slogan !== null ? oneMovieData.slogan : "-"}</th>
								</tr>
								<tr class="popup__table-row">
									<th class="popup__table-cell">Рейтинг: </th>
									<th class="popup__table-cell">${oneMovieData.ratingKinopoisk !== null ? oneMovieData.ratingKinopoisk : "Считаем..."}</th>
								</tr>
								<tr class="popup__table-row">
									<th class="popup__table-cell">Время: </th>
									<th class="popup__table-cell">${oneMovieData.filmLength !== null ? oneMovieData.filmLength : "Считаем"} мин.</th>
								</tr>
								<tr class="popup__table-row">
									<th class="popup__table-cell">Режиссер: </th>
									<th class="popup__table-cell table-cell_director"></th>
								</tr>
								<tr class="popup__table-row">
									<th class="popup__table-cell">В главных ролях: </th>
									<th class="popup__table-cell table-cell_actors"></th>
								</tr>
							</table>
						</div>
					`);

					// добавляем в попап инфо об актерах и режиссере
					const popupTableCellDirector = popupWindow.querySelector('.table-cell_director');
					const popupTableCellActors = popupWindow.querySelector('.table-cell_actors');

					getActors(infoActors);

					async function getActors(url) {
						try {
							const response = await fetch(url, {
								headers: {
									"Content-Type": "application/json",
									"X-API-KEY": API_KEY,
								},
							});
							const actorsDate = await response.json();

							let directorArr = [];
							let actorsArr = [];
							actorsDate.forEach((actor) => {
								if (actor.professionKey === "DIRECTOR") {
									directorArr.push(actor.nameRu);
								} else if (actor.professionKey === "ACTOR") {
									actorsArr.push(actor.nameRu)
								}
							})

							popupTableCellDirector.textContent = `${directorArr.join(', ')} `;
							popupTableCellActors.textContent = `${actorsArr.slice(0, 10).join(', ')} `;

						} catch (error) {
							console.error(error);
						}
					}

					// добавляем содержание фильма					
					popupMovieDescription.textContent = `${oneMovieData.description !== null ? oneMovieData.description : "Пишем..."} `

					popupWindow.style.display = 'block';

				} catch (error) {
					console.error(error);
					actionMovie.setAttribute('title', 'Информация о фильме в данный момент недоступна. Попробуйте позднее');
				}
			}

			// добавляем комментарии из API в попап
			getBlockComments(infoReviews);

			async function getBlockComments(url) {
				try {
					const response = await fetch(url, {
						headers: {
							"Content-Type": "application/json",
							"X-API-KEY": API_KEY,
						},
					});
					const reviewsDate = await response.json();
					showReviews(reviewsDate);

				} catch (error) {
					console.error(error);
				}
			}

			function showReviews(data) {
				data.reviews.forEach((review) => {
					const reviewElem = document.createElement("li");
					reviewElem.classList.add("comments-list__item");
					reviewElem.innerHTML = `
								<p class="comments-list__author" >${review.reviewAutor}</p >
								<p class="comments-list__text">${review.reviewDescription}</p>
							`;
					commentsList.appendChild(reviewElem);
				});
			}

			//  Добавляем новые комментарии
			popupFormButton.addEventListener('click', function (event) {
				event.preventDefault();

				if (popupAuthorCommentField.value !== '' && popupCommentField.value !== '') {
					const newComment = document.createElement("li");
					newComment.classList.add("comments-list__item");
					newComment.innerHTML = `
							<p class="comments-list__author" >${popupAuthorCommentField.value}</p >
							<p class="comments-list__text">${popupCommentField.value}</p>
						`;

					popupAuthorCommentField.value = '';
					popupCommentField.value = '';

					commentsList.appendChild(newComment);
				}
			});
		});
	});
}

function closePopup() {
	popupWindow.style.display = 'none';
	popupInfoWrapper.innerHTML = "";
	commentsList.innerHTML = "";
}

// Закрываем попап по клику на крестик
popupClose.addEventListener('click', function () {
	closePopup();
});

// Закрываем попап при нажатии на Esc
document.addEventListener('keydown', function (event) {
	if (event.key === "Escape") {
		closePopup();
	}
});

// Поиск фильма
formSearch.addEventListener("submit", (event) => {
	event.preventDefault();

	const apiSearchUrl = `${API_URL_SEARCH}${headerSearch.value} `; //url API с поиском
	if (headerSearch.value) {
		getMovies(apiSearchUrl);
		searchClear.classList.remove('invisible');
	}
});

headerSearch.addEventListener('input', function () {
	headerSearch.value.length > 0 ? searchClear.classList.remove('invisible') : searchClear.classList.add('invisible');
})

searchClear.addEventListener('click', function () {
	headerSearch.value = "";
	searchClear.classList.add('invisible');
	headerSearch.focus();
});

// Добавляем текст ошибки, если не грузится API
function getErrorText(element) {
	element.insertAdjacentHTML('afterend', `
		<div class="error-wrapper">
			<img class="error_img" src="./assets/img/12.png" alt="Ошибка">
			<div class="error-text">
				Что-то пошло не так... <br>Попробуйте перезагрузить страницу или зайдите позже.
			</div>			
		</div>
	`)
}


console.log(`
Оценка за задание 60 баллов.
1. Вёрстка +10
 - на странице есть несколько карточек фильмов и строка поиска. На каждой карточке фильма есть постер и название фильма. Также на карточке может быть другая информация, которую предоставляет API, например, описание фильма, его рейтинг на IMDb и т.д. +5
 - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. При загрузке приложения на странице отображаются карточки фильмов с полученными от API данными +10
3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся карточки фильмов, в названиях которых есть это слово, если такие данные предоставляет API +10
4. Поиск +30
 - при открытии приложения курсор находится в поле ввода +5
 - есть placeholder +5
 - автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5
 - поисковый запрос можно отправить нажатием клавиши Enter +5
 - после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5
 - в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5
5. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
`)