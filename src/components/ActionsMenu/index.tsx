"use client";

import { useRef, useState } from "react";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";

import * as icons from "@/utils/icons";
import { useClickOutside } from "@/hooks/useClickOutside";
import { IActionsMenuProps } from "./type";

const ActionsMenu = ({
  actions,
  className,
  disabled,
  handler,
}: IActionsMenuProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const thisActionMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside((evt) => {
    const thisActionMenu = thisActionMenuRef.current as HTMLDivElement;
    const excludedElms = Array.from(thisActionMenu.children).concat(
      thisActionMenu
    );
    if (!excludedElms.includes(evt.target as Element)) {
      setIsExpanded(false);
    }
  });

  return (
    <div
      className={`
            relative p-2 max-h-64  bg-white text-sm font-medium flex items-center justify-between gap-4 border border-secondary transition ${
              disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            } ${className}`}
      onClick={() => !disabled && setIsExpanded((prevState) => !prevState)}
      ref={thisActionMenuRef}
    >
      <span className="uppercase font-bold tracking-widest text-inherit">
        Actions
      </span>

      <CaretDown
        weight="bold"
        size={14}
        className={`shrink-none ${
          isExpanded ? "rotate-180" : "rotate-0"
        } transition-all`}
      />

      <ul
        className="absolute z-10 bg-white divide-y top-full right-[-1px] w-max min-w-full border border-secondary transition-all border-t shadow-lg"
        style={{
          clipPath: `polygon(${
            isExpanded
              ? "-10% -10%, 100% -10%, 120% 120%, -10% 120%"
              : "0 0, 100% 0, 100% 0, 0 0"
          })`,
        }}
      >
        {actions.map(({ title, icon, status }) => {
          const ActionIcon = icons[icon as keyof typeof icons];

          return (
            <li
              key={"action_" + title}
              onClick={() => {
                handler && handler(status!);
                setIsExpanded(false);
              }}
              className="p-2 m-1 font-medium text-sm capitalize"
            >
              {ActionIcon && <ActionIcon size={18} />}
              {title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ActionsMenu;
