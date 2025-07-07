import { GetDetail } from "./GetDetail.js";

export const GetSearch = async (titleValue, typeValue, yearValue) => {
  const loadingBox = document.querySelector(".loading");
  const movieList = document.querySelector(".movie-list");
  let loading = true;

  if (loading) {
    loadingBox.classList.add("on");
    // console.log("로딩시작");
  }
  try {
    // console.log(titleValue);
    // console.log(typeValue);
    // console.log(yearValue);

    const indexResponsePage1 = await fetch(`https://www.omdbapi.com/?apikey=2ae8fbfa&s=marvel&page=1`);
    const indexResponsePage2 = await fetch(`https://www.omdbapi.com/?apikey=2ae8fbfa&s=marvel&page=2`);

    const SearchResponsePage1 = await fetch(`https://www.omdbapi.com/?apikey=2ae8fbfa&s=${titleValue}&type=${typeValue}&y=${yearValue}&page=1`);
    // const SearchResponsePage2 = await fetch(`https://www.omdbapi.com/?apikey=2ae8fbfa&s=${titleValue}&type=${typeValue}&y=${yearValue}&page=2`);

    const indexResltPage1 = await indexResponsePage1.json();
    const indexResltPage2 = await indexResponsePage2.json();
    const searchResultPage1 = await SearchResponsePage1.json();
    // const searchResultPage2 = await SearchResponsePage2.json();

    const indexMovieList1 = indexResltPage1.Search; //배열
    const indexMovieList2 = indexResltPage2.Search;
    const searchMovieList1 = searchResultPage1.Search;
    // const searchMovieList2 = searchResultPage2.Search;

    const indexDataAll = [...indexMovieList1, ...indexMovieList2];
    // const searchDataAll = [...searchMovieList1, ...searchMovieList2];

    // index.html
    // 현재창 /(슬래시) 이후에 index.html이 포함하는지 참/거짓 반환
    if (window.location.pathname.includes("index.html")) {
      movieList.innerHTML = indexDataAll
        .map((item) => {
          return `
        <li class="movie-list__item">
          <a class="movie-link" href="./detail.html?id=${item.imdbID}">
            <div class="movie-list__poster-box" style="--bg:url(${item.Poster})" ></div>
            <strong class="movie-list__title ellipsis">${item.Title}</strong>
            <div class="movie-list__info">
              <span class="search-select-option">${item.Type}</span>
              <span class="search-select-option">${item.Year}</span>
            </div>
          </a>
        </li>
      `;
        })
        .join("");
    }

    // search.html
    if (window.location.pathname.includes("search.html")) {
      // console.log(searchResultPage1);

      if (searchMovieList1) {
        movieList.innerHTML = searchMovieList1
          .map((item) => {
            return `
          <li class="movie-list__item">
            <a class="movie-link" href="./detail.html?id=${item.imdbID}">
              <div class="movie-list__poster-box" style="--bg:url(${item.Poster})" ></div>
              <strong class="movie-list__title ellipsis">${item.Title}</strong>
              <div class="movie-list__info">
                <span class="search-select-option">${item.Type}</span>
                <span class="search-select-option">${item.Year}</span>
              </div>
            </a>
          </li>
        `;
          })
          .join("");
      } else {
        movieList.innerHTML = "검색결과가 없습니다.";
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading = false;
    if (!loading) {
      loadingBox.classList.remove("on");
      // console.log("로딩끝");
    }
  }
};
