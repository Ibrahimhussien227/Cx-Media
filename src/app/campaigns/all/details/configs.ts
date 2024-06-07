export const adminstrationLogsHeader = [
  {
    accessorKey: "campaignId",
    header: "Campaign ID",
  },
  {
    accessorKey: "approvedAt",
    header: "Approved At",
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
  },
  {
    accessorKey: "updatedBy",
    header: "Updated By",
  },
];

export const feesListHeaders = [
  {
    accessorKey: "Amount",
    header: "Amount",
  },
  {
    accessorKey: "Status",
    header: "Status",
  },
  {
    accessorKey: "Timestamp",
    header: "Timestamp",
  },
  {
    accessorKey: "PaymentMethod",
    header: "Payment Method",
  },
];

export const feesListData = [
  {
    _id: "ABHf5677676GH",
    data: {
      Amount: "200.00 AED",
      Status: "Complete",
      Timestamp: "11:22:33 | 23/11/2202",
      PaymentMethod: "**** **** **** 7654",
    },
  },
  {
    _id: "ABHf5677676GH",
    data: {
      Amount: "300.00 AED",
      Status: "Pending",
      Timestamp: "10:20:30 | 24/11/2202",
      PaymentMethod: "**** **** **** 1234",
    },
  },
];

export const campaignActions: IAction[] = [
  {
    title: "Add Extension",
    status: "ADD_EXTENSION",
  },
  {
    title: "unlist",
    status: "UNLISTED",
  },
  {
    title: "Generate Share Certificates",
    status: "GENERATE",
  },
];

export const MODALS = {
  ADD_EXTENSION: {
    title: "Extend Campaign?",
    description: "Are you sure you want to extend the campaign by days?",
    BtnLabel: "EXTEND",
  },
  UNLISTED: {
    title: "Unlist Campaign?",
    description: "Are you sure you want to Unlist the campaign from system?",
    BtnLabel: "UNLIST",
  },
  GENERATE: {
    title: "Activate Campaign?",
    description:
      "Are you sure you want to reactivate the campaign from system?",
    BtnLabel: "PROCEED",
  },
};

export const pageSections = [
  {
    title: "Dashboard",
    description: "View campaign details.",
    href: "",
  },
  {
    title: "Investments",
    description: "View campaign investments.",
    href: "cap-table",
  },
  {
    title: "Settings",
    description: "Manage campaign settings.",
    href: "settings",
  },
];

export const EXTENDDAYS: IOption[] = [
  { value: "15", display: "15 Days" },
  { value: "30", display: "30 Days" },
];
