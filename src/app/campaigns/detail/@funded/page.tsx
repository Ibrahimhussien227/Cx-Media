"use client";

import LogsList from "@/components/LogsList";
import { campaignLogs } from "./configs";
import { useTranslation } from "react-i18next";
import StatsCard from "@/components/StatsCard";
import StatusTag from "@/components/statusTag";
import { useGetCampaignByIdQuery } from "@/store/services/campaign/campaignDetailsApi";


const FundedCampaignPage =({searchParams}: {searchParams: {id: string}})=> {
  const {t} = useTranslation("campaignsPage");
  const {data } = useGetCampaignByIdQuery(searchParams.id);// won't fetch really, will be taken from cache as the layout ran first and stored ! value
  const campaignDetails = data && data.data;
  const thumbnailPic = campaignDetails?.assetDetails?.assetMediaFiles?.find((fileData:IAssetMediaFiles)=> fileData.isThumbnail);

  return campaignDetails && (
    <section className="my-5">

      <div className="flex gap-2 items-center">
        <h2 className="text-xl capitalize">
          {campaignDetails.assetDetails?.assetName}
        </h2>
        <StatusTag text={'FUNDED'} color="green" />
      </div>
      
      <hr className="my-6"/>
      <div className="grid gap-5 md:grid-cols-[2fr_1fr]">
        <LogsList
          data={campaignDetails}
          logs={campaignLogs}
          title={t('fundedCampaign.logsTitle')}
          className="md:col-start-2 bg-[#232F4B] self-start"
        />
        <div className="md:col-start-1 md:row-start-1 flex flex-col gap-5">
          <img
            src={thumbnailPic?.filePath}
            alt={thumbnailPic?.fileName}
            height={280} // what about mobile?
            className="w-full object-cover"
          />
          <div className="flex gap-4">
            <StatsCard title={"funds Raised"}>
              {campaignDetails.financialDetails?.FundsRaised}
              <span className='text-[10px] font-light'>AED</span>
            </StatsCard>
            <StatsCard title={"investors"}>
              {campaignDetails.financialDetails?.NumberOfInvestors}
            </StatsCard>
            <StatsCard title={"Campaign end"}>
              {campaignDetails.campaignCloseTimestamp}
            </StatsCard>
          </div>
          <div className="grid gap-3">
            <div className="flex gap-2 justify-between">
              <p className="text-[12px] text-faint tracking-[1.5px] uppercase">
                {t('fundedCampaign.propertyValuation')}
              </p>
              <hr className="shrink-0 grow border-dotted self-center"/>
              <p>
                {campaignDetails.financialDetails?.propertyPrice}
                <span className='text-faint text-[12px] font-extralight'>AED</span>
              </p>
            </div>
            <div className="flex gap-2 justify-between">
              <p className="text-[12px] text-faint tracking-[1.5px] uppercase">
              {t('fundedCampaign.sharePrice')}
              </p>
              <hr className="shrink-0 grow border-dotted self-center"/>
              <p>
                {campaignDetails.financialDetails?.sharePrice}
                <span className='text-faint text-[12px] font-extralight'>AED</span>
              </p>
            </div>
            <div className="flex gap-2 justify-between">
              <p className="text-[12px] text-faint tracking-[1.5px] uppercase">
              {t('fundedCampaign.minimumInvestment')}
              </p>
              <hr className="shrink-0 grow border-dotted self-center"/>
              <p>
                {campaignDetails.financialDetails?.MinimumInvestmentAmount}
                <span className='text-faint text-[12px] font-extralight'>AED/{campaignDetails.financialDetails?.MinimumInvestmentShare} Shares</span>
              </p>
            </div>
          </div>
         
           
        </div>
      </div>
    </section>
  );
}

export default FundedCampaignPage;