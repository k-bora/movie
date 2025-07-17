export const SelectDropdown = () => {
  const oldDim = document.querySelector(".dimmed-layer");
  if (oldDim) oldDim.remove();

  const closeAll = () => {
    document.querySelectorAll("button.option-title.on").forEach((btn) => btn.classList.remove("on"));
    document.querySelector(".dimmed-layer")?.remove();
    // ?.는 이거 있으면 실행, 없으면 다음으로 넘어감
  };

  document.querySelectorAll(".select-box").forEach((box) => {
    const selectBtn = box.querySelector("button.option-title");
    const optionBtns = box.querySelectorAll(".option");
    const yearInput = box.querySelector(".input-number");
    const applyBtn = box.querySelector(".--apply");
    const resetBtn = box.querySelector(".--reset");

    // if (!selectBtn) return;

    selectBtn?.addEventListener("click", () => {
      const isOpen = selectBtn.classList.contains("on");
      closeAll();
      if (!isOpen) {
        selectBtn.classList.add("on");
        const dim = document.createElement("div");
        dim.className = "dimmed-layer";
        selectBtn.closest(".select-box").appendChild(dim);
        dim.addEventListener("click", closeAll);
      }
    });

    optionBtns?.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        selectBtn.textContent = btn.textContent === "전제" ? "타입" : btn.textContent;
        selectBtn.value = btn.value;
        closeAll();
      });
    });

    applyBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      const year = yearInput.value;
      if (year < 1887 || year > new Date().getFullYear()) {
        const alertText = document.querySelector("#alertDialog p");
        alertText.textContent = `연도는 1887 ~ ${new Date().getFullYear()} 까지 검색이 가능합니다.`;
        selectBtn.textContent = "연도";
        yearInput.value = "";
      } else {
        selectBtn.textContent = year;
      }
      closeAll();
    });

    resetBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      selectBtn.textContent = "연도";
      yearInput.value = "";
      closeAll();
    });
  });
};
