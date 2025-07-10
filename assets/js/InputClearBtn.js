export const InputClearBtn = () => {
  const InputClearButtons = document.querySelectorAll(".clear-circle-button");

  InputClearButtons.forEach((InputClearButton) => {
    const input = InputClearButton.previousElementSibling;

    const classListEvent = () => {
      const inputLength = input.value.length;
      // console.log(inputLength);
      if (inputLength > 0) {
        InputClearButton.classList.add("on");
      } else {
        InputClearButton.classList.remove("on");
      }
    };

    classListEvent();
    input.addEventListener("keyup", () => {
      classListEvent();
    });

    InputClearButton.addEventListener("click", () => {
      input.value = "";
      InputClearButton.classList.remove("on");
    });
  });
};
