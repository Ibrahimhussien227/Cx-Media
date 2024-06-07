// import { ISellerDetailsData } from "?./type";

import { ISellerDetailsResponse } from "@/store/services/sellers/sellerDetailsApi/type";

export const filterSellerDetails = (data: ISellerDetailsResponse["data"]) => {
  return {
    application: {
      _id: data.applicationId,
      status: data?.applicationReviewStatus,
    },
    identity: {
      name: data?.userDetails?.fullName,
      email: data?.userDetails?.emailId,
      phoneNumber: data?.userDetails?.mobileNumber,
      countryCode: "missing",
    },
    kycStatus: {
      kycVerify: false,
      kycStatus: data?.kycStatus,
    },
    companyRepresentative: {
      companyId: data?.companyDetails?.companyId,
      name: data?.companyDetails?.companyRepresentativeDetails?.fullLegalName,
      jobProfile:
        data?.companyDetails?.companyRepresentativeDetails?.jobProfile,
      email: data?.companyDetails?.companyRepresentativeDetails?.officialEmail,
      kycStatus: "missing",
      phoneNumber:
        data?.companyDetails?.companyRepresentativeDetails?.officialPhoneNumber,
      countryCode:
        data?.companyDetails?.companyRepresentativeDetails?.countryCode,
      employmentProof: data.mediaFiles.filter(
        (doc) => doc.fileKey == "employmentProofFile",
      )[0],
    },
    companyDetails: {
      companyId: data?.companyDetails?.companyId,
      companyName: data?.companyDetails?.companyName,
      numOfEmployee: data?.companyDetails?.numOfEmployees,
      taxId: data?.companyDetails?.companyTaxId,
      taxCertification: data?.mediaFiles?.filter(
        (doc) => doc.fileKey == "taxCertificateFile",
      )[0],
      registerationLincense: data?.mediaFiles?.filter(
        (doc) => doc.fileKey == "tradeLicenseFile",
      )[0],
      addressLine1: data?.companyDetails?.companyAddress_1,
      addressLine2: data?.companyDetails?.companyAddress_2,
      postalCode: data?.companyDetails?.postalCode,
      country: data?.companyDetails?.country,
      city: data?.companyDetails?.city,
    },
    other: {
      sellerId: data?.sellerId,
      sellerType: data?.sellerType,
      profileStatus: data?.userDetails?.isActive == true ? "ACTIVE" : "BLOCKED",
      kycStatus: data?.kycStatus,
      totalCampaigns: data?.numOfCampaignManagers,
    },
  };
};
