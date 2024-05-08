import { postComment, getComment, deleteComment, reviseComment } from "./comment.js";
import { genreType, emptyPersonImg } from "./constants.js";

// 인물 카드 생성
function makeFaceCard(name, position, profile) {
  let cardDiv = document.createElement("div");
  let cardImg = document.createElement("img"); // 배우 사진
  let cardCharName = document.createElement("p"); // 배우 이름
  let cardName = document.createElement("p"); // 배우 이름

  cardDiv.setAttribute("class", "actor-card");
  cardImg.setAttribute("class", "actor-img");
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
  const actorManager = document.querySelector(".actor-box");
  actorData?.cast.map((actor) => {
    actorManager.appendChild(makeFaceCard(actor.name, actor.character, actor.profile_path));
  });
}

// 영화 상세 정보 기입
function setMovieDetail() {
  // input center movie data
  let movieData = JSON.parse(sessionStorage.getItem("TARGET_MOVIE_DATA"));
  document
    .querySelector(".movie-img")
    .setAttribute(
      "style",
      `background-image: url("https://image.tmdb.org/t/p/w500/${movieData.poster_path}"); height: 90%; aspect-ratio: 2/3;`
    );

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
  document.querySelector(".movie-star").textContent = movieData.vote_average; // vote average
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
  document.getElementById("home-btn-id").addEventListener("click", function () {
    window.location.href = "./index.html";
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  setHomeBtn(); // 홈버튼
  setMovieDetail(); // 영화 상세 정보

  // 리뷰 컨텐츠
  const button = document.getElementById("button");
  button.addEventListener("click", postComment);
  getComment();
  reviseComment();
  deleteComment();
});
