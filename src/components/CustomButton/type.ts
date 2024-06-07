export interface ICustomButtonProps {
  className?: string;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}
