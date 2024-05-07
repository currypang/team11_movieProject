export { setupSlideNavigation };

const setupSlideNavigation = ({ slidesSelector, prevBtnSelector, nextBtnSelector }) => {
  const slides = document.querySelector(slidesSelector);
  const prevBtn = document.querySelector(prevBtnSelector);
  const nextBtn = document.querySelector(nextBtnSelector);
  let currentIdx = 0;
  // prevBtn.style.display = "none";

  const moveSlides = (num) => {
    slides.style.left = -num * 14.8 + "vw";
    currentIdx = num;
    prevBtn.disabled = num === 0;
    nextBtn.disabled = num === slides.children.length - 6;
  };

  nextBtn.addEventListener("click", () => {
    moveSlides(currentIdx + 1);
  });

  prevBtn.addEventListener("click", () => {
    moveSlides(currentIdx - 1);
  });
};

// 각 슬라이드에 대한 정보를 사용하여 슬라이드 네비게이션 설정
const slideData = [
  {
    slidesSelector: "#now-playing",
    prevBtnSelector: "#prevNow",
    nextBtnSelector: "#nextNow"
  },
  {
    slidesSelector: "#popular",
    prevBtnSelector: "#prevPopular",
    nextBtnSelector: "#nextPopular"
  },
  {
    slidesSelector: "#top-rated",
    prevBtnSelector: "#prevTop",
    nextBtnSelector: "#nextTop"
  },
  {
    slidesSelector: "#upcoming",
    prevBtnSelector: "#prevUp",
    nextBtnSelector: "#nextUp"
  }
];

slideData.forEach((data) => {
  setupSlideNavigation(data);
});
