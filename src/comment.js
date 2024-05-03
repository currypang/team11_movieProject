export { postComment, getComment, deleteComment, reviseComment };
//   console.log(JSON.parse(storage.paul).text); -> parse 후 가능
const storage = { ...localStorage };
// console.log(storage);
// console.log(JSON.parse(storage.josh));
// 리뷰 작성
function postComment() {
  const text = document.getElementById("input-review").value;
  const writer = document.getElementById("input-writer").value;
  const password = document.getElementById("password").value;
  localStorage.setItem(
    writer,
    JSON.stringify({
      // 객체를 JSON 문자열로 변환
      text: text,
      password: password
    })
  );
  window.location.reload();
}

// 리뷰 불러오기
function getComment() {
  const list = document.querySelector("#comment-list");
  let dom = "";
  for (const prob in storage) {
    dom =
      dom +
      `
        <li id="comment">
            <div id="text">${JSON.parse(storage[prob]).text}</div>
            <div id="writer">${prob}</div>
            <button class="revise" id="revise">수정</button>
            <button type= "submit" class="delete" id="delete">삭제</button>
        </li>
        `;
  }
  list.innerHTML = dom;
}

// // 리뷰 수정
function reviseComment() {
  const reviseButtons = document.getElementsByClassName("revise");
  const arrRevise = Object.keys(reviseButtons).map((el) => reviseButtons[el]);
  arrRevise.forEach((element) => {
    element.addEventListener("click", (e) => {
      const writer = e.target.parentNode.childNodes[3].innerHTML;
      const savedPassword = JSON.parse(localStorage.getItem(writer)).password;
      const text = document.getElementById("revise-review").value;
      const password = document.getElementById("revise-password").value;
      console.log(writer);
      console.log(savedPassword);
      console.log(password);
      if (savedPassword === password) {
        localStorage.setItem(
          writer,
          JSON.stringify({
            // 객체를 JSON 문자열로 변환
            text: text,
            password: password
          })
        );
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
  arrDelete.forEach((element) => {
    element.addEventListener("click", (e) => {
      let writer = e.target.parentNode.childNodes[3].innerHTML;
      localStorage.removeItem(writer);
      window.location.reload();
    });
  });
}
