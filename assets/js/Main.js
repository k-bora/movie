export const Main = async () => {
  const loadingBox = document.querySelector(".loading");
  const movieList = document.querySelector(".movie-list");
  let loading = true;

  if (loading) {
    loadingBox.classList.add("on");
  }
  try {
    const indexResponsePage1 = await fetch(`https://www.omdbapi.com/?apikey=2ae8fbfa&s=marvel&page=1`);
    const indexResponsePage2 = await fetch(`https://www.omdbapi.com/?apikey=2ae8fbfa&s=marvel&page=2`);

    const indexResltPage1 = await indexResponsePage1.json();
    const indexResltPage2 = await indexResponsePage2.json();

    const indexMovieList1 = indexResltPage1.Search; //배열
    const indexMovieList2 = indexResltPage2.Search;

    const indexDataAll = [...indexMovieList1, ...indexMovieList2];

    const indexPage = document.querySelector("main.index");

    // index.html
    if (indexPage) {
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
  } catch (error) {
    console.log(error);
  } finally {
    loading = false;
    if (!loading) {
      loadingBox.classList.remove("on");
    }
  }
};
