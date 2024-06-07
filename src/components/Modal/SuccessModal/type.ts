export interface ISuccessModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  description?: string;
  handleClick?: () => void;
}
