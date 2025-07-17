export const MobileFilter = () => {
  const filterBtn = document.querySelector(".filter-btn");
  const filterPopup = document.querySelector("#alertfilter");
  const filterPopupClose = filterPopup.querySelector(".--apply");
  const resetBtn = document.querySelector("#alertfilter .--reset");

  // 모달 열기 + localStorage 값 불러오기
  filterBtn.addEventListener("click", () => {
    const moTypeSelect = document.querySelector("#alertfilter #type-input");
    const moYearInput = document.querySelector("#alertfilter #year-input");

    const typeData = localStorage.getItem("type");
    const yearData = localStorage.getItem("year");

    if (moTypeSelect) moTypeSelect.value = typeData || ""; // typeData있으면 typeData로 없으면 기본값으로 ""값으로
    if (moYearInput) moYearInput.value = yearData || "";

    filterPopup.showModal();
  });

  // 적용버튼 클릭시 값 저장 + PC필터 동기화
  filterPopupClose.addEventListener("click", () => {
    const moTypeValue = document.querySelector("#alertfilter #type-input").value.trim();
    const moYearValue = document.querySelector("#alertfilter #year-input").value.trim();

    // 값이 "" 아닐때
    if (moYearValue !== "") {
      if (moYearValue < 1887 || moYearValue > new Date().getFullYear()) {
        const alertDialog = document.querySelector("#alertDialog");
        const alertDialogText = alertDialog.querySelector("p");
        alertDialogText.textContent = `연도는 1887 ~ ${new Date().getFullYear()} 까지 검색이 가능합니다.`;
        alertDialog.showModal();
        return;
      }
    }

    // 저장
    localStorage.setItem("type", moTypeValue.toLowerCase()); // 저장할때는 소문자, 노출할때는 대문자
    localStorage.setItem("year", moYearValue);

    // PC필터 업데이트
    const pcTypeBtn = document.querySelector(".select-box-wrap #type-input");
    const pcYearInput = document.querySelector(".select-box-wrap #year-input");
    const pcYearText = document.querySelector(".select-box-wrap #year-input-text");

    if (pcTypeBtn) pcTypeBtn.textContent = moTypeValue.toUpperCase() || "타입";
    if (pcYearInput) pcYearInput.value = moYearValue;
    if (pcYearText) pcYearText.textContent = moYearValue || "연도";

    filterPopup.close();
  });

  // 초기화버튼 클릭시
  resetBtn.addEventListener("click", () => {
    // 모바일 필터 초기화
    const moTypeSelect = document.querySelector("#alertfilter #type-input");
    const moYearInput = document.querySelector("#alertfilter #year-input");

    if (moTypeSelect) moTypeSelect.value = "";
    if (moYearInput) moYearInput.value = "";

    // PC 필터 초기화 (select box UI 커스텀 구조 기반)
    const pcTypeBtn = document.querySelector(".select-box-wrap #type-input"); // 버튼
    const pcYearInput = document.querySelector(".select-box-wrap #year-input");
    const pcYearText = document.querySelector(".select-box-wrap #year-input-text");

    if (pcTypeBtn) pcTypeBtn.textContent = "타입";
    if (pcYearInput) pcYearInput.value = "";
    if (pcYearText) pcYearText.textContent = "연도";
  });

  // ✅ 화면 너비가 720 이상일 경우 팝업 자동 닫기
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 720 && filterPopup.open) {
      filterPopup.close();
    }
  });
};
