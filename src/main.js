import { fetchMovie } from "./movie.js";
import { searchHandler } from "./search.js";

// 데이터 불러오기 실행
fetchMovie();
// 새로고침 시 커서 인풋창에 두기
const input = document.getElementById("input");
input.focus();

// 검색 버튼 이벤트
const box = document.querySelector("#box");
box.addEventListener("submit", searchHandler);
