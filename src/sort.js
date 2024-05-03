export { sortMovie };
// 영화 제목을 알파벳순으로 정렬하는 기능

// 정렬 방향을 나타내는 변수 true 라면 오름차순 false 라면 내림차순
let sortMovieTitle = true;

function sortMovie() {
  // .flex-container 내의 모든 영화 카드(li 요소) 선택
  // document.querySelectorAll(selector) : CSS 선택자를 이용하여 모든 요소를 선택합니다.
  const movieList = document.querySelectorAll(".flex-container li");
  // movieList를 배열로 변환한후 sort 사용하여 알파벳 순으로 정렬
  const sortedMovies = Array.from(movieList).sort((a, b) => {
    //sort(a,b) => 배열을 비교하기위해
    const titleA = a.innerText; // element.innerText
    const titleB = b.innerText; // 요소의 텍스트 내용을 가져와  titleA 와 titleB에 저장
    if (sortMovieTitle) {
      /* localeCompare 문자열 비교함수 
      왼쪽에 있는 문자열이 오른쪽보다 빠른경우 -1 리턴 
      오른쪽에 있는 문자열이 빠른경우 1 리턴
      문자열이 같은경우 0리턴 */
      return titleA.localeCompare(titleB); // true인 경우 오름차순 정렬
    } else {
      return titleB.localeCompare(titleA); // false인 경우 내림차순 정렬
    }
  });

  // 정렬 되기전 카드리스트들을 지움
  // document.querySelector(selector) : CSS 선택자를 이용하여 요소를 선택합니다.
  // element.innerHTML : 해당 요소 내부의 HTML 코드를 변경합니다.
  const flexContainer = document.querySelector(".flex-container");
  flexContainer.innerHTML = "";

  // 논리 부정 연산자를 사용하여 true에 값을 반대로 출력하기
  sortMovieTitle = !sortMovieTitle;

  // 정렬된 카드 리스트들을 화면에 표시
  sortedMovies.forEach((movie) => {
    flexContainer.appendChild(movie);
  });
}
