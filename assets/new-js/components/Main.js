import { OMDB_API_BASE } from "../utils/constants.js";
import { createMovieListItem } from "../handlers/createMovieListItem.js";
import { showLoading, hideLoading } from "../utils/loading.js";
import { restoreSearchInputs } from "../utils/restoreSearchInputs.js";
import { goodButton } from "../utils/goodButton.js";

export const Main = async () => {
  const mainPage = document.querySelector(".main.index");
  if (mainPage) {
    const movieList = document.querySelector(".movie-list");
    const ids = [
      "tt14205554",
      "tt4900148",
      "tt7967302",
      "tt18069420",
      "tt26743210",
      "tt3566834",
      "tt6208148",
      "tt11655566",
      "tt31036941",
      "tt5950044",
      "tt10676052",
      "tt26342662",
    ]; // 원하는 영화 ID 목록

    showLoading();
    restoreSearchInputs();

    try {
      // const res1 = await fetch(`https://www.omdbapi.com/?apikey=2ae8fbfa&s=marvel&page=1`);
      // const res2 = await fetch(`https://www.omdbapi.com/?apikey=2ae8fbfa&s=marvel&page=2`);
      // const data1 = await res1.json();
      // const data2 = await res2.json();
      // const all = [...data1.Search, ...data2.Search];

      const requests = ids.map((id) => fetch(`${OMDB_API_BASE}&i=${id}`).then((res) => res.json()));

      // 결과를 한꺼번에 받아오기
      const movies = await Promise.all(requests);

      // movieList에 출력
      if (movieList) {
        movieList.innerHTML = movies.map(createMovieListItem).join("");
        goodButton();
      }
    } catch (err) {
      console.error(err);
    } finally {
      hideLoading();
    }
  }
};
