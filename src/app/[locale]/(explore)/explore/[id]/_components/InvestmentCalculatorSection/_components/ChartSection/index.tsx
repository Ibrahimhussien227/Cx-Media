import LineChart from "@/components/LineChart";
import { chartData } from "./config";

const ChartSection = () => {
  return (
    <div className="flex lg:w-[50%] w-full flex-col justify-center items-center">
      <div className="w-full h-full">
        <LineChart data={chartData} />
      </div>
      <div className="flex w-full justify-between mt-2">
        <div className="flex flex-col">
          <p className="text-secondary text-[12px] flex items-center	">
            <span className="border-[#0093FF] border-[1px] w-[7px] h-[7px] flex rounded-[7px] bg-[#d4e4f280] mr-1" />
            Rental Yield
          </p>
          <p className="text-[12px] font-bold tracking-[0]">
            AED 28,000.50 <span className="text-[#0093FF]">43%</span>
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-secondary text-[12px] flex items-center">
            <span className=" border-[#D384FD] border-[1px] w-[7px] h-[7px] flex rounded-[7px] bg-[#F3DBFF]  mr-1" />
            Value Appreciation
          </p>
          <p className="text-[12px] font-bold tracking-[0]">
            AED 30,600.00 <span className="text-[#D384FD]">67%</span>
          </p>
        </div>
      </div>
      <p className="text-secondary text-[12px] tracking-[0] py-4 mt-4 border-t-[1px] opacity-[0.5]">
        <span className="font-bold">Note:</span> The projections highlighted in
        this investment calculator are only indicative and are not meant as a
        basis to support investment decisions.
      </p>
    </div>
  );
};

export default ChartSection;
