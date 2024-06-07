import { ChartLineUp } from "@/utils/icons";

const PropertyDetails = ({ campaign }: { campaign: ICampaignData["data"] }) => {
  return (
    <div className="flex flex-col w-[100%] items-center bg-ver border-[1px] border-[#d4e4f285]">
      <div className="flex p-[20px] flex-col items-center">
        <div className="inline-flex w-auto mb-[5px] text-[10px] text-secondary h-[25px] px-[10px] items-center  tracking-[1.5px] bg-white font-bold border-[1px] border-[#d4e4f285] rounded-[20px]">
          <ChartLineUp className="text-active mx-1" size={14} />
          SHORT TERM RESIDENTIAL RENTAL
        </div>
        <h3 className="text-[22px] font-MinionPro text-center">
          {campaign.assetDetails.assetName}
        </h3>
      </div>

      <div className="flex justify-between w-full border-t-[1px] border-[#d4e4f285] p-[20px]">
        <div className="flex flex-col">
          <p className=" text-[10px] text-secondary font-bold">VALUATION</p>
          <p className="flex font-MinionPro text-[20px] w-[50%] tracking-[0px]">
            {campaign.financialDetails.propertyPrice}
            <span className="flex text-secondary text-[12px] pt-[8px] pl-[5px]">
              AED
            </span>
          </p>
        </div>

        <div className="flex flex-col">
          <p className=" text-[10px] text-secondary font-bold">SHARE VALUE</p>
          <p className="flex font-MinionPro text-[20px] w-[50%] tracking-[0px]">
            {campaign.financialDetails.sharePrice}
            <span className="flex text-secondary text-[12px] pt-[8px] pl-[5px]">
              AED/Share
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
