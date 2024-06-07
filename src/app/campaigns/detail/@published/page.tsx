"use client";

import StatusTag from "@/components/statusTag";
import SwitchFilter from "@/components/switchFilter";
import { SwitchFilterItem } from "@/components/switchFilter/types";
import { useGetCampaignByIdQuery } from "@/store/services/campaign/campaignDetailsApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import PublishedCampaignDashboard from "../_sections/published-dashboard";
import PublishedCampaignSettings from "../_sections/published-settings";
import { useEffect } from "react";
import { createQueryString } from "../../utils";

// published === available
const PublishedCampaignPage =()=> {
  const {t} = useTranslation("campaignsPage");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const {data } = useGetCampaignByIdQuery(searchParams.get('id') as string);// won't fetch really, will be taken from cache as the layout ran first and stored ! value
  const campaignDetails = data && data.data;
  
  const sectionsNavItems: SwitchFilterItem[] = [
    { name: t("publishedCampaign.dashboard"), param: 'section', value: "dashboard"},
    { name: t("publishedCampaign.settings"), param: 'section', value: "settings" },
  ];

  useEffect(()=> {
    if (!searchParams.get('section')){
      router.replace(
        pathname + '?' + createQueryString(
        searchParams,
        sectionsNavItems[0].param,
        sectionsNavItems[0].value
      ))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  return campaignDetails && (
    <section className="my-5">
      
      <div className="flex gap-2 items-center">
        <h2 className="text-xl capitalize">
          {campaignDetails.assetDetails?.assetName}
        </h2>
        <StatusTag text={campaignDetails.campaignStatus} color="green" />
      </div>
      
      <hr className="my-6"/>
      <menu className="my-6 w-fit">
        <SwitchFilter searchParams={searchParams} items={sectionsNavItems} />
      </menu>

      {searchParams.get('section') === 'settings'? (
        <PublishedCampaignSettings campaignDetails={campaignDetails} />
      ):(
        <PublishedCampaignDashboard campaignDetails={campaignDetails} />
      )}
    </section>
  );
}



export default PublishedCampaignPage