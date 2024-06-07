import { useMemo, useRef, useState } from "react";

import { useClickOutside } from "@/hooks/useClickOutside";
import { CaretDown, Check } from "@/utils/icons";
import { CustomSelectProps } from "./type";

const CustomSelect = ({
  options,
  label,
  note,
  value,
  className,
  onChange,
  readonly = false,
  disabled,
}: CustomSelectProps) => {
  const [expandDD, setExpandDD] = useState(false);
  const thisDDRef = useRef<HTMLDivElement>(null);

  useClickOutside((evt) => {
    const thisDD = thisDDRef.current as HTMLDivElement;
    const excludedElms = Array.from(thisDD.children).concat(thisDD);
    if (!excludedElms.includes(evt.target as Element)) {
      setExpandDD(false);
    }
  });

  const selectedType = useMemo(() => {
    // in the initial run, if asset type is present it's actually the display string, otherwise we deal with the value (key)
    return options?.find((op) => op.value === value || op.display == value);
  }, [value, options]);

  return (
    <div>
      {label && (
        <label className="capitalize text-[12px] font-bold pl-2.5 mb-5">
          {label}
        </label>
      )}
      {note && !readonly && (
        <p className="text-gray-500 mb-3 capitalize">{note}</p>
      )}
      <div
        className={`
            relative p-1  max-h-64 min-w-30 ${className} bg-[#F5F8FF80] text-[12px] font-medium ${
          readonly ? "cursor-not-allowed" : "cursor-pointer"
        }
            flex items-center justify-between gap-2 border border-solid transition ${
              readonly ? "opacity-50 " : ""
            }`}
        onClick={() =>
          !disabled && !readonly && setExpandDD((prevState) => !prevState)
        }
        ref={thisDDRef}
      >
        {value ? (
          <span className="capitalize text-[12px] font-medium">
            {selectedType?.display}
          </span>
        ) : (
          <span className="text-gray-400 text-[12px] font-medium">Select</span>
        )}
        {/* {value ? (
          <span className="capitalize text-[12px] font-medium">
            {typeof value === "string" ? value.toString() : value.display}
          </span>
        ) : (
          <span className="text-gray-400 text-[12px] font-medium">Select</span>
        )} */}

        <CaretDown
          weight="bold"
          size={14}
          className={`shrink-none ${
            expandDD ? "rotate-180" : "rotate-0"
          } transition-all`}
        />

        <ul
          onClick={(ev: React.MouseEvent) => ev.stopPropagation()}
          className="absolute z-10 bg-white top-full left-0 w-max min-w-full transition-all border-t shadow-lg"
          style={{
            clipPath: `polygon(${
              expandDD
                ? "-10% -10%, 100% -10%, 120% 120%, -10% 120%"
                : "0 0, 100% 0, 100% 0, 0 0"
            })`,
          }}
        >
          {options?.map((option) => {
            return (
              <li
                key={option.value}
                onClick={() => {
                  setExpandDD(false);
                  onChange(option);
                }}
                className="p-2.5 capitalize flex items-center justify-between gap-1.5 border-gray-800 border-b-2"
              >
                {option.display}
                {selectedType?.display === option.display && (
                  <Check color="gray" weight="bold" style={{ flexShrink: 0 }} />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CustomSelect;
