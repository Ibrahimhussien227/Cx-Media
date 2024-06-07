"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Button from "@/components/button";
import { tableColumns } from "./config";
import { campaignStates, campaignStatus } from "@/types/enum.constants";
import { Info, Plus } from "@/utils/icons/index";
import CustomTable from "@/components/CustomTable";
import { useLazyGetCampaignsQuery } from "@/store/services/campaign/campaignDetailsApi";
import { CampaignModal, FundedCampaignTr, PublishedCampaignTr, TableControles, UnpublishedCampaignTr } from "./_comps";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation";
import StatsCard from "@/components/StatsCard";

const CampaignsPage = () => {
  const {t} = useTranslation("campaignsPage");
  const searchParams = useSearchParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const [campaignsQueryParams, setCampaignQueryParams] = useState<ICampaignListQueryParams>({})
  const [getCampaigns, {data : campaigns, isLoading}] = useLazyGetCampaignsQuery();

  useEffect(()=> {
    getCampaigns(campaignsQueryParams, true)//prefer cached data
  }, [getCampaigns, campaignsQueryParams])

  const handleTableParamsChange = useCallback((param: Partial<ICampaignListQueryParams>)=>{
    setCampaignQueryParams(prevParams=> ({...prevParams, ...param}))
  }, [])

  const [userHasCreatedCampaign, setUserHasCreatedCampaign] = useState(Boolean(campaigns?.data.length));
  useEffect(()=> { // if there is data with any params, or if already set to true before on previous renders we take it 
    setUserHasCreatedCampaign(prevState=> prevState || Boolean(campaigns?.data.length))
  }, [campaigns])


  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const campaignTypeTrMap = {
    [campaignStates.UNPUBLISHED]: UnpublishedCampaignTr,
    [campaignStatus.AVAILABLE]: PublishedCampaignTr,
    [campaignStatus.FUNDED]: FundedCampaignTr 
  }


  return (
    <>
      <header className="sm:px-10 px-5 py-5 flex items-center border-b-[1px] justify-between">
        <h1 className="text-[20px]">
          {t("title")}
        </h1>
        <Button onClick={openModal} color="#FF6C02">
          {t("createCampaign")}
          <Plus size={14} className="ml-[10px]" />
        </Button>

        <CampaignModal onClose={closeModal} isOpen={isModalOpen} />
      </header>
      <div className="sm:px-10 px-5 py-6">
        <StatsCard title="Funds raised">
          20 AED
        </StatsCard>
      </div>
      <hr className="my-2 mx-10"/>
      {userHasCreatedCampaign ? (
        <div className="py-5 sm:px-10 px-5">
          
          <TableControles handleTableParamsChange={handleTableParamsChange} />

          {campaigns?.data.length ? (
            <CustomTable<ICampaignDetails>
              columns={
                tableColumns[(searchParams.get('status') || campaignStates.UNPUBLISHED) as keyof typeof tableColumns]
              }
              data={campaigns.data}
            >
              {(row: ICampaignDetails) => {
                const TrComp = campaignTypeTrMap[(searchParams.get('status') || campaignStates.UNPUBLISHED) as keyof typeof campaignTypeTrMap];
                return <TrComp data={row}/>
              }}
            </CustomTable>
          ):(
            <div className="min-h-[400px] grid place-items-center content-center gap-3 lg:min-h-[700px">
              <Info color="#93A0C3" weight="bold" size={20}/>
              <p className="text-[12px] font-extralight tracking-normal">
                {t(`no${searchParams.get('status') === campaignStatus.FUNDED? 'Funded':'Published'}Campaigns`)}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="h-[80vh] max-w-64 m-auto flex flex-col items-center gap-5 text-center justify-center">
          <h2
            className={`text-lg leading-8 p-2 relative after:block after:w-8 after:h-[1px] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-orange after:rounded-sm`}
          >
            {t("createCampaignTitle")}
          </h2>
          <p className="text-[#BFC5D5] text-sm leading-4 tracking-normal">
            {t("createCampaignContent")}
          </p>
          <Button onClick={openModal} color="#FF6C02" className="w-full">
            {t("create")}
            <Plus size={14} className="ml-[10px]" />
          </Button>
        </div>
      )}
    </>
  );
};

export default CampaignsPage;
