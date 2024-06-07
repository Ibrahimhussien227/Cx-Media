import { ColumnDef } from "@tanstack/react-table";

export interface CustomTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  statusOptions?: { [key: string]: IOption[] };
  tableCount?: number;
  modal?: boolean;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
  hrefDetails?: string;
  disabledRedict?: boolean;
}
