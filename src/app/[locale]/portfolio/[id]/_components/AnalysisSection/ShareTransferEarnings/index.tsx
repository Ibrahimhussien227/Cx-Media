import { earnings } from "../PropertySalePayout/config";
import InvestmentCard from "../../InvestmentCard";
import FileDownloader from "@/components/FileDownloader";

const ShareTransferEarnings = () => {
  return (
    <div className="flex w-full flex-col mb-[80px]">
      <div className="flex justify-between w-full pt-[20px] pb-[20px]">
        <h2 className="flex text-[18px] font-MinionPro ">
          Share Transfer Earnings
        </h2>

        <div className="flex justify-center items-center bg-white border rounded-full w-[25px] h-[25px]">
          <FileDownloader filePath="" />
        </div>
      </div>

      <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-5">
        <InvestmentCard
          title="YOUR EARNINGS"
          amount={5159.24}
          date="12:25 pm, 12 October, 2023."
          data={earnings}
          transactionID="TXID-12345"
          className="w-full"
        />
        <InvestmentCard
          title="YOUR EARNINGS"
          amount={5159.24}
          date="12:25 pm, 12 October, 2023."
          data={earnings}
          transactionID="TXID-12345"
          className="w-full"
        />
        <InvestmentCard
          title="YOUR EARNINGS"
          amount={5159.24}
          date="12:25 pm, 12 October, 2023."
          data={earnings}
          transactionID="TXID-12345"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ShareTransferEarnings;
