import React from "react";

import DownloadWrapper from "@/components/DownloadWrapper";
import FileUploader from "@/components/FileUploaderProfile";
import TextInput from "@/components/TextInput";

const KYCProfile = () => {
  return (
    <div className="mt-1 py-5 px-3 bg-white">
      <div className="grid md:grid-cols-1 gap-4 mb-2">
        <FileUploader label="Profile Picture" readOnly />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <TextInput value="" label="Full Legal Name" readOnly />
        <TextInput value="" label="Date of Birth" readOnly />
        <TextInput value="" label="ID Document Type" readOnly />
        <TextInput value="" label="ID Document Number" readOnly />
        <div className="w-full">
          <DownloadWrapper
            value={""}
            secondaryLabel="ID Document Copy"
            readOnly
          />
        </div>
        <TextInput value="" label="Address" readOnly />
      </div>
    </div>
  );
};

export default KYCProfile;
