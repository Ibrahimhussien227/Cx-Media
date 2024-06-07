import StatusCell from "@/components/CustomTable/_comps/StatusCell";

export const STATUSOPTIONS = {
  campaignStatus: [
    { value: "UNPUBLISHED", display: "UNPUBLISHED" },
    { value: "SCHEDULED", display: "SCHEDULED" },
    { value: "AVAILABLE", display: "AVAILABLE" },
    { value: "FUNDED", display: "FUNDED" },
    { value: "EXITED", display: "EXITED" },
    { value: "REFUNDED", display: "REFUNDED" },
    { value: "UNLISTED", display: "UNLISTED" },
  ],
};

export const COLUMNS = [
  {
    id: "campaignId",
    accessorKey: "campaign._id",
    header: "Campaign ID",
  },
  {
    id: "assetName",
    accessorKey: "property.name",
    header: "Property Name",
  },
  {
    id: "campaignStatus",
    type: "select",
    accessorKey: "campaign.campaignStatus",
    header: "Status",
    cell: StatusCell,
  },
  {
    id: "sellerId",
    accessorKey: "seller._id",
    header: "Seller ID",
  },
  {
    id: "propertyPrice",
    accessorKey: "property.valuation",
    header: "Property Valuation",
  },
  {
    id: "sharePrice",
    accessorKey: "property.sharePrice",
    header: "Share Price",
  },
  {
    id: "campaignCreationTimestamp",
    type: "date",
    accessorKey: "campaign.createdAt",
    header: "Created",
  },
  {
    id: "campaignPublishingTimestamp",
    type: "date",
    accessorKey: "campaign.publishedAt",
    header: "Published",
  },
  {
    id: "campaignCloseTimestamp",
    type: "date",
    accessorKey: "campaign.closedAt",
    header: "Closed",
  },
];
