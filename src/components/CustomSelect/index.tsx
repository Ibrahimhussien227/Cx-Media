"use client";

import React, { ChangeEvent, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useClickOutside } from "@/hooks/useClickOutside";
import { ICustomSelectProps } from "./type";
import { CaretDown, Check, Lock, MagnifyingGlass } from "@/utils/icons";

const CustomSelect = ({
  options,
  value,
  readonly = false,
  className,
  withSearch,
  onChange,
}: ICustomSelectProps) => {
  const router = useRouter();
  const [expandDD, setExpandDD] = useState(false);
  const [sortby, setSortby] = useState<IOption | null>(
    typeof value === "object" ? value : null
  );

  // useEffect(() => {
  //   if (typeof value === "object") {
  //     setSortby(value);
  //   }
  // }, [value]);

  const [searchTerm, setSearchTerm] = useState("");

  const thisDDRef = useRef<HTMLDivElement>(null);

  useClickOutside((evt) => {
    const thisDD = thisDDRef.current as HTMLDivElement;
    const excludedElms = Array.from(thisDD.children).concat(thisDD);
    if (!excludedElms.includes(evt.target as Element)) {
      setExpandDD(false);
    }
  });

  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.display.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [options, searchTerm]
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onClickHandler = (option: IOption) => {
    setExpandDD(false);
    setSortby(option);
    if (onChange) onChange(option);
    else
      router.replace(`?sortBy=${option.value}&sortOrder=${option.sortOrder}`);
  };

  return (
    <div className={`${className ?? ""}`}>
      <div
        className={`bg-lightBackground relative p-1.5 min-w-30 text-[12px] h-full ${
          readonly ? "cursor-not-allowed" : "cursor-pointer"
        } flex items-center justify-between gap-2 border border-solid transition`}
        onClick={() => !readonly && setExpandDD((prevState) => !prevState)}
        ref={thisDDRef}
      >
        {sortby ? (
          <p className="capitalize tracking-[0px]">{sortby.display}</p>
        ) : (
          <p className="capitalize tracking-[0px] text-gray-400">Select</p>
        )}

        {readonly ? (
          <Lock size={17} color="#2C3A5C" />
        ) : (
          <CaretDown
            weight="bold"
            size={14}
            className={`shrink-none ${
              expandDD ? "rotate-180" : "rotate-0"
            } transition-all`}
          />
        )}

        <ul
          onClick={(ev: React.MouseEvent) => ev.stopPropagation()}
          className="absolute z-50 bg-white top-10 left-0 w-max min-w-full transition-all shadow-lg border rounded-sm"
          style={{
            clipPath: `polygon(${
              expandDD
                ? "-10% -10%, 100% -10%, 120% 120%, -10% 120%"
                : "0 0, 100% 0, 100% 0, 0 0"
            })`,
          }}
        >
          {withSearch && (
            <div className="relative block px-2 py-2">
              <MagnifyingGlass
                className="absolute top-[35%] left-5 pointer-events-none"
                size={14}
              />
              <input
                type="text"
                placeholder="Type to Search"
                onChange={handleSearchChange}
                className="w-full outline-none border border-gray-300 pl-10 p-2 mb-2 rounded-sm focus:bg-lightBackground focus:border-[#FF6C02]"
              />
            </div>
          )}
          {filteredOptions.map((option) => {
            return (
              <li
                key={option.value + option.sortOrder}
                onClick={() => onClickHandler(option)}
                className="p-2.5 capitalize flex items-center gap-1.5 border-gray-800 border-b-2"
              >
                <div className="flex w-[15px] h-[15px] border-[#D4E4F2] border-[1px] rounded-[15px] mr-[5px] items-center justify-center">
                  {option.value &&
                    sortby?.value === option.value &&
                    sortby.sortOrder === option.sortOrder && (
                      <Check
                        color="#12ef90"
                        weight="bold"
                        style={{ flexShrink: 0 }}
                      />
                    )}
                </div>
                {option.display}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CustomSelect;
