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
    title: "Block User?",
    description: "Are you sure you want to block the selected user?",
    BtnLabel: "BLOCK",
  },
  ACTIVATE: {
    title: "Activate User Access?",
    description:
      "Are you sure you want to activate this user’s access to the system?",
    BtnLabel: "ACTIVATE",
  },
};

export const pageSections = [
  {
    title: "Account Details",
    description: "Manage & View details of account",
    statusState: { name: "Active", color: "green-status" },
    href: "",
  },
  {
    title: "Settings",
    description: "Manage settings",
    href: "settings",
  },
];

export const logsData = [
  {
    accessorKey: "_id",
    header: "Account ID",
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
