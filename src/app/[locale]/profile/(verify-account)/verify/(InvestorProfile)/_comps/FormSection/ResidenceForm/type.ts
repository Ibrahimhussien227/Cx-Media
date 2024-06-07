import { UseFormReturn } from "react-hook-form";
import { IWrapperFormProps } from "../../WrapperForm/type";

export interface IFormPropsResidence {
  residenceType: string;
  addressLine1: string;
  addressProofType: string;
  friendRelativeName: string;
  files: { fileId: string; file: File | null }[];
}

export interface IResidenceFormProps {
  hookForm: UseFormReturn<IFormPropsResidence>;
  isLoading: boolean;
  applicationCompleted: boolean;
  investorDropdown: IWrapperFormProps["investorDropdown"];
}

export interface IFileUploadHandler {
  (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "addressProofDocument" | "friendRelativeProofDocument"
  ): void;
}

export type fieldNames = "residenceType" | "addressProofType";
