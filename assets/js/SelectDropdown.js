export const SelectDropdown = () => {
  const oldDim = document.querySelector(".dimmed-layer");
  const selectBoxs = document.querySelectorAll(".select-box");

  if (!selectBoxs) return;

  if (oldDim) {
    oldDim.remove();
  }

  // .on 제거 함수
  const classRemove = (selectors) => {
    selectors.forEach((selector) => {
      selector.classList.remove("on");
    });
  };

  const dimRemove = () => {
    const dim = document.querySelector(".dimmed-layer");
    if (dim) {
      dim.remove();
    }
  };

  // 셀렉트 박스
  selectBoxs.forEach((selectBox) => {
    const selectBtns = selectBox.querySelectorAll("button.option-title");
    const optionBtns = selectBox.querySelectorAll(".option-content .option");
    const yearInput = selectBox.querySelector(".input-number");
    const applyBtns = selectBox.querySelectorAll("button.--apply");
    const resetBtns = selectBox.querySelectorAll("button.--reset");

    // 각각 셀렉트 버튼
    selectBtns.forEach((selectBtn) => {
      // 셀렉트 버튼을 클릭하면
      selectBtn.addEventListener("click", () => {
        // .on 있는지 가장 먼저 확인
        const btnCheck = selectBtn.classList.contains("on");

        // 모든 버튼의 .on 제거 (모든 버튼 닫기)
        classRemove(selectBtns);
        dimRemove();

        // 클릭한 셀렉트 버튼에 .on 없으면
        if (!btnCheck) {
          //.on 추가
          selectBtn.classList.add("on");

          // dim 생성
          const dim = document.createElement("div");
          dim.classList.add("dimmed-layer");

          // dim 추가
          selectBtn.closest(".select-box").append(dim);

          // dim 클릭시
          dim.addEventListener("click", () => {
            classRemove(selectBtns);
            dimRemove();
          });
        }
      });

      // 옵션 버튼을 클릭하면
      optionBtns.forEach((optionBtn) => {
        optionBtn.addEventListener("click", (e) => {
          const selectText = optionBtn.textContent;
          const selectValue = optionBtn.value;
          e.preventDefault();
          // console.log(selectValue);

          if (selectText === "전체") {
            selectBtn.textContent = "타입";
            selectBtn.value = selectValue;
          } else {
            // console.log(btn.textContent);
            selectBtn.textContent = selectText;
            selectBtn.value = selectValue;
          }

          classRemove(selectBtns);
          dimRemove();
        });
      });

      // 적용 버튼을 클릭하면
      applyBtns.forEach((applyBtn) => {
        applyBtn.addEventListener("click", (e) => {
          e.preventDefault();
          const selectValue = yearInput.value;
          // console.log(selectValue);

          if (1887 > selectValue || selectValue > new Date().getFullYear()) {
            alert(`1887 ~ ${new Date().getFullYear()} 까지 검색이 가능합니다.`);
            selectBtn.textContent = "연도";
            yearInput.value = "";
          } else {
            selectBtn.textContent = selectValue;
          }

          classRemove(selectBtns);
          dimRemove();
        });
      });

      // 리셋 버튼을 클릭하면
      resetBtns.forEach((resetBtn) => {
        resetBtn.addEventListener("click", (e) => {
          e.preventDefault();

          selectBtn.textContent = "연도";
          yearInput.value = "";

          classRemove(selectBtns);
          dimRemove();
        });
      });
    });
  });
};
