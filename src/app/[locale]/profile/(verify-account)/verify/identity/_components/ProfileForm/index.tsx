import Image from "next/image";

import DownloadWrapper from "@/components/DownloadWrapper";
import GeneralInput from "@/components/GeneralInput";
import { ProfileFormProps } from "./type";

const ProfileForm = ({ kycData }: ProfileFormProps) => {
  const { dob, document_number, name, selected_type } =
    kycData.metaData.verification_data.document;

  return (
    <div className="flex flex-col justify-center gap-y-4 items-center w-[50%]">
      <div className="flex w-full items-center">
        <label className="lg:min-w-[180px] min-w-[100px] font-semibold text-[10px] text-secondary flex tracking-[1.5px] mb-0 mr-[12px]">
          SELFIE
        </label>
        <div className="w-[100%]">
          {/* <UserImageUpload /> */}
          <Image
            unoptimized
            width={500}
            height={500}
            className="w-[70px] h-[70px] border rounded-full bg-white"
            src={kycData.profilePicture}
            alt={kycData.profilePicture}
          />
        </div>
      </div>
      <GeneralInput
        label="FULL LEGAL NAME"
        name="legalName"
        placeholder="FULL LEGAL NAME"
        type="text"
        value={name.first_name + " " + name.last_name}
        readOnly
      />
      <GeneralInput
        label="DATE OF BIRTH"
        name="birthDate"
        placeholder="DATE OF BIRTH"
        type="text"
        value={dob}
        readOnly
      />
      <GeneralInput
        label="ID DOCUMENT TYPE"
        name="docType"
        placeholder="ID DOCUMENT TYPE"
        type="text"
        value={selected_type[0]}
        readOnly
      />
      <GeneralInput
        label="ID DOCUMENT NUMBER"
        name="docNumber"
        placeholder="ID DOCUMENT NUMBER"
        type="text"
        value={document_number}
        readOnly
      />
      <div className="flex w-full items-center">
        <label className="lg:min-w-[180px] min-w-[100px] font-semibold text-[10px] text-secondary flex tracking-[1.5px] mb-0">
          ID DOCUMENT COPY
        </label>
        <DownloadWrapper
          disabled
          value="Passport"
          filePath={kycData.kycDoc}
          className="w-full"
          edit
        />
      </div>
    </div>
  );
};

export default ProfileForm;
