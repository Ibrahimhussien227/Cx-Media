import { StatsCardProps } from "./type";
import * as icons from "@/utils/icons";

const StatsCard = ({ title, count, icon }: StatsCardProps) => {
  const Icons = icons[icon as keyof typeof icons];
  return (
    <div className="flex grow gap-4 border bg-gradient-blue-white p-4">
      {icon && (
        <div className="px-3 py-2 bg-primary rounded-full flex items-center justify-center">
          <Icons alt={title} size={20} className="text-white" />
        </div>
      )}

      <div className="flex flex-col">
        <p className="text-[#333333] text-[13px]">{title}</p>
        <p className="text-secondary text-[16px] font-bold">
          {count ? (+count).toLocaleString("en") : "-"}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
