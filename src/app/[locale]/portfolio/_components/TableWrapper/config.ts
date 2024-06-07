import { IDataCellsPortfolio } from "./type";

export const HeadCellPortfolio: IHeadCell[] = [
  {
    id: 1,
    key: "name",
    label: "NAME",
  },
  {
    id: 2,
    key: "status",
    label: "STATUS",
  },
  {
    id: 3,
    key: "shares",
    label: "SHARES",
  },
  {
    id: 4,
    key: "earnings",
    label: "EARNINGS",
  },
  {
    id: 5,
    key: "lastUpdated",
    label: "LAST UPDATE",
  },
];

export const data: IDataCellsPortfolio[] = [
  {
    id: 1,
    name: "a",
    status: "PROCESSING",
    shares: 2,
    earnings: 2,
    puschased: "23 Oct, 2023",
  },
  {
    id: 6,
    name: "b",
    status: "PROCESSING",
    shares: 3,
    earnings: 2,
    puschased: "23 Oct, 2023",
  },
  {
    id: 4,
    name: "c",
    status: "PROCESSING",
    shares: 3,
    earnings: 3,
    puschased: "23 Oct, 2023",
  },
  {
    id: 2,
    name: "d",
    status: "PROCESSING",
    shares: 3000,
    earnings: 3,
    puschased: "23 Oct, 2023",
  },
  {
    id: 3,
    name: "e",
    status: "PROCESSING",
    shares: 3000,
    earnings: 1,
    puschased: "23 Oct, 2023",
  },
];
