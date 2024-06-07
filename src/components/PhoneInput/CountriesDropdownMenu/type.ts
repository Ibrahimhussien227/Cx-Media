import { ICountryCodeType } from "../type";

export interface ICountriesDropdownMenuProps {
  filteredOptions: ICountryCodeType[];
  handleOptionClick: (option: ICountryCodeType) => void;
  isExpanded: boolean;
  thisDDRef: React.RefObject<HTMLButtonElement>;
  handleSearchChange: (value: string) => void;
  handleClose: () => void;
}

export interface IConfigRef {
  buttonKeyDownToTabPressMap: Map<HTMLButtonElement, boolean>;
  isNavigating: boolean;
  handleListNavigationTimeoutId: null | NodeJS.Timeout;
  currentFocusedItem: null | HTMLLIElement;
}
