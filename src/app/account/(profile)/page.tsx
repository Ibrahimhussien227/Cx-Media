"use client";

import { useMemo } from 'react';
import Accordion from "@/components/Accordion";
import CompanyInformationForm from "@/components/companyInformationForm";
import CompanyRepresentativeForm from "@/components/companyRepresentativeForm";
import CompanyIdentityContactFrom from "@/components/companyIdentityContactFrom";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/slices/user/userSlice";
import { useTranslation } from "react-i18next";
import { useGetSellerProfileQuery } from "@/store/services/seller/profileApi";
import { useGetSellerCompanyDetailsQuery } from '@/store/services/seller/companyApi';
import StatusTag from '@/components/statusTag/index';
import { SellerTypeEnum } from "@/types/enum.constants";
import { useGetKYCInfoQuery } from '@/store/services/kyc/api';


const Profile =()=> {
  const {t} = useTranslation("accountPage");
  const user = useAppSelector(selectCurrentUser) as IUserState;
  const {data: sellerProfile, isLoading: isLoadingUser} = useGetSellerProfileQuery();
  const {data: companyData, isLoading: isLoadingCompany} = useGetSellerCompanyDetailsQuery(
    sellerProfile?.data.sellerId as string,
    {skip: !sellerProfile?.data}
  );
  const {data : kycResp } = useGetKYCInfoQuery();
  const KYCInfo = kycResp?.result;

  
  const companyDetails = useMemo(() => {
    if (!isLoadingCompany && !isLoadingUser && companyData && sellerProfile) {
      const companyDetailsFromResponse = {
        userPhoto: KYCInfo?.profilePicture,
        companyName: companyData.data?.companyName || "",
        companyAddress_1: companyData.data?.companyAddress_1,
        companyAddress_2: companyData.data?.companyAddress_2,
        country: companyData.data?.country,
        city: companyData.data?.city,
        postalCode: companyData.data?.postalCode,
        companyTaxId: companyData.data?.companyTaxId || "",
        numOfEmployees: companyData.data?.numOfEmployees || 0,
        fullLegalName: companyData.data?.companyRepresentativeDetails?.fullLegalName || "",
        jobProfile: companyData.data?.companyRepresentativeDetails?.jobProfile || "",
        officialEmail: companyData.data?.companyRepresentativeDetails?.officialEmail || "",
        officialPhoneNumber: companyData.data?.companyRepresentativeDetails?.officialPhoneNumber || "",
        countryCode: companyData.data?.companyRepresentativeDetails?.countryCode || "",
        tradeLicenseFile: companyData?.data?.isRegistrationLicenseUploaded ? sellerProfile?.data?.mediaFiles?.find((fileObj) => fileObj.fileKey === "tradeLicenseFile") : null,
        taxCertificateFile: companyData.data?.isTaxCertificateUploaded ? sellerProfile.data?.mediaFiles?.find((fileObj) => fileObj.fileKey === "taxCertificateFile") : null,
        employmentProofFile: companyData.data?.companyRepresentativeDetails?.isEmploymentProofUploaded ? sellerProfile.data?.mediaFiles?.find((fileObj) => fileObj.fileKey === "employmentProofFile") : null,
      };   
      return companyDetailsFromResponse;
    }
   
    return null;
  }, [isLoadingCompany, isLoadingUser, companyData, sellerProfile, KYCInfo]);
  

  return (
    <div className="sm:px-5 w-full">
      <div className="flex flex-col border-b p-4 mb-[20px]">
        <h2 className="text-[#FFFFFF] text-[20px] font-minion flex items-center">
          Seller Profile
          <span className="ml-2 flex">
            <StatusTag text={user?.sellerType + " ACCOUNT"} color="white" />
          </span>
        </h2>
        <p className="text-[#BFC5D5] text-[12px] tracking-[0]">         
          {t("content")}
        </p>
      </div>
      <Accordion title="Identity & Contact Details">
      {companyDetails && (
        <CompanyIdentityContactFrom formData={companyDetails} />
        )}
      </Accordion>
      {user?.sellerType === SellerTypeEnum.BUSINESS && (
        <>
        {companyDetails && (
          <>  <Accordion title="Company Information">
          <CompanyInformationForm formData={companyDetails}  readOnly={true} dispatchFormAction={() => {}}/>
        </Accordion>
        <Accordion title="Company Representative Details">
          <CompanyRepresentativeForm formData={companyDetails}  readOnly={true} dispatchFormAction={() => {}}/>
        </Accordion></>
        )}
        
        </>
      )}
    </div>
  );

}

export default Profile;