export const IncludeHTML = async () => {
  const response = await fetch("include/header.html");
  const response2 = await fetch("include/footer.html");
  const result = await response.text();
  const result2 = await response2.text();

  try {
    const header = document.querySelector(".header");
    const footer = document.querySelector(".footer");
    header.innerHTML = result;
    footer.innerHTML = result2;
  } catch (error) {
    console.log(error);
  }
};
