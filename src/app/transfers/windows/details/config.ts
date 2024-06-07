export const ACTIONS: IAction[] = [
  {
    title: "Close Window",
    status: "CLOSE",
  },
];

export const STATSCARDS = [
  { title: "Total Listings", count: "" },
  { title: "Completed Trades", count: "" },
  { title: "Cancelled Trades", count: "" },
  { title: "Total Listed Shares", count: "" },
  { title: "Bought Shares", count: "" },
  { title: "Unsold Shares", count: "" },
  { title: "Total Listed Value", count: "" },
  { title: "Bought Value", count: "" },
  { title: "Unsold Value", count: "" },
];

export const COLUMNS = [
  {
    id: "campaignId",
    accessorKey: "_id",
    header: "Campaign ID",
  },
  {
    id: "propertyId",
    accessorKey: "propertyId",
    header: "Property ID",
  },
  {
    id: "listedShares",
    accessorKey: "listedShares",
    header: "Listed Shares",
  },
  {
    id: "boughtShares",
    accessorKey: "boughtShares",
    header: "Bought Shares",
  },
  {
    id: "unsoldShares",
    accessorKey: "unsoldShares",
    header: "Unsold Shares",
  },
  {
    id: "listedValue",
    accessorKey: "listedValue",
    header: "Listed Value",
  },
  {
    id: "boughtValue",
    accessorKey: "boughtValue",
    header: "Bought Value",
  },
  {
    id: "unsoldValue",
    accessorKey: "unsoldValue",
    header: "Unsold Value",
  },
];
