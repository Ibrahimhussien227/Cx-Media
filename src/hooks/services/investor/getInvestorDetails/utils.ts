import { IInvestorDetailsData } from "@/store/services/investors/investorDetailsApi/type";

export const filterInvestorDetails = (data: IInvestorDetailsData["result"]) => {
  console.log(data);

  return {
    application: {
      _id: data.applicationId,
      status: data?.applicationStatus,
    },
    identity: {
      name: data?.user?.fullName,
      email: data?.user?.emailId,
      phoneNumber: data?.user?.mobileNumber,
      countryCode: data?.user?.countryCode,
    },
    kycStatus: {
      kycVerify: false, // missing
      kycStatus: data?.kycStatus,
    },
    residentialAddress: {
      residentialType: data.address?.residenceType,
      address: data?.address?.addressLine1,
      country: data?.address?.country,
      city: data?.address?.city,
      addressProofType: data?.address?.addressProofType,
      addressProof: data?.address?.addressProofDocument, // FILE ( string url)
      relativeName: data?.address?.friendRelativeName,
      relativeId: data?.address?.friendRelativeProofDocument, // FILE ( string url)
    },
    fundSource: {
      sourceOfFunds: data?.sourceOfFunds,
      sourceOfFundsProof: data?.sourceOfFundsProof,
    },
    wealthSource: {
      sourceOfWealth: data?.wealthSource,
      sourceOfWealthProof: data?.wealthSourceProof,
    },
    investorBackground: {
      investmentsExperience: data?.investmentsExperience,
      socialStatus: data?.socialStatus,
      creditRisk: data?.creditRisk,
      employmentStatus: data?.employmentStatus,
      employerName: data?.employment?.employerName,
      employerAddress: data?.employment?.employerAddress,
      countryOfEmployment: data?.employment?.countryOfEmployment,
      jobTitle: data?.employment?.jobTitle,
      employmentIndustry: data?.employment?.employmentIndustry,
      annualSalaryRange: data?.employment?.annualSalaryRange,
    },
    otherDocuments: {
      otherDocuments: data?.otherDocuments,
    },
    other: {
      investorId: data?.investorId,
      accountLevel: data?.investorType,
      profileStatus: data?.user?.isActive == true ? "ACTIVE" : "BLOCKED",
    },
  };
};
