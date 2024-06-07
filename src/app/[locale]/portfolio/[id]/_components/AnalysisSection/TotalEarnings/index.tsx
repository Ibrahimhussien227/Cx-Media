import TotalEarningProgressBar from "@/components/TotalEarningProgressBar";
import { TotalEarningsData } from "@/app/[locale]/portfolio/config";
import TrintyProgressBar from "./TrintyProgressBar";

const TotalEarningsSection = () => {
  return (
    <div className="flex flex-col mt-7 lg:mt-0 lg:flex-row w-full items-start justify-between border-b-[1px] border-[rgba(212,228,242,0.52)] pb-[20px]">
      <div className="flex flex-col">
        <p className="text-[10px] font-bold">TOTAL EARNINGS</p>
        <div className="font-MinionPro flex items-end">
          <p className="text-[26px]">4,050.45</p>
          <span className="text-secondary text-[20px] pl-[5px]">AED</span>
        </div>
      </div>
      <div className="flex flex-col lg:items-center w-full">
        <div className="flex flex-col md:flex-row justify-around w-full mt-0">
          <TotalEarningProgressBar
            data={TotalEarningsData.one}
            color="text-[#009DFF]"
          />
          <TotalEarningProgressBar
            data={TotalEarningsData.two}
            color="text-[#9F83FF]"
          />
          <TotalEarningProgressBar
            data={TotalEarningsData.three}
            color="text-[#00B8BF]"
          />
        </div>
        <div className=" w-full lg:w-[80%] mt-2">
          <TrintyProgressBar
            rentalYield={TotalEarningsData.one.percentage}
            salePayout={TotalEarningsData.two.percentage}
            transferSale={TotalEarningsData.three.percentage}
          />
        </div>
      </div>
    </div>
  );
};

export default TotalEarningsSection;
