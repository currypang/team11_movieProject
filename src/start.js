function redirectToNewPage() {
  setTimeout(function () {
    window.location.href = "index.html"; // 여기에 당신의 HTML 파일명을 넣으세요
  }, 2000); // 3000 밀리초 = 3초
}
window.onload = redirectToNewPage();
