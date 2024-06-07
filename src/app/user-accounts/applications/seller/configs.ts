export const KycLogsData = [
  {
    status: "DRAFT",
    type: "System",
    date: "11:22:32 | 20/12/2023",
  },
];

export const accountDetailsLogs = [
  {
    accessorKey: "_id",
    header: "Account ID",
  },
  {
    type: "status",
    accessorKey: "status",
    header: "Account Status",
  },
];

export const accountDetailsData = {
  _id: "aCXM-1",
  status: "ACTIVE",
};

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
    type: "id",
  },
];

export const AdminData = {
  registerdOn: "11:22:36 | 23/12/2023",
  ActivatedOn: "11:22:36 | 23/12/2023",
  lastUpdate: "11:22:36 | 23/12/2023",
  updatedBy: "CXM-123",
};

// --------------------------------------------------------

export const currencyOptions: { display: string; value: "AED" | "USD" }[] = [
  {
    value: "AED",
    display: "AED (Default)",
  },
  {
    value: "USD",
    display: "USD",
  },
];

// ______________________________________________________________

export const accountActions: IAction[] = [
  {
    title: "Reject",
    status: "REJECT",
  },
  {
    title: "Accept",
    status: "ACCEPT",
  },
];

export const MODALS = {
  REJECT: {
    title: "Reject Application?",
    description: "Are you sure you want to reject the investor application?",
    BtnLabel: "REJECT",
  },
  ACCEPT: {
    title: "Approve Application?",
    description: "Are you sure you want to approve the investor application?",
    BtnLabel: "APPROVE",
  },
};

// ______________________________________________________________

export const roleLevels: IOption[] = [
  {
    value: "level-1",
    display: "level-1",
  },
  {
    value: "level-2",
    display: "level-2",
  },
  {
    value: "level-3",
    display: "level-3",
  },
  {
    value: "level-4",
    display: "level-4",
  },
];

export const logsData = [
  {
    accessorKey: "_id",
    header: "Application ID",
  },
  {
    accessorKey: "createdAt",
    header: "Application Created",
  },
  {
    accessorKey: "accountId",
    header: "Account ID",
  },
  {
    accessorKey: "kycValidity",
    header: "KYC Validity",
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

export const companyRepresentativeData = {
  fullName: "John Doe",
  jobProfile: "Company Secretary",
  email: "john@email.com",
  phone: {
    countryCode: "+971",
    phoneNumber: "987 654 7788",
  },
  employmentProofFile: "albert_employment.pdf",
};

export const companyDetailsData = {
  companyName: "ABC Company",
  companyAddress: "1207, Building Name, Street Name, Area, City, Country",
  taxId: "CID-9856789",
  noOfEmployment: "1500",
  licenseFile: "jacon-license.pdf",
  taxCertificateFile: "jacon-tax-certificate",
};
