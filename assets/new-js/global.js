import { IncludeHTML } from "./layout/IncludeHTML.js";
import { Main } from "./components/Main.js";
import { GetDetail } from "./components/GetDetail.js";
import { HeaderEvent } from "./layout/HeaderEvent.js";
import { firstSearchLoad } from "./scripts/search.js";
import { SearchSave } from "./handlers/SearchSave.js";
import { Animation } from "./effects/Animation.js";
import { currentYear } from "./utils/currentYear.js";
import { Dialog } from "./utils/Dialog.js";
import { InputClearBtn } from "./utils/InputClearBtn.js";
import { SelectDropdown } from "./utils/SelectDropdown.js";
import { MobileFilter } from "./handlers/MobileFilter.js";

document.addEventListener("DOMContentLoaded", async () => {
  await IncludeHTML(".header", "include/header.html");
  await IncludeHTML(".footer", "include/footer.html");

  firstSearchLoad();
  HeaderEvent();
  currentYear();
  Dialog();
  InputClearBtn();
  SelectDropdown();
  SearchSave();
  Main();
  MobileFilter();
  GetDetail();
  Animation();
});
