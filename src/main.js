import { fetchMovies, fetchCredits } from "./fetch.js";
import { makeCard } from "./card.js";
import { searchMovies } from "./search.js";
import { sortMovie } from "./sort.js";

// 이벤트 핸들러 생성 함수
function addEvents(fetchedMovies, fetchedCredits) {
  //이벤트 생성해줄 대상을 각각 할당해주기
  let pageTitle = document.querySelector("#main-title > span");
  let searchForm = document.getElementById("search-form");
  //페이지 타이틀을 클릭했을 때의 이벤트 생성
  pageTitle?.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.reload();
  });
  //검색 버튼을 클릭했을 때의 이벤트 생성
  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    searchMovies(fetchedMovies, fetchedCredits);
  });
  // 정렬 버튼 이벤트
  // document.querySelector(selector) : CSS 선택자를 이용하여 요소를 선택합니다.
  //HTML 문서에서  id #sortTitleUp 요소 선택하여 sortButton1에 할당
  const sortButton1 = document.querySelector("#sortTitleUp");
  // 버튼 1번에 이벤트리스턴널
  sortButton1.addEventListener("click", () => {
    sortMovie();
  });
}

// Initialise
document.addEventListener(
  //페이지가 로드되고 난 뒤에 실행
  "DOMContentLoaded",
  async () => {
    //영화데이터 불러와서 저장
    const nowPlaying = await fetchMovies("now_playing"); // base url 뒤에 들어갈 movie list name 으로 fetch
    const topRated = await fetchMovies("top_rated");
    const popular = await fetchMovies("popular");
    const upcoming = await fetchMovies("upcoming");
    //영화카드 생성
    makeCard(nowPlaying, "now-playing"); // fetch된 영화의 카드를 생성할 리스트를 id로 선택
    makeCard(topRated, "top-rated");
    makeCard(popular, "popular");
    makeCard(upcoming, "upcoming");
    //클릭 이벤트를 모두 생성
    addEvents(fetchedMovies, fetchedCredits);
  },
  false
);
