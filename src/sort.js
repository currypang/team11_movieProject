export { sortMovie };
// 영화 제목을 알파벳순으로 정렬하는 기능

function sortMovie(listID, sortKey) {
  // .flex-container 내의 모든 영화 카드(li 요소) 선택
  const movieList = document.getElementById(listID);
  const movieCards = movieList.querySelectorAll("li");
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

  // 정렬 되기전 카드리스트들을 지움
  const flexContainer = document.getElementById(listID);
  flexContainer.innerHTML = "";

  // 정렬된 카드 리스트들을 화면에 표시
  sortedMovies.forEach((movie) => {
    flexContainer.appendChild(movie);
  });
}
