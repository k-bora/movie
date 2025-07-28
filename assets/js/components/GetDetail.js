import { OMDB_API_BASE } from "../utils/constants.js";
import { showLoading, hideLoading } from "../utils/loading.js";
import { goodButton } from "../utils/goodButton.js";

export const GetDetail = async () => {
  const params = new URLSearchParams(window.location.search);
  const keyword = params.get("id");
  const container = document.querySelector(".detaile-list-box");
  const title = document.querySelector("#search-movie-detail");

  if (!keyword || !container) return;
  showLoading();

  try {
    const res = await fetch(`${OMDB_API_BASE}&i=${keyword}&plot=full`);
    const data = await res.json();

    // "SX300"을 "SX700"으로 바꾸기
    // const posterUrl = data.Poster && data.Poster !== "N/A" ? data.Poster.replace("SX300", "SX700") : data.Poster;

    const qualityList = ["SX1000", "SX900", "SX800", "SX700", "SX300"];
    let bestPoster = "";

    if (data.Poster && data.Poster !== "N/A") {
      for (let i = 0; i < qualityList.length; i++) {
        const testUrl = data.Poster.replace("SX300", qualityList[i]);
        const img = new Image(); //이미지 확인을 위한 생성

        // img.onload = () => {
        //   console.log("이미지 로드 성공");
        // };
        // img.onerror = () => {
        //   console.log("이미지 없음");
        // };

        // 로드 확인
        const isValid = await new Promise((resolve) => {
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = testUrl;
        });

        if (isValid) {
          bestPoster = testUrl;
          break;
        }
      }
    }

    // 값이 없을때 함수
    const safeText = (value) => {
      return value && value !== "N/A" ? value : "-";
    };

    const datailTitle = `
     ${safeText(data.Title)} 상세내용
    `;
    title.textContent = datailTitle;

    const detailHTML = `
      <div class="poster-box-wrap">
        <div class="poster-box" style="--bg:url(${bestPoster})">
          <button type="button" class="good-btn" data-id="${data.imdbID}"></button>
        </div>
      </div>
      <ul class="detaile-list">
        <li><strong>제목</strong> ${safeText(data.Title)}</li>
        <li><strong>출시 연도</strong> ${safeText(data.Year)}</li>
        <li><strong>유형</strong> ${safeText(data.Type)}</li>
        <li><strong>관람 등급</strong> ${safeText(data.Rated)}</li>
        <li><strong>개봉일</strong> ${safeText(data.Released)}</li>
        <li><strong>상영 시간</strong> ${safeText(data.Runtime)}</li>
        <li><strong>장르</strong> ${safeText(data.Genre)}</li>
        <li><strong>감독</strong> ${safeText(data.Director)}</li>
        <li><strong>각본</strong> ${safeText(data.Writer)}</li>
        <li><strong>출연</strong> ${safeText(data.Actors)}</li>
        <li><strong>국가</strong> ${safeText(data.Country)}</li>
        <li><strong>언어</strong> ${safeText(data.Language)}</li>
        <li><strong>수상</strong> ${safeText(data.Awards)}</li>
        <li><strong>IMDB 평점</strong> ${safeText(data.imdbRating)}</li>
        <li><strong>박스오피스</strong> ${safeText(data.BoxOffice)}</li>
      </ul>
      <p class="plot"><strong>줄거리</strong> ${safeText(data.Plot)}</p>
  `;
    container.innerHTML = detailHTML;
    goodButton();
  } catch (err) {
    console.error(err);
  } finally {
    hideLoading();
  }
};
