import { ColumnDef } from "@tanstack/react-table";

export interface IReviewSummaryProps {
  columns: ColumnDef<{ _id?: string }>[];
  payoutLogsHeader: {
    header: string;
    accessorKey: string;
  }[];
}
