export interface ICustomTableProps<T> {
  data: T[];
  columns: { id: number; key: string; label: string }[];
}

export interface ISort {
  keyToSort: string;
  direction: "asc" | "desc";
}
