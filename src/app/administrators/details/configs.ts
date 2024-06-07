export const ADMINSTRATIONLOGSHEADER = [
  {
    accessorKey: "registeredOn",
    header: "Registered On",
  },
  {
    accessorKey: "activeOn",
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

export const ADMINISTRATIONDATA = {
  registeredOn: "11:22:36 | 23/12/2023",
  activeOn: "11:22:36 | 23/12/2023",
  updatedAt: "11:22:36 | 23/12/2023",
  updatedBy: "11:22:36 | 23/12/2023",
};

// export const ADMINISTRATIONACTION: IAction[] = [
//   {
//     title: "BLOCKED",
//   },
//   {}
// ];

export const pageSections = [
  {
    title: "Account Details",
    description: "Manage & View details account.",
    href: "",
  },

  {
    title: "Settings",
    description: "Manage settings.",
    href: "settings",
  },
];

export const accountActions: IAction[] = [
  {
    title: "BLOCKED",
    status: "BLOCKED",
  },
  {
    title: "ACTIVE",
    status: "ACTIVE",
  },
];

export const MODALS = {
  BLOCKED: {
    title: "Block User?",
    description: "Are you sure you want to block the selected user?",
    BtnLabel: "BLOCK",
  },
  ACTIVE: {
    title: "Reactivate User?",
    description: "Are you sure you want to reactivate this user?",
    BtnLabel: "CONFIRM",
  },
};

export const ApplicationLogsData = [
  {
    status: "DRAFT",
    type: "SID-1",
    date: "11:22:32 | 20/12/2023",
  },
];
