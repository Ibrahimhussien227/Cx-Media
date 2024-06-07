import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import  { CalendarBlank }  from "../../utils/icons";
import Button from "@/components/button";
interface ICustomInputProps {
  value: any;
  onClick: any;
}
const CustomDatePicker = (props: any ) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const CustomInput: React.FC<ICustomInputProps> = ({ value, onClick }) => (
    <div className="custom-datepicker-input relative">
      <input
        type="text"
        value={value}
        onClick={onClick}
        placeholder="Select a date"
        className="h-[35px] bg-[#232F4B] w-[100%] px-[10px] rounded-[2px] text-[#ffffff] text-[12px] border "
        readOnly
      />
      
             <CalendarBlank size='10' color='#ffffff'  className="absolute top-0 bottom-0 m-auto right-[10px]"/>
    </div>
  ); 
  return (
    <div className="flex items-center justify-center w-[100%]">
     {props.label && (
        <label className="min-w-[180px] font-semibold text-[10px] text-[#5A6A93] flex tracking-[1.5px] mb-0">
          {props.label}
        </label>
      )}
      <div className="flex w-[100%]">
         <DatePicker 
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date)
            props.onChange(date)
          }}
          minDate={new Date()}
          dateFormat="dd MMMM, yyyy" // Customize the date format
          placeholderText="Select a date"
          customInput={<CustomInput value="Hello" onClick={() => console.log('Clicked')} />}// Use customInput to apply additional styles if needed
          todayButton="Today" // Display "Today" button
          renderCustomHeader={({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
            <div className='w-[100%] flex justify-around'>
              <Button color="#FF6C02" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>{'<'}</Button>
             
              <Button color="#FF6C02" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>{'>'}</Button>
            </div>
          )}
        /> 
      </div>
      <div>{props.errormessage}</div>
      {props.children} 
    </div>
  );
};

export default CustomDatePicker;
