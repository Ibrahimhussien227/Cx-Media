import { IDataCellsTransfers } from "./type";

export const HeadCellTransfers: IHeadCell[] = [
  {
    id: 1,
    key: "listing",
    label: "Listing",
  },
  {
    id: 2,
    key: "status",
    label: "Status",
  },
  {
    id: 3,
    key: "shares",
    label: "Shares",
  },
  {
    id: 4,
    key: "cost",
    label: "Cost",
  },
  {
    id: 5,
    key: "lastUpdate",
    label: "Last Update",
  },
];

export const data: IDataCellsTransfers[] = [
  {
    id: 1,
    listing: "a",
    status: "TRANSFER LISTED",
    shares: 1580,
    cost: 2000.0,
    lastUpdate: "23 Oct, 2023",
  },
  {
    id: 2,
    listing: "a",
    status: "TRANSFER LISTED",
    shares: 1580,
    cost: 2000.0,
    lastUpdate: "23 Oct, 2023",
  },
  {
    id: 3,
    listing: "a",
    status: "TRANSFER LISTED",
    shares: 1580,
    cost: 2000.0,
    lastUpdate: "23 Oct, 2023",
  },
  {
    id: 4,
    listing: "a",
    status: "TRANSFER LISTED",
    shares: 1580,
    cost: 2000.0,
    lastUpdate: "23 Oct, 2023",
  },
];

export const TotalEarningsData = {
  one: {
    desciption: "Listed or Queued",
    amount: "0",
    percentage: 0,
  },
  two: {
    desciption: "Processing",
    amount: "0",
    percentage: 0,
  },
  three: {
    desciption: "Sold/Transferred",
    amount: "0",
    percentage: 0,
  },
};
