import { UseFormReturn } from "react-hook-form";
import { IWrapperFormProps } from "../../WrapperForm/type";

export interface IFormPropsWealth {
  wealthSource: string;
  files: { fileId: string; file: File | null }[];
}

export interface IWealthFormProps {
  hookForm: UseFormReturn<IFormPropsWealth>;
  isLoading: boolean;
  applicationCompleted: boolean;
  investorDropdown: IWrapperFormProps["investorDropdown"];
}

export interface IFileUploadHandler {
  (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "wealthSourceProof" | "wealthSourceTransactionProof"
  ): void;
}

export type fieldNames = "wealthSource";
