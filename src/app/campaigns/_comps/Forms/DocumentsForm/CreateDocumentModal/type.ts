import { UseFormSetValue } from "react-hook-form";

import { IDocumentSubmitForm } from "../type";

export interface ICreateDocumentModal {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: UseFormSetValue<IDocumentSubmitForm>;
  useFormAccessor: IDocumentSubmitForm;
}

export interface IDocument {
  fileKey: string;
  file: null | File;
}
