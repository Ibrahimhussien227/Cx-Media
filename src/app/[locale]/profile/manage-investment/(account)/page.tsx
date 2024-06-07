import React from "react";
import Link from "next/link";

const AccountVerify = () => {
  return (
    <div className="flex bg-white shadow border-[#D4E4F2] border px-5 py-8 flex-col justify-center items-center rounded-sm mt-5 md:w-[25%]">
      <h3 className=" text-[18px] font-MinionPro">Invest without limits.</h3>
      <span className="bg-[#FF6C02] h-[2px] w-[20px] flex my-[10px]" />
      <p className="text-secondary text-[12px] tracking-[0px] text-center">
        Apply now to find out if you’re qualified to upgrade your investor
        account and make investments without any limits.
      </p>
      <Link
        className="mt-[15px] bg-active flex w-full py-2 px-2 text-[10px] font-bold tracking-[1.5px] rounded-[2px] text-white item-center justify-center"
        href="/profile/manage-investment/upgrade"
      >
        APPLY NOW
      </Link>
    </div>
  );
};

export default AccountVerify;
