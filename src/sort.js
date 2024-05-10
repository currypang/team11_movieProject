import { createCardsInList } from "./card.js";

// 영화 리스트를 제목 순으로 정렬하는 함수
function sortByTitle(movieList, creditList, listID, sortKey) {
  const sortedMovies = movieList.sort((a, b) => {
    // localeCompare 문자열 비교함수: 왼쪽 > 오른쪽 => -1 리턴, 왼쪽 < 오른쪽 => 1 리턴, 왼쪽 = 오른쪽 => 0 리턴
    if (sortKey === "ascending") return a.title.localeCompare(b.title);
    else if (sortKey === "descending") return b.title.localeCompare(a.title);
  });

  //정렬 되기 전 리스트 속 카드를 화면에서 전부 지움
  removeCardsInList(listID);
  //정렬된 리스트로 카드를 생성
  createCardsInList(sortedMovies, listID, creditList);
}

// 영화 리스트를 평점 순으로 정렬하는 함수
function sortByRating(movieList, creditList, listID, sortKey) {
  const sortedMovies = movieList.sort((a, b) => {
    if (sortKey === "ascending") return a.vote_average - b.vote_average;
    else if (sortKey === "descending") return b.vote_average - a.vote_average;
  });
  removeCardsInList(listID);
  createCardsInList(sortedMovies, listID, creditList);
}

// 영화 리스트를 개봉일 순으로 정렬하는 함수
function sortByDate(movieList, creditList, listID, sortKey) {
  const sortedMovies = movieList.sort((a, b) => {
    if (sortKey === "ascending") {
      return a.release_date.split("-").join("") - b.release_date.split("-").join("");
    } else if (sortKey === "descending") {
      return b.release_date.split("-").join("") - a.release_date.split("-").join("");
    }
  });
  removeCardsInList(listID);
  createCardsInList(sortedMovies, listID, creditList);
}

// 해당 리스트 id를 가진 리스트 속 카드를 전부 지우는 함수
function removeCardsInList(listID) {
  const movieCardList = document.getElementById(listID);
  movieCardList.innerHTML = "";
}

export { sortByTitle, sortByRating, sortByDate };
