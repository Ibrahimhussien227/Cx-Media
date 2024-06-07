"use client";
import React from "react";
import FileInput from "@/components/FileInput";
import { useGetContactQuery } from "../../../store/services/configuration/contactApi";

/* import FileDownloadWrapper from "@/components/FileDownloadWrapper";
import { Eye } from "@/utils/icons"; */

const LegalInformation = () => {
  const { data: contactData } = useGetContactQuery();
  return (
    <div className="flex flex-col w-[100%] ">
      <div className="flex justify-between items-center sm:px-[20px] pt-[5px] pb-[20px] border-b-[#D4E4F2] border-b-[1px]">
        <div className="flex flex-col">
          <h2 className=" text-[20px] font-minion">
            Review Legal Information.
          </h2>
          <p className="text-[12px] tracking-[0]">
            View and download a copy of your legal agreements with WeProperties.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-[100%] sm:px-5 py-5">
        <FileInput
          fileName="Terms Of Use"
          fileUrl={contactData?.result.TERMS_FILE as string}         
          onClick={() => window.open(contactData?.result.TERMS_PAGE, '_blank')}
        />
        <FileInput 
          fileName="Privacy Policy"
          fileUrl={contactData?.result.PRIVACY_POLICY_FILE as string}        
          onClick={() => window.open(contactData?.result.PRIVACY_POLICY_PAGE, '_blank')}
        />
      </div>
    </div>
  );
};

export default LegalInformation;
