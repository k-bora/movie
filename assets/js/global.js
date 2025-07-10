import { IncludeHTML } from "./IncludeHTML.js";
import { firstLoad } from "./firstLoad.js";
import { currentYear } from "./currentYear.js";
import { HeaderEvent } from "./HeaderEvent.js";
import { Dialog } from "./Dialog.js";
import { InputClearBtn } from "./InputClearBtn.js";
import { SelectDropdown } from "./SelectDropdown.js";
import { Main } from "./Main.js";
import { SearchSave } from "./SearchSave.js";
import { MobileFilter } from "./MobileFilter.js";
// import { GetSearch } from "./GetSearch.js"; // 저장된 값을 이용해 노출
// import { SearchValueList } from "./SearchValueList.js"; // 저장된 값을 이용해 노출
import { GetDetail } from "./GetDetail.js";

// header와 footer 가져오기
IncludeHTML().then(() => {
  firstLoad(); // 가장먼저 실행

  currentYear();
  HeaderEvent();
  Dialog();
  InputClearBtn();
  SelectDropdown(); // 커스텀 셀렉트 박스 이벤트

  Main();
  SearchSave(); // 검색하면 값을 가져와 저장
  MobileFilter(); // 모바일 필터 버튼 이벤트, pc와 모바일 값 같게
  GetDetail(); // 상세페이지
});
