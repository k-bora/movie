import { GetSearch } from "./GetSearch.js";
import { SearchValueList } from "./SearchValueList.js";

export const SearchSave = () => {
  const headerSearchForm = document.querySelector("#search-form");
  const indexSearchForm = document.querySelector("#intro-form");

  // 검색값을 localStorage 저장, 검색값으로 실행해야되는 함수들 실행, location 실행
  const valueGet = (titleValue, typeValue, yearValue) => {
    if (!titleValue) {
      alert("영화제목을 입력해주세요");
    } else {
      localStorage.setItem("title", titleValue);
      localStorage.setItem("year", yearValue);
      if (typeValue === "타입") {
        typeValue = "";
        localStorage.setItem("type", typeValue);
      } else {
        localStorage.setItem("type", typeValue);
      }

      GetSearch(titleValue, typeValue, yearValue);
      SearchValueList(titleValue, typeValue, yearValue);

      // const titleData = localStorage.getItem("title");
      // const typeData = localStorage.getItem("type");
      // const yearData = localStorage.getItem("year");

      if (window.location.pathname.includes("index.html")) {
        location.href = `search.html`;
        // location.href = `search.html?title=${titleData}&type=${typeData}&year=${yearData}`;
      }
      if (window.location.pathname.includes("detail.html")) {
        location.href = `search.html`;
      }
    }
  };

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
    });
  }
};
