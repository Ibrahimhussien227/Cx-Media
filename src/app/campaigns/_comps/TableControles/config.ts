
import { sortConfig } from "./types";


export const sortConfigs : sortConfig[] = [
  {
    keyToSort: "campaignCreationTimestamp",
    direction: "DESC",
    display: "Newst (Default)", 
  },
  {
    keyToSort: "campaignCreationTimestamp",
    direction: "ASC",
    display: "oldest" 
  },
  {
    keyToSort: "campaignPublishingTimestamp",
    direction: "DESC",
    display: "Newst (Publishing)", 
  },
  {
    keyToSort: "campaignPublishingTimestamp",
    direction: "ASC",
    display: "oldest(Publishing)" 
  },
  {
    keyToSort: "campaignCloseTimestamp",
    direction: "DESC",
    display: "Newst (CloseTimestamp)", 
  },
  {
    keyToSort: "campaignCloseTimestamp",
    direction: "ASC",
    display: "oldest(CloseTimestamp)" 
  },
  {
    keyToSort: "campaignExitTimestamp",
    direction: "DESC",
    display: "Newst (ExitTimestamp)", 
  },
  {
    keyToSort: "campaignExitTimestamp",
    direction: "ASC",
    display: "oldest(ExitTimestamp)" 
  },
  {
    keyToSort: "updatedAt",
    direction: "DESC",
    display: "Newst (updatedAt)", 
  },
  {
    keyToSort: "updatedAt",
    direction: "ASC",
    display: "oldest(updatedAt)" 
  },
  {
    keyToSort: "propertyPrice",
    direction: "DESC",
    display: "Newst (propertyPrice)", 
  },
  {
    keyToSort: "propertyPrice",
    direction: "ASC",
    display: "oldest(propertyPrice)" 
  },
  {
    keyToSort: "projectedAnnualizedReturn",
    direction: "DESC",
    display: "Newst (AnnualizedReturn)", 
  },
  {
    keyToSort: "projectedAnnualizedReturn",
    direction: "ASC",
    display: "oldest(AnnualizedReturn)" 
  },
  {
    keyToSort: "projectedAnnualAppreciation",
    direction: "DESC",
    display: "Newst (AnnualAppreciation)", 
  },
  {
    keyToSort: "projectedAnnualAppreciation",
    direction: "ASC",
    display: "oldest(AnnualAppreciation)" 
  },
  {
    keyToSort: "projectedNetYield",
    direction: "DESC",
    display: "Newst (NetYield)", 
  },
  {
    keyToSort: "projectedNetYield",
    direction: "ASC",
    display: "oldest(NetYield)" 
  },
  {
    keyToSort: "projectedGrossYield",
    direction: "DESC",
    display: "Newst (GrossYield)", 
  },
  {
    keyToSort: "projectedGrossYield",
    direction: "ASC",
    display: "oldest(GrossYield)" 
  }
];

