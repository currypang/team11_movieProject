import { fetchMovie } from "./movie.js";
import { searchHandler } from "./search.js";
import { sortMovie } from "./sort.js";

// 데이터 불러오기 실행
fetchMovie();

// 새로고침 시 커서 인풋창에 두기
const input = document.getElementById("input");
input.focus();

// 검색 버튼 이벤트
const box = document.querySelector("#box");
box.addEventListener("submit", searchHandler);

// 정렬 버튼 이벤트
// document.querySelector(selector) : CSS 선택자를 이용하여 요소를 선택합니다.
//HTML 문서에서  id #sortTitleUp 요소 선택하여 sortButton1에 할당
const sortButton1 = document.querySelector("#sortTitleUp");
// 버튼 1번에 이벤트리스턴널
sortButton1.addEventListener("click", () => {
  sortMovie();
});
