export const MobileFilter = () => {
  const filterBtn = document.querySelector(".filter-btn");
  const filterPopup = document.querySelector("#alertfilter");
  const filterPopupClose = filterPopup.querySelector(".--apply");
  const resetBtn = document.querySelector("#alertfilter .--reset");

  // PC 필터 변경 시 → 모바일 필터 동기화
  const pcTypeBtn = document.querySelector(".select-box-wrap #type-input");
  const pcYearInput = document.querySelector(".select-box-wrap #year-input");
  const moTypeSelect = document.querySelector("#alertfilter #type-input");
  const moYearInput = document.querySelector("#alertfilter #year-input");

  if (pcTypeBtn && moTypeSelect) {
    const observer = new MutationObserver(() => {
      const typeText = pcTypeBtn.textContent.trim();
      moTypeSelect.value = typeText !== "타입" ? typeText.toLowerCase() : "";
    });
    observer.observe(pcTypeBtn, { childList: true, subtree: true });
  }

  if (pcYearInput && moYearInput) {
    pcYearInput.addEventListener("input", () => {
      moYearInput.value = pcYearInput.value;
    });
  }

  // 모달 열기 + localStorage 또는 pc값 불러오기
  filterBtn.addEventListener("click", () => {
    const moTypeSelect = document.querySelector("#alertfilter #type-input");
    const moYearInput = document.querySelector("#alertfilter #year-input");

    const pcTypeBtn = document.querySelector(".select-box-wrap #type-input");
    const pcYearInput = document.querySelector(".select-box-wrap #year-input");

    // PC 필터에서 가져오기
    const typeFromPC = pcTypeBtn?.textContent.trim().toLowerCase();
    const yearFromPC = pcYearInput?.value.trim();

    const typeData = localStorage.getItem("type");
    const yearData = localStorage.getItem("year");

    if (moTypeSelect) moTypeSelect.value = typeFromPC && typeFromPC !== "타입" ? typeFromPC : typeData || "";

    if (moYearInput) moYearInput.value = yearFromPC ? yearFromPC : yearData || "";

    filterPopup.showModal();
  });

  // 적용버튼 클릭시 값 저장 + PC필터 동기화
  filterPopupClose.addEventListener("click", () => {
    const moTypeValue = document.querySelector("#alertfilter #type-input").value.trim();
    const moYearValue = document.querySelector("#alertfilter #year-input").value.trim(); // ← 이 줄 추가

    // 값이 "" 아닐 때
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
    localStorage.setItem("type", moTypeValue.toLowerCase());
    localStorage.setItem("year", moYearValue);

    // PC 필터 업데이트
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

  // 화면 너비가 720 이상일 경우 팝업 자동 닫기
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 720 && filterPopup.open) {
      filterPopup.close();
    }
  });
};
