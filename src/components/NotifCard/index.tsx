
import { BellRinging } from "@/utils/icons";
import { INotifCardProps } from "./type";

const NotifCard = ({ header, description, date, isRead }: INotifCardProps) => {
  return (
    <div
      className="flex justify-between items-center px-3 py-3 rounded-sm text-[12px] cursor-pointer border"
    >
      <div className="flex items-center gap-2">
        <div
          className={`flex h-[40px] w-[40px] border-[1px] rounded-full justify-center items-center relative`}
        >
          {/* bubble */}
          {!isRead && (
            <div className="absolute w-[6px] h-[6px] rounded-full bg-orange border-[1px] border-orange top-1 right-0" />
          )}

          <BellRinging size={20} className={`flex ${isRead && "opacity-50"}`} />
        </div>
        <div className="flex flex-col">
          <h1 className={`font-bold ${isRead && "text-faint"}`}>
            {header}
          </h1>
          <p className="tracking-[0px] text-secondaryText">{description}</p>
        </div>
      </div>
      <p className={`tracking-[0px] ${isRead && "text-faint"}`}>
        {date && date.toISOString()}
      </p>
    </div>
  );
};

export default NotifCard;
