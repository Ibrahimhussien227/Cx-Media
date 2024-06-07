import React from "react";
import SupportNav from "./_components/SupportNav";

const Support = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen sticky top-0 w-full left-0  border-r  gradient rounded-[2px]">
      <div className="w-full flex h-[70px] sm:px-[40px] px-5 items-center border-b-[1px]">
        <h1 className=" text-[20px]">Support</h1>
      </div>
      <div className="w-full flex sm:flex-row flex-col pr-[40px] pl-[40px] py-[20px]">
        <div className="flex min-w-[260px]">
          <SupportNav />
        </div>
        <main className="flex w-full sm:pl-[20px] flex-col">{children}</main>
      </div>
    </div>
  );
};

export default Support;
