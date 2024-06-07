import { UseFormReturn } from "react-hook-form";
import { IWrapperFormProps } from "../../WrapperForm/type";

export interface IFormPropsFunds {
  sourceOfFunds: string;
  files: {
    fileId: string;
    file: File | null;
    filePath?: string;
    fileName?: string;
  }[];
}

export interface IFundsFormProps {
  hookForm: UseFormReturn<IFormPropsFunds>;
  isLoading: boolean;
  applicationCompleted: boolean;
  investorDropdown: IWrapperFormProps["investorDropdown"];
}

export interface IFileUploadHandler {
  (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "sourceOfFundsProof" | "sourceOfFundsTransactionProof"
  ): void;
}

export type fieldNames = "sourceOfFunds";
