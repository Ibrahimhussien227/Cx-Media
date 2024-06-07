// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";
// import { useTranslations } from "next-intl";
import UserImageUploader from "@/components/UserImageUpload";
import GeneralInput from "@/components/GeneralInput";
import PhoneInput from "@/components/PhoneInput";

const ProfileEditForm = () => {
  const dummyBackendData = {
    name: "Shehab Fekry",
    email: "shehab@gmail.com",
    phone: "01127163456",
    dial_code: "+20",
  };

  // form action
  const FetchUserDatsaction = async (formData: FormData) => {
    "use server";

    const name = formData.get("name");
    const email = formData.get("email");
    const phoneNumber = formData.get("phoneNumber");
    const dialCode = formData.get("dialCode");

    console.log(name, email, phoneNumber, dialCode);
  };

  return (
    <form
      action={FetchUserDatsaction}
      className="flex flex-col justify-center gap-y-4 items-center w-full"
    >
      <div className="flex w-full items-center">
        <div className="flex lg:w-[60%] w-[100%]">
          <label className="lg:min-w-[180px] min-w-[100px] font-semibold text-[10px] text-secondary flex tracking-[1.5px] mb-0 mr-[12px]">
            PROFILE PICTURE
          </label>
          <div className="flex w-[100%]">
            <UserImageUploader />
          </div>
        </div>
        <div className="lg:flex w-[40%] flex-col pl-[20px] hidden ">
          <p className="text-[#93A0C3] text-[12px] tracking-[0px] pl-[20px] border-l-[1px]">
            Upload a picture for your profile. Use a .jpeg or .png with max file
            size of 5 MB.
          </p>
        </div>
      </div>
      <div className="flex w-full items-center">
        <div className="flex flex-col lg:w-[60%] w-[100%]">
          <GeneralInput
            type="text"
            name="name"
            label="FULL LEGAL NAME"
            value={dummyBackendData.name}
            placeholder="Enter your name"
          />
        </div>
        <div className="lg:flex w-[40%] flex-col pl-[20px] hidden">
          <p className="text-[#93A0C3] text-[12px] tracking-[0px] pl-[20px] border-l-[1px]">
            Your full legal name as it appears on your valid identity proof
            document.
          </p>
        </div>
      </div>
      <div className="flex w-full items-center">
        <div className="flex flex-col lg:w-[60%] w-[100%]">
          <GeneralInput
            label="EMAIL"
            name="email"
            type="text"
            value={dummyBackendData.email}
            placeholder="Enter your email"
          />
        </div>
        <div className="lg:flex w-[40%] flex-col pl-[20px] hidden ">
          <p className="text-[#93A0C3] text-[12px] tracking-[0px] pl-[20px] border-l-[1px]">
            A valid email that we can use to contact you and send you updates.
          </p>
        </div>
      </div>
      <div className="flex w-full items-center">
        <div className="flex flex-col lg:w-[60%] w-[100%]  items-center">
          <label className="lg:min-w-[180px] min-w-[100px] font-semibold text-[10px] text-secondary flex tracking-[1.5px] mb-0">
            PHONE NUMBER
          </label>
          <div className="flex w-[100%]">
            <PhoneInput
              value={dummyBackendData.phone}
              countryCode={dummyBackendData.dial_code}
            />
          </div>
        </div>
        <div className="lg:flex w-[40%] flex-col pl-[20px] hidden ">
          <p className="text-[#93A0C3] text-[12px] tracking-[0px] pl-[20px] border-l-[1px]">
            A valid phone number that we can use to contact you and send you
            updates.
          </p>
        </div>
      </div>
    </form>
  );
};

export default ProfileEditForm;
