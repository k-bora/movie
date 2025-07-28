import { showLoading, hideLoading } from "../utils/loading.js";
import { OMDB_API_BASE } from "../utils/constants.js";

// N/A 등을 처리할 함수
const safeText = (value) => (!value || value === "N/A" ? "-" : value);

// 전체 HTML 렌더링 함수
const renderDetailPage = (posterUrl, data, container) => {
  const detailHTML = `
    <div class="poster-box-wrap">
      <div class="poster-box" style="--bg:url(${posterUrl})"></div>
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
};

export const GetDetail = async () => {
  const params = new URLSearchParams(window.location.search);
  const keyword = params.get("id");
  const container = document.querySelector(".detaile-list-box");

  if (!keyword || !container) return;
  showLoading();

  try {
    const res = await fetch(`${OMDB_API_BASE}&i=${keyword}&plot=full`);
    const data = await res.json();

    const originalPoster = data.Poster !== "N/A" ? data.Poster : "./assets/images/no-poster.png";
    let posterUrl = originalPoster;

    // SX300 -> SX700 대체 시도
    if (originalPoster.includes("SX300")) {
      const highResUrl = originalPoster.replace("SX300", "SX700");

      // 고화질 테스트
      const testImage = new Image();
      testImage.src = highResUrl;

      testImage.onload = () => {
        renderDetailPage(highResUrl, data, container);
        hideLoading();
      };

      testImage.onerror = () => {
        renderDetailPage(originalPoster, data, container);
        hideLoading();
      };
    } else {
      renderDetailPage(posterUrl, data, container);
    }
  } catch (err) {
    console.error(err);
    hideLoading();
  }
};
