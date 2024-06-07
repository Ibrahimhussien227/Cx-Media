import StatusCell from "@/components/CustomTable/_comps/StatusCell";

export const statsData = [
  { title: "Total Users", count: 973 },
  { title: "Investors", count: 674 },
  { title: "Sellers", count: 135 },
  { title: "Campaign Managers", count: 145 },
];

export const columns = [
  {
    accessorKey: "_id",
    header: "Account ID",
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    id: "status",
    header: "Account Status",
    accessorKey: "status",

    cell: StatusCell,
  },
  {
    id: "investor_id",
    header: "Investor",
    accessorKey: "investor.id",
  },
  {
    id: "seller_id",
    header: "Seller",
    accessorKey: "seller.id",
  },
  // columnHelper.accessor((row) => row.campaigns, {
  //   id: "campaigns",
  //   header: "Campaign manager",
  //   cell: (cellContext) => (cellContext.getValue()?.length ? "Yes" : "No"),
  // }),
  {
    accessorKey: "createdAt",
    header: "Account Created",
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
  },
];

export const data = [
  {
    _id: "aCXM-1",
    fullName: "dAhmed",
    email: "test@example.com",
    phone: "+79053752552",
    status: { name: "Active", color: "green-status" },
    preferences: {
      lang: "en",
      currency: "AED",
    },
    createdAt: "11:22:32 | 20/12/2023",
    updatedAt: "11:22:32 | 20/12/2023",
    investor_id: "abdelsalam",
    updatedBy: "CXM-4",
  },
  {
    _id: "CXM-8",
    fullName: "Ahmed",
    email: "test@example.com",
    phone: "+79053752552",
    seller_id: "abdalmalek",
    status: { name: "Active", color: "green-status" },
    preferences: {
      lang: "en",
      currency: "AED",
    },
    createdAt: "11:22:32 | 20/12/2023",
    updatedAt: "11:22:32 | 20/12/2023",
    updatedBy: "CXM-4",
  },
  {
    _id: "CXM-6",
    fullName: "John doe",
    email: "john.doe12@gmail.com",
    level: "level-4",
    status: { name: "blocked", color: "error-status" },
    preferences: {
      lang: "en",
      currency: "AED",
    },
    createdAt: "11:22:32 | 20/12/2023",
    updatedAt: "11:22:32 | 20/12/2023",
    updatedBy: "CXM-4",
  },
  {
    _id: "CXM-1",
    fullName: "Ahmed",
    email: "test@example.com",
    phone: "+79053752552",
    level: "Registered",
    status: { name: "Active", color: "green-status" },
    preferences: {
      lang: "en",
      currency: "AED",
    },
    createdAt: "11:22:32 | 20/12/2023",
    updatedAt: "11:22:32 | 20/12/2023",
    updatedBy: "CXM-4",
  },
  {
    _id: "aCXM-1",
    fullName: "Ahmed",
    email: "test@example.com",
    phone: "+79053752552",
    level: "Registered",
    status: { name: "Active", color: "green-status" },
    preferences: {
      lang: "en",
      currency: "AED",
    },
    createdAt: "11:22:32 | 20/12/2023",
    updatedAt: "11:22:32 | 20/12/2023",
    updatedBy: "CXM-4",
  },
  {
    _id: "aCXM-5",
    fullName: "Ahmed",
    email: "test@example.com",
    phone: "+79053752552",
    level: "Registered",
    status: { name: "Active", color: "green-status" },
    preferences: {
      lang: "en",
      currency: "AED",
    },
    createdAt: "11:22:32 | 20/12/2023",
    updatedAt: "11:22:32 | 20/12/2023",
    updatedBy: "CXM-4",
  },
  {
    _id: "CXt-1",
    fullName: "Ahmed",
    email: "test@example.com",
    phone: "+79053752552",
    level: "Registered",
    status: { name: "Active", color: "green-status" },
    preferences: {
      lang: "en",
      currency: "AED",
    },
    createdAt: "11:22:32 | 20/12/2023",
    updatedAt: "11:22:32 | 20/12/2023",
    updatedBy: "CXM-4",
  },
];
