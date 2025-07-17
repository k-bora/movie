import { createMovieListItem } from "./createMovieListItem.js";
import { Animation } from "./Animation.js";

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
      movieList.innerHTML = indexDataAll.map(createMovieListItem).join("");
      Animation();
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
