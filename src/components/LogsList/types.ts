
interface ILogsListProps {
  logs: {
    header: string;
    accessorKey: string;
    formatter?: (arg:any)=> string;
  }[];
  data: object;
  title?: string;
  className?: string;
}