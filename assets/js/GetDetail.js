export const GetDetail = async () => {
  const loadingBox = document.querySelector(".loading");
  const params = new URLSearchParams(window.location.search);
  const keyword = params.get("id");
  //   console.log(keyword);
  let loading = true;

  if (!keyword) return;

  if (loading) {
    loadingBox.classList.add("on");
  }
  try {
    const Response = await fetch(`https://www.omdbapi.com/?apikey=2ae8fbfa&i=${keyword}&plot=full`);
    const linkData = await Response.json();

    // console.log(linkData); // 객체 (배열X)

    const test = document.querySelector(".detaile-list-box");
    if (!test) return;

    test.innerHTML = `
    <div class="poster-box-wrap">
      <div class="poster-box" style="--bg:url(${linkData.Poster})"></div>
    </div>
    <ul class="detaile-list">
      <li><strong>Title (제목)</strong> ${linkData.Title || "-"}</li>
      <li><strong>Year (출시 연도)</strong> ${linkData.Year || "-"}</li>
      <li><strong>Type (유형)</strong> ${linkData.Type || "-"}</li>
      <li><strong>Rated (관람 등급)</strong> ${linkData.Rated || "-"}</li>
      <li><strong>Released (개봉일)</strong> ${linkData.Released || "-"}</li>
      <li><strong>Runtime (상영 시간)</strong> ${linkData.Runtime || "-"}</li>
      <li><strong>Genre (장르)</strong> ${linkData.Genre || "-"}</li>
    </ul>
    <p class="plot"><strong>Plot (줄거리)</strong> ${linkData.Plot || "-"}</p>
    <ul class="detaile-list">
      <li><strong>Director (감독)</strong> ${linkData.Director || "-"}</li>
      <li><strong>Writer (각본가)</strong> ${linkData.Writer || "-"}</li>
      <li><strong>Actors (출연 배우)</strong> ${linkData.Actors || "-"}</li>
      <li><strong>Language (언어)</strong> ${linkData.Language || "-"}</li>
      <li><strong>Country (제작 국가)</strong> ${linkData.Country || "-"}</li>
      <li><strong>Awards (수상 내역)</strong> ${linkData.Awards || "-"}</li>
      <li><strong>Metascore (메타스코어)</strong> ${linkData.Metascore || "-"}</li>
      <li><strong>imdbRating (IMDB 평점)</strong> ${linkData.imdbRating || "-"}</li>
      <li><strong>imdbVotes (IMDB 투표 수)</strong> ${linkData.imdbVotes || "-"}</li>
      <li><strong>BoxOffice (박스오피스)</strong> ${linkData.BoxOffice || "-"}</li>
      <li><strong>DVD (DVD 출시일)</strong> ${linkData.DVD || "-"}</li>
      <li><strong>Production (제작사)</strong> ${linkData.Production || "-"}</li>
    </ul>
    `;
  } catch (error) {
    console.log(error);
  } finally {
    loading = false;
    if (!loading) {
      loadingBox.classList.remove("on");
    }
  }
};
