import { GetSearch } from "./GetSearch.js";

/* ---------------------------- 검색된 값 버튼으로 노출하기 --------------------------- */
export const SearchValueList = (titleValue, typeValue, yearValue) => {
  const searchValueBox = document.querySelector(".value-list");

  if (!searchValueBox) return;

  // 전제 값을 배열로 모음
  const resultValues = [];

  // 값이 있는 것만 배열에 넣기
  if (titleValue) {
    resultValues.push(titleValue);
  }
  if (typeValue) {
    resultValues.push(typeValue.toUpperCase());
  }
  if (yearValue) {
    resultValues.push(yearValue);
  }

  searchValueBox.innerHTML = resultValues
    .map((values) => {
      return `
            <li class="value-list-item">
              <button type="submit" class="value-button">${values}</button>
            </li>
          `;
    })
    .join("");

  // 기존 값 유지 + 뒤에 추가 ... 포기
  // resultValues.forEach((value) => {
  //   const li = document.createElement("li");
  //   li.className = "value-list-item";

  //   const btn = document.createElement("button");
  //   btn.type = "button";
  //   btn.className = "value-button";
  //   btn.textContent = value;

  //   //.some()은 배열에서 하나라도 조건을 만족하면 true
  //   const isDuplicate = [...searchValueBox.querySelectorAll("button")].some((btn) => {
  //     btn.textContent === value;
  //   });

  //   if (!isDuplicate) {
  //     // append 처리
  //     li.appendChild(btn);
  //     searchValueBox.appendChild(li);
  //   }
  // });

  // searchValueBox.addEventListener("click", (e) => {
  //   if (e.target.matches(".value-button")) {
  //     const li = e.target.closest(".value-list-item");
  //     if (li) li.remove();
  //   }
  // });
  valueListButtonClick();
};

/* --------------------- 검색된 값 버튼 클릭시 삭제(클릭된 버튼 + 검색값) -------------------- */
export const valueListButtonClick = () => {
  const headerSearchForm = document.querySelector("#search-form");
  const valueListForm = document.querySelector("#value-form");

  if (!valueListForm) return;

  // 클릭하면
  valueListForm.addEventListener("click", (e) => {
    if (!e.target.classList.contains("value-button")) return; // .value-button이 있는지 체크

    const clickedButton = e.target;
    const value = clickedButton.textContent.trim();

    const titleInput = headerSearchForm.querySelector("#main-search-input");
    const typeInput = headerSearchForm.querySelector("#type-input"); // 버튼태그 textContent
    const yearInput = headerSearchForm.querySelector("#year-input");
    const yearText = headerSearchForm.querySelector("#year-input-text"); // 버튼태그 textContent

    const titleValue = titleInput.value.trim();
    const typeValue = typeInput.textContent;
    const yearValue = yearInput.value.trim();

    // 값 비교해서 초기화
    if (titleValue === value) {
      titleInput.value = "";
      const buttons = valueListForm.querySelectorAll(".value-button");
      buttons.forEach((button) => {
        button.remove();
      });

      typeInput.textContent = "타입";
      const moTypeSelect = document.querySelector("#alertfilter #type-input");
      if (moTypeSelect) moTypeSelect.value = "";

      yearInput.value = "";
      yearText.textContent = "연도";
      const moYearInput = document.querySelector("#alertfilter #year-input");
      if (moYearInput) moYearInput.value = "";
    }

    if (typeValue === value) {
      typeInput.textContent = "타입";
      const moTypeSelect = document.querySelector("#alertfilter #type-input");
      if (moTypeSelect) moTypeSelect.value = "";
    }

    if (yearValue === value) {
      yearInput.value = "";
      yearText.textContent = "연도";
      const moYearInput = document.querySelector("#alertfilter #year-input");
      if (moYearInput) moYearInput.value = "";
    }

    // 버튼 제거
    clickedButton.remove();

    // 바뀐 값을 새로 가져오기!
    const updatedTitle = titleInput.value.trim();
    const updatedType = typeInput.textContent === "타입" ? "" : typeInput.textContent;
    const updatedYear = yearInput.value.trim();

    // 검색 재실행
    GetSearch(updatedTitle, updatedType, updatedYear);
  });
};
