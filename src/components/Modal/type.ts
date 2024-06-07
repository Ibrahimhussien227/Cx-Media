import { Dispatch, SetStateAction } from "react";
import { IconProps } from "@phosphor-icons/react/dist/lib/types";

export interface IGeneralModalProps {
  children?: React.ReactNode;
  setShowModal: Dispatch<SetStateAction<boolean>>;

  icon?: {
    name: string;
    props?: IconProps;
  };
  className?: string;
  title?: string;
  description?: string;
}
