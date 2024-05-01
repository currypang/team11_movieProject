export { searchHandler };
// 검색 로직
function searchHandler(event) {
  // 새로고침 방지
  event.preventDefault();
  const text = document.getElementById("input").value.toUpperCase();
  const movieCard = document.getElementsByTagName("li");
  // 배열메서드 사용위해 유사배열을 배열로 변환
  const arrayCard = Object.keys(movieCard).map((el) => movieCard[el]);

  // foreach 매서드를 사용해 카드 탐색
  arrayCard.forEach((element, index) => {
    const movTitle = element.children[1].innerText.toUpperCase();
    // 검색창의 값과 영화카드의 제목이 같지 않으면 css를 통해 카드를 숨기는 id를 부여 - 바로 style을 바꾸는 방법도 가능
    if (!movTitle.includes(text)) {
      movieCard[index].id = "none";
      // 검색창의 값이 제목에 포함되었다면 id부여를 통해 숨김해제 - 재검색때 필요
    } else {
      movieCard[index].id = "block";
    }
  });
}
