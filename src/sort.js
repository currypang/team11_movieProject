export { sortByTitle, sortByRating, sortByDate };
import { makeMovieCards } from "./card.js";

// 영화 제목을 알파벳순으로 정렬하는 기능

function sortByTitle(movieList, creditList, listID, sortKey) {
  //영화 리스트를 받아서 평점 순으로 정렬
  const sortedMovies = movieList.sort((a, b) => {
    // localeCompare 문자열 비교함수: 왼쪽 > 오른쪽 => -1 리턴, 왼쪽 < 오른쪽 => 1 리턴, 왼쪽 = 오른쪽 => 0 리턴
    if (sortKey === "ascending") return a.title.localeCompare(b.title);
    else if (sortKey === "descending") return b.title.localeCompare(a.title);
  });

  // 정렬 되기 전 리스트 속 카드를 화면에서 전부 지움
  const flexContainer = document.getElementById(listID);
  flexContainer.innerHTML = "";

  // 정렬된 리스트로 카드를 생성
  makeMovieCards(sortedMovies, listID, creditList);
}

function sortByRating(movieList, creditList, listID, sortKey) {
  //영화 리스트를 받아서 평점 순으로 정렬
  const sortedMovies = movieList.sort((a, b) => {
    if (sortKey === "ascending") return a.vote_average - b.vote_average;
    else if (sortKey === "descending") return b.vote_average - a.vote_average;
  });

  // 정렬 되기 전 리스트 속 카드를 화면에서 전부 지움
  const flexContainer = document.getElementById(listID);
  flexContainer.innerHTML = "";

  // 정렬된 리스트로 카드를 생성
  makeMovieCards(sortedMovies, listID, creditList);
}

function sortByDate(movieList, creditList, listID, sortKey) {
  // .flex-container 내의 모든 영화 카드(li 요소) 선택
  console.log(movieList);
  const sortedMovies = movieList.sort((a, b) => {
    if (sortKey === "ascending") {
      return a.release_date.split("-").join("") - b.release_date.split("-").join("");
    } else if (sortKey === "descending") {
      return b.release_date.split("-").join("") - a.release_date.split("-").join("");
    }
  });

  // 정렬 되기 전 리스트 속 카드를 화면에서 전부 지움
  const flexContainer = document.getElementById(listID);
  flexContainer.innerHTML = "";

  // 정렬된 리스트로 카드를 생성
  makeMovieCards(sortedMovies, listID, creditList);
}
