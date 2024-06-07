export interface IInvitationSubmitForm {
  additionalDocument: string;
}

export interface ICreateModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSuccessModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedAction: string;
}
