import LineChart from "@/components/LineChart";
import { AnnualChartData, earnings } from "./config";
import InvestmentCard from "../../InvestmentCard";
import FileDownloader from "@/components/FileDownloader";

const PropertySalePayout = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between w-full pt-[20px] pb-[20px]">
        <h2 className="flex  text-[18px] font-MinionPro ">
          Property Sale Payout
        </h2>
        <div className="flex justify-center items-center bg-white border rounded-full w-[25px] h-[25px]">
          <FileDownloader filePath="" />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-start items-start w-full gap-10">
        <div className="min-w-[230px] lg:w-[50%] w-full">
          <InvestmentCard
            title="YOUR PAYOUT"
            amount={5159.24}
            date="12:25 pm, 12 October, 2023."
            data={earnings}
            transactionID="TXID-12345"
          />
        </div>
        <div className="w-full flex flex-col gap-3">
          {/* <StatsCard
            title="ORIGINAL PURCHASE PRICE"
            amount="4,045,50"
            rate={1.25}
          />
          <StatsCard title="SALE PRICE" amount="5,456,00" rate={1.45} /> */}
          <div className="relative flex flex-row justify-end items-center h-[250px] md:max-w-[100%] lg:max-w-[80%] xl:max-w-[85%] lg:mt-[-5px] lg:pl-10">
            <LineChart data={AnnualChartData} legendY="AMOUNT (AED)" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySalePayout;
