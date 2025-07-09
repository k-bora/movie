export const GetDetail = async () => {
  const loadingBox = document.querySelector(".loading");
  const params = new URLSearchParams(window.location.search);
  const keyword = params.get("id");
  //   console.log(keyword);
  let loading = true;

  if (!keyword) return;

  if (loading) {
    loadingBox.classList.add("on");
  }
  try {
    const Response = await fetch(`https://www.omdbapi.com/?apikey=2ae8fbfa&i=${keyword}`);
    const linkData = await Response.json();

    // console.log(linkData); // 객체 (배열X)

    const test = document.querySelector(".test");
    if (!test) return;

    test.innerHTML = `
        <ul>
            <li><img src="${linkData.Poster}"></li>
            <li>Actors : ${linkData.Actors}</li>
            <li>Awards : ${linkData.Awards}</li>
            <li>BoxOffice : ${linkData.BoxOffice}</li>
            <li>Country : ${linkData.Country}</li>
            <li>DVD : ${linkData.DVD ? linkData.DVD : "-"}</li>
            <li>Director : ${linkData.Director}</li>
            <li>Genre : ${linkData.Genre}</li>
            <li>Language : ${linkData.Language}</li>
            <li>Plot : ${linkData.Plot}</li>
            <li>Title : ${linkData.Title}</li>
            <li>Type : ${linkData.Type}</li>
            <li>Year : ${linkData.Year}</li>
        </ul>
    `;
  } catch (error) {
    console.log(error);
  } finally {
    loading = false;
    if (!loading) {
      loadingBox.classList.remove("on");
    }
  }
};
