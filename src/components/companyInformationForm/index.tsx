"use client";
import React, { useMemo } from "react";
import FileUploader from "../FileUploader";
import { useTranslation } from "react-i18next";
import { LabeledInput, TextInput } from "@/components/TextInputs";
import { CountryCitiesOps, countryOptions } from "./configs";
import CustomSelect from "../customSelect";


const CompanyInformationForm = ({
  formData,
  dispatchFormAction,
  readOnly
}: ICompanyInfoFormProps) => {
  
  const { t } = useTranslation("formDetail");
  
  const onFormChange =(type: string, payload: null | File | string | number)=> {
    dispatchFormAction && dispatchFormAction({type, payload})
  }

  const citiesOptions = useMemo(()=> {
    return CountryCitiesOps[(formData.country || "UAE") as keyof typeof CountryCitiesOps]
  }, [formData.country]);

  
  return (
    <form className="flex flex-col justify-center gap-y-4 items-center w-full">
      <div className="flex w-full items-center">
        <LabeledInput
          readOnly={readOnly}
          label={t("companyInformationForm.companyName")}
          placeholder={t("companyInformationForm.companyNamePlaceholder")}
          note={t("companyInformationForm.companyNameContent")}
          className="w-full"
          name="companyName"
          value={formData && formData.companyName}        
          onChange={(ev)=> onFormChange('SET_COMPANY_NAME', ev.target.value)}
        />
      </div>
      <div className={`grid sm:grid-cols-[0.5fr_1fr_1fr] grid-cols-[0.5fr_1fr] gap-5 justify-center w-full`}>
        <label className="inline-block font-bold text-[10px] text-[#93A0C3] tracking-[1.5px] mb-0">
          {t("companyInformationForm.address")}
        </label>
        <div className="flex flex-col gap-4">
          <TextInput
            readOnly={readOnly}
            placeholder={t("companyInformationForm.addressPlaceholder")}
            name="address1"
            value={formData && formData.companyAddress_1}
            onChange={(ev)=> onFormChange('SET_COMPANY_ADDRESS1',ev.target.value)}
          />
          <TextInput
            readOnly={readOnly}
            placeholder={t("companyInformationForm.address2Placeholder")}
            name="address2"
            value={formData && formData.companyAddress_2}
            onChange={(ev)=> onFormChange('SET_COMPANY_ADDRESS2',ev.target.value)}
          />
          <TextInput
            readOnly={readOnly}
            placeholder={t("companyInformationForm.postalCodePlaceHolder")}
            name="postalCode"
            type="number"
            value={formData && formData.postalCode}
            onChange={(ev)=> onFormChange('SET_POSTAL_CODE', +ev.target.value)}
          />
          <CustomSelect
            options={countryOptions}
            placeholder={t("companyInformationForm.SelectPlaceHolder")}
            value={countryOptions.find(
              (op) => op.value === formData.country
            )}
            onSelect={(selectedOp: IOption) => onFormChange('SET_COUNTRY', selectedOp.value)}
          />
          <CustomSelect
              options={citiesOptions}
              placeholder={t("companyInformationForm.SelectPlaceHolder")}
              value={citiesOptions.find(
                (op) => op.value === formData.city
              )}
              onSelect={(selectedOp: IOption) => onFormChange('SET_CITY', selectedOp.value)}
            />
        </div>
        <span className="text-[#93A0C3] text-[12px] tracking-[0px] sm:flex hidden shrink-none pl-[20px] border-l-[1px]">
          {t("companyInformationForm.addressContent")}
        </span>
      </div>
      <div className="flex w-full items-center">
        <LabeledInput
          readOnly={readOnly}
          label={t("companyInformationForm.taxId")}
          placeholder={t("companyInformationForm.taxIdPlaceholder")}
          note={t("companyInformationForm.taxIdContent")}
          className="w-full"
          name="taxId"
          value={formData && formData.companyTaxId}
          onChange={(ev)=> onFormChange('SET_TAX_ID', ev.target.value)}
          maxLength={15}
        />
      </div>
      <div className="flex w-full items-center">
        <LabeledInput
          readOnly={readOnly}
          label={t("companyInformationForm.employeeCount")}
          placeholder={t("companyInformationForm.employeeCountPlaceholder")}
          type="number"
          note={t("companyInformationForm.employeeCountContent")}
          className="w-full"
          name="numOfEmployees"
          value={formData && formData.numOfEmployees}
          onChange={(ev)=> onFormChange('SET_EMPLOYEE_COUNT', +ev.target.value)}
        />
      </div>
      <div className="flex w-full items-center">
        <FileUploader
          readOnly={readOnly}
          onFileChange={(file) => onFormChange('SET_LICENSE', file)}
          label={t("companyInformationForm.tradeLicenseCopy")}
          placeholder={t("companyInformationForm.tradeLicenseCopyPlaceholder")}
          note={t("companyInformationForm.tradeLicenseCopyContent")}
          className="w-full"
          value={formData && formData.tradeLicenseFile }

        />
      </div>
      <div className="flex w-full items-center">
     
        <FileUploader
          readOnly={readOnly}
          onFileChange={(file) => onFormChange('SET_TAX_CERTIFICATE',  file)}
          label={t("companyInformationForm.taxCertificateCopy")}
          placeholder={t(
            "companyInformationForm.taxCertificateCopyPlaceholder"
          )}
          note={t("companyInformationForm.taxCertificateCopyContent")}
          className="w-full"
          value={formData && formData.taxCertificateFile}
        />
      </div>
    </form>
  );
};

export default CompanyInformationForm;
