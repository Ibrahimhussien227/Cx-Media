export interface IDebouncedInputProps {
  value: string | number | undefined;
  onChange?: (value: string) => void;
  debounce?: number;
  placeholder?: string;
  title?: string;
  searchParams: ISearchParamsProps["searchParams"];
}
