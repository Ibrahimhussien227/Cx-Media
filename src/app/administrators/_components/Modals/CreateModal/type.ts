export interface IInvitationSubmitForm {
  fullName: string;
  email: string;
  roleId: string;
}

export interface ICreateModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSuccessModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
