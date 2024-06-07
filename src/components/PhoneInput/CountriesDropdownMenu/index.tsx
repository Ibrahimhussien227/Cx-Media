import { useEffect, useId, useRef } from "react";

import { MagnifyingGlass } from "@/utils/icons";
import { ICountriesDropdownMenuProps } from "./type";
// import { useCountriesDropdownNav } from "./utils";

const CountriesDropdownMenu = ({
  handleSearchChange,
  isExpanded,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleClose,
  filteredOptions,
  thisDDRef,
  handleOptionClick,
}: ICountriesDropdownMenuProps) => {
  const reactId = useId();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // const { listRef, handleKeyDown } = useCountriesDropdownNav({
  //   handleClose,
  //   searchInputRef,
  // });

  useEffect(() => {
    if (isExpanded) {
      searchInputRef.current?.focus();
    }
  }, [isExpanded]);

  return (
    <div className="bg-white absolute z-10 w-[100%] text-left text-secondary text-[12px] p-2 top-10 mt-1 border border-gray-300 rounded overflow-hidden h-[205px] flex flex-col gap-2">
      <div
        className="relative flex border border-gray-300 focus-within:border-[#FF6C02] focus-within:bg-[#F5FAFF] flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <label
          className="px-3 flex items-center justify-center"
          htmlFor={reactId}
        >
          <MagnifyingGlass className="" size={10} />
        </label>
        <input
          id={reactId}
          ref={searchInputRef}
          type="text"
          placeholder="Type to Search"
          onChange={(e) => {
            handleSearchChange(e.target.value);
          }}
          className="w-full outline-none py-2 rounded-sm flex-grow bg-inherit"
          // onKeyDown={handleKeyDown}
        />
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="px-3"
            title="clear phone number"
            onClick={() => {
              handleSearchChange("");
              searchInputRef.current!.value = "";
            }}
          >
            x
          </button>
        </div>
      </div>
      <ul
        className="list-none h-full overflow-x-scroll no-scrollbar flex-grow"
        // ref={listRef}
        // onKeyDown={handleKeyDown}
      >
        {filteredOptions.map((country) => (
          <li key={country.code}>
            <button
              className="text-inherit hover:bg-gray-100 p-2 cursor-pointer w-full flex justify-start items-center focus:bg-slate-100"
              onClick={() => {
                handleOptionClick(country);
                thisDDRef.current?.focus();
              }}
            >
              {country.name} ({country.dial_code})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountriesDropdownMenu;
