import { Dispatch, SetStateAction } from "react";


export interface ICampaignSectionProps {
  activeTabState: {
    activeTabIdx: number;
    setActiveTabIdx:  Dispatch<SetStateAction<number>>//(idx:number)=> void;
  };
  campaignDetails: ICampaignDetails;
  configActionBtn: (configParams:Partial<actionBtnConfig>)=> void
}