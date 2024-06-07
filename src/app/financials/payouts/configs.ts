import StatusCell from "@/components/CustomTable/_comps/StatusCell";

export const STATUSOPTIONS = {
  campaignStatus: [
    { value: "FUNDED", display: "FUNDED" },
    { value: "UNLISTED", display: "UNLISTED" },
  ],
};

export const TABOPTIONS: IOption[] = [
  {
    display: "Available",
    value: "available",
  },
  {
    display: "Funded",
    value: "funded",
  },
  {
    display: "Exited",
    value: "exited",
  },
];

export const COLUMNS = [
  {
    id: "campaignName",
    accessorKey: "campaignName",
    header: "Campaign ID",
  },
  {
    id: "campaignStatus",
    type: "select",
    accessorKey: "campaignState",
    header: "Status",
    cell: StatusCell,
  },
  {
    id: "walletBalance",
    accessorKey: "walletBalance",
    header: "Wallet Balance",
  },
  {
    id: "rentalYield",
    accessorKey: "rentalYield",
    header: "Rental Yield Payout",
  },
  {
    id: "propertySale",
    accessorKey: "propertySale",
    header: "Property Sale Payout",
  },
  {
    id: "lastPayout",
    accessorKey: "lastPayout",
    header: "Last Payout Amount",
  },
  {
    id: "campaignId",
    accessorKey: "campaignId",
    header: "Campaign ID",
  },
  {
    id: "campaignLastUpdated",
    type: "date",
    accessorKey: "campaignLastUpdated",
    header: "Last Updated",
  },
];
