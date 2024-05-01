export { searchHandler };

function searchHandler() {
  // 입력창의 밸류 값 - 대소문자 상관없이 서치하기 위해 대문자로 변환
  let text = document.getElementById("input").value.toUpperCase();
  // 영화카드 목록
  let movieCard = document.getElementsByTagName("li");
  // 배열메서드 사용위해 유사배열을 배열로 변환
  // const arrayCard = Array.from(movieCard); // map 메서드 대신 사용 가능
  const arrayCard = Object.keys(movieCard).map((el) => movieCard[el]);

  // foreach 매서드를 사용해 카드 탐색
  arrayCard.forEach((element, index) => {
    // movtTitle(영화 제목) 대문자로 변환
    let movTitle = element.children[1].innerText.toUpperCase();
    // 검색창의 값과 영화카드의 제목이 같지 않으면 css를 통해 카드를 숨기는 id를 부여
    if (!movTitle.includes(text)) {
      movieCard[index].id = "none";
      // 검색창의 값이 제목에 포함되었다면 id부여를 통해 숨김해제 - 재검색때 필요
    } else {
      movieCard[index].id = "some";
    }
  });
}
