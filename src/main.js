import { fetchMovies, fetchCredits } from "./fetch.js";
import { makeCard } from "./card.js";
import { searchMovies } from "./search.js";
import { sortByTitle, sortByRating, sortByDate } from "./sort.js";
import { listUrls, listIDs } from "./constants.js";

// 이벤트 핸들러 생성 함수
function addEvents(movieLists, creditLists) {
  //이벤트 생성해줄 대상을 각각 할당해주기
  const pageTitle = document.querySelector("#main-title > span");
  const searchForm = document.getElementById("search-form");
  const sortButton1 = document.getElementById("sortByTitle");
  const sortButton2 = document.getElementById("sortByRating");
  const sortButton3 = document.getElementById("sortByDate");
  //페이지 타이틀에 클릭 이벤트 생성
  pageTitle?.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.reload();
  });
  //검색 버튼에 클릭 이벤트 생성
  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    searchMovies(movieLists, creditLists);
  });
  // 정렬 버튼에 클릭 이벤트 생성
  sortButton1?.addEventListener("click", (event) => {
    event.preventDefault();
    //sessionStorage의 "sortKey"라는 key를 가진 저장소에서 오름차순/내림차순에 대한 값을 가져옴
    const prevSortKey = sessionStorage.getItem("sortKey");
    //각 영화 리스트 각각을 prevSortKey에 따라 오름차순/내림차순 정렬
    listIDs.forEach((listID) => sortByTitle(listID, prevSortKey));
    //nextSortKey에 prevSortKey와 반대 값을 할당 ("ascending" <--> "descending")
    const nextSortKey = prevSortKey === "ascending" ? "descending" : "ascending";
    //sessionStorage에 저장된 prevSortKey 값을 nextSortKey로 변경 (클릭할 때마다 오름차순/내림차순 번갈아가며 적용하기 위함)
    sessionStorage.setItem("sortKey", nextSortKey);
  });
  sortButton2?.addEventListener("click", (event) => {
    event.preventDefault();
    //sessionStorage의 "sortKey"라는 key를 가진 저장소에서 오름차순/내림차순에 대한 값을 가져옴
    const prevSortKey = sessionStorage.getItem("sortKey");
    //각 영화 리스트 각각을 prevSortKey에 따라 오름차순/내림차순 정렬
    listIDs.forEach((listID, index) => sortByRating(movieLists[index], creditLists[index], listID, prevSortKey));
    //nextSortKey에 prevSortKey와 반대 값을 할당 ("ascending" <--> "descending")
    const nextSortKey = prevSortKey === "ascending" ? "descending" : "ascending";
    //sessionStorage에 저장된 prevSortKey 값을 nextSortKey로 변경 (클릭할 때마다 오름차순/내림차순 번갈아가며 적용하기 위함)
    sessionStorage.setItem("sortKey", nextSortKey);
  });
  sortButton3?.addEventListener("click", (event) => {
    event.preventDefault();
    //sessionStorage의 "sortKey"라는 key를 가진 저장소에서 오름차순/내림차순에 대한 값을 가져옴
    const prevSortKey = sessionStorage.getItem("sortKey");
    //각 영화 리스트 각각을 prevSortKey에 따라 오름차순/내림차순 정렬
    listIDs.forEach((listID, index) => sortByDate(movieLists[index], creditLists[index], listID, prevSortKey));
    //nextSortKey에 prevSortKey와 반대 값을 할당 ("ascending" <--> "descending")
    const nextSortKey = prevSortKey === "ascending" ? "descending" : "ascending";
    //sessionStorage에 저장된 prevSortKey 값을 nextSortKey로 변경 (클릭할 때마다 오름차순/내림차순 번갈아가며 적용하기 위함)
    sessionStorage.setItem("sortKey", nextSortKey);
  });
}

// 페이지 새로고침 시 실행할 것들을 모아놓은 함수
async function initialize() {
  //영화데이터 불러와서 저장
  const movieLists = await Promise.all(listUrls.map(fetchMovies));
  //영화크레딧 불러와서 저장
  const creditLists = await Promise.all(movieLists.map(fetchCredits));
  //영화카드 생성
  listIDs.forEach((listID, index) => {
    makeCard(movieLists[index], listID, creditLists[index]);
  });
  //sessionStorage에 저장된 sortKey를 오름차순(ascending order)으로 초기화
  sessionStorage.setItem("sortKey", "ascending");
  //클릭 이벤트를 모두 생성
  addEvents(movieLists, creditLists);
}

//페이지가 로드되고 난 뒤에 실행
document.addEventListener("DOMContentLoaded", initialize, false);
