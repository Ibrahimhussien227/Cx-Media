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
    <ul className={`flex flex-row border font-bold divide-x sm:w-auto w-full sm:my-0 my-2 ${className}`}>
      {options.map((op) => {
        const isActive = op.value === value.value;
        const hasError = errorTabs && errorTabs.includes(op.value);
        return (
          <Link
            href={{ query: { ...searchParams, type: op.value } }}
            key={op.value}
            className={` w-full
                cursor-pointer flex py-2 px-4 place-items-center text-[10px] uppercase nowrap
                hover:text-secondary rounded-sm hover:border-secondary
                ${
                  hasError
                    ? " text-red-500 border border-red-300"
                    : isActive
                    ? "bg-active text-white hover:text-white hover:bg-active"
                    : " bg-white text-secondary hover:bg-lightBackground hover:text-secondary"
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
