export const goodButton = () => {
  const goodBtns = document.querySelectorAll(".good-btn");
  // let idSaves = [];

  // let idSaves = localStorage.getItem("movie") || [];
  let idSaves = JSON.parse(localStorage.getItem("movie") || "[]");
  // console.log(keepID);

  goodBtns.forEach((keepGoodBtn) => {
    if (idSaves.includes(keepGoodBtn.dataset.id)) {
      keepGoodBtn.classList.add("on");
    }
  });

  goodBtns.forEach((goodBtn) => {
    goodBtn.addEventListener("click", (e) => {
      goodBtn.classList.toggle("on");
      const movieID = goodBtn.dataset.id;
      // console.log(movieID);

      if (goodBtn.classList.contains("on")) {
        // console.log("이미 좋아요가 눌렸습니다.");
        if (!idSaves.includes(movieID)) {
          idSaves.push(movieID);
        }
      } else {
        // console.log("아직 좋아요 안 눌림.");

        if (idSaves.includes(movieID)) {
          idSaves = idSaves.filter((id) => {
            if (id != movieID) {
              return id;
            }
          });
        }
      }
      // localStorage.setItem("movie", idSaves);
      localStorage.setItem("movie", JSON.stringify(idSaves));
    }); //click
  }); //forEach
};
