import { IDataCellsTransfers } from "./type";

export const HeadCellTransfers: IHeadCell[] = [
  {
    id: 1,
    key: "listing",
    label: "Listing",
  },
  {
    id: 2,
    key: "shares",
    label: "Shares",
  },
  {
    id: 3,
    key: "cost",
    label: "Costs",
  },
  {
    id: 4,
    key: "return",
    label: "Return",
  },
  {
    id: 5,
    key: "appreciation",
    label: "Appreciacion",
  },
  {
    id: 6,
    key: "grossYield",
    label: "Gross Yield",
  },
  {
    id: 7,
    key: "netYield",
    label: "Net Yield",
  },
  {
    id: 8,
    key: "listedOn",
    label: "Listed On",
  },
];

export const data: IDataCellsTransfers[] = [
  {
    id: "e25411f3-f4e0-432a-bab8-25d3c3291f96",
    listing: "a",
    shares: 1000,
    costs: 1580,
    return: 6.0,
    appreciation: 9.0,
    grossYield: 7.25,
    netYield: 6.1,
    listingOn: "23 Oct, 2023",
  },
  {
    id: "3c5ef2b7-d3d0-462c-a1e7-4e40930edb1d",
    listing: "a",
    shares: 1000,
    costs: 1580,
    return: 6.0,
    appreciation: 9.0,
    grossYield: 7.25,
    netYield: 6.1,
    listingOn: "23 Oct, 2023",
  },

  // {
  //   id: 3,
  //   name: "e",
  //   status: "PROCESSING",
  //   shares: 3000,
  //   earnings: 1,
  //   puschased: "23 Oct, 2023",
  // },
];
