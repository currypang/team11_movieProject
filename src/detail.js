import { postComment, getComment, deleteComment, reviseComment } from "./comment.js";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzM1ZmE2ZmQ2MTE3M2I3Nzk2ZmEyNzUyNTNmNDE4NyIsInN1YiI6IjY2MmI0YTc4OWFjNTM1MDExZDhmMmRlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vk4yeQ8AiQHmqX_sadQavDK7PIaoriDP50jL6m2DQHM"
  }
};

function makeActorCard(actorData) {
  const actorManager = document.querySelector(".actor-box");

  actorData.map((actor) => {
    let actorCardDiv = document.createElement("div");
    actorCardDiv.setAttribute("class", "actor-card");
    console.log(`actor name :` + actor.name);
    actorCardDiv.innerHTML = `<p">${actor.name}</p>`;
    actorManager.appendChild(actorCardDiv);
  });
}

function setMovieDetail(movieData) {
  console.log(movieData);
  // input center movie data
  document
    .querySelector(".movie-img")
    .setAttribute(
      "style",
      `background-image: url("https://image.tmdb.org/t/p/w500/${movieData.poster_path}"); height: 90%; aspect-ratio: 2/3;`
    );
  document.querySelector(".movie-title").textContent = movieData.title;
  document.querySelector(".movie-release-date").textContent = movieData.release_date;

  // issue : given genre data doesn't displayed
  console.log(movieData.genres);
  document.querySelector(".movie-genre").textContent = movieData.genres.map((el) => el.name + " ");
  document.querySelector(".movie-star").textContent = movieData.vote_average;
  document.querySelector(".movie-overview").textContent = movieData.overview;

  // movie credits structure
  /* { 
    id : movie_id,
    cast :[ [casting object], [casting object], [casting object] ] ,
    director : [ director_data object ]
  } */

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

function getSubMovie() {
  const url = window.location.href; // window.location.href => http://127.0.0.1:5500/sub_page.html?value=238

  // case 1 get movie id by url
  // const movieID = Number(url.split("=").pop()); // 238

  // case 2 get movie id by local storage
  const movieID = sessionStorage.getItem("MOVIE_ID");
  console.log(movieID);
  fetch(`https://api.themoviedb.org/3/movie/${movieID}?language=en-US`, options)
    .then((response) => response.json())
    .then((data) => {
      setMovieDetail(data);
      // 제목 불러오기 테스트
    })
    .catch((err) => console.error(err));
}

function setHomeBtn() {
  document.getElementById("home-btn-id").addEventListener("click", function () {
    window.location.href = "./index.html";
  });
}

setHomeBtn();
getSubMovie();

const button = document.getElementById("button");
button.addEventListener("click", postComment);
getComment();
reviseComment();
deleteComment();
