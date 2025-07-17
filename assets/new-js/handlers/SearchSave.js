// 검색 폼 제출 시 localStorage 저장 및 페이지 이동
export const SearchSave = () => {
  const forms = ["#search-form", "#intro-form"];

  forms.forEach((selector) => {
    const form = document.querySelector(selector);
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = form.querySelector("input[type='text']").value.trim();
      const type = form.querySelector(".option-title")?.textContent.trim() || "타입";
      const year = form.querySelector("input[type='number']")?.value.trim() || "";

      if (title) {
        localStorage.setItem("title", title);
        localStorage.setItem("type", type);
        localStorage.setItem("year", year);
        location.href = "./search.html";
      } else {
        const alertDialog = document.querySelector("#alertDialog");
        const alertText = alertDialog.querySelector("p");
        alertText.textContent = "검색어를 입력해주세요.";
        alertDialog.showModal();
      }
    });
  });
};
