import {
  IGetSellerAppLicationListResponse,
  IGetSellerStatsResponse,
} from "@/store/services/sellers/applicationsApi/type";
import { organizeDate } from "@/utils/dateOrganize";
import { IGetInvestorsAppStats } from "./type";
import { IGetInvestorApplicationListResponse } from "@/store/services/investors/applicationsApi/applicationList/type";

export const filterInveAppsList = (
  data: IGetInvestorApplicationListResponse["result"],
) => {
  return data.map((field) => {
    return {
      _id: field.userId,
      // investorId: field.investorId,
      accountId: field.userId,
      applicationId: field.applicationId,
      submittedOn: organizeDate(field.applicationCreationTimestamp),
      applicationType: "Investor Application",
      applicationStatus: field.applicationStatus,
      lastUpdate: organizeDate(field.applicationUpdateTimestamp),
      updatedBy: field.applicationUpdatedBy,
    };
  });
};

export const filterSellerAppsList = (
  data?: IGetSellerAppLicationListResponse["data"],
) => {
  console.log(data);

  return data?.map((field) => {
    return {
      _id: field.sellerId,
      // sellerId: field.sellerId,
      accountId: field.userId,
      applicationType: field.sellerType,
      applicationStatus: field.applicationReviewStatus,
      applicationId: field.applicationId,
      submittedOn: organizeDate(field.accountCreationDate),
      lastUpdate: organizeDate(field.lastUpdateTimestamp),
      updatedBy: field.updatedBy,
    };
  });
};

// export const filterApplicationStats = (data: IGetInvestorsAppStats) => {
//   return Object.keys(data).map((el) => {
//     return { title: el, count: data[el as keyof typeof data] + "" };
//   });
// };

export const filterApplicationStatsInvestor = (
  stats?: IGetInvestorsAppStats,
) => {
  return [
    {
      title: "Total Applications",
      icon: "XCircle",
      value: stats?.TOTAL?.toString(),
    },
    {
      title: "Pending Applications",
      icon: "Clock",
      value: stats?.PENDING?.toString(),
    },
    {
      title: "Approved Applications",
      icon: "CheckCircle",
      value: stats?.VERIFIED?.toString(),
    },
    {
      title: "Rejected Applications",
      icon: "WarningCircle",
      value: stats?.REJECTED?.toString(),
    },
  ];
};
export const filterApplicationStatsSeller = (
  stats?: IGetSellerStatsResponse["data"],
) => {
  return [
    {
      title: "Total Applications",
      icon: "Users",
      value: stats?.TOTAL?.toString(),
    },
    {
      title: "Pending Applications",
      icon: "WarningCircle",
      value: stats?.PENDING?.toString(),
    },
    {
      title: "Approved Applications",
      icon: "CheckCircle",
      value: stats?.APPROVED?.toString(),
    },
    {
      title: "Rejected Applications",
      icon: "Prohibit",
      value: stats?.REJECTED?.toString(),
    },
  ];
};
