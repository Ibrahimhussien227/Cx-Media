import React, { useState } from "react";
import { countryData } from "@/constants/countryCodes";
import { CountryCodeType, PhoneInputProps } from "./types";
import { CaretDown, CaretUp, MagnifyingGlass } from "../../utils/icons";

const PhoneInput = ({
  setCountryCode,
  setPhoneNumber,
  placeholder,
  countryCodeValue,
  phoneNumberValue,
  label,
  note
}: PhoneInputProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<CountryCodeType>();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = countryData.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: CountryCodeType) => {
    setSelectedOption(option);
    if(setCountryCode){
      setCountryCode(option.dial_code); // Update country code state
    }  
    setIsOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setPhoneNumber) {
    setPhoneNumber(e.target.value); // Update phone number state
    }
  };

  return (
    <div className="grid sm:grid-cols-[0.5fr_1fr_1fr] grid-cols-[0.5fr_1fr] gap-5 justify-center w-full">
      <label className="inline-block font-bold text-[10px] text-[#93A0C3] tracking-[1.5px] mb-0">
        {label}
      </label>
      <div
        className="custom-select flex w-[100%] flex-col h-full"
        style={{ position: "relative" }}
      >
        <div className="flex w-[100%]">
          <div
            className={`bg-[#232F4B] ${
              isOpen
                ? "border-[#5A6A93]"
                : "bg-[#232F4B]  border-gray-300"
            } w-[100px] h-[35px] mr-2 flex flex-row justify-between items-center text-[#ffffff] px-[15px] cursor-pointer border  rounded-[2px]`}
            onClick={toggleDropdown}
          >
            <p className="text-[12px] text-left tracking-[0px]">
              {selectedOption ? <>{selectedOption.dial_code}</> : (countryCodeValue || "Select")}
            </p>
            {isOpen ? (
              <CaretUp size="10" color="#ffffff" />
            ) : (
              <CaretDown size="10" color="#ffffff" />
            )}
          </div>
          <input
            type="text"
            placeholder={placeholder}
            value={phoneNumberValue} // Bind phone number to input value
            onChange={handleInputChange} // Handle input change
            className="bg-[#232F4B] text-[#ffffff] p-2  outline-none border border-gray-300 focus:bg-[#232F4B] focus:border-[#5A6A93] h-[35px] text-[12px] rounded-[2px] w-[100%]"
          />
        </div>
        {isOpen && (
          <div className="bg-[#232F4B] absolute z-10 w-[100%] text-left text-[#5A6A93] text-[12px] p-2 top-10 mt-1 border border-gray-300 rounded overflow-hidden h-[205px]">
            <div className="relative block ">
              <MagnifyingGlass
                size="10"
                color="#ffffff"
                className="absolute top-[30%] left-3 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Type to Search"
                value={searchTerm} // Bind search term to state
                onChange={handleSearchChange}
                className="w-full outline-none border border-gray-300 pl-8 p-2 mb-2 bg-[#232F4B] rounded-sm focus:bg-[#232F4B] focus:border-[#FF6C02]"
              />
            </div>
            <ul className="list-none h-full overflow-x-auto no-scrollbar">
              {filteredOptions.map((country) => (
                <li
                  key={country.code}
                  onClick={() => handleOptionClick(country)}
                  className="cursor-pointer p-2"
                >
                  {country.name} ({country.dial_code})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {note && (
        <span className="text-[#93A0C3] sm:flex hidden text-[12px] tracking-[0px] shrink-none pl-[20px] border-l-[1px]">
          {note}
        </span>
      )}
    </div>
  );
};

export default PhoneInput;
