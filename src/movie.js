export { fetchMovie };

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzM1ZmE2ZmQ2MTE3M2I3Nzk2ZmEyNzUyNTNmNDE4NyIsInN1YiI6IjY2MmI0YTc4OWFjNTM1MDExZDhmMmRlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vk4yeQ8AiQHmqX_sadQavDK7PIaoriDP50jL6m2DQHM",
  },
};

// tmdb 데이터 가져오기
async function fetchMovie() {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  );
  const jsonData = await response.json(); // jsonData.results - 영화모음[배열]
  // 영화모음(배열)을 순회하며 각 영화의 정보로 카드 만들기
  // console.log(jsonData)
  jsonData.results.forEach((movie) => {
    createCard(movie);
  });
  alertCard(jsonData);
}
// 카드 눌렀을 때 영화 id 경고창으로 띄우기
function alertCard(jsonData) {
  const card = document.getElementsByClassName("card");
  let arrc = Object.keys(card).map((el) => card[el]);
  arrc.forEach((element, index) => {
    let movieID = jsonData.results[index].id;
    element.addEventListener("click", (element) => {
      alert(`영화 id : ${movieID}`);
    });
  });
}

// 카드 생성 로직
function createCard(movie) {
  let poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  let title = movie.original_title;
  let content = movie.overview;
  let average = movie.vote_average;
  let id = movie.id;
  // 영화 카드 만들기
  let addCard = document.createElement("li");
  let addImg = document.createElement("img");
  let addTitle = document.createElement("h4");
  let addContent = document.createElement("p");
  let addAverage = document.createElement("p");
  // 부모-자식 관계 설정
  addCard.appendChild(addImg);
  addCard.appendChild(addTitle);
  addCard.appendChild(addContent);
  addCard.appendChild(addAverage);
  // 노드 속성 설정
  addCard.setAttribute("class", "card");
  addCard.setAttribute("id", `${id}`);
  addImg.setAttribute("id", "img");
  addTitle.setAttribute("id", "title");
  addContent.setAttribute("id", "content");
  addAverage.setAttribute("id", "average");
  // 카드 붙여주기
  document.querySelector(".flex-container").append(addCard);
  // 영화 정보 채우기
  addImg.src = poster;
  addTitle.textContent = title;
  addContent.textContent = content;
  addAverage.textContent = average;
}
