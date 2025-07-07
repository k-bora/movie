export const HeaderEvent = () => {
  const header = document.querySelector(".header");
  const headerHeight = document.querySelector(".header").offsetHeight;

  // search.html 에서는
  if (window.location.pathname.includes("search.html")) {
    header.classList.add("on");
    return;
  }
  if (window.location.pathname.includes("detail.html")) {
    header.classList.add("on");
    return;
  }

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
};
