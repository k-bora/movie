export const HeaderEvent = () => {
  const header = document.querySelector(".header");
  const headerHeight = document.querySelector(".header").offsetHeight;

  const mainIndex = document.querySelector("main.index");
  const mainSearch = document.querySelector("main.search");
  const mainDitail = document.querySelector("main.detail");

  // search.html, dertail.html
  if (mainSearch || mainDitail) {
    header.classList.add("on");
  }

  // index.html
  if (mainIndex) {
    window.addEventListener("scroll", () => {
      // console.log("헤더높이값:" + headerHeight);

      let scrollYvalue = window.scrollY;
      // console.log(scrollYvalue);

      if (scrollYvalue > headerHeight) {
        header.classList.add("on");
      } else {
        header.classList.remove("on");
      }
    });
  }
};
