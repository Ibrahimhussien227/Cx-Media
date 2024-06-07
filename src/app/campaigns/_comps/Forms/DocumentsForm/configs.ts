import { TFileKey } from "./type";

export const LABEL = {
  titleDeedFile: {
    title: "Title Deed",
    placeHolder: "Upload Property Title Deed",
  },
  investorMemoFile: {
    title: "Upload Investor Memo",
    placeHolder: "Investor Memo",
  },
  valuationReportFile: {
    title: "Valuation Report",
    placeHolder: "Upload Property Valuation Reporty",
  },
  rentalContractsFile: {
    title: "Rental Contracts",
    placeHolder: "Upload Rental Contracts",
  },
  projectionReportFile: {
    title: "Projections",
    placeHolder: "Upload Projections",
  },
};

export const requiredKeys: TFileKey[] = [
  "titleDeedFile",
  "valuationReportFile",
  "rentalContractsFile",
  "projectionReportFile",
  "investorMemoFile",
];
