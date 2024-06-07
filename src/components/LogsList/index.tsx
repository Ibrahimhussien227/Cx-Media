import { organizeDate } from "@/utils/dateOrganize";
import StatusTag from "../StatusTag";
import { ILogsListProps } from "./type";

const LogsList = ({ logs, data }: ILogsListProps) => {
  return (
    <ul>
      {data &&
        logs.map((log) => (
          <li
            key={"log" + log.accessorKey}
            className="flex gap-2 justify-between pb-4 pt-4 border-t border-gray-200"
          >
            <p className="font-medium text-[13px] text-[#333333] tracking-wide">
              {log.header}
            </p>
            <span
              className={`font-medium text-[12px] ${
                log?.type === "id" && "text-[#17181a]"
              }`}
            >
              {data[log.accessorKey as keyof typeof data] &&
                (log?.type === "status" ? (
                  <StatusTag
                    text={data[log.accessorKey as keyof typeof data]}
                  />
                ) : log?.type === "date" ? (
                  organizeDate(data[log.accessorKey as keyof typeof data])
                ) : (
                  data[log.accessorKey as keyof typeof data]
                ))}
            </span>
          </li>
        ))}
    </ul>
  );
};

export default LogsList;
