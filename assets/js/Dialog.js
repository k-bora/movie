export const Dialog = () => {
  const dialogs = document.querySelectorAll("dialog");

  if (!dialogs) return;
  dialogs.forEach((dialog) => {
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) {
        dialog.close();
      }
    });
  });
};
