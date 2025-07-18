let currentPage = 1;
let currentTitle = "";
let currentType = "";
let currentYear = "";

import { OMDB_API_BASE } from "../utils/constants.js";
import { createMovieListItem } from "./createMovieListItem.js";
import { showLoading, hideLoading } from "../utils/loading.js";
import { goodButton } from "../utils/goodButton.js";

export const GetSearch = async (titleValue, typeValue, yearValue, page = 1, append = false) => {
  const movieList = document.querySelector(".movie-list");
  const searchPage = document.querySelector("main.search");
  const resultCountEl = document.querySelector("#result-count");
  // const pagination = document.querySelector(".pagination");
  const loadMoreBtn = document.querySelector("#load-more");

  // if (!searchPage || !movieList || !titleValue) return;
  if (!searchPage || !movieList) return;

  showLoading();

  try {
    const res = await fetch(`${OMDB_API_BASE}&s=${titleValue}&type=${typeValue}&y=${yearValue}&page=${page}`);
    const data = await res.json();

    if (data.Search) {
      movieList.classList.remove("none");

      if (append) {
        movieList.innerHTML += data.Search.map(createMovieListItem).join("");
        goodButton();
      } else {
        movieList.innerHTML = data.Search.map(createMovieListItem).join("");
        goodButton();

        // data.totalResults 전체 검색수 ,타입 문자
        resultCountEl.textContent = Number(data.totalResults).toLocaleString();

        // 새로운 검색일 경우 상태 초기화
        currentPage = 1;
        currentTitle = titleValue;
        currentType = typeValue;
        currentYear = yearValue;
      }

      // 더보기 버튼 표시 여부
      const totalPages = Math.ceil(Number(data.totalResults) / 10);
      if (page < totalPages) {
        loadMoreBtn.style.display = "block";
      } else {
        loadMoreBtn.style.display = "none";
      }

      // 더보기 버튼 클릭 이벤트
      // loadMoreBtn.addEventListener("click", () => {
      //   // 누를때 마다 중복되는 거 같음...
      //   console.log("더보기 클릭됨", currentPage);
      //   currentPage++;
      //   GetSearch(currentTitle, currentType, currentYear, currentPage, true); // append = true
      // });

      loadMoreBtn.onclick = () => {
        currentPage++;
        // console.log("더보기 클릭됨", currentPage);
        GetSearch(currentTitle, currentType, currentYear, currentPage, true);
      };

      //페이징
      // if (page === 1 && data.totalResults) {
      //   const total = Number(data.totalResults);
      //   const totalPages = Math.ceil(total / 10); // OMDb는 페이지당 10개 고정 : 10으로 나누어서 소수점 올림

      //   for (let i = 1; i <= totalPages; i++) {
      //     const btn = document.createElement("button");
      //     btn.classList.add("page-btn");
      //     btn.textContent = i;

      //     btn.addEventListener("click", () => {
      //       const pagebtns = document.querySelectorAll(".page-btn");
      //       pagebtns.forEach((pagebtn) => {
      //         pagebtn.classList.remove("active");
      //       });
      //       btn.classList.add("active");

      //       GetSearch(titleValue, typeValue, yearValue, i);
      //       window.scrollTo({ top: 0, behavior: "smooth" });
      //     });

      //     pagination.appendChild(btn);
      //   }

      //   const firstBtn = pagination.querySelector(".page-btn");
      //   if (firstBtn) firstBtn.classList.add("active");
      // }
    } else {
      movieList.classList.add("none");
      movieList.innerHTML = `
        <li>
          <img src="./assets/images/warning-icon.svg" alt="경고 아이콘">
          <strong>죄송합니다. 일치하는 항목을 찾을 수 없습니다.</strong>
          <span>검색어 철자를 확인하세요.</span>
          <span>영어로 검색해주세요.</span>
        </li>
      `;
      resultCountEl.textContent = "0";
      loadMoreBtn.style.display = "none";
    }
  } catch (err) {
    console.error("검색 결과 오류:", err);
  } finally {
    hideLoading();
  }
};
