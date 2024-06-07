import StatusTag from "@/components/StatusTag";
import { organizeDate } from "@/utils/dateOrganize";
import { ILogsListProps } from "./type";

const ApplicationStatus = ({ data, label }: ILogsListProps) => {
  return (
    <ul>
      <div className="flex flex-row justify-between border-t py-4 tracking-wider">
        <p className="text-[#333333] capitalize text-[14px] font-bold">
          {label}
        </p>
        <span className="text-[#2C3A5C] capitalize text-[14px] font-bold">
          UPDATED
        </span>
      </div>
      {data &&
        data.map((log, index) => (
          <li
            key={"log-" + index}
            className="flex gap-2 justify-between items-center pb-4 pt- border- border-gray-200"
          >
            <div className="flex flex-row items-center font-medium text-[13px] text-[#333333] tracking-wide">
              <div className=" rounded-full border-[3px] border-[#ccc] w-[15px] h-[15px] bg-[#2C3A5C] mr-3" />
              <StatusTag text={log.administrationStatus} />
            </div>
            <div className="flex flex-col items-end font-medium text-[12px] text-primary">
              <span className="font-bold">{log.userId}</span>
              <span>{organizeDate(log.createdAt)}</span>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default ApplicationStatus;
