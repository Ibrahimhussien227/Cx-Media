import { IRangeSlider } from "./type";

const RangeSlider = ({
  title,
  value,
  min,
  max,
  step,
  children,
  color,
  changeHandler,
  forModal,
}: IRangeSlider) => {
  return (
    <div className="flex my-3 flex-col relative">
      <div className="flex justify-between px-1 mb-2">
        {/* Title */}
        <p className="text-secondary text-[10px] font-bold">{title}</p>
        {/* Value */}
        {!forModal && (
          <p className="text-secondary text-[12px]">
            {value} {children}
          </p>
        )}
      </div>
      {/* Slider */}
      <div className="flex flex-row items-center borer">
        <div className="mb- w-full">
          {/* background bar */}
          <div className="slider relative h-2 rounded-md bg-lightBackground border">
            <div
              className={`progress absolute -top-[1px] -left-[1px] h-2 ${color} rounded`}
              style={{ width: `${((+value - min) / (max - min)) * 100}%` }}
            />
          </div>
          {/* bullet */}
          <div className="relative">
            <div className="relative">
              <input
                onChange={changeHandler}
                type="range"
                min={min}
                step={step}
                max={max}
                value={value}
                className="absolute w-full -top-[9px] -left-[1px] h-2 bg-transparent appearance-none pointer-events-none"
              />
            </div>
          </div>
        </div>
        {forModal && (
          <p className="text-secondary text-[12px] min-w-[90px] text-center">
            {value} {children}
          </p>
        )}
      </div>
    </div>
  );
};

export default RangeSlider;
