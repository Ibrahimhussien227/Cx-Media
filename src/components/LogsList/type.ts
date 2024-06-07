export interface ILogsListProps {
  logs: {
    header: string;
    accessorKey: string;
    type?: string;
    to?: string;
  }[];
  data:
    | {
        [key: string]: string;
      }
    | object;
}
