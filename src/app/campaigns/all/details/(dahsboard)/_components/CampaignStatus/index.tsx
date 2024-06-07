import { ICampaignStatusProps } from "./type";

const CampaignStatus = ({ bgColor, title, date }: ICampaignStatusProps) => {
  return (
    <div
      className={`py-2 rounded-full flex justify-between items-center px-4 m-3 ${bgColor} bg-opacity-10`}
    >
      <p className=" text-[11px] font-bold tracking-[1.5px]">{title}</p>
      <p className=" text-[10px] font-bold tracking-[1.5px]">{date ?? "-"}</p>
    </div>
  );
};

export default CampaignStatus;
