export { searchMovies };

// 영화 검색 함수
function searchMovies(fetchedMovies, fetchedCredits) {
  //검색옵션과 검색창 각각 할당해주기
  let searchOption = document.getElementById("search-option");
  let searchInput = document.getElementById("search-input");
  //영화카드 목록 할당해주기
  const movielist1 = document.getElementById("now-playing");
  const movielist2 = document.getElementById("top-rated");
  const movielist3 = document.getElementById("popular");
  const movielist4 = document.getElementById("upcoming");

  //검색어(검색창에 입력된 글자)가 non-empty일 때만 실행
  if (searchInput.value !== "") {
    //검색어의 모든 알파벳을 소문자로 변환
    const loweredSearching = searchInput.value.toLowerCase();

    fetchedMovies.forEach((movie) => {
      // 영화 id로 각각의 리스트에서 해당 영화 카드 찾아내기
      const card1 = movielist1.querySelector(`[id="${movie.id}"]`);
      const card2 = movielist2.querySelector(`[id="${movie.id}"]`);
      const card3 = movielist3.querySelector(`[id="${movie.id}"]`);
      const card4 = movielist4.querySelector(`[id="${movie.id}"]`);

      //검색옵션: title
      if (searchOption.selectedIndex === 0) {
        //대소문자 관계없이 검색되게끔 하기 위해 title을 모두 소문자로 변환
        const loweredTitle = movie.title.toLowerCase();
        //각각의 리스트에 해당 영화의 카드가 있다면, 검색어를 포함하는지의 여부에 따라 show or hide
        if (card1) showOrHide(card1, loweredTitle.includes(loweredSearching));
        if (card2) showOrHide(card2, loweredTitle.includes(loweredSearching));
        if (card3) showOrHide(card3, loweredTitle.includes(loweredSearching));
        if (card4) showOrHide(card4, loweredTitle.includes(loweredSearching));
      }
      //검색옵션: overview
      else if (searchOption.selectedIndex === 1) {
        //대소문자 관계없이 검색되게끔 하기 위해 overview를 모두 소문자로 변환
        const loweredOverview = movie.overview.toLowerCase();
        //각각의 리스트에 해당 영화의 카드가 있다면, 검색어를 포함하는지의 여부에 따라 show or hide
        if (card1) showOrHide(card1, loweredOverview.includes(loweredSearching));
        if (card2) showOrHide(card2, loweredOverview.includes(loweredSearching));
        if (card3) showOrHide(card3, loweredOverview.includes(loweredSearching));
        if (card4) showOrHide(card4, loweredOverview.includes(loweredSearching));
      }
      //검색옵션: director
      else if (searchOption.selectedIndex === 2) {
        //먼저 fetchedCredits의 각 리스트에서 해당 영화의 credit을 찾는다 (id 일치여부로 찾음)
        const arr = fetchedCredits.map((list) => {
          return list.find((object) => object.id === movie.id);
        });
        //undefined 제거
        const filteredArr = arr.filter((item) => item !== undefined);
        //배열 안에 첫 번째 객체 선택 (여러 개체가 있더라도 중복되는 개체임)
        const credit = filteredArr[0];
        //찾고 나면, credit.director.name을 모두 소문자로 변환
        const loweredName = credit.director.name.toLowerCase();
        //각각의 리스트에 해당 영화의 카드가 있다면, 검색어를 포함하는지의 여부에 따라 show or hide
        if (card1) showOrHide(card1, loweredName.includes(loweredSearching));
        if (card2) showOrHide(card2, loweredName.includes(loweredSearching));
        if (card3) showOrHide(card3, loweredName.includes(loweredSearching));
        if (card4) showOrHide(card4, loweredName.includes(loweredSearching));
      }
      //검색옵션: cast
      else if (searchOption.selectedIndex === 3) {
        //먼저 fetchedCredits에서 해당 영화의 credit을 찾는다 (id 일치여부로 찾음)
        const arr = fetchedCredits.map((list) => {
          return list.find((object) => object.id === movie.id);
        });
        //undefined 제거
        const filteredArr = arr.filter((item) => item !== undefined);
        //배열 안에 첫 번째 객체 선택 (여러 개체가 있더라도 중복되는 개체임)
        const credit = filteredArr[0];
        //찾고 나면, credit.cast에서 actor의 name을 모두 소문자로 변환하고, 검색어를 포함하는 actor를 찾는다.
        const matchedCast = credit.cast.find((actor) => actor.name.toLowerCase().includes(loweredSearching));
        //각각의 리스트에 해당 영화의 카드가 있다면, 검색어를 포함하는 actor를 찾았는지의 여부에 따라 show or hide
        if (card1) showOrHide(card1, matchedCast !== undefined);
        if (card2) showOrHide(card2, matchedCast !== undefined);
        if (card3) showOrHide(card3, matchedCast !== undefined);
        if (card4) showOrHide(card4, matchedCast !== undefined);
      }
    });
    // 검색어가 공백이면
  } else if (searchInput.value === "") {
    //입력창에 focus 시키기
    searchInput.focus();
  } else {
    // do nothing
  }
}
//
function showOrHide(card, isMatched) {
  if (isMatched) {
    // 검색어가 포함된 영화라면 카드를 보이도록 설정
    card.style.display = "block";
  } else {
    // 검색어가 포함되지 않은 영화라면 카드를 숨기도록 설정
    card.style.display = "none";
  }
}
