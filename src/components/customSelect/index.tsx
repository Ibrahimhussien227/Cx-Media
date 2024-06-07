import React, { useState, useRef } from 'react';

import  { CaretDown, CaretUp, CheckCircle, Circle}  from "../../utils/icons";
import { ICustomSelectProps } from './types';
import useClickOutside  from "../../hooks/useClickOutside";
const CustomSelect = ({
  value,
  options,
  onSelect,
  className, 
  label,
  note,
  placeholder = "Select"
}:ICustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ulRef = useRef(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option:IOption) => {
    setIsOpen(false);
    onSelect(option); // Notify parent component about the selection
  };
  const handleClickOutside = () => {
    setIsOpen(false);
  };

  // Attach the click outside listener using the custom hook
  useClickOutside(ulRef, handleClickOutside);

  return (
    <div className={`grid grid-cols-[0.5fr_1fr_1fr] gap-5 justify-center  w-[100%] ${className || ''}`}>
      {label && (
        <label className='shrink-0 font-bold text-[10px] text-[#93A0C3] tracking-[1.5px]'>
          {label}
        </label>
      )}
      <div
        className={`bg-[#202A41] px-2.5 py-2.5 flex flex-row justify-between gap-4 items-center cursor-pointer relative
          border font-semibold rounded-[2px]  ${isOpen ? "bg-[#202A41] border-[#FF6C02]": "bg-[#202A41] border-gray-300"} ${!label && !note? 'col-span-3': ''}
        `}
        onClick={toggleDropdown}
      >
        <p className="text-[10px] text-left tracking-[0px]">
          {value ? <>{value.display}</> : placeholder}
        </p>
        {isOpen ? (
          <CaretUp  color='#ffffff' />
        ) : (
          <CaretDown color='#ffffff' />
        )}
        {isOpen && (
          <ul ref={ulRef} className="list-none bg-[#202A41] overflow-x-auto no-scrollbar absolute top-[105%] right-0 z-10 w-full min-w-fit text-left mt-1 border border-gray-300 rounded">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className={`cursor-pointer hover:bg-gray-500 flex p-2 gap-2 text-[12px] items-center text-white
                  ${value?.value === option.value? "selected bold" : ""}
                `}
              >
                {value?.value === option.value ?
                  <CheckCircle color="green" size={21} className='shrink-0'/>
                  :
                  <Circle size={20} className='shrink-0'/>
                }

                {option.display}
              </li>
            ))}
          </ul>
        )}
      </div>
      {note && (
        <span className="text-[#93A0C3] text-[12px] tracking-[0px] inline-block shrink-none pl-[20px] border-l-[1px]">
          {note}
        </span>
        )}
    </div>
  );
};

export default CustomSelect;
