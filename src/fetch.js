export { fetchMovies, fetchCredits };

// option for fetching movie data using TMDB's open API
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTczMGIyZmQyNTAzYjM2ZWI4ZjFlNzEyYTg3MGJmNyIsInN1YiI6IjY2MjY0YTRkMmUyYjJjMDE4NzY4YmIwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.juGftcAcZYfpUAIkI_0vyyur1hz2VtQez05Th_g5ZnQ"
  }
};

const url = "https://api.themoviedb.org/3/movie/";

// 영화 정보 fetch 함수
async function fetchMovies(listName) {
  //await로 fetch 함수가 영화 데이터를 다 불러올 때까지 기다리고 난뒤, then을 통해 Promise의 response를 json형태로 반환하도록 처리합니다.
  const response = await fetch(url + listName, options).then((response) => response.json());
  //response의 json 객체 중에 "results" 라는 key의 value만 저장합니다.
  const fetchedMovies = response.results;
  //fetchedMovies에 저장된 영화 데이터 목록을 반환합니다. (Array type)
  return fetchedMovies;
}

// 영화 credits 정보 fetch 함수
function fetchCredits(fetchedMovies) {
  //반환할 credits 라는 배열을 생성합니다.
  let credits = [];
  fetchedMovies.forEach(async (movie) => {
    const response = await fetch(url + "/" + movie.id + "/credits", options).then((response) => response.json());
    //response의 json 객체 중에 "cast" 라는 key의 value만 저장합니다.
    const casts = response.cast;
    //response의 json 객체 중에 "crew" 라는 key의 value만 저장합니다.
    const crews = response.crew;
    //crews 배열에 들어있는 객체 중에  "job" 이라는 key의 value가 "Director"인 객체를 찾습니다.
    const director = crews.find((crew) => crew.job === "Director");
    //credits 배열에 해당 영화의 id, cast, director 정보가 들어간 객체를 추가합니다.
    credits.push({
      id: movie.id,
      cast: casts,
      director: director
    });
  });
  return credits;
}
