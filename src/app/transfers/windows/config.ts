import StatusCell from "@/components/CustomTable/_comps/StatusCell";

export const STATUSOPTIONS = {
  windowStatus: [
    { value: "LIVE", display: "LIVE" },
    { value: "SCHEDULED", display: "SCHEDULED" },
    { value: "COMPLETED", display: "COMPLETED" },
    { value: "CLOSED", display: "CLOSED" },
  ],
};

export const columns = [
  {
    id: "windowId",
    accessorKey: "_id",
    header: "Window ID",
  },
  {
    id: "startDate",
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    id: "endDate",
    accessorKey: "endDate",
    header: "End Date",
  },
  {
    id: "windowStatus",
    type: "select",
    accessorKey: "windowStatus",
    header: "Status",
    cell: StatusCell,
  },
  {
    id: "campaignCreationTimestamp",
    type: "date",
    accessorKey: "createdAt",
    header: "Created on",
  },
  {
    accessorKey: "updatedAt",
    type: "date",
    header: "Last Update",
  },
  {
    id: "updatedBy",
    accessorKey: "updatedBy",
    header: "Updated by",
  },
];

export const data = [
  {
    _id: "aCXM-1",
    startDate: "dAhmed",
    endDate: "test@example.com",
    phone: "+79053752552",
    windowStatus: "LIVE",
    createdAt: "11:22:32 | 20/12/2023",
    updatedAt: "11:22:32 | 20/12/2023",
    updatedBy: "CXM-4",
  },
  {
    _id: "aCXM-1",
    startDate: "dAhmed",
    endDate: "test@example.com",
    phone: "+79053752552",
    windowStatus: "SCHEDULED",
    createdAt: "11:22:32 | 20/12/2023",
    updatedAt: "11:22:32 | 20/12/2023",
    updatedBy: "CXM-4",
  },
  {
    _id: "aCXM-1",
    startDate: "dAhmed",
    endDate: "test@example.com",
    phone: "+79053752552",
    windowStatus: "COMPLETE",
    createdAt: "11:22:32 | 20/12/2023",
    updatedAt: "11:22:32 | 20/12/2023",
    updatedBy: "CXM-4",
  },
  {
    _id: "aCXM-1",
    startDate: "dAhmed",
    endDate: "test@example.com",
    phone: "+79053752552",
    windowStatus: "CLOSED",
    createdAt: "11:22:32 | 20/12/2023",
    updatedAt: "11:22:32 | 20/12/2023",
    updatedBy: "CXM-4",
  },
];
