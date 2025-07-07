export const currentYear = () => {
  const years = document.querySelectorAll(".current-year");
  years.forEach((year) => {
    year.textContent = new Date().getFullYear();
  });
};
