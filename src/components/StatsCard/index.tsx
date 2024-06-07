import { IStatsCardProps } from "./types";


const StatsCard = ({ title, children }: IStatsCardProps) => {
  return (
    <div className="grow shrink-0 border max-w-60 py-3.5">
      <h3 className="px-3 border-l-[2px] border-orange text-[11px] leading-none tracking-[1.5px] uppercase text-faint">
        {title}
      </h3>
      <div className="py-2 px-3">
        {children}
      </div>
    </div>
  );
};

export default StatsCard;