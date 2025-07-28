import { GetSearch } from "../handlers/GetSearch.js";
import { SearchValueList } from "../handlers/SearchValueList.js";
import { restoreSearchInputs } from "../utils/restoreSearchInputs.js";

export const firstSearchLoad = () => {
  const searchPage = document.querySelector(".main.search");
  if (searchPage) {
    // 전송용 값
    const title = localStorage.getItem("title") || "";
    let type = localStorage.getItem("type");
    const year = localStorage.getItem("year") || "";

    // 화면 입력창에는 값 유지
    restoreSearchInputs();

    if (type === "타입") {
      type = "";
    }
    GetSearch(title, type, year);
    SearchValueList(title, type, year);
  }
};
