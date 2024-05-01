import { fetchMovie } from "./movie.js";
import { searchHandler } from "./search.js";

// 데이터 불러오기 실행
fetchMovie();
// 새로고침 시 커서 인풋창에 두기
const input = document.getElementById("input");
input.focus();
// 엔터키 눌렀을때 검색버튼 클릭
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("btn").click();
  }
});
// 검색 버튼 이벤트
const btn = document.querySelector("#btn");
btn.addEventListener("click", searchHandler);
