export { sortByTitle, sortByRating, sortByDate };
import { makeMovieCards } from "./card.js";

// 영화 제목을 알파벳순으로 정렬하는 기능

function sortByTitle(listID, sortKey) {
  // .flex-container 내의 모든 영화 카드(li 요소) 선택
  const cardList = document.getElementById(listID);
  const movieCards = cardList.querySelectorAll("li");
  // movieList를 배열로 변환한후 sort 사용하여 알파벳 순으로 정렬
  const sortedMovies = Array.from(movieCards).sort((a, b) => {
    //sort(a,b) => 배열을 비교하기위해
    const titleA = a.innerText; // element.innerText
    const titleB = b.innerText; // 요소의 텍스트 내용을 가져와  titleA 와 titleB에 저장
    // sortKey가 true면 오름차순 false면 내림차순
    if (sortKey === "ascending") {
      // localeCompare 문자열 비교함수: 왼쪽 > 오른쪽 => -1 리턴, 왼쪽 < 오른쪽 => 1 리턴, 왼쪽 = 오른쪽 => 0 리턴
      return titleA.localeCompare(titleB); // true인 경우 오름차순 정렬
    } else if (sortKey === "descending") {
      return titleB.localeCompare(titleA); // false인 경우 내림차순 정렬
    } else {
      console.log("sortKey의 저장된 값에 오류가 있습니다.");
    }
  });

  // 정렬 되기 전 리스트 속 카드를 화면에서 전부 지움
  const flexContainer = document.getElementById(listID);
  flexContainer.innerHTML = "";

  // 정렬된 리스트로 카드를 생성
  sortedMovies.forEach((movie) => {
    flexContainer.appendChild(movie);
  });
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
