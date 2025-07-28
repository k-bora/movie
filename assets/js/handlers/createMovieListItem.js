export const createMovieListItem = (item) => `
  <li class="movie-list__item">
    <a class="movie-link" href="./detail.html?id=${item.imdbID}">
      <div class="movie-list__poster-box" style="--bg:url(${item.Poster})"></div>
      <strong class="movie-list__title ellipsis">${item.Title}</strong>
      <div class="movie-list__info">
        <span class="search-select-option">${item.Type}</span>
        <span class="search-select-option">${item.Year}</span>
      </div>
    </a>
    <button type="button" class="good-btn" data-id="${item.imdbID}"></button>
  </li>
`;
