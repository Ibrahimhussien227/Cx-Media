"use client";
import React, { useCallback, useMemo, useState } from "react";
import PropertyDetail from "./_sections/property-detail";
import FeePayment from "./_sections/fee-payment";
import PublishCampaign from "./_sections/publish-campaign";
import { campaignTabOps, campaignTabStatusMap } from "./configs";
import ProgressTabs from "@/components/progressTabs";
import { useTranslation } from "react-i18next";
import { useGetCampaignByIdQuery } from "@/store/services/campaign/campaignDetailsApi";
import CampaignReview from "./_sections/campaign-review";
import { useSearchParams } from "next/navigation";


const CompaignDetailsPage = () => {
  
  const {t} = useTranslation("campaignsPage");
  const searchParams = useSearchParams();
  const {data, isLoading} = useGetCampaignByIdQuery(searchParams.get('id') as string);
  const campaignDetails = data && data.data;
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  const campaignTabs = useMemo(()=> !campaignDetails? campaignTabOps : campaignTabOps.map(tab=> {
    const campaignTabChecker = campaignTabStatusMap[tab.value as keyof typeof campaignTabStatusMap];
    if (typeof campaignTabChecker === "function"){
      return {
        ...tab,
        status: campaignTabChecker(campaignDetails)
      }
    }
    return {
      ...tab,
      status: campaignTabChecker[campaignDetails[tab.value as keyof typeof campaignDetails] as keyof typeof campaignTabChecker]
    }})
  ,[campaignDetails])

  const [actionBtnConfig, setActionBtnConfig] = useState({text: 'save changes', disabled: true})

  const configActionBtn = useCallback((configParams:Partial<actionBtnConfig>)=>{
    setActionBtnConfig(prevconfigs=> {
      if (JSON.stringify(prevconfigs).includes(JSON.stringify(configParams))) return prevconfigs
      return {...prevconfigs, ...configParams}
    })
  }, [])

  if (!campaignDetails){
    return isLoading? <>Loading...</> : <>no such campaign exists</> ; // skeleoton loaders needed
  }

  const activeTab = campaignTabs[activeTabIdx] as IProgressTabOption;

  const tabsSectionComps = {
    'propertyDetails': PropertyDetail,
    'reviewStatus': CampaignReview,
    'isFeePaid': FeePayment,
    'campaignPublishingTimestamp': PublishCampaign
  };

  const TabSectionComp = tabsSectionComps[activeTab.value as keyof typeof tabsSectionComps];


  return (
    <section>
      <div className="my-5">
        <h2 className="text-[20px] font-minion">
          {t("campaignListing")}
        </h2>
        <p className="text-[#BFC5D5] text-[12px] tracking-[0]">
          {t("campaignsContent")}
        </p>
      </div>

      <ProgressTabs
        tabs={campaignTabs as IProgressTabOption[]}// we won't reach there unless there is a user
        onChange={(tabIdx)=> setActiveTabIdx(tabIdx)}
        value={activeTab}
        actionButton={activeTab.value !== 'propertyDetails'? undefined : actionBtnConfig}
      />
      <div className="mt-3">
        {TabSectionComp && (
          <TabSectionComp
            activeTabState={{activeTabIdx, setActiveTabIdx}}
            campaignDetails={campaignDetails}
            configActionBtn={configActionBtn}
          />
        )}
      </div>
    </section>
  );
};

export default CompaignDetailsPage;
