import StatusCell from "@/components/CustomTable/_comps/StatusCell";

export const STATUSOPTIONS = {
  reviewStatus: [
    { value: "DRAFT", display: "DRAFT" },
    { value: "PENDING REVIEW", display: "PENDING REVIEW" },
    { value: "PENDING FEE", display: "PENDING FEE" },
    { value: "REJECTED", display: "REJECTED" },
  ],
};

export const COLUMNS = [
  {
    id: "assetName",
    accessorKey: "property.name",
    header: "Property Name",
  },
  {
    id: "reviewStatus",
    type: "select",
    accessorKey: "property.reviewStatus",
    header: "Status",
    cell: StatusCell,
  },
  {
    id: "sellerId",
    accessorKey: "seller._id",
    header: "Seller ID",
  },

  {
    id: "campaignCreationTimestamp",
    accessorKey: "campaign.createdAt",
    type: "date",
    header: "Created",
  },
  {
    accessorKey: "campaign.updatedAt",
    type: "date",
    header: "Last Updated",
  },
  {
    id: "campaignId",
    accessorKey: "campaign._id",
    header: "Application ID",
  },
];
