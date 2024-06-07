export const pageSections = [
  {
    title: "Overview",
    description: "View details for investor",
    statusState: { name: "Active", color: "green-status" },
    href: "",
  },
  {
    title: "Investor Profile",
    description: "Manage & View details of investor",
    statusState: { name: "Active", color: "green-status" },
    href: "profile",
  },
  {
    title: "KYC Status",
    description: "view KYC details",
    href: "kyc-status",
  },
  {
    title: "Wallet",
    description: "Manage wallet details",
    statusState: { name: "Active", color: "green-status" },
    href: "wallet",
  },
  {
    title: "Portfolio",
    description: "View portfolio",
    statusState: { name: "Active", color: "green-status" },
    href: "portfolio",
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
    type: "id",
  },
  {
    accessorKey: "status",
    header: "Account Status",
    type: "status",
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
    status: "BLOCKED",
  },
  {
    title: "Active",
    status: "ACTIVE",
  },
];

export const MODALS = {
  BLOCKED: {
    title: "Block Seller Access?",
    description:
      "Are you sure you want to block this seller’s access to the system?",
    BtnLabel: "BLOCK",
  },
  ACTIVE: {
    title: "Activate Seller Access?",
    description:
      "Are you sure you want to activate this seller’s access to the system?",
    BtnLabel: "ACTIVATE",
  },
};
