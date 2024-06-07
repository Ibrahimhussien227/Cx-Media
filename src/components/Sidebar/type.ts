import { Icon } from "@phosphor-icons/react";
import { Dispatch, SetStateAction } from "react";

export interface SideNavItemProps {
  title: string;
  to: string;
  Icon: Icon | string;
  type?: string;
  items?: {
    title: string;
    to: string;
  }[];
}

export interface ISidebarContentProps {
  isOpen?: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  rest: string;
}
