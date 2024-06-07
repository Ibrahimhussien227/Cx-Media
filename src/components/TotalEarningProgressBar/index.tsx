import ProgressBar from "@/components/ProgressBar";
import { TotalEarningProgressBarProps } from "./type";

const TotalEarningProgressBar = ({
  data,
  color,
  barColor,
}: TotalEarningProgressBarProps) => {
  return (
    <div className={`flex flex-col ${barColor && "mt-2"}`}>
      {barColor && <ProgressBar percent={data.percentage} color={barColor} />}
      <div className="flex w-full justify-between mt-[5px]">
        <div className="flex flex-col">
          <p className="text-secondary text-[12px] tracking-[0px]">
            {data.desciption}
          </p>
          <p className=" text-[12px] font-bold tracking-[0px]">
            {data.amount}
            <span className={`${color} ml-[5px]`}>{data.percentage}%</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalEarningProgressBar;
