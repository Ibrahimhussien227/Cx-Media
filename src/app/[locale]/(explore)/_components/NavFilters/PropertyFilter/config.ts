import * as icons from "@/utils/icons";

export const TABOPTIONS: IOption[] = [
  {
    display: "Available",
    value: "AVAILABLE",
  },
  {
    display: "Funded",
    value: "FUNDED",
  },
  {
    display: "Exited",
    value: "EXITED",
  },
];

export const FILTEROPTIONS: IOption[] = [
  {
    value: "campaignCreationTimestamp",
    display: "Newest (Default)",
    sortOrder: "ASC",
  },
  { value: "propertyPrice", display: "Price: Low", sortOrder: "DESC" },
  { value: "propertyPrice", display: "Price: High", sortOrder: "ASC" },
  {
    value: "projectedAnnualizedReturn",
    display: "Annualized Return: Low",
    sortOrder: "DESC",
  },
  {
    value: "projectedAnnualizedReturn",
    display: "Annualized Return: High",
    sortOrder: "ASC",
  },
  {
    value: "projectedAnnualAppreciation",
    display: "Annualized Appreciation: Low",
    sortOrder: "DESC",
  },
  {
    value: "projectedAnnualAppreciation",
    display: "Annualized Appreciation: High",
    sortOrder: "ASC",
  },
  {
    value: "projectedNetYield",
    display: "Projected Net Yield: Low",
    sortOrder: "DESC",
  },
  {
    value: "projectedNetYield",
    display: "Projected Net Yield: High",
    sortOrder: "ASC",
  },
  {
    value: "projectedGrossYield",
    display: "Projected Gross Yield: Low",
    sortOrder: "DESC",
  },
  {
    value: "projectedGrossYield",
    display: "Projected Gross Yield: High",
    sortOrder: "ASC",
  },
  { value: "campaignCreationTimestamp", display: "Oldest", sortOrder: "DESC" },
];

export const GRIDOPTION = [
  { value: "grid", icon: icons["DotsNine"] },
  { value: "list", icon: icons["List"] },
];
