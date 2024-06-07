import { IStatsCardProps } from "./type";

const StatsCard = ({ title, amount, rate }: IStatsCardProps) => {
  return (
    <div
      className={`flex flex-col rounded-[2px] p-[15px] relative w-full ${
        rate ? "bg-gradient-white-transparent" : "bg-white"
      }`}
    >
      <div className="flex flex-row justify-between">
        <div>
          <p className="text-[10px] text-secondary font-bold">{title}</p>
          <div className="flex flex-row justify-start items-end">
            <p className="flex font-MinionPro text-[20px]">{amount} </p>
            <p className="flex text-secondary text-[12px] pb-1 pl-[5px] tracking-[0xp]">
              AED
            </p>
          </div>
        </div>
        {rate && (
          <div className="text-right">
            <p className="text-[10px] text-secondary font-bold">RATE</p>
            <p className="flex font-MinionPro text-[20px] tracking-[0px] items-end">
              {rate}
              <span className="flex text-secondary text-[12px] pb-1 pl-[5px]">
                AED/Share
              </span>
            </p>
          </div>
        )}
      </div>
      {/* Flat div */}
      <div className="bg-active text-[white] h-[15px] w-[2px] left-[0] top-[20px] absolute" />
    </div>
  );
};

export default StatsCard;
