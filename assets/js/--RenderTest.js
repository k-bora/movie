export const RenderList = (array) => {
  // 데이터른 뿌리는 것 > 하나로 함수(파일)
  const list = document.querySelector(".movie-list");
  if (!list) return;

  list.innerHTML = array
    .map(({ Poster, Title, Type, Year, imdbID }) => {
      return /* html */ `
            <li>
                <img src="${Poster ? Poster : "/image/no-image.png"}" alt="" >
                <strong>${Title}</strong>
                <div>종류: ${Type}</div>
                <div>개봉연도: ${Year}</div>
            </li>
            `;
    })
    .join("");
};
