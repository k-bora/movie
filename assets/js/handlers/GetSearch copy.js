import { OMDB_API_BASE } from "../utils/constants.js";
import { createMovieListItem } from "./createMovieListItem.js";
import { showLoading, hideLoading } from "../utils/loading.js";

// export const GetSearch = async (title, type, year, page = 1) => {
//   showLoading();
//   const res = await fetch(`${OMDB_API_BASE}&s=${title}&type=${type}&y=${year}&page=${page}`);
//   const data = await res.json();

//   const list = document.querySelector(".movie-list");
//   const pagination = document.querySelector(".pagination");

//   if (!list) return;

//   // 🔄 항상 초기화
//   list.innerHTML = "";

//   if (data.Response === "True") {
//     if (!title && !type && !year) {
//       list.innerHTML = "";
//       pagination.innerHTML = "";
//       const resultCountEl = document.querySelector("#result-count");
//       if (resultCountEl) resultCountEl.textContent = "0";
//       return;
//     }

//     const resultCountEl = document.querySelector("#result-count");
//     resultCountEl.textContent = Number(data.totalResults).toLocaleString();

//     list.innerHTML = data.Search.map(createMovieListItem).join("");

//     // const renderPagination = (title, type, year, totalPages) => {
//     //   const pagination = document.querySelector(".pagination");
//     //   pagination.innerHTML = ""; // 초기화

//     //   for (let i = 1; i <= totalPages; i++) {
//     //     const btn = document.createElement("button");
//     //     btn.textContent = i;
//     //     btn.className = "page-btn";
//     //     btn.dataset.page = i;

//     //     btn.addEventListener("click", () => {
//     //       document.querySelectorAll(".page-btn").forEach((e) => e.classList.remove("active"));
//     //       btn.classList.add("active");
//     //       GetSearch(title, type, year, i); // 클릭된 페이지로 다시 호출
//     //     });

//     //     pagination.appendChild(btn);
//     //   }

//     //   // 첫 페이지 active
//     //   const firstBtn = pagination.querySelector(".page-btn");
//     //   if (firstBtn) firstBtn.classList.add("active");
//     // };

//     // // 첫 페이지일 때만 페이징 생성
//     // if (page === 1 && data.totalResults) {
//     //   const total = parseInt(data.totalResults, 10);
//     //   const totalPages = Math.ceil(total / 10);
//     //   renderPagination(title, type, year, totalPages);
//     // }
//   } else {
//     list.classList.add("none");
//     list.innerHTML = `
//         <li>
//           <img src="./assets/images/warning-icon.svg" alt="경고 아이콘">
//           <strong>죄송합니다. 일치하는 항목을 찾을 수 없습니다.</strong>
//           <span>검색어 철자를 확인하세요.</span>
//           <span>영어로 검색해주세요.</span>
//         </li>
//       `;
//     // pagination.innerHTML = ""; // 페이징도 제거
//   }
// };

import { OMDB_API_BASE } from "../utils/constants.js";
import { createMovieListItem } from "./createMovieListItem.js";
import { showLoading, hideLoading } from "../utils/loading.js";

export const GetSearch = async (titleValue, typeValue, yearValue, page = 1) => {
  const movieList = document.querySelector(".movie-list");
  const searchPage = document.querySelector("main.search");
  const pagination = document.querySelector(".pagination");
  const resultCountEl = document.querySelector("#result-count");

  if (!searchPage || !movieList) return;

  showLoading();

  try {
    const res = await fetch(`${OMDB_API_BASE}&s=${titleValue}&type=${typeValue}&y=${yearValue}&page=${page}`);
    const data = await res.json();

    if (data.Search) {
      movieList.classList.remove("none");
      movieList.innerHTML = data.Search.map(createMovieListItem).join("");
      resultCountEl.textContent = Number(data.totalResults).toLocaleString();

      // ✅ 페이징 처리
      if (page === 1 && data.totalResults) {
        const total = parseInt(data.totalResults, 10);
        const totalPages = Math.ceil(total / 10); // OMDb는 페이지당 10개 고정

        pagination.innerHTML = ""; // 초기화

        for (let i = 1; i <= totalPages; i++) {
          const btn = document.createElement("button");
          btn.className = "page-btn";
          btn.textContent = i;
          btn.dataset.page = i;

          // 클릭 시 해당 페이지로 다시 검색
          btn.addEventListener("click", () => {
            // 모든 버튼에서 active 제거
            document.querySelectorAll(".page-btn").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            // 페이지 이동
            GetSearch(titleValue, typeValue, yearValue, i);
            window.scrollTo({ top: 0, behavior: "smooth" });
          });

          pagination.appendChild(btn);
        }

        // 첫 버튼 active
        const firstBtn = pagination.querySelector(".page-btn");
        if (firstBtn) firstBtn.classList.add("active");
      }
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
      pagination.innerHTML = ""; // 없을 경우 페이징도 제거
    }
  } catch (err) {
    console.error("검색 결과 오류:", err);
  } finally {
    hideLoading();
  }
};
