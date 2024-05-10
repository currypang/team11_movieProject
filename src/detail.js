import { postComment, getComment, deleteComment, reviseComment } from "./comment.js";
import { genreType, emptyPersonImg } from "./constants.js";

const label = document.querySelectorAll(".movie-rating .rating__label");
const labelLength = label.length;
let stars = document.querySelectorAll(".movie-rating .star-icon");

// Actor 카드 Drag scroll
function cardDrager() {
  const slider = document.querySelector(".actor-box");
  console.log(slider);
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
  });
}

// 인물 카드 생성
function makeFaceCard(name, position, profile) {
  let cardDiv = document.createElement("div");
  let cardImg = document.createElement("img"); // 배우 사진
  let cardCharName = document.createElement("p"); // 배우 이름
  let cardName = document.createElement("p"); // 배우 이름

  cardDiv.setAttribute("class", "actor-card");
  cardImg.setAttribute("class", "actor-img");
  cardCharName.setAttribute("class", "actor-char-name");
  cardName.setAttribute("class", "actor-name");
  cardImg.setAttribute("src", profile ? `https://image.tmdb.org/t/p/w500/${profile}` : emptyPersonImg);
  cardCharName.innerHTML = `<p">${position}</p>`;
  cardName.innerHTML = `<p">${name}</p>`;
  cardDiv.appendChild(cardImg);
  cardDiv.appendChild(cardCharName);
  cardDiv.appendChild(cardName);
  return cardDiv;
}

// 인물 리스트 생성
function makeActorCard(actorData) {
  const actorManager = document.querySelector(".actor-list");
  actorData?.cast.map((actor) => {
    actorManager.appendChild(makeFaceCard(actor.name, actor.character, actor.profile_path));
  });
}

// 영화 상세 정보 기입
function setMovieDetail() {
  // input center movie data
  let movieData = JSON.parse(sessionStorage.getItem("TARGET_MOVIE_DATA"));
  document
    .querySelector(".movie-poster")
    .setAttribute("src", "https://image.tmdb.org/t/p/w500/" + movieData.poster_path);

  // 상세 페이지 영화 제목
  document.querySelector(".movie-title").textContent = movieData.title;
  // 상세 페이지 영화 세부 정보
  document.querySelector(".movie-release-date").textContent = movieData.release_date; // Release date
  let movieGenre = "";
  movieData.genres.map((el) =>
    genreType.map((genreId) => {
      if (genreId.id == el) movieGenre += genreId.name + "  ";
    })
  );
  document.querySelector(".movie-genre").textContent = movieGenre; // genre
  ratingToStars(movieData.vote_average); // vote average
  document.querySelector(".movie-overview").textContent = movieData.overview; // overview
  // 감독 정보
  document
    .querySelector(".movie-director")
    .appendChild(makeFaceCard(movieData.credits.director.name, "director", movieData.credits.director.profile_path));
  // 배우 정보
  makeActorCard(movieData.credits);
}

// Home 버튼
function setHomeBtn() {
  document.getElementById("home-button").addEventListener("click", function () {
    window.location.href = "./index.html";
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  setHomeBtn(); // 홈버튼
  setMovieDetail(); // 영화 상세 정보

  // 리뷰 컨텐츠
  const button = document.getElementById("register-review");
  button.addEventListener("click", postComment);
  getComment();
  reviseComment();
  deleteComment();
});

function ratingToStars(rating) {
  const rounded = Math.round(rating);
  filledRate(rounded, labelLength);
}

function filledRate(index, length) {
  if (index <= length) {
    for (let i = 0; i <= index; i++) {
      stars[i].classList.add("filled");
    }
  }
}
