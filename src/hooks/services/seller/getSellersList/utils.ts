import {
  IGetSellerApplicationStatsResponse,
  IGetSellersListResponse,
} from "@/store/services/sellers/listApi/type";
import { organizeDate } from "@/utils/dateOrganize";

export const filterSellersList = (data: IGetSellersListResponse["data"]) => {
  return data.map((field: IGetSellersListResponse["data"][0]) => {
    return {
      _id: field.sellerId,
      fullName: field.sellerName,
      sellerType: field.sellerType,
      profileStatus: field.profileStatus,
      kycStatus: field.kycStatus,
      email: field.userDetails.emailId,
      phone: field.userDetails.mobileNumber,
      accountId: field.userDetails.userId,
      createdAt: organizeDate(field.accountCreationDate),
      updatedAt: organizeDate(field.lastUpdateTimestamp),
    };
  });
};

export const filterSellerStats = (
  stats?: IGetSellerApplicationStatsResponse["data"],
) => {
  return [
    {
      title: "Total Sellers",
      icon: "XCircle",
      value: stats?.TOTAL?.toString(),
    },
    {
      title: "Individual Sellers",
      icon: "CheckCircle",
      value: stats?.INDIVIDUAL?.toString(),
    },
    {
      title: "Business Sellers",
      icon: "WarningCircle",
      value: stats?.BUSINESS?.toString(),
    },
    {
      title: "Blocked Sellers",
      icon: "Clock",
      value: stats?.REGISTERED?.toString(),
    },
  ];
};
