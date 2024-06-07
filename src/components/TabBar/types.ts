export interface TabBarProps {
  options: IOption[];
  value: IOption;
  onChange: (op: IOption) => void;
  className?: string;
  variant?: string;
  errorTabs?: string[];
}
