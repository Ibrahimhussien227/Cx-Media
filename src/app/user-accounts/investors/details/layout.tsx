"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import SectionCard from "@/components/SectionCard";
import ActionsMenu from "@/components/ActionsMenu";
import Modal from "@/components/Modal";
import CustomButton from "@/components/CustomButton";
import LogsList from "@/components/LogsList";
import { ArrowLeft } from "@/utils/icons";
import {
  pageSections,
  accountActions,
  AdminLogs,
  AdminData,
  accountDetailsLogs,
  accountDetailsData,
  // KycLogsData,
  MODALS,
} from "./configs";
import { RootLayoutProps } from "./type";
import SuccessModal from "@/components/Modal/SuccessModal";
import useGetInvestorDetails from "@/hooks/services/investor/getInvestorDetails";
import { usePatchInvestorStatusMutation } from "@/store/services/investors/investorsApi/investorActions";
import PageSkeleton from "@/components/Skeleton/PageSkeleton";
import DetailSkeleton from "@/components/Skeleton/PageSkeleton/children/details";
import OverviewSkeleton from "@/components/Skeleton/PageSkeleton/children/overview";
// import StatusList from "@/components/StatusList";

export default function RootLayout({ children }: RootLayoutProps) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);

  // conditionally render LOGS depending on the page url
  const withLogs = !pathName.includes("portfolio");
  const withKYCLogs = pathName.includes("kyc-status");
  const withAccountLogs =
    !pathName.includes("kyc-status") && !pathName.includes("wallet");
  const isDetails =
    pathName.includes("profile") || pathName.includes("kyc-status");

  // RTK Query
  const [postAction] = usePatchInvestorStatusMutation();
  const { investorDetails } = useGetInvestorDetails(searchParams.get("id")!);

  const { setValue, reset, handleSubmit, watch } = useForm({
    defaultValues: { action: "" },
  });
  const { action } = watch();

  const onSubmit = (data: { action: string }) => {
    postAction({
      investorId: searchParams.get("id")!,
      status: data.action == "BLOCKED" ? "BLOCK" : data.action,
    }).then(() => {
      setShowModal(false);
      reset();
      setSuccessModal(true);
    });
  };

  console.log(investorDetails?.other?.profileStatus);

  return (
    <>
      {!investorDetails ? (
        <PageSkeleton withHeader withLogs>
          {isDetails ? <DetailSkeleton /> : <OverviewSkeleton />}
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
                {investorDetails?.identity?.name}
              </Link>
              <ActionsMenu
                actions={accountActions.filter(
                  (el) => el.status != investorDetails?.other?.profileStatus,
                )}
                handler={(status) => {
                  setValue("action", status, { shouldDirty: true });
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
            <div
              className={` col-start-1 md:col-end-4 flex flex-col gap-4 h-screen ${
                !withLogs ? "md:col-end-6" : "md:col-end-4"
              }`}
            >
              <div className="h-full overflow-y-scroll mb-[140px] no-scrollbar">
                {children}
              </div>
            </div>
            {withLogs && (
              <div className="md:col-start-4 md:col-end-6 h-screen overflow-y-scroll no-scrollbar">
                {withKYCLogs && (
                  <div className="bg-white p-5 pb-0 mb-5">
                    <h3 className="text-base font-bold mb-3 tracking-wide">
                      KYC Logs
                    </h3>
                    {/* <StatusList label="KYC STATUS" data={KycLogsData} /> */}
                  </div>
                )}
                {withAccountLogs && (
                  <div className="bg-white p-5 pb-0 mb-5">
                    <h3 className="text-base font-bold mb-3 tracking-wide">
                      Account Details
                    </h3>
                    <LogsList
                      logs={accountDetailsLogs}
                      data={accountDetailsData}
                    />
                  </div>
                )}
                <div className=" mb-[210px]">
                  <div className="bg-white p-5 pb-0 mb-5">
                    <h3 className="text-base font-bold mb-3 tracking-wide">
                      Adminstaration Logs
                    </h3>
                    <LogsList logs={AdminLogs} data={AdminData} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* MODAL */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {showModal && (
              <Modal
                icon={{
                  name: "WarningCircle",
                  props: { size: 45, weight: "fill" },
                }}
                title={MODALS[action as keyof typeof MODALS].title}
                description={MODALS[action as keyof typeof MODALS].description}
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
                  {MODALS[action as keyof typeof MODALS].BtnLabel}
                </CustomButton>
              </Modal>
            )}
            {/* <CreateModal /> */}
            {successModal && (
              <SuccessModal
                title={
                  action == "ACTIVE"
                    ? "Investor Profile Activated"
                    : "Investor Profile Blocked"
                }
                description={
                  action == "ACTIVE"
                    ? "You have successfully activated this investors access to the system."
                    : "You have successfully blocked this investors access to the system."
                }
                setModalOpen={setSuccessModal}
              />
            )}
          </form>
        </section>
      )}
    </>
  );
}
