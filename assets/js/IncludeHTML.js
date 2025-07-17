// export const IncludeHTML = async () => {
//   const response = await fetch("include/header.html");
//   const response2 = await fetch("include/footer.html");
//   const result = await response.text();
//   const result2 = await response2.text();

//   try {
//     const header = document.querySelector(".header");
//     const footer = document.querySelector(".footer");
//     header.innerHTML = result;
//     footer.innerHTML = result2;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const IncludeHTML = async (selector, url) => {
  try {
    const response = await fetch(url);
    const result = await response.text();
    const container = document.querySelector(selector);
    if (container) {
      container.innerHTML = result;
    } else {
      console.warn(`요소를 찾을 수 없습니다: ${selector}`);
    }
  } catch (error) {
    console.error(`IncludeHTML 오류 (${selector}):`, error);
  }
};
