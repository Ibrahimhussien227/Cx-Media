import { type Table } from "@tanstack/react-table";

export interface ITablePaginationProps<T> {
  table: Table<T>;
  tableCount?: number;
}
