export const pageSections = [
  {
    title: "Overview",
    description: "View details for seller",
    statusState: { name: "Active", color: "green-status" },
    href: "",
  },
  {
    title: "Seller Profile",
    description: "Manage & View details of account",
    statusState: { name: "Active", color: "green-status" },
    href: "profile",
  },
  {
    title: "KYC Status",
    description: "view KYC details",
    href: "kyc-status",
  },
  {
    title: "Payments",
    description: "View transaction",
    statusState: { name: "Active", color: "green-status" },
    href: "payments",
  },
];

// -------------------------------------------------------

export const KycLogsData = [
  {
    status: "APPROVED",
    type: "CXM-1",
    date: "11:22:32 | 20/12/2023",
  },
  {
    status: "EXPIRED",
    type: "System",
    date: "11:22:32 | 20/12/2023",
  },
  {
    status: "APPROVED",
    type: "System",
    date: "11:22:32 | 20/12/2023",
  },
];

// -------------------------------------------------------

export const accountDetailsLogs = [
  {
    accessorKey: "_id",
    header: "Account ID",
  },
  {
    accessorKey: "status",
    header: "Account Status",
  },
];

export const accountDetailsData = {
  _id: "aCXM-1",
  status: "ACTIVE",
};

// --------------------------------------------------------

export const AdminLogs = [
  {
    accessorKey: "registerdOn",
    header: "Registerd On",
  },
  {
    accessorKey: "ActivatedOn",
    header: "Activated On",
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

export const AdminData = {
  registerdOn: "11:22:36 | 23/12/2023",
  ActivatedOn: "11:22:36 | 23/12/2023",
  lastUpdate: "11:22:36 | 23/12/2023",
  updatedBy: "CXM-123",
};

// ----------------------------------------------------------

export const accountActions: IAction[] = [
  {
    title: "Block",
    status: "BLOCK",
  },
  {
    title: "Activate",
    status: "ACTIVATE",
  },
];

export const MODALS = {
  BLOCK: {
    title: "Block Seller Access?",
    description:
      "Are you sure you want to block this seller’s access to the system?",
    BtnLabel: "BLOCK",
  },
  ACTIVATE: {
    title: "Activate Seller Access?",
    description:
      "Are you sure you want to activate this seller’s access to the system?",
    BtnLabel: "ACTIVATE",
  },
};
