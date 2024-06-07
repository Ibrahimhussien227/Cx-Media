import CustomButton from "@/components/CustomButton";
import DetailsCard from "@/components/DetailsCard";
import HoldingsCard from "./HoldingsCard";
import { investment } from "./config";
import { holdingsCardData } from "./HoldingsCard/config";
import ModalWrapper from "./_components/ModalWrapper";
import InvestmentCard from "../InvestmentCard";

const PropertyDetailSection = ({ searchParams }: ISearchParamsProps) => {
  return (
    <div className="flex flex-col w-full lg:pb-20 lg:mb-0 lg:max-w-[260px] lg:mr-[25px] h-full lg:overflow-scroll lg:no-scrollbar">
      <DetailsCard />
      {/* TESTING, DON'T REMOVE */}
      <HoldingsCard data={holdingsCardData[0]} />
      <HoldingsCard data={holdingsCardData[1]} />
      <HoldingsCard data={holdingsCardData[2]} />
      <HoldingsCard data={holdingsCardData[3]} />
      <InvestmentCard
        title="YOUR INVESTMENT"
        amount={5159.24}
        date="12:25 pm, 12 October, 2023."
        data={investment}
        transactionID="TXID-12345"
        className="mt-[20px]"
      >
        <p className="text-[#93A0C3] text-[12px] tracking-[0px]">
          Your request is received and will be confirmed 48 hrs from when the
          transaction was processed.
        </p>
        <CustomButton className="mt-[10px] font-bold py-2 px-2 text-[10px] rounded-sm text-secondary tracking-[1.5px] border flex items-center justify-center">
          EMAIL RECEIPT
        </CustomButton>
      </InvestmentCard>
      <ModalWrapper searchParams={searchParams} />
    </div>
  );
};

export default PropertyDetailSection;
