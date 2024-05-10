import { listIDs } from "./constants.js";

// 영화 ID로 creditLists에서 해당 영화의 credit 찾기
function findCredit(creditLists, movieId) {
  const creditList = creditLists.find((list) => list.some((credit) => credit.id === movieId));
  return creditList ? creditList.find((credit) => credit.id === movieId) : null;
}

// 영화 카드 보이기/숨기기 함수
function showOrHide(card, isMatched) {
  //isMatched가 true면 카드를 보이도록, false면 숨기도록 설정
  card.style.display = isMatched ? "block" : "none";
}

// 영화가 검색 기준과 일치하는지 확인하는 함수
function isMovieMatched(movie, searchQuery, selectedOption, creditLists) {
  const query = searchQuery.toLowerCase();
  switch (selectedOption) {
    case 0: // title
      return movie.title.toLowerCase().includes(query);
    case 1: // overview
      return movie.overview.toLowerCase().includes(query);
    case 2: // director
      const directorCredit = findCredit(creditLists, movie.id);
      return directorCredit && directorCredit.director.name.toLowerCase().includes(query);
    case 3: // cast
      const castCredit = findCredit(creditLists, movie.id);
      return castCredit && castCredit.cast.some((actor) => actor.name.toLowerCase().includes(query));
    default:
      return false;
  }
}

// 영화 검색 함수
function searchMovies(movieLists, creditLists) {
  //검색옵션과 검색창 각각 할당
  const searchOptionBtn = document.getElementById("search-option");
  const selectedOption = searchOptionBtn.selectedIndex;
  const searchInput = document.getElementById("search-input");
  const searchQuery = searchInput.value;
  //리스트 section들
  const listSections = document.querySelectorAll("section");
  //영화 리스트들
  const movieCardLists = listIDs.map((listID) => document.getElementById(listID));

  //검색어가 비어있는지 확인
  if (searchQuery.trim() === "") {
    searchInput.focus();
  } else {
    //검색어를 소문자로 변환
    let countSearched = [];
    movieCardLists.forEach((cardList, index) => {
      countSearched[index] = 0;
      movieLists[index].forEach((movie) => {
        const card = cardList.querySelector(`[id="${movie.id}"]`);
        if (card) {
          // 겁색옵션에 따라 검색어를 포함하는 영화가 있는지 여부를 나타내는 "isMatched"라는 변수를 선언 및 false로 초기화
          const isMatched = isMovieMatched(movie, searchQuery, selectedOption, creditLists);
          // 영화 카드 보이기/숨기기
          if (isMatched) countSearched[index]++;
          showOrHide(card, isMatched);
        }
      });
      listSections[index].style.display = countSearched[index] > 0 ? "block" : "none";
    });
    if (countSearched.every((count) => count === 0)) alert("검색 결과가 없습니다.");
  }
}

export { searchMovies };
