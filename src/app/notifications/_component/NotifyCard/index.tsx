import { BellRinging } from "@/utils/icons";
import { INotifyCard } from "./type";

const NotifyCard = ({ header, description, date, isNew }: INotifyCard) => {
  return (
    <div className="flex justify-between w-full items-center bg-white px-3 py-3 rounded-sm text-[12px]">
      <div className="flex items-center gap-2">
        <div
          className={`flex h-[40px] w-[40px] ${
            isNew && "bg-[#F5FAFF]"
          } border-[1px] rounded-full justify-center items-center relative`}
        >
          {/* bubble */}
          {isNew && (
            <div className="absolute w-[6px] h-[6px] rounded-full bg-[#FFE8DE] border-[1px] border-[#FF6C02] top-1 right-0" />
          )}

          <BellRinging size={20} className={`flex ${!isNew && "opacity-50"}`} />
        </div>
        <div className="flex flex-col">
          <p
            className={`font-bold ${
              !isNew && "text-secondary"
            } tracking-[0px] font-bold text-[14px]`}
          >
            {header}
          </p>
          <p className="text-secondary tracking-[0px] text-[14px]">
            {description}
          </p>
        </div>
      </div>
      <p className="text-secondary tracking-[0px] text-[12px] font-medium">
        {date}
      </p>
    </div>
  );
};

export default NotifyCard;
