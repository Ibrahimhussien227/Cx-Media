import Image from "next/image";

import GeneralInput from "@/components/GeneralInput";
import { ProfileFormProps } from "./type";
import PhoneInput from "@/components/PhoneInput";

const ProfileForm = ({ userData }: ProfileFormProps) => {
  const {
    profilePictureMediaId,
    firstName,
    lastName,
    email,
    mobileNumber,
    countryCode,
  } = userData;

  return (
    <div className="flex flex-col justify-center gap-y-4 items-start w-full">
      <div className="flex flex-row  items-center w-full justify-start">
        <div className="w-[45%] p-[25px] flex flex-row items-center">
          <label className="lg:min-w-[180px] min-w-[100px] font-semibold text-[10px] text-secondary flex tracking-[1.5px] mb-0 mr-[12px]">
            PROFILE PICTURE
          </label>
          {/* <UserImageUpload /> */}
          <div className="w-[100%]">
            <Image
              unoptimized
              width={500}
              height={500}
              className="w-[70px] h-[70px] border rounded-full bg-white"
              src={profilePictureMediaId ?? ""}
              alt=""
            />
          </div>
        </div>
        <p className="w-[35%] text-[#93A0C3] text-[12px] tracking-[0px] border-l py-1 pl-4">
          Upload a picture from your profile. Use a .jpeg or .png with max file
          size of 5 MB.
        </p>
      </div>
      <div className="w-[45%] p-[25px] flex flex-col justify-center gap-y-4 items-center">
        <GeneralInput
          label="FULL LEGAL NAME"
          name="legalName"
          placeholder="FULL LEGAL NAME"
          type="text"
          value={firstName + " " + lastName}
          readOnly
        />
        <GeneralInput
          label="EMAIL"
          name="email"
          placeholder="Email"
          type="text"
          value={email}
          readOnly
        />

        <div className="w-full">
          <PhoneInput
            isReadOnly
            label="PHONE NUMBER"
            value={mobileNumber}
            countryCode={countryCode}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
