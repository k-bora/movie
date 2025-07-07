// import { RenderList } from "./RenderList.js";

// export const GetMovie = async (keyWord) => {
//   try {
//     // const response = await fetch("http://www.omdbapi.com/?apikey=2ae8fbfa& //key=value");
//     const response = await fetch(`http://www.omdbapi.com/?apikey=2ae8fbfa&s=${keyWord}`);
//     const result = await response.json();
//     console.log(result.Search);

//     RenderList(result.Search);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const GetSearch = async (value, yearValue, typeValue = "movie") => {
  let loading = true;
  if (loading) {
    console.log("로딩 중");
    // document.body.append("로딩중");
  }

  try {
    // console.log(value);
    const response = await fetch(`http://www.omdbapi.com/?apikey=2ae8fbfa&s=${value}&y=${yearValue}&type=${typeValue}`);
    const result = await response.json();

    // if (!response.ok) {
    //   console.log("error");
    // }

    const list = document.querySelector(".movie-list");
    // const movie = result.Search;
    // console.log(movie);

    if (!result.Search) {
      //   console.log("검색결과가 없습니다");
      list.innerHTML = `<li>검색결과가 없습니다</li>`;
      return;
    }

    list.innerHTML = result.Search.map((item) => {
      console.log(item.Poster);

      return `
          <li class="movie-list__item">
            <div class="movie-list__poster-box" style="--bg:url(${item.Poster})"></div>
            <strong class="movie-list__title ellipsis">${item.Title}</strong>
            <div class="movie-list__info">
              <span class="search-select-option">${item.Type}</span>
              <span class="search-select-option">${item.Year}</span>
            </div>
          </li>
      `;
    }).join("");
  } catch (error) {
    console.error(error);
  } finally {
    loading = false;
    if (!loading) {
      console.log("로딩 끝");
      //   document.body.append("로딩 끝");
    }
  }
};
