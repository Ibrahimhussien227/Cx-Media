import { Icon } from "@phosphor-icons/react";
import { Dispatch, SetStateAction } from "react";

export interface ISideNavItemProps {
  title: string;
  to: string;
  Icon: Icon | string;
  navSize: string;
  type?: string;
  children?: React.ReactNode;
}

export interface ISidebarContentProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  rest: string;
}
