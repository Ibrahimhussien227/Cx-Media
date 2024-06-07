import StatusCell from "@/components/CustomTable/_comps/StatusCell";

export const tabOptions: IOption[] = [
  {
    display: "Investor Application",
    value: "investor",
  },
  {
    display: "Seller Registration",
    value: "seller",
  },
  {
    display: "Investor Account Upgrade",
    value: "upgrade",
  },
];

export const InvColumns = [
  {
    accessorKey: "accountId",
    header: "Account ID",
  },
  {
    accessorKey: "applicationType",
    header: "Application Type",
  },
  {
    id: "applicationStatus",
    accessorKey: "applicationStatus",
    type: "select",
    header: "Application Status",
    cell: StatusCell,
  },

  {
    accessorKey: "applicationId",
    header: "Application ID",
  },
  {
    accessorKey: "submittedOn",
    header: "Submitted On",
  },
  {
    accessorKey: "lastUpdate",
    header: "Last Update",
  },
  {
    accessorKey: "updatedBy",
    header: "Updated By",
  },
];

export const SelColumns = [
  {
    accessorKey: "accountId",
    header: "Account ID",
  },
  {
    accessorKey: "applicationType",
    header: "Application Type",
  },
  {
    id: "applicationStatus",
    accessorKey: "applicationStatus",
    type: "select",
    header: "Application Status",
    cell: StatusCell,
  },
  {
    id: "kycStatus",
    accessorKey: "kycStatus",
    type: "select",
    header: "KYC Status",
    cell: StatusCell,
  },
  {
    accessorKey: "applicationId",
    header: "Application ID",
  },
  {
    accessorKey: "submittedOn",
    header: "Submitted On",
  },
  {
    accessorKey: "lastUpdate",
    header: "Last Update",
  },
  {
    accessorKey: "updatedBy",
    header: "Updated By",
  },
];
export const STATUSOPTIONS = {
  applicationStatus: [
    { value: "DRAFT", display: "DRAFT" },
    { value: "PENDING", display: "PENDING" },
    { value: "ACTION_REQUIRED", display: "ACTION REQUIRED" },
    { value: "APPROVED", display: "APPROVED" },
    { value: "REJECTED", display: "REJECTED" },
  ],
};
