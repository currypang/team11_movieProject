import { fetchMovies, fetchCredits } from "./fetch.js";
import { makeCard } from "./card.js";
import { searchMovies } from "./search.js";
import { sortMovie } from "./sort.js";
import { setupSlideNavigation } from "./slider.js";

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
  // document.querySelector(selector) : CSS 선택자를 이용하여 요소를 선택합니다.
  //HTML 문서에서  id #sortTitleUp 요소 선택하여 sortButton1에 할당
  const sortButton1 = document.getElementById("sortTitleUp");
  // 버튼 1번에 이벤트리스턴널
  sortButton1.addEventListener("click", () => {
    //sessionStorage에 저장된 sortKey를 가져옴
    let sortKey = sessionStorage.getItem("sortKey");
    //sortKey가 true면 오름차순 false면 내림차순
    sortMovie("now-playing", sortKey);
    sortMovie("top-rated", sortKey);
    sortMovie("popular", sortKey);
    sortMovie("upcoming", sortKey);
    // 논리 부정 연산자를 사용하여 sortKey를 반대로 저장
    if (sortKey === "ascending") sessionStorage.setItem("sortKey", "descending");
    else if (sortKey === "descending") sessionStorage.setItem("sortKey", "ascending");
    else console.log("sortKey의 저장된 값에 오류가 있습니다.");
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
    //영화크레딧 불러와서 저장
    const nowPlayingCredits = fetchCredits(nowPlaying);
    const topRatedCredits = fetchCredits(topRated);
    const popularCredits = fetchCredits(popular);
    const upcomingCredits = fetchCredits(upcoming);

    //영화데이터, 영화크레딧 통합
    const fetchedMovies = [...nowPlaying, ...topRated, ...popular, ...upcoming];
    const fetchedCredits = [nowPlayingCredits, topRatedCredits, popularCredits, upcomingCredits];

    //영화카드 생성
    makeCard(nowPlaying, "now-playing"); // fetch된 영화의 카드를 생성할 리스트를 id로 선택
    makeCard(topRated, "top-rated");
    makeCard(popular, "popular");
    makeCard(upcoming, "upcoming");
    //sessionStorage에 저장된 sortKey를 "ascending"로 초기화
    sessionStorage.setItem("sortKey", "ascending");
    //클릭 이벤트를 모두 생성
    addEvents(fetchedMovies, fetchedCredits);
  },
  false
);
