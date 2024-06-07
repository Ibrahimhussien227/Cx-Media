import type { LineChartProps } from "./_comps/Chart/Line";

export const statsDefaultData = [
  {
    title: "Total Campaign Listing",
    icon: "Book",
    value: 1_230_134,
  },
  {
    title: "Total Investors",
    icon: "Wallet",
    value: 1_650_868,
  },
  {
    title: "Total Sellers",
    icon: "CartUp",
    value: 2_705_976,
  },
  {
    title: "Total Users",
    icon: "Users",
    value: 14_340_542,
  },
];

export const insightsDefaultData = [
  {
    title: "Avg. Investor Verification Time",
    value: "1Hr 32Mins.",
  },
  {
    title: "Avg. Time to First Investment",
    value: "2Hr 12Mins.",
  },
  {
    title: "Avg. Investment Ticket Size",
    value: "1000.00 AED",
  },
  {
    title: "Largest Investment Ticket",
    value: "5,80,865.00 AED",
  },
  {
    title: "Avg. Seller Verification Time",
    value: "2Hr 12Mins.",
  },
  {
    title: "Avg. Time to Fund a Listing",
    value: "65 Days",
  },
  {
    title: "Avg. Campaign Listing / Seller",
    value: "2",
  },
  {
    title: "Avg. Funded Campaigns / Seller",
    value: "2",
  },
];

export const sellerDefaultData = [
  {
    title: "Registered",
    value: 1_231,
    color: "#2C3A5C",
  },
  { title: "Unverified", value: 296, color: "#FF5A5A" },
  { title: "Individual", value: 8_987, color: "#04CB9C" },
  { title: "Business", value: 3_233, color: "#FF6C02" },
];

export const investorsDefaultData = [
  {
    title: "Registered",
    value: 6_124,
    color: "#2C3A5C",
  },
  { title: "Unverified", value: 2_097, color: "#FF5A5A" },
  { title: "Individual", value: 4_133, color: "#04CB9C" },
  { title: "Business", value: 1_098, color: "#FF6C02" },
];

const lineChartDefaultLabels = ["M", "T", "W", "T", "F", "S", "S"];
const _lineChartDefaultData = [1436, 6981, 9378, 8028, 4572, 2246, 9865];
export const lineChartDefaultData: LineChartProps["data"] = {
  labels: lineChartDefaultLabels,
  datasets: [
    {
      data: _lineChartDefaultData,
      borderColor: "#2C3A5C",
      backgroundColor: "#2C3A5C",
    },
  ],
};

export const campaignsDefaultData = [
  { title: "Available", bgColor: "#0CC375", value: 2_543 },
  { title: "Funded", bgColor: "#FF6C02", value: 1_987 },
  { title: "Scheduled", bgColor: "#009DFF", value: 2_153 },
  { title: "Exited", bgColor: "#FF5A5A", value: 3_089 },
  { title: "Unpublished", bgColor: "#EAAA02", value: 2_980 },
  { title: "Refunded", bgColor: "#333333", value: 432 },
  { title: "Unlisted", bgColor: "#989898", value: 325 },
];

export const usersNationalityDefaultData = [
  {
    id: 1,
    nationality: "American",
    totalUsers: 1403719,
  },
  {
    id: 2,
    nationality: "British",
    totalUsers: 1779945,
  },
  {
    id: 3,
    nationality: "Canadian",
    totalUsers: 1131149,
  },
  {
    id: 4,
    nationality: "Australian",
    totalUsers: 1417194,
  },
  {
    id: 5,
    nationality: "Indian",
    totalUsers: 1670557,
  },
  {
    id: 6,
    nationality: "German",
    totalUsers: 1855472,
  },
  {
    id: 7,
    nationality: "French",
    totalUsers: 1228290,
  },
  {
    id: 8,
    nationality: "Japanese",
    totalUsers: 1354285,
  },
  {
    id: 9,
    nationality: "Chinese",
    totalUsers: 1496318,
  },
  {
    id: 10,
    nationality: "Brazilian",
    totalUsers: 1939254,
  },
  {
    id: 11,
    nationality: "Mexican",
    totalUsers: 1469463,
  },
  {
    id: 12,
    nationality: "Russian",
    totalUsers: 1527143,
  },
  {
    id: 13,
    nationality: "Italian",
    totalUsers: 1751492,
  },
  {
    id: 14,
    nationality: "Spanish",
    totalUsers: 1051831,
  },
  {
    id: 15,
    nationality: "Dutch",
    totalUsers: 1599896,
  },
  {
    id: 16,
    nationality: "Swedish",
    totalUsers: 1343945,
  },
  {
    id: 17,
    nationality: "Norwegian",
    totalUsers: 1679515,
  },
  {
    id: 18,
    nationality: "Finnish",
    totalUsers: 1987179,
  },
  {
    id: 19,
    nationality: "Danish",
    totalUsers: 1247268,
  },
  {
    id: 20,
    nationality: "Polish",
    totalUsers: 1057649,
  },
  {
    id: 21,
    nationality: "Greek",
    totalUsers: 1166582,
  },
  {
    id: 22,
    nationality: "Turkish",
    totalUsers: 1779378,
  },
  {
    id: 23,
    nationality: "Korean",
    totalUsers: 1023053,
  },
  {
    id: 24,
    nationality: "Vietnamese",
    totalUsers: 1735901,
  },
  {
    id: 25,
    nationality: "South African",
    totalUsers: 1755929,
  },
];
