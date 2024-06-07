import Link from "next/link";
import { ITabBarProps } from "./type";

const TabBar = ({
  options,
  value,
  className,
  errorTabs,
  searchParams,
}: ITabBarProps) => {
  return (
    <ul className={`flex flex-row border font-bold divide-x ${className}`}>
      {options.map((op) => {
        const isActive = op.value === value.value;
        const hasError = errorTabs && errorTabs.includes(op.value);
        return (
          <Link
            href={{ query: { ...searchParams, type: op.value } }}
            key={op.value}
            className={`
                cursor-pointer flex py-2 px-8 place-items-center text-[10px] uppercase
                hover:text-secondary rounded-sm hover:border-secondary
                ${
                  hasError
                    ? " text-red-500 border border-red-300"
                    : isActive
                    ? "bg-active text-white hover:text-white hover:bg-active"
                    : " bg-white text-secondary hover:bg-[#F5FAFF] hover:text-secondary"
                }
              `}
          >
            {op.display}
          </Link>
        );
      })}
    </ul>
  );
};

export default TabBar;
