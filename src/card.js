export { makeCard };

// 영화카드 생성 함수
function makeCard(fetchedMovies, listID, fetchCredits) {
  console.log(fetchCredits);
  //DOM에서 영화 카드를 생성할 리스트 중에 id=listID 인 <ul> 을 선택합니다.
  const movieList = document.getElementById(listID);
  //매개변수로 받은 fetchedMovies라는 영화 목록 array를 탐색합니다.
  fetchedMovies.forEach((movie) => {
    //movieList에 <li>를 생성하고 movieCard라는 이름으로 지정합니다.
    let movieCard = movieList.appendChild(document.createElement("li"));
    //<li>에 class를 부여합니다.
    movieCard.classList.add("card");
    //<li>에 id를 부여합니다.
    movieCard.setAttribute("id", movie.id);
    //<li> 속에 넣을 html 템플릿을 만듭니다.
    const innerCard = `
        <figure class="image-box">
            <img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" />
        </figure>
        <h3>${movie.title}</h3>
    `;
    //위에서 만든 innerCard 템플릿을 <li> 속에 넣습니다.
    movieCard.innerHTML += innerCard;
    //<li>에 클릭 이벤트 핸들러를 부여합니다.
    movieCard?.addEventListener("click", (event) => {
      event.preventDefault();
      // Target movie data 전송
      sessionStorage.setItem("TARGET_MOVIE_DATA", JSON.stringify({
        title : movie.title,
        poster_path : movie.poster_path,
        release_date : movie.release_date,
        genres : movie.genre_ids,
        vote_average : movie.vote_average,
        overview : movie.overview
      }));
      // Detail 페이지 이동
      window.location.href = "./detail.html";
    });
  });
}
