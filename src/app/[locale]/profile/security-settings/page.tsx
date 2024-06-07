import React from "react";
import { cookies } from "next/headers";
import Link from "next/link";

import Modal from "@/components/Modal";
import CustomButton from "@/components/CustomButton";
import { ArrowRight } from "@/utils/icons";
import { getUser } from "@/utils/api/userApi";
import { handleSignout } from "./action";
import ProfileForm from "./_components/ProfileForm";

const SecuritySettings = async ({ searchParams }: ISearchParamsProps) => {
  const userData = await getUser();

  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;
  const tokenExpiration = cookieStore.get("tokenExpiration")?.value;

  return (
    <div className="flex flex-col w-full sm:pl-5">
      {searchParams.modal === "true" && (
        <Modal
          searchParams={searchParams}
          icon={{
            name: "WarningCircle",
            props: { size: 45, weight: "fill" },
          }}
          title="Logout?"
          description="Are you Sure you want to logout of your investor account?"
        >
          <form
            action={handleSignout}
            className="flex flex-row items-center justify-between w-full gap-2"
          >
            <Link
              href={{ query: { ...searchParams, modal: false } }}
              className="hover:bg-[#D4E4F2] transition-all delay-100 w-full py-2 bg-[#D4E4F2] text-secondary text-[12px] tracking-[1.5px] font-medium border  flex items-center justify-center"
            >
              CANCEL
            </Link>
            <CustomButton
              type="submit"
              className="transition-all delay-100 w-full py-2 bg-[#FF6C02] text-white text-[12px] tracking-[1.5px] font-medium flex items-center justify-center"
            >
              YES
            </CustomButton>
          </form>
        </Modal>
      )}
      <div className="flex sm:flex-row flex-col justify-between items-center sm:px-5 pt-3 pb-5 border-b-[#D4E4F2] border-b-[1px]">
        <div className="flex flex-col">
          <h2 className=" text-[20px] font-MinionPro">
            Manage Account Settings.
          </h2>
          <p className="text-secondary text-[12px] tracking-[0]">
            Manage your account settings to suit your preferences.
          </p>
        </div>
        <div className="flex sm:pt-0 pt-5">
          <Link
            href={`${process.env.NEXT_PUBLIC_AUTH_URL}/account-console?accessToken=${token}&tokenExpiration=${tokenExpiration}`}
            passHref={true}
            className="bg-[#FF6C02] text-white text-[10px] h-[30px] flex font-bold tracking-[1.5px] justify-center items-center px-3 rounded-[2px] mr-3"
          >
            GO TO ACCOUNT CONSOLE <ArrowRight size={20} className="ml-[5px]" />
          </Link>
          <Link
            href={{ query: { ...searchParams, modal: true } }}
            type="submit"
            className="bg-[#D4E4F2] text-secondary text-[10px] h-[30px] flex font-bold tracking-[1.5px] justify-center items-center px-3 rounded-[2px]"
          >
            LOGOUT
          </Link>
        </div>
      </div>
      {userData.error ? (
        <div className="flex w-full h-full items-center justify-center text-red-500 text-center">
          {userData.error.message}
        </div>
      ) : (
        <div className="flex justify-center pl-[40px]">
          <ProfileForm userData={userData} />
        </div>
      )}
    </div>
  );
};

export default SecuritySettings;
