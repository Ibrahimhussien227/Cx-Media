export interface ITabBarProps {
  options: IOption[];
  value: IOption;
  className?: string;
  variant?: string;
  errorTabs?: string[];
  searchParams: ISearchParamsProps["searchParams"];
}
