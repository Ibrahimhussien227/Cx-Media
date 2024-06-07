import React from "react";

export interface ICustomTableProps<T> {
  data: T[];
  columns: { id: number; key: string; label: string }[];
  children: (row: T) => React.ReactNode;
  sortable?: boolean;
  loadMore?: React.ReactNode;
}

export interface ISort {
  keyToSort: string;
  direction: "asc" | "desc";
}
