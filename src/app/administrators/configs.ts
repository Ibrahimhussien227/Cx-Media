import StatusCell from "@/components/CustomTable/_comps/StatusCell";

export const STATUSOPTIONS = {
  status: [
    { value: "ACTIVE", display: "ACTIVE" },
    { value: "INVITED", display: "INVITED" },
    { value: "BLOCKED", display: "BLOCKED" },
  ],
};

export const COULUMNS = [
  {
    id: "userId",
    accessorKey: "userId",
    header: "Account ID",
  },
  {
    id: "fullName",
    accessorKey: "profile.firstName",
    header: "Full Name",
  },
  {
    id: "email",
    accessorKey: "profile.email",
    header: "Email",
  },
  {
    accessorKey: "level",
    header: "Account Level",
  },
  {
    accessorKey: "status",
    id: "status",
    header: "Account Status",
    cell: StatusCell,
    type: "select",
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Registered On",
    type: "date",
  },
  {
    id: "updatedAt",
    accessorKey: "updatedAt",
    header: "Last Updated",
    type: "date",
  },
];
