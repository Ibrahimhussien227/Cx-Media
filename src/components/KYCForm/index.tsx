"use client";

import { useTranslation } from "react-i18next";
import { LabeledInput } from "@/components/TextInputs";
import FileInput from "@/components/FileInput";
import ImageUploader from "../imageUploader";
import { useRef, useState } from "react";
import GeneralModal from "../generalModal";

const KYCForm = ({KYCInfo}: {KYCInfo:IUserKYCInfo}) => {
  const { t } = useTranslation("formDetail");
  const verificationData = KYCInfo?.metaData.verification_data;
  const passportPreviewUrl = useRef('');
  const [showPassportModal, setShowPassportModal] = useState(false);

  const displayPassportPreview =()=> {
    if (passportPreviewUrl.current){
      setShowPassportModal(true);
      return;
    }
    if (KYCInfo?.kycDoc){
      fetch(KYCInfo.kycDoc)
      .then(resp=> resp.blob())
      .then(assetBlob=> {
        const tempUrl = window.URL.createObjectURL(new Blob([assetBlob]));
        passportPreviewUrl.current = tempUrl;
        setShowPassportModal(true);
      })
    }
    
  }

  return (
    <form className="flex flex-col justify-center gap-y-4 items-center w-full mt-5 sm:px-10  py-5">

        <div className="grid grid-cols-[0.5fr_1fr_1fr] gap-5 justify-center w-full">
          <label className="inline-block font-bold text-[10px] text-[#93A0C3] tracking-[1.5px] mb-0">
            {t("profileForm.profilePicture")}
          </label>
          <ImageUploader
            className="min-h-[80px] w-[80px] rounded-[70px]"
            readOnly={true}
            value={{filePath: KYCInfo?.profilePicture as string}}
          >
            <span className="absolute bottom-0 right-0 w-[25px] h-[25px] rounded-[25px] border bg-[#232F4B] p-[5px]">
            </span>
          </ImageUploader>
        </div>


      <LabeledInput
        label={t("profileForm.fullLegalName")}
        value={verificationData?.document.name?.first_name + " " + verificationData?.document.name?.last_name}
        className="w-full"
        readOnly={true}
      />

      <LabeledInput
        label={t("profileForm.dateBirth")}
        value={verificationData?.document.dob.split('-').reverse().join('/')}
        className="w-full"
        readOnly={true}
      />

      <LabeledInput
        label={t("profileForm.idDocumentType")}
        value="Passport"
        readOnly={true}
        className="w-full"
      />

      <LabeledInput
        label={t("profileForm.idDocumentNumber")}
        value={verificationData?.document.document_number}
        className="w-full"
        readOnly={true}
      />

      <div className="grid sm:grid-cols-[0.5fr_1fr_1fr] grid-cols-[0.5fr_1fr] gap-5 justify-center w-full">
        <div className="col-start-2">
            <FileInput
              fileName={"passport"}
              fileUrl={KYCInfo?.kycDoc as string}
              onClick={displayPassportPreview}
            />
        </div>
      </div>

      {passportPreviewUrl.current && (
        <GeneralModal
          isOpen={showPassportModal} 
          onClose={()=> setShowPassportModal(false)}
          className="min-w-[380px]"
        >
          <img
            src={passportPreviewUrl.current}
            alt="passport photo"
            width={350}
            height={350}
          />
       </GeneralModal>
      )}
    </form>
  );
};

export default KYCForm;