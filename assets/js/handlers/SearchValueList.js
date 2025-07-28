import { GetSearch } from "./GetSearch.js";

/* ---------------------------- 검색된 값 버튼으로 노출하기 --------------------------- */
export const SearchValueList = (titleValue, typeValue, yearValue) => {
  const searchValueBox = document.querySelector(".value-list");

  if (!searchValueBox) return;

  const resultValues = [];

  if (titleValue) resultValues.push(titleValue);
  if (typeValue) resultValues.push(typeValue.toUpperCase());
  if (yearValue) resultValues.push(yearValue);

  searchValueBox.innerHTML = resultValues
    .map((values) => {
      return `
            <li class="value-list-item">
              <button type="button" class="value-button">${values}</button>
            </li>
          `;
    })
    .join("");

  valueListButtonClick();
};

/* --------------------- 검색된 값 버튼 클릭시 삭제(클릭된 버튼 + 검색값) -------------------- */
export const valueListButtonClick = () => {
  const headerSearchForm = document.querySelector("#search-form");
  const valueListForm = document.querySelector("#value-form");

  if (!valueListForm) return;

  valueListForm.addEventListener("click", (e) => {
    if (!e.target.classList.contains("value-button")) return;

    const clickedButton = e.target;
    const value = clickedButton.textContent.trim();

    const titleInput = headerSearchForm.querySelector("#main-search-input");
    const typeInput = headerSearchForm.querySelector("#type-input");
    const yearInput = headerSearchForm.querySelector("#year-input");
    const yearText = headerSearchForm.querySelector("#year-input-text");

    const titleValue = titleInput.value.trim();
    const typeValue = typeInput.textContent;
    const yearValue = yearInput.value.trim();

    if (titleValue === value) {
      titleInput.value = "";
      valueListForm.querySelectorAll(".value-button").forEach((btn) => btn.remove());
      typeInput.textContent = "타입";
      yearInput.value = "";
      yearText.textContent = "연도";
      const moTypeSelect = document.querySelector("#alertfilter #type-input");
      const moYearInput = document.querySelector("#alertfilter #year-input");
      if (moTypeSelect) moTypeSelect.value = "";
      if (moYearInput) moYearInput.value = "";
    }

    if (typeValue === value) {
      typeInput.textContent = "타입";
      const moTypeSelect = document.querySelector("#alertfilter #type-input");
      if (moTypeSelect) moTypeSelect.value = "";
    }

    if (yearValue === value) {
      yearInput.value = "";
      yearText.textContent = "연도";
      const moYearInput = document.querySelector("#alertfilter #year-input");
      if (moYearInput) moYearInput.value = "";
    }

    clickedButton.remove();

    const updatedTitle = titleInput.value.trim();
    const updatedType = typeInput.textContent === "타입" ? "" : typeInput.textContent;
    const updatedYear = yearInput.value.trim();

    GetSearch(updatedTitle, updatedType, updatedYear);
  });
};
