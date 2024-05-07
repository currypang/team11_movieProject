import { postComment, getComment, deleteComment, reviseComment } from "./comment.js";

// 영화 배우 카드 생성
function makeActorCard(actorData) {
  const actorManager = document.querySelector(".actor-box");
  actorData.map((actor) => {
    let actorCardDiv = document.createElement("div");
    actorCardDiv.setAttribute("class", "actor-card");
    actorCardDiv.innerHTML = `<p">${actor.name}</p>`;
    actorManager.appendChild(actorCardDiv);
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
  document.querySelector(".movie-genre").textContent = movieData.genres.map((el) => el.name + " "); // genre
  document.querySelector(".movie-star").textContent = movieData.vote_average; // vote average
  document.querySelector(".movie-overview").textContent = movieData.overview; // overview

  // set actor card
  let tempData = [
    { name: "Test Name 1" },
    { name: "Test Name 2" },
    { name: "Test Name 3" },
    { name: "Test Name 3" },
    { name: "Test Name 3" },
    { name: "Test Name 3" },
    { name: "Test Name 3" }
  ];
  // need card slider
  makeActorCard(tempData);
}

// Home 버튼
function setHomeBtn() {
  document.getElementById("home-btn-id").addEventListener("click", function () {
    window.location.href = "./index.html";
  });
}


document.addEventListener("DOMContentLoaded",
  async()=>{
    setHomeBtn(); // 홈버튼
    setMovieDetail() // 영화 상세 정보

    // 리뷰 컨텐츠
    const button = document.getElementById("button");
    button.addEventListener("click", postComment);
    getComment();
    reviseComment();
    deleteComment();
  }
);




