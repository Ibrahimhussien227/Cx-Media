import Link from "next/link";
import React from "react";

import { BellRinging } from "@/utils/icons";

const NotificationCardVerify = () => {
  return (
    <div className="flex flex-row items-center justify-between px-4 h-[70px] mx-10 mt-5 border bg-white">
      <div className="flex flex-row items-start justify-center gap-5">
        <div className="border px-2 py-2 bg-[#F5FAFF] rounded-full relative">
          <BellRinging size={24} />
          <span className="absolute top-1 right-0 border-active px-[2px] py-[2px] border rounded-full" />
        </div>
        <div className="flex flex-col items-start justify-center text-[12px] gap-1">
          <p className="font-bold">Verify your account to start investing.</p>
          <p className="text-secondary">
            Please complete the verification process so your investments are
            compliant. It will only take a few minutes.
          </p>
        </div>
      </div>
      <Link
        href="/profile"
        className="bg-[#FF6C02] text-white text-[10px] h-[30px] flex font-bold tracking-[1.5px] justify-center items-center px-[10px] rounded-[2px] transition-opacity ease-in-out duration-1000 cursor-pointer"
      >
        VERIFY NOW
      </Link>
    </div>
  );
};

export default NotificationCardVerify;
