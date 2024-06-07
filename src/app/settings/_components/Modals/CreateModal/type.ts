export interface ICreateModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  titlesCreateModal: {
    title: string;
    inputLabel: string;
    inputPlaceHolder: string;
    textAreaLabel: string;
    textAreaPlaceHolder: string;
  };
  handlerSubmit: () => void;
}
