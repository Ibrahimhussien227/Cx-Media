"use client";

import { useState } from "react";
import Link from "next/link";
import {
  usePathname,
  // usePathname,
  useSearchParams,
} from "next/navigation";
import { useForm } from "react-hook-form";

import SectionCard from "@/components/SectionCard";
import ActionsMenu from "@/components/ActionsMenu";
import Modal from "@/components/Modal";
import CustomButton from "@/components/CustomButton";
import LogsList from "@/components/LogsList";
import { ArrowLeft } from "@/utils/icons";
// import ApplicationStatus from "../../../../components/ApplicationStatus";
import {
  pageSections,
  accountActions,
  AdminLogs,
  AdminData,
  accountDetailsLogs,
  accountDetailsData,
  // KycLogsData,
  MODALS,
} from "./config";
import { RootLayoutProps } from "./type";
import useGetSellerDetails from "@/hooks/services/seller/getSellerDetails";
import OverviewSkeleton from "@/components/Skeleton/PageSkeleton/children/overview";
import PageSkeleton from "@/components/Skeleton/PageSkeleton";
import DetailSkeleton from "@/components/Skeleton/PageSkeleton/children/details";

// import StatusList from "@/components/StatusList";

export default function RootLayout({ children }: RootLayoutProps) {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const { sellerDetails } = useGetSellerDetails(searchParams.get("id")!);

  const isDetails =
    pathName.includes("profile") || pathName.includes("kyc-status");
  // const kycLogActive = pathName.split("/")[4] === "kyc-status";

  const [showModal, setShowModal] = useState<boolean>(false);
  const { setValue, reset, handleSubmit, watch } = useForm({
    defaultValues: { action: "" },
  });
  const formAccessor = watch();

  const onSubmit = (data: { action: string }) => {
    console.log(data);
    reset();
  };

  return (
    <>
      {!sellerDetails ? (
        <PageSkeleton withHeader withLogs>
          {isDetails ? <DetailSkeleton /> : <OverviewSkeleton withTable />}
        </PageSkeleton>
      ) : (
        <section className="h-full overflow-hidden no-scrollbar">
          <header className="bg-white flex flex-col items-start justify-between p-5">
            <div className="flex flex-row w-full justify-between">
              <Link
                href="."
                className="flex items-center gap-2 text-base font-bold"
              >
                <ArrowLeft size={24} />
                {sellerDetails?.identity?.name}
              </Link>
              <ActionsMenu
                actions={accountActions}
                handler={(title) => {
                  setValue("action", title, { shouldDirty: true });
                  setShowModal(true);
                }}
              />
            </div>
            <div className="flex gap-4 w-full">
              {pageSections.map((section) => {
                return (
                  <SectionCard
                    customWidth="w-full"
                    key={section.href}
                    title={section.title}
                    description={section.description}
                    href={section.href}
                    searchParams={searchParams.get("id") ?? ""}
                  />
                );
              })}
            </div>
          </header>
          {/* LOGS */}
          <div className="grid md:grid-cols-5 gap-4 m-5">
            <div className="  col-start-1 md:col-end-4 flex flex-col gap-4 h-screen">
              <div className="h-full overflow-y-scroll mb-[140px] no-scrollbar">
                {children}
              </div>
            </div>
            <div className="md:col-start-4 md:col-end-6 h-screen overflow-y-scroll no-scrollbar">
              {/* {kycLogActive && (
            <div className="bg-white p-5 pb-0 mb-5">
              <h3 className="text-base font-bold mb-3 tracking-wide">
                KYC Logs
              </h3>
              <ApplicationStatus label="KYC STATUS" data={KycLogsData} />
            </div>
          )} */}
              <div>
                <div className="bg-white p-5 pb-0 mb-5">
                  <h3 className="text-base font-bold mb-3 tracking-wide">
                    Account Details
                  </h3>
                  <LogsList
                    logs={accountDetailsLogs}
                    data={accountDetailsData}
                  />
                </div>
              </div>
              <div className=" mb-[210px]">
                <div className="bg-white p-5 pb-0 mb-5">
                  <h3 className="text-base font-bold mb-3 tracking-wide">
                    Adminstaration Logs
                  </h3>
                  <LogsList logs={AdminLogs} data={AdminData} />
                </div>
              </div>
            </div>
          </div>

          {/* MODAL */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {showModal && (
              <Modal
                icon={{
                  name: "WarningCircle",
                  props: { size: 45, weight: "fill" },
                }}
                title={MODALS[formAccessor.action as keyof typeof MODALS].title}
                description={
                  MODALS[formAccessor.action as keyof typeof MODALS].description
                }
                setShowModal={setShowModal}
              >
                <CustomButton
                  className={`hover:bg-[#D4E4F2] transition-all delay-100 w-full py-2 bg-[#F5F8FF80] text-secondary text-[12px] tracking-[1.5px] font-medium border`}
                  onClick={() => {
                    reset();
                    setShowModal(false);
                  }}
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  type="submit"
                  className={`transition-all delay-100 w-full py-2 bg-[#2C3A5C] text-white text-[12px] tracking-[1.5px] font-medium`}
                >
                  {MODALS[formAccessor.action as keyof typeof MODALS].BtnLabel}
                </CustomButton>
              </Modal>
            )}
            {/* <CreateModal /> */}
            {/* <SuccessModal /> */}
          </form>
        </section>
      )}
    </>
  );
}
