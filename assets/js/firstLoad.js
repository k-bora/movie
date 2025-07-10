import { valueGet } from "./SearchSave.js";

export const firstLoad = async () => {
  // 가장 먼저 이전에 있던 검색 값들을 가져와서 실행!

  const title = localStorage.getItem("title");
  const type = localStorage.getItem("type");
  const year = localStorage.getItem("year");

  const header = document.querySelector("header");
  const titleInput = header.querySelector("#main-search-input");
  const typeInput = header.querySelector("#type-input");
  const yearInput = header.querySelector("#year-input");
  const yearInputText = header.querySelector("#year-input-text");

  titleInput.value = title;

  if (type === "") {
    typeInput.textContent = "타입";
  } else {
    typeInput.textContent = type.toUpperCase();
  }

  if (year === "") {
    yearInputText.textContent = "연도";
    yearInput.value = year;
  } else {
    yearInput.value = year;
    yearInputText.textContent = year;
  }

  // 타이틀이 있을때만
  if (title && title.trim() !== "") {
    valueGet(title, type, year);
  }

  // 위에 if 문과 동일
  // if (titleInput) titleInput.value = title || "";
  // if (typeInput) typeInput.textContent.toUpperCase() = type || "타입";
  // if (yearInput) yearInput.value = year || "";
  // if (yearInputText) yearInputText.textContent = year || "연도";
};
