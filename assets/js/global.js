import { firstLoad } from "./firstLoad.js";
import { currentYear } from "./currentYear.js";
import { HeaderEvent } from "./HeaderEvent.js";
import { SelectDropdown } from "./SelectDropdown.js";
import { SearchSave } from "./SearchSave.js";
import { GetSearch } from "./GetSearch.js";
import { SearchValueList } from "./SearchValueList.js";
import { GetDetail } from "./GetDetail.js";

firstLoad();

currentYear();
HeaderEvent();
SelectDropdown();

// SearchSave() 검색하면 값을 가져오고 저장
SearchSave();
// GetSearch() 저장된 값을 이용해 노출
GetSearch();
// SearchValueList() 저장된 값을 이용해 노출
SearchValueList();

GetDetail();
