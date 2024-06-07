import { TabBarProps } from "./types";

const TabBar = ({
  options,
  value,
  onChange,
  className,
  errorTabs,
}: TabBarProps) => {
  return (
    <ul
      className={`list-none w-fit flex border text-sm font-bold overflow-auto p-0.5 ${className}`}
    >
      {options?.map((op) => {
        const isActive = op.value === value.value;
        const hasError = errorTabs && errorTabs.includes(op.value);
        return (
          <li
            key={op.value}
            onClick={() => onChange(op)}
            className={`
                cursor-pointer px-4 grid place-items-center text-[12px] font-medium
                hover:bg-[#EFF6FF] border border-[#FFFFFF] rounded-sm hover:border-secondary hover:text-black
                ${
                  hasError
                    ? " text-red-500 border border-red-300"
                    : isActive
                    ? "bg-[#EFF6FF] text-black border border-secondary"
                    : " bg-white text-[#767676]"
                }
              `}
          >
            {op.display}
          </li>
        );
      })}
    </ul>
  );
};

export default TabBar;
