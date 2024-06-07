import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import { CaretDown, Lock } from "@/utils/icons";
import { useClickOutside } from "@/hooks/useClickOutside";
import { ICountryCodeType, IPhoneInputProps } from "./type";
import { countryData } from "./config";
import CountriesDropdownMenu from "./CountriesDropdownMenu";

const PhoneInput = ({
  placeholder,
  onChange,
  value,
  isLoading,
  label,
  errors,
  countryCode,
  isReadOnly,
  onChangeCountryCode,
}: IPhoneInputProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const thisDDRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOptionClick = useCallback(
    (option: ICountryCodeType) => {
      onChangeCountryCode?.(option.dial_code);
      setIsExpanded(false);
      setSearchTerm("");
    },
    [onChangeCountryCode],
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const filteredOptions = useMemo(
    () =>
      countryData.filter(
        (option) =>
          option.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          option.dial_code.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [searchTerm],
  );
  useClickOutside((evt) => {
    const thisDD = thisDDRef.current as HTMLButtonElement;
    const excludedElms = Array.from(thisDD.children).concat(thisDD);
    if (!excludedElms.includes(evt.target as Element)) {
      setIsExpanded(false);
    }
  });

  const handleExpandCountryCode = () => {
    if (!isLoading && !isReadOnly) {
      setIsExpanded((prevState) => !prevState);
    }
  };

  const handleClearPhoneNumber = () => {
    if (onChange) {
      onChange({
        target: { value: "" },
      } as ChangeEvent<HTMLInputElement>);
    } else if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div>
      <p className="text-[10px] font-ligh text-red-500 w-72 text-start break-words capitalize">
        {errors}
      </p>
      {label && (
        <p className="font-semibold text-[10px] text-secondary text-start ml-2 mb-2">
          {label}
        </p>
      )}

      <div
        className={`relative first-letter:custom-select flex w-[100%] flex-col h-full ${
          isLoading && "opacity-[0.5]"
        }`}
      >
        <div className="flex w-[100%]">
          <button
            type="button"
            className={`bg-white ${
              isExpanded
                ? "bg-[rgb(245,250,255)] border-[#FF6C02]"
                : "bg-white border-gray-300"
            } w-[100px] h-[35px] mr-2 flex flex-row justify-between items-center text-secondary p-2 ${
              !isLoading && !isReadOnly && "cursor-pointer"
            } border rounded-sm`}
            onClick={handleExpandCountryCode}
            ref={thisDDRef}
          >
            <span className="text-[10px] text-left">
              {countryCode ? countryCode : "Select"}
            </span>
            <CaretDown
              weight="bold"
              size={14}
              className={`shrink-none ${
                isExpanded ? "rotate-180" : "rotate-0"
              } transition-all`}
            />
          </button>
          <div
            className={`bg-white mb-2 border flex text-secondary border-gray-300 ${
              !isReadOnly &&
              "focus-within:bg-[#F5FAFF] focus-within:border-[#FF6C02]"
            } h-[35px] text-[12px] rounded-sm w-[100%]`}
          >
            <input
              readOnly={isReadOnly}
              disabled={isLoading}
              value={value}
              ref={inputRef}
              onChange={(e) => {
                if (!e.target.value) {
                  onChange?.(e);
                  return;
                }

                const num = Number(e.target.value);

                if (isNaN(num) || num < 0) {
                  return;
                }

                onChange?.(e);
              }}
              placeholder={placeholder}
              maxLength={12}
              className="test-input bg-transparent text-inherit flex-grow p-2 outline-none"
            />
            <div className="px-2 flex items-center justify-center">
              <button
                type="button"
                title="clear phone number"
                className="focus:outline-none"
                onClick={handleClearPhoneNumber}
              >
                x
              </button>
            </div>
          </div>
          {isReadOnly && <Lock className="absolute right-0 top-[10px] mr-2" />}
        </div>
        {isExpanded && (
          <CountriesDropdownMenu
            filteredOptions={filteredOptions}
            handleOptionClick={handleOptionClick}
            isExpanded={isExpanded}
            thisDDRef={thisDDRef}
            handleSearchChange={handleSearchChange}
            handleClose={() => setIsExpanded(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PhoneInput;
