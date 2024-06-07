"use client";

import React, { useEffect, useReducer } from 'react';
import CompanyInformationForm from "@/components/companyInformationForm";
import CompanyRepresentativeForm from "@/components/companyRepresentativeForm";
import { useTranslation } from "react-i18next";
import { ISetupSectionProps } from '../../@business/types';
import { companyInfoReducer } from './companyInfoReducer';
import { useCreateSellerCompanyMutation, useUpdateSellerCompanyMutation } from '@/store/services/seller/companyApi';


const CompanyInformation = ({user: sellerProfile, configActionBtn}:ISetupSectionProps) => {
  // State for Company Information Form
  const {t} = useTranslation("accountPage");

  const [createSellerCompany] = useCreateSellerCompanyMutation();
  const [updateSellerCompany] = useUpdateSellerCompanyMutation();

  const apiCompanyDetails = sellerProfile?.companyDetails;
  const [companyInfoState, dispatch] = useReducer(companyInfoReducer, {
    details: {
      companyName: apiCompanyDetails?.companyName,
      companyAddress_1: apiCompanyDetails?.companyAddress_1,
      companyAddress_2: apiCompanyDetails?.companyAddress_2,
      country: apiCompanyDetails?.country,
      city: apiCompanyDetails?.city,
      postalCode: apiCompanyDetails?.postalCode,
      companyTaxId: apiCompanyDetails?.companyTaxId,
      numOfEmployees: apiCompanyDetails?.numOfEmployees,
      fullLegalName: apiCompanyDetails?.companyRepresentativeDetails?.fullLegalName,
      jobProfile: apiCompanyDetails?.companyRepresentativeDetails?.jobProfile,
      officialEmail: apiCompanyDetails?.companyRepresentativeDetails?.officialEmail,
      officialPhoneNumber: apiCompanyDetails?.companyRepresentativeDetails?.officialPhoneNumber,
      countryCode: apiCompanyDetails?.companyRepresentativeDetails?.countryCode,
      tradeLicenseFile: apiCompanyDetails?.isRegistrationLicenseUploaded? sellerProfile?.mediaFiles?.find(fileObj=> fileObj.fileKey === "tradeLicenseFile"): null,
      taxCertificateFile: apiCompanyDetails?.isTaxCertificateUploaded? sellerProfile?.mediaFiles?.find(fileObj=> fileObj.fileKey === "taxCertificateFile"): null,
      employmentProofFile: apiCompanyDetails?.companyRepresentativeDetails?.isEmploymentProofUploaded? sellerProfile?.mediaFiles?.find(fileObj=> fileObj.fileKey === "employmentProofFile"): null,
    },
    apiCompanyDetails: apiCompanyDetails || {},
    actionBtnConfig: {disabled: true},
    createSellerCompany,
    updateSellerCompany,
    changedFields: {
      companyName: false,
    },
  })
  useEffect(()=> {
    if (configActionBtn) {
      configActionBtn(companyInfoState.actionBtnConfig)
    }
  }, [companyInfoState.actionBtnConfig, configActionBtn])
 
  return (
    <div className="flex flex-col w-[100%] ">
      <div className="flex flex-col w-[100%] border-b-[1px]">
        <div className="flex items-center py-[20px] justify-between">
          <div className="flex flex-col">
            <h2 className="text-[#FFFFFF] text-[20px] font-minion">
            {t("companyInformationPage.title")}
            </h2>
            <p className="text-[#BFC5D5] text-[12px] tracking-[0]">
            {t("companyInformationPage.content")}
            </p>
          </div>
          
        </div>
      </div>
      <div className="flex flex-col w-[100%] pb-[15px] pt-[25px] border-b-[1px]">
        <CompanyInformationForm formData={companyInfoState.details} dispatchFormAction={dispatch} />

      </div>
      <div className="flex flex-col w-[100%] border-b-[1px]">
        <div className="flex items-center py-[20px] justify-between">
          <div className="flex flex-col">
            <h2 className="text-[#FFFFFF] text-[20px] font-minion">
            {t("companyInformationPage.titleRepresentative")}
            </h2>
            <p className="text-[#BFC5D5] text-[12px] tracking-[0]">
            {t("companyInformationPage.contentRepresentative")}
            </p>
          </div>
          
        </div>
      </div>
      <div className="flex flex-col w-[100%] pb-[15px] pt-[25px]">
        <CompanyRepresentativeForm formData={companyInfoState.details} dispatchFormAction={dispatch} />
      </div>
  
    </div>
  );
};

export default CompanyInformation;
