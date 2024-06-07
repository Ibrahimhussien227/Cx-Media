import StatusTag from "@/components/StatusTag";
import { StatusCellProps } from "./type";

const StatusCell = ({ cell }: StatusCellProps) => {
  return <StatusTag text={cell.getValue()} />;
};

export default StatusCell;
