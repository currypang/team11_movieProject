export { postComment, getComment, deleteComment, reviseComment };
//   console.log(JSON.parse(storage.paul).text); -> parse 후 가능
const storage = { ...localStorage };
const movieId = sessionStorage.getItem("MOVIE_ID");

// 리뷰 작성
function postComment() {
  const text = document.getElementById("input-review").value;
  const writer = document.getElementById("input-writer").value;
  const password = document.getElementById("password").value;
  const personId = crypto.randomUUID(); // 고유 ID
  // 로컬 스토리지 - { 영화 ID : { 고유ID(유저) : {name: 유저이름 text: 리뷰내용, password: 비번 } } } 형식으로 저장
  // 로컬 스토리지에 저장된 유저 id 값 없으면 생성과 동시에 데이터 삽입 - json parse 한 스토리지는 undefiend에 접근불가. 접근하고 난뒤 parse해서 이용
  if (!storage[movieId]) {
    let inputData = {
      [personId]: {
        name: writer,
        text: text,
        password: password
      }
    };
    localStorage.setItem(movieId, JSON.stringify(inputData));
    // 저장된 유저 id가 있으면 있으면 데이터를 불러와서, 새로운 입력값(새로운 유저의 이름(key) - 내용,비번(value)값)을 추가 한뒤 localStorage.setItem로 재설정
  } else {
    // 해당 페이지의 데이터를 불러옴
    let currentData = JSON.parse(localStorage.getItem(movieId));
    // 불러온 데이터에 새로운 입력값 추가
    currentData[personId] = {
      name: writer,
      text: text,
      password: password
    };
    // // json 문자열로 변환해서 로컬 스토리지에 넣기(재설정)
    localStorage.setItem(movieId, JSON.stringify(currentData));
  }
  window.location.reload();
}

// 리뷰 불러오기
function getComment() {
  const list = document.querySelector("#review-list");
  let dom = "";
  if (storage[movieId]) {
    let parsedData = JSON.parse(storage[movieId]);
    for (const prob in parsedData) {
      // li 태그에 유저id 부여
      dom =
        dom +
        `
          <li class="comment" id=${prob}> 
              <div id="text">${parsedData[prob].text}</div>
              <div id="writer">${parsedData[prob].name}</div>
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">수정</button>
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">리뷰 수정</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <textarea class="modal-body" id="update-text"></textarea>
                      <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                      <button type="button" class="btn btn-primary update">저장</button>
                    </div>
                  </div>
                </div>
              </div>
              <button type= "submit" class="delete" id="delete">삭제</button>
          </li>
          `;
    }
    list.innerHTML = dom;
  } else {
    // json 오류 방지(undefined 값을 parse 하지 못해서 오류 발생)
    return;
  }
}

// 리뷰 수정
function reviseComment() {
  const reviseButtons = document.getElementsByClassName("update");
  const arrRevise = Object.keys(reviseButtons).map((el) => reviseButtons[el]);
  arrRevise.forEach((element) => {
    element.addEventListener("click", (e) => {
      // id: <li> tag에 저장한 유저 id 값
      let id = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
      // let password = e.target.parentNode.parentNode.children[2].value;
      const savedPassword = JSON.parse(localStorage.getItem(movieId))[id].password;
      const text = document.getElementById("update-text").value;
      // const password = document.getElementByc("update-password").value;
      // 저장된 비밀번호와 입력한 비밀번호가 같으면 텍스트 수정
      const passPrompt = prompt("비밀번호를 입력해 주세요", "여기 써 주세요!");
      if (savedPassword === passPrompt) {
        let currentData = JSON.parse(localStorage.getItem(movieId));
        // 로컬 스토리지에서 불러온 데이터에서 해당 유저의 text만 수정, setItem 메서드로 재생성
        currentData[id].text = text;
        localStorage.setItem(movieId, JSON.stringify(currentData));
      } else {
        alert("비번이 달라요!");
      }
      window.location.reload();
    });
  });
}

// 리뷰 삭제
function deleteComment() {
  const deleteButtons = document.getElementsByClassName("delete");
  const arrDelete = Object.keys(deleteButtons).map((el) => deleteButtons[el]);
  let currentData = JSON.parse(localStorage.getItem(movieId));
  arrDelete.forEach((element) => {
    element.addEventListener("click", (e) => {
      // 불러온 로컬 스토리지 데이터에서 <li> 태그에 저장된 유저 id의 키값 삭제
      let id = e.target.parentNode.id;
      const savedPassword = JSON.parse(localStorage.getItem(movieId))[id].password;
      const passPrompt = prompt("비밀번호를 입력해 주세요", "여기 써 주세요!");
      if (savedPassword === passPrompt) {
        delete currentData[id];
        // // 키값 삭제된 로컬스토리지 setItem 메서드로 재생
        localStorage.setItem(movieId, JSON.stringify(currentData));
        window.location.reload();
      } else {
        alert("비밀번호가 틀렸습니다.");
      }
    });
  });
}
