// import { qs } from "./dom.js";

// export const setFilterUI = (type, year, scope = document) => {
//   const typeInput = qs("#type-input", scope);
//   const yearInput = qs("#year-input", scope);
//   const yearText = qs("#year-input-text", scope);

//   if (typeInput) typeInput.textContent = type ? type.toUpperCase() : "타입";
//   if (yearInput) yearInput.value = year;
//   if (yearText) yearText.textContent = year || "연도";
// };

// export const resetFilterUI = (scope = document) => {
//   setFilterUI("", "", scope);
// };

// export const getFilterValues = (scope = document) => {
//   const type = qs("#type-input", scope)?.textContent.trim() || "";
//   const year = qs("#year-input", scope)?.value.trim() || "";
//   return { type, year };
// };

// 위 축약형과 qs 같은 뜻
export const setFilterUI = (type, year, scope) => {
  // 기본값: 전체 문서 기준
  const base = scope || document;

  const typeInput = base.querySelector("#type-input");
  const yearInput = base.querySelector("#year-input");
  const yearText = base.querySelector("#year-input-text");

  if (typeInput) {
    typeInput.textContent = type ? type.toUpperCase() : "타입";
  }

  if (yearInput) {
    yearInput.value = year;
  }

  if (yearText) {
    yearText.textContent = year || "연도";
  }
};

export const resetFilterUI = (scope) => {
  setFilterUI("", "", scope);
};

export const getFilterValues = (scope) => {
  const base = scope || document;

  const typeInput = base.querySelector("#type-input");
  const yearInput = base.querySelector("#year-input");

  const type = typeInput ? typeInput.textContent.trim() : "";
  const year = yearInput ? yearInput.value.trim() : "";

  return { type, year };
};
