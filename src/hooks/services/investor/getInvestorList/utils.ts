import { IGetInvestorListResponse } from "@/store/services/investors/investorsApi/investorsList/type";
import { organizeDate } from "@/utils/dateOrganize";

export const filterInvestorsList = (
  data: IGetInvestorListResponse["result"],
) => {
  return data.map((field) => {
    return {
      _id: field.userId,
      fullName: field.profile.accountName,
      email: field.emailId,
      phone: field.mobileNumber,
      accountLevel: field.profile.investorType,
      profileStatus: field.profile.profileCompletionStatus,
      kycStatus: field.profile.kycStatus,
      bankAccount: field.profile.IsBankDetailsUpdated,
      accountId: field.userId,
      createdAt: organizeDate(field.profile.registrationTimestamp),
      updatedAt: organizeDate(field.profile.lastUpdateTimestamp),
    };
  });
};
