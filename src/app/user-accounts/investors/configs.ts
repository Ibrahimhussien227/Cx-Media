import StatusCell from "@/components/CustomTable/_comps/StatusCell";

export const tabOptions: IOption[] = [
  {
    display: "Registered",
    value: "registered",
  },
  {
    display: "Retail",
    value: "retail",
  },
  {
    display: "Professional",
    value: "professional",
  },
];

export const statsData = [
  { title: "Total Users", count: "973" },
  { title: "Acitve", count: "674" },
  { title: "Blocked", count: "135" },
  { title: "KYC Verified", count: "0" },
];

export const columns = [
  {
    accessorKey: "_id",
    header: "Investor ID",
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "accountLevel",
    header: "Account Level",
  },
  {
    id: "profileStatus",
    header: "Profile Status",
    accessorKey: "profileStatus",
    type: "select",
    cell: StatusCell,
  },
  {
    id: "kycStatus",
    accessorKey: "kycStatus",
    header: "KYC Status",
    type: "select",
    cell: StatusCell,
  },
  {
    accessorKey: "bankAccount",
    header: "Bank Account",
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
    accessorKey: "accountId",
    header: "Account ID",
  },
  {
    accessorKey: "createdAt",
    header: "Account Created",
    type: "date",
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    type: "date",
  },
];

export const data = [
  {
    _id: "aCXM-1",
    fullName: "dAhmed",
    email: "test@example.com",
    phone: "+79053752552",
    level: "Registered",
    status: { name: "Active", color: "green-status" },
    kycStatus: { name: "KYC PENDING", color: "yellow-status" },
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
    kycStatus: { name: "KYC PENDING", color: "yellow-status" },
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
    kycStatus: { name: "KYC PENDING", color: "yellow-status" },
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
    kycStatus: { name: "KYC PENDING", color: "yellow-status" },
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
    kycStatus: { name: "KYC PENDING", color: "yellow-status" },
    createdAt: "11:22:32 | 20/12/2023",
    updatedAt: "11:22:32 | 20/12/2023",
    updatedBy: "CXM-4",
  },
  {
    _id: "ahmed mohamed",
    fullName: "Ahmed",
    email: "test@example.com",
    phone: "+79053752552",
    level: "Registered",
    status: { name: "Active", color: "green-status" },
    kycStatus: { name: "KYC PENDING", color: "yellow-status" },
    createdAt: "11:22:32 | 20/12/2023",
    updatedAt: "11:22:32 | 20/12/2023",
    updatedBy: "CXM-4",
  },
];

// export const accountActions: IAction[] = [
//   {
//     title: "Accept",
//     // handler() {
//     //   console.log("I do some asunc action");
//     // },
//   },
//   {
//     title: "Reject",
//     // handler() {
//     //   console.log("I do some asunc action");
//     // },
//   },
//   {
//     title: "Trash",
//     // handler() {
//     //   console.log("I do some asunc action");
//     // },
//   },
// ];

export const logsData = [
  {
    accessorKey: "_id",
    header: "Application ID",
  },
  {
    accessorKey: "updatedAt",
    header: "Created On",
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
export const accountDetailsData = {
  fullName: "John Doe",
  email: "john@email.com",
  phone: {
    countryCode: "+971",
    phoneNumber: "987 654 7788",
  },
};
export const companyRepresentativeData = {
  fullName: "John Doe",
  email: "john@email.com",
  jobProfile: "Company Secretary",
  kycStatus: "Verified",
  employmentProof: "albert_employment.pdf",
  phone: {
    countryCode: "+971",
    phoneNumber: "987 654 7788",
  },
};

export const residentialAddressData = {
  addressLine1: "Interchange 8 - Al Dhaid Rd",
  addressLine2: "Sharjah - United Arab Emirates",
  country: "United Arab Emirates",
  city: "Dubai",
  area: "Business Bay",
  addressProof: "aaaa.svg",
};

export const employmentStatusData = {
  employmentType: "Employed",
  companyName: "ABC Company",
  companyAddress: "401, Building Name, Street",
  countryEmployment: "United Arab Emirates",
  jobTitle: "Product Designer",
  annualSalary: "Salary Range Dropdown",
};
export const companyDetailsData = {
  companyName: "Employed",
  noOfEmployees: "ABC Company",
  taxID: "401, Building Name, Street",
  taxCertificate: "United Arab Emirates",
  registrationTradeLicense: "Product Designer",
  addressLine1: "Employed",
  addressLine2: "ABC Company",
  postalCode: "401, Building Name, Street",
  country: "United Arab Emirates",
  city: "Product Designer",
};
export const employmentType: IOption[] = [
  {
    value: "Employed",
    display: "Employed",
  },
  {
    value: "Manager",
    display: "Manager",
  },
];

export const country: IOption[] = [
  {
    value: "us",
    display: "United States",
  },
  {
    value: "canada",
    display: "Canada",
  },
];

export const cities: IOption[] = [
  {
    value: "newyork",
    display: "New York",
  },
  {
    value: "masco",
    display: "Masco",
  },
];

export const annualSalary: IOption[] = [
  {
    value: "1",
    display: "Salary Range Dropdown",
  },
  {
    value: "2",
    display: "Salary Range Dropdown",
  },
];

export const wealthSource: IOption[] = [
  {
    value: "1",
    display: "Savings from Employment Earnings",
  },
  {
    value: "2",
    display: "Savings from Employment Earnings",
  },
];

export const investmentExperience: IOption[] = [
  {
    value: "1",
    display: "Beginner",
  },
  {
    value: "2",
    display: "Experience",
  },
];

export const socialStatus: IOption[] = [
  {
    value: "1",
    display: "Beginner",
  },
  {
    value: "2",
    display: "Experience",
  },
];

export const kycStatusDetailsData = {
  kycStatus: "Verified",
  kycVerification: "Enabled",
  fullLegalName: "John Doe",
  dateOfBirth: "13 February, 2024",
  idDocumentType: "Passport",
  idDocumentNumber: "L1234567",
  idDocumentCopy: "scott_passport.pdf",
  address: "401, Building Name, Street",
};

export const kycStatus: IOption[] = [
  {
    value: "1",
    display: "Verified",
  },
  {
    value: "2",
    display: "Un-Verified",
  },
];

export const STATUSOPTIONS = {
  profileStatus: [
    { value: "ACTIVE", display: "ACTIVE" },
    { value: "BLOCKED", display: "BLOCKED" },
  ],
  kycStatus: [
    { value: "KYC_PENDING", display: "KYC PENDING" },
    { value: "KYC_VERIFIED", display: "KYC VERIFIED" },
    { value: "KYC_EXPIRED", display: "KYC EXPIRED" },
  ],
};
