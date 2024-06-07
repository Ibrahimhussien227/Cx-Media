import ProgressBar from "@/components/ProgressBar";
import { Info } from "@/utils/icons";

const AnnualInvestmentCap = () => {
  return (
    <div className="flex w-[330px] flex-col sm:px-[20px] py-[10px] sm:mr-[5px]">
      <div className="flex flex-col w-full">
        <p className=" text-[10px] font-bold">ANNUAL INVESTMENT CAP</p>
        <p className=" text-[26px] font-MinionPro tracking-[0px]">
          50,000.00<span className="text-secondary text-[20px]">USD</span>
        </p>
        <div className="flex  mt-2 flex-col">
          <ProgressBar percent={80} color="red-prograss-bar" />
          <div className="flex w-full justify-between mt-[5px]">
            <div className="flex flex-col">
              <p className="text-secondary text-[12px] tracking-[0px]">
                Invested
              </p>
              <p className=" text-[12px] font-bold tracking-[0px]">
                40,000.00
                <span className="text-[#FF5A5A] ml-[5px]">80%</span>
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-secondary text-[12px] flex justify-end tracking-[0px]">
                Remaining
              </p>
              <p className=" text-[12px] font-bold ">
                10,000.00
                <span className="text-secondary ml-[5px]">20%</span>
              </p>
            </div>
          </div>
          <div className="flex w-[fit-content] px-[10px] items-center justify-center text-secondary text-[12px] bg-lightBackground border-[#D4E4F2] border-[1px] h-[30px] rounded-[15px] my-[20px]">
            <Info size={17} className="mr-1" />
            Resets on 1 January, 2024
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnualInvestmentCap;
