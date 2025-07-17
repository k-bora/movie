export const InputClearBtn = () => {
  document.querySelectorAll(".clear-circle-button").forEach((btn) => {
    const input = btn.previousElementSibling;
    const toggleClass = () => {
      btn.classList.toggle("on", input.value.length > 0);
    };
    toggleClass();
    input.addEventListener("keyup", toggleClass);
    btn.addEventListener("click", () => {
      input.value = "";
      btn.classList.remove("on");
    });
  });
};