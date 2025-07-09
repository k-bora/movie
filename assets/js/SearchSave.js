import { GetSearch } from "./GetSearch.js";
import { SearchValueList } from "./SearchValueList.js";

export const locationSearch = () => {
  const mainIndex = document.querySelector("main.index");
  const mainDetail = document.querySelector("main.detail");

  // const titleData = localStorage.getItem("title");
  // const typeData = localStorage.getItem("type");
  // const yearData = localStorage.getItem("year");

  if (mainIndex || mainDetail) {
    location.href = `./search.html`;
    // location.href = `search.html?title=${titleData}&type=${typeData}&year=${yearData}`;
  }
};

// 검색값을 localStorage 저장, 검색값으로 실행해야되는 함수들 실행, location 실행
export const valueGet = (titleValue, typeValue, yearValue) => {
  if (!titleValue) {
    const alertDialog = document.querySelector("#alertDialog");
    const alertText = alertDialog.querySelector("p");
    alertText.textContent = "영화제목을 입력해주세요.";
    alertDialog.showModal();
    return;
  } else {
    localStorage.setItem("title", titleValue);
    localStorage.setItem("year", yearValue);
    if (typeValue === "타입" || "") {
      typeValue = "";
      localStorage.setItem("type", typeValue.toLowerCase());
    } else {
      localStorage.setItem("type", typeValue.toLowerCase());
    }

    GetSearch(titleValue, typeValue, yearValue);
    SearchValueList(titleValue, typeValue, yearValue);
  }
};

export const SearchSave = () => {
  const headerSearchForm = document.querySelector("#search-form");
  const indexSearchForm = document.querySelector("#intro-form");

  // header 검색값 가져오기
  if (headerSearchForm) {
    headerSearchForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // 검색 값 가져오기
      const titleValue = headerSearchForm.querySelector("#main-search-input").value.trim();
      const typeValue = headerSearchForm.querySelector("#type-input").textContent.trim();
      const yearValue = headerSearchForm.querySelector("#year-input").value.trim();

      // console.log(titleValue);
      // console.log(typeValue);
      // console.log(yearValue);

      valueGet(titleValue, typeValue, yearValue);

      if (titleValue) {
        locationSearch();
      }
    });
  }

  // intro 검색값 가져오기
  if (indexSearchForm) {
    indexSearchForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const indexTitleValue = indexSearchForm.querySelector("#intro-search-input").value.trim();
      const indexTypeValue = indexSearchForm.querySelector("#intro-type-input").textContent.trim();
      const indexYearValue = indexSearchForm.querySelector("#intro-year-input").value.trim();

      valueGet(indexTitleValue, indexTypeValue, indexYearValue);
      if (indexTitleValue) {
        locationSearch();
      }
    });
  }
};
