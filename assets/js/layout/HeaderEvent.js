export const HeaderEvent = () => {
  const header = document.querySelector(".header");
  const index = document.querySelector("main.index");
  if (index) {
    window.addEventListener("scroll", () => {
      // if (window.scrollY > header.offsetHeight) {
      if (window.scrollY > 0) {
        header.classList.add("on");
      } else {
        header.classList.remove("on");
      }
    });
  } else {
    header.classList.add("on");
  }
};
