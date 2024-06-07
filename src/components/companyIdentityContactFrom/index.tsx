"use client";

import ImageUploader from "../../components/imageUploader";
import PhoneInput from "../../components/phoneInput";

import { useTranslation } from "react-i18next";
import { LabeledInput } from "@/components/TextInputs";
import  { PencilSimple }  from "../../utils/icons";
import { ICompanyIdentityContactFroms } from "./types";


const CompanyIdentityContactFrom = ({
  formData, 
  readOnly
}: ICompanyIdentityContactFroms) => {
  const { t } = useTranslation("formDetail");

  return (
    <form className="flex flex-col justify-center gap-y-4 items-center w-full mt-5">
      
      <div className="grid grid-cols-[0.5fr_1fr_1fr] gap-5 justify-center w-full">
        <label className="inline-block font-bold text-[10px] text-[#93A0C3] tracking-[1.5px] mb-0">
          {t("companyIdentityContactFrom.profilePicture")}
        </label>
        <ImageUploader
          onChange={(file) => {}}
          className="min-h-[70px] w-[70px] rounded-[70px]"          
          value={{filePath: formData?.userPhoto as string}}
          readOnly={readOnly}
        >
          <span className="absolute bottom-0 right-0 w-[25px] h-[25px] rounded-[25px] border bg-[#232F4B] p-[5px]">
            <PencilSimple size="14" color="#ffffff" />
          </span>
        </ImageUploader>
        <span className="text-[#93A0C3] sm:flex hidden text-[12px] tracking-[0px] shrink-none pl-[20px] border-l-[1px]">Upload a picture for your profile. Use a .jpeg or .png with max file size of 5 MB.</span>
      </div>
    
      <LabeledInput
        readOnly={readOnly}
        label={t("companyIdentityContactFrom.fullName")}
        note='Your full legal name as it appears on your valid identity proof document.'
        className="w-full"
        value={formData && formData?.fullLegalName}
      />
      {formData?.officialEmail && (
        <LabeledInput
          readOnly={readOnly}
          label={t("companyRepresentativeForm.companyEmail")}
          note="A valid email that we can use to contact you and send you updates."
          className="w-full"
          value={formData?.officialEmail}          
        />
      )}

      <PhoneInput         
        label={t("companyRepresentativeForm.phoneNumber")}
        note="A valid phone number that we can use to contact you and send you updates."       
        countryCodeValue={formData?.countryCode}
        phoneNumberValue={formData?.officialPhoneNumber}   
        
      />
      
    </form>
  );
};

export default CompanyIdentityContactFrom;
