import { OMDB_API_BASE } from "../utils/constants.js";
import { createMovieListItem } from "../handlers/createMovieListItem.js";
import { showLoading, hideLoading } from "../utils/loading.js";
import { goodButton } from "../utils/goodButton.js";

export const Favorites = async () => {
  const favoritePage = document.querySelector(".main.favorites");
  if (favoritePage) {
    const movieList = document.querySelector(".movie-list");
    const count = document.querySelector("#result-count");

    showLoading();
    let idSaves = JSON.parse(localStorage.getItem("movie") || "[]");
    // console.log(idSaves);
    count.textContent = idSaves.length;
    try {
      const requests = idSaves.map((id) => fetch(`${OMDB_API_BASE}&i=${id}`).then((res) => res.json()));
      const movies = await Promise.all(requests);

      if (movieList) {
        movieList.innerHTML = movies.map(createMovieListItem).join("");
        goodButton();
      }

      if (idSaves.length == 0) {
        movieList.classList.add("none");
        movieList.innerHTML = `
        <li>
          <img src="./assets/images/heart-btn-on.svg" alt="좋아요 아이콘">
          <strong>좋아요를 눌러보세요!</strong>
        </li>
      `;
      }
    } catch (err) {
      console.error(err);
    } finally {
      hideLoading();
    }
  }
};
