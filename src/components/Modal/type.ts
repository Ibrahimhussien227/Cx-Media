import { Dispatch, SetStateAction } from "react";
import { IconProps } from "@phosphor-icons/react/dist/lib/types";

export type IGeneralModalProps = {
  children?: React.ReactNode;
  icon?: {
    name: string;
    props?: IconProps;
  };
  className?: string;
  title?: string;
  description?: string;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
  searchParams?: ISearchParamsProps["searchParams"];
};
