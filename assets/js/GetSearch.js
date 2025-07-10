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

    const SearchResponsePage1 = await fetch(`https://www.omdbapi.com/?apikey=2ae8fbfa&s=${titleValue}&type=${typeValue}&y=${yearValue}&page=1`);
    // const SearchResponsePage2 = await fetch(`https://www.omdbapi.com/?apikey=2ae8fbfa&s=${titleValue}&type=${typeValue}&y=${yearValue}&page=2`);

    const searchResultPage1 = await SearchResponsePage1.json();
    // const searchResultPage2 = await SearchResponsePage2.json();

    const searchMovieList1 = searchResultPage1.Search;
    // const searchMovieList2 = searchResultPage2.Search;

    // const searchDataAll = [...searchMovieList1, ...searchMovieList2];

    const searchPage = document.querySelector("main.search");

    // search.html
    if (searchPage) {
      // console.log(searchResultPage1);

      if (searchMovieList1) {
        movieList.classList.remove("none");
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
        movieList.classList.add("none");
        movieList.innerHTML = `
        <li>
          <img src="./assets/images/warning-icon.svg">
          <strong>죄송합니다. 일치하는 항목을 찾을 수 없습니다.</strong>
          <span>검색어 철자를 확인하세요.</span>
          <span>영어로 검색해주세요.</span>
        </li>
        `;
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
