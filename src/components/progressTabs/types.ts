
export interface IProgressTabBarProps {
  tabs: IProgressTabOption[];
  value: IProgressTabOption;
  onChange: (idx:number)=> void;
  className?: string;
  actionButton?: {
    text: string,
    onClick?: ()=> void,
    disabled?: boolean;
  }
}