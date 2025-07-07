import { GetSearch } from "./GetSearch.js";
import { SearchValueList, valueListButtonClick } from "./SearchValueList.js";

export const firstLoad = () => {
  //창이 열리자마자 바로 실행
  window.addEventListener("DOMContentLoaded", () => {
    const title = localStorage.getItem("title");
    const type = localStorage.getItem("type");
    const year = localStorage.getItem("year");

    if (title) {
      GetSearch(title, type, year);
      SearchValueList(title, type, year);
      valueListButtonClick();
    }

    const header = document.querySelector("header");
    const titleInput = header.querySelector("#main-search-input");
    const typeInput = header.querySelector("#type-input");
    const yearInput = header.querySelector("#year-input");
    const yearInputText = header.querySelector("#year-input-text");

    titleInput.value = title;

    if (type === "") {
      typeInput.textContent = "타입";
    } else {
      typeInput.textContent = type;
    }

    if (year === "") {
      yearInput.textContent = "연도";
      yearInput.value = year;
    } else {
      yearInput.value = year;
      yearInputText.textContent = year;
    }
  });
};
