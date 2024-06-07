import Link from "next/link";
import { IGridOptionProps } from "./type";

const GridOption = ({
  options,
  value,
  errorTabs,
  searchParams,
}: IGridOptionProps) => {
  return (
    <ul className="flex flex-row border font-bold divide-x">
      {options.map((op) => {
        const isActive = op.value === value.value;
        const hasError = errorTabs && errorTabs.includes(op.value);
        return (
          <Link
            key={op.value}
            href={{ query: { ...searchParams, direction: op.value } }}
            className={`
                cursor-pointer flex py-4 px-4 place-items-center text-[10px] h-[30px] uppercase
                  rounded-sm hover:border-secondary
                ${
                  hasError
                    ? " text-red-500 border border-red-300"
                    : isActive
                    ? "bg-active text-white hover:bg-active"
                    : " bg-white text-secondary hover:bg-lightBackground hover:text-secondary"
                }
              `}
          >
            <op.icon size={24} />
          </Link>
        );
      })}
    </ul>
  );
};

export default GridOption;
