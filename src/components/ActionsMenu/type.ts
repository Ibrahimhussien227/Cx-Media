export interface IActionsMenuProps {
  actions: IAction[];
  handler?: (key: string) => void;
  disabled?: boolean;
  className?: string;
}
