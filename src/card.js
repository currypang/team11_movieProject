// 영화카드 생성 함수
function createMovieCard(movie, credits) {
  let movieCard = document.createElement("li");
  movieCard.classList.add("card");
  movieCard.setAttribute("id", movie.id);
  // 영화 세부 정보(포스터) HTML 설정
  const innerCard = `
      <figure class="image-box">
          <img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" />
      </figure>
  `;
  //영화 세부 정보를 영화 카드 속에 삽입
  movieCard.innerHTML += innerCard;
  //영화 카드에 클릭 이벤트 핸들러를 부여
  movieCard?.addEventListener("click", (event) => movieCardClick(event, movie, credits));
  return movieCard;
}

//영화 카드 클릭시 생성할 이벤트
function movieCardClick(event, movie, credits) {
  event.preventDefault();
  //클릭한 영화 카드의 credit 찾기
  const credit = credits.find((credit) => credit.id === movie.id);
  //세션 스토리지 설정 및 target movie data 저장
  sessionStorage.setItem("MOVIE_ID", movie.id);
  sessionStorage.setItem(
    "TARGET_MOVIE_DATA",
    JSON.stringify({
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      genres: movie.genre_ids,
      vote_average: movie.vote_average,
      overview: movie.overview,
      credits: credit
    })
  );
  //영화 상세 정보 페이지로 이동
  window.location.href = "./detail.html";
}

//
function makeMovieCards(fetchedMovies, listID, credits) {
  //페이지에서 영화 카드를 생성할 리스트를 listID로 선택
  const movieCardList = document.getElementById(listID);
  //fetchedMovies라는 영화 리스트를 돌면서
  fetchedMovies.forEach((movie) => {
    //하나씩 영화카드를 만들고, 영화 카드 리스트에 추가
    const movieCard = createMovieCard(movie, credits);
    movieCardList.appendChild(movieCard);
  });
}

export { makeMovieCards };
