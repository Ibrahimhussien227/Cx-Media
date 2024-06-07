import { Dispatch, SetStateAction } from "react";

export interface IGeneralModalProps {
  children?: React.ReactNode;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  title?: string;
  description?: string;
  className?: string;
}
