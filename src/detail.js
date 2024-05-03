import {
  postComment,
  getComment,
  deleteComment,
  reviseComment,
} from "./comment.js";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzM1ZmE2ZmQ2MTE3M2I3Nzk2ZmEyNzUyNTNmNDE4NyIsInN1YiI6IjY2MmI0YTc4OWFjNTM1MDExZDhmMmRlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vk4yeQ8AiQHmqX_sadQavDK7PIaoriDP50jL6m2DQHM",
  },
};

function getSubMovie() {
  const url = window.location.href; // window.location.href => http://127.0.0.1:5500/sub_page.html?value=238
  const movieID = Number(url.split("=").pop()); // 238
  // console.log(movieID);

  // fetch(`https://api.themoviedb.org/3/movie/${movieID}?language=en-US`, options)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     // console.log(data);
  //     let title = data.title;
  //     let img = data.poster_path;

  //     // console.log(data.title);
  //     // console.log(data.poster_path);
  //     // 제목 불러오기 테스트
  //     let detailTitle = document.getElementById("test");
  //     detailTitle.textContent = `${title}`;
  //   })
  //   .catch((err) => console.error(err));
  // inputComment();
}
// getSubMovie();
const button = document.getElementById("button");
button.addEventListener("click", postComment);
getComment();
reviseComment();
deleteComment();
