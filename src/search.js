import { listIDs } from "./constants.js";
export { searchMovies };

// 영화 검색 함수
function searchMovies(movieLists, creditLists) {
  //검색옵션과 검색창 각각 할당
  let searchOption = document.getElementById("search-option");
  let searchInput = document.getElementById("search-input");
  //리스트 section들
  const listSections = document.querySelectorAll("section");
  //영화 리스트들
  const movieCardLists = listIDs.map((listID) => document.getElementById(listID));

  //검색어가 비어있는지 확인
  if (searchInput.value !== "") {
    //검색어를 소문자로 변환
    const loweredSearching = searchInput.value.toLowerCase();
    let countSearched = [];
    movieCardLists.forEach((cardList, index) => {
      countSearched[index] = 0;
      movieLists[index].forEach((movie) => {
        const card = cardList.querySelector(`[id="${movie.id}"]`);
        if (card) {
          // 겁색옵션에 따라 검색어를 포함하는 영화가 있는지 여부를 나타내는 "isMatched"라는 변수를 선언 및 false로 초기화
          let isMatched = false;
          //검색옵션: title
          if (searchOption.selectedIndex === 0) {
            isMatched = movie.title.toLowerCase().includes(loweredSearching);
          }
          //검색옵션: overview
          else if (searchOption.selectedIndex === 1) {
            isMatched = movie.overview.toLowerCase().includes(loweredSearching);
          }
          //검색옵션: director
          else if (searchOption.selectedIndex === 2) {
            const credit = findCredit(creditLists, movie.id);
            if (credit) {
              isMatched = credit.director.name.toLowerCase().includes(loweredSearching);
            }
          }
          //검색옵션: cast
          else if (searchOption.selectedIndex === 3) {
            const credit = findCredit(creditLists, movie.id);
            if (credit) {
              isMatched = credit.cast.some((actor) => actor.name.toLowerCase().includes(loweredSearching));
            }
          }
          // 영화 카드 보이기/숨기기
          if (isMatched) countSearched[index]++;
          showOrHide(card, isMatched);
        }
      });
      listSections[index].style.display = countSearched[index] > 0 ? "block" : "none";
    });
    if (countSearched.every((count) => count === 0)) alert("검색 결과가 없습니다.");
  }
  //검색창이 공백이면
  else {
    // 입력창에 포커스
    searchInput.focus();
  }
}

// 영화 크레딧에서 해당 영화의 크레딧 찾기
function findCredit(creditLists, movieId) {
  const creditList = creditLists.find((list) => list.some((credit) => credit.id === movieId));
  return creditList ? creditList.find((credit) => credit.id === movieId) : null;
}

// 영화 카드 보이기/숨기기 함수
function showOrHide(card, isMatched) {
  //isMatched가 true면 카드를 보이도록, false면 숨기도록 설정
  card.style.display = isMatched ? "block" : "none";
}
