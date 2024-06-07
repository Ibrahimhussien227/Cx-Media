

export interface IButtonProps {
  children: string | React.ReactNode;
  color: string;
  hoverColor?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  to?: string;
}