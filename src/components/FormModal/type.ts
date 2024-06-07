import { Dispatch, SetStateAction } from "react";

export interface IFormModalProps {
  children?: React.ReactNode;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
  description?: string;
  searchParams?: ISearchParamsProps["searchParams"];
}
