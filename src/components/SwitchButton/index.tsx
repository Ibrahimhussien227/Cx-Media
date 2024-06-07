import { ISwitchButtonProps } from "./type";



const SwitchButton =({isChecked, onClick, label}: ISwitchButtonProps)=> {

  return (
    <div className="flex gap-1 items-center">
      {label && (
        <p className="text-[12px] text-[#BFC5D5] tracking-tight">
          {label}
        </p>
      )}
      <span 
        onClick={onClick}
        className={`
          inline-flex relative w-10 h-5 rounded-[18px] cursor-pointer
          transition-colors ${isChecked? 'bg-green-600': 'bg-[#232F4B]'}
        `}
      >
        <span 
          className={`
          bg-white inline-block h-4 w-4 rounded-[16px] absolute top-0.5 transition-all
            ${isChecked? 'left-[calc(100%-18px)]': 'left-0.5'}
          `}>
        </span>
      </span>
    </div>
  );
}

export default SwitchButton
