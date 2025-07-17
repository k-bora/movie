export const restoreSearchInputs = () => {
  const titleInput = document.querySelector("#main-search-input");
  const typeInput = document.querySelector("#type-input");
  const yearInput = document.querySelector("#year-input");
  const yearText = document.querySelector("#year-input-text");

  const savedTitle = localStorage.getItem("title") || "";
  const savedType = localStorage.getItem("type") || "";
  const savedYear = localStorage.getItem("year") || "";

  if (titleInput) titleInput.value = savedTitle;
  if (typeInput) typeInput.textContent = savedType || "타입";
  if (yearInput) yearInput.value = savedYear;
  if (yearText) yearText.textContent = savedYear || "연도";
};
