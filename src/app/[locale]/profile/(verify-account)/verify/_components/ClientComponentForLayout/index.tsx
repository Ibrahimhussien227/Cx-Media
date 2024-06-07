"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import ProfileNav from "@/app/[locale]/profile/_components/ProfileNav";
import Script from "next/script";

const ClientComponent = ({
  children,
  applicationStatus,
}: {
  children: ReactNode;
  applicationStatus: string;
}) => {
  const pathName = usePathname();

  if (pathName.includes("verify")) {
    return <main className="w-full flex mb-10">{children}</main>;
  }

  return (
    <div className="w-full border-r rounded-[2px] overflow-hidden">
      <Script src="https://cdn.leantech.me/link/loader/prod/ae/latest/lean-link-loader.min.js" />
      <div className="w-full flex h-[70px] sm:px-10 px-5 items-center border-b-[1px]">
        <h1 className="text-[20px]">My Account</h1>
      </div>
      <div className="w-full flex px-10 py-5 h-full lg:flex-row flex-col">
        <div className="flex min-w-[260px]">
          <ProfileNav applicationStatus={applicationStatus} />
        </div>
        <main className="w-full flex mb-10">{children}</main>
      </div>
    </div>
  );
};

export default ClientComponent;
