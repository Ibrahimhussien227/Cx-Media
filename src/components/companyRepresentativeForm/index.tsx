"use client";

import React from "react";
import PhoneInput from "../phoneInput";
import FileUploader from "../FileUploader";
import { useTranslation } from "react-i18next";
import { LabeledInput } from "@/components/TextInputs";
import { ICompanyRepFormProps } from "./types";



const CompanyRepForm = ({
  formData,
  dispatchFormAction,
  readOnly
}: ICompanyRepFormProps) => {
  const { t } = useTranslation("formDetail");
 
  return (
    <form className="flex flex-col justify-center gap-y-4 items-center w-full">
      <div className="flex w-full items-center">
        <LabeledInput        
          readOnly={readOnly}
          label={t("companyRepresentativeForm.fullLegalName")}
          placeholder={t("companyRepresentativeForm.fullLegalNamePlaceholder")}
          note={t("companyRepresentativeForm.fullLegalNameContent")}
          className="w-full"
          name="fullLegalName"
          value={formData?.fullLegalName}
          onChange={(ev)=> dispatchFormAction({type: 'SET_REP_NAME', payload: ev.target.value})}         
        />
      </div>
      <div className="flex w-full items-center">
        <LabeledInput
          readOnly={readOnly}
          label={t("companyRepresentativeForm.jobProfile")}
          placeholder={t("companyRepresentativeForm.jobProfilePlaceholder")}
          note={t("companyRepresentativeForm.jobProfileContent")}
          className="w-full"
          name="jobProfile"
          value={formData?.jobProfile}
          onChange={(ev)=> dispatchFormAction({type: 'SET_REP_ROLE', payload: ev.target.value})}          
        />
      </div>
      <div className="flex w-full items-center">
        <PhoneInput
        
          label={t("companyRepresentativeForm.phoneNumber")}
          note={t("companyRepresentativeForm.phoneNumberContent")}
          countryCodeValue={formData?.countryCode}
          phoneNumberValue={formData?.officialPhoneNumber}
          setCountryCode={(code) => dispatchFormAction({ type: 'SET_COUNTRY_CODE', payload: code || '' })}
          setPhoneNumber={(newVal)=> dispatchFormAction({type: 'SET_PHONE_NUM', payload: newVal || ''})}          
        />
      </div>
      <div className="flex w-full items-center">
        <LabeledInput
          readOnly={readOnly}
          label={t("companyRepresentativeForm.companyEmail")}
          placeholder={t("companyRepresentativeForm.companyEmailPlaceholder")}
          note={t("companyRepresentativeForm.companyEmailContent")}
          className="w-full"
          name="companyEmail"
          value={formData?.officialEmail}
          onChange={(ev)=> dispatchFormAction({type: 'SET_REP_EMAIL', payload: ev.target.value})}          
        />
      </div>
      <div className="flex w-full items-center">
        <FileUploader
          readOnly={readOnly}
          label={t("companyRepresentativeForm.employmentProof")}
          placeholder={t("companyRepresentativeForm.employmentProofPlaceholder")}
          note={t("companyRepresentativeForm.employmentProofContent")}
          className="w-full"
          value={formData?.employmentProofFile}
          onFileChange={(file)=> dispatchFormAction({type: 'SET_EMPLOYEMENT_PROOF', payload: file})}
        />
      </div>
    </form>
  );
};

export default CompanyRepForm;
