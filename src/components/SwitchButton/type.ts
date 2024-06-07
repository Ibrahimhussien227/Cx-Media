export interface ISwitchButtonProps {
  children?: React.ReactNode;
  checked?: boolean;
  value?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  isDisabled?: boolean;
}
