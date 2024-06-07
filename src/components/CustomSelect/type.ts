export interface ICustomSelectProps {
  options: IOption[];
  value?: IOption | string;
  onChange?: (selectedOp: IOption) => void;
  readonly?: boolean;
  placeholder?: string;
  className?: string;
  searchParams?: ISearchParamsProps["searchParams"];
  withSearch?: boolean;
}
