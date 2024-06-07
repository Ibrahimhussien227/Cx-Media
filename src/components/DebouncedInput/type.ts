export interface DebouncedInputProps {
  value: string | number;
  onChange?: (value: string | number) => void;
  debounce?: number;
  searchKey?: string;
}
