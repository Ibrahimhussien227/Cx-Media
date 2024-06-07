"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";

import StatusTag from "@/components/StatusTag";
import useGetInvestorDetails from "@/hooks/services/investor/getInvestorDetails";
import ApplicationForm from "./_comps/ApplicationForm";
import ActionsMenu from "@/components/ActionsMenu";
import { ArrowLeft } from "@/utils/icons";
import CustomButton from "@/components/CustomButton";
import Modal from "@/components/Modal";
import SuccessModal from "@/components/Modal/SuccessModal";
import LogsList from "@/components/LogsList";
import RequestDocModal from "./_comps/Modals/RequestDocs";
import RejectReasonModal from "./_comps/Modals/RejectReason";
import {
  AdminData,
  AdminLogs,
  // KycLogsData,
  MODALS,
  accountActions,
  accountDetailsData,
  accountDetailsLogs,
} from "./configs";
import { usePatchInvAppStatusMutation } from "@/store/services/investors/applicationsApi/applicationActions";
import PageSkeleton from "@/components/Skeleton/PageSkeleton";
import DetailSkeleton from "@/components/Skeleton/PageSkeleton/children/details";
// import StatusList from "@/components/StatusList";

const ApplicationDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const searchParams = useSearchParams();

  const { investorDetails } = useGetInvestorDetails(searchParams.get("id")!);

  // RTK Query
  const [postAction, { isError }] = usePatchInvAppStatusMutation();

  const { setValue, reset, watch } = useForm({
    defaultValues: { action: "" },
  });
  const { action } = watch();

  const acceptActionSubmitter = () => {
    const status = "VERIFIED";

    postAction({
      userId: searchParams.get("id")!,
      applicationStatus: status,
      profileRejectionReason: "",
    }).finally(() => {
      setShowModal(false);
      reset();
    });
    if (!isError) setSuccessModal(true);
  };

  return (
    <>
      {!investorDetails ? (
        <PageSkeleton withLogs>
          <DetailSkeleton />
        </PageSkeleton>
      ) : (
        <section className="h-screen overflow-hidden">
          <header className="bg-white flex flex-col items-start justify-between p-4">
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
                  (el) => el.status !== investorDetails?.other?.profileStatus,
                )}
                handler={(status) => {
                  setValue("action", status, { shouldDirty: true });
                  if (status === "REQUEST") setShowDocModal(true);
                  else setShowModal(true);
                }}
              />
            </div>
          </header>
          <div className="grid md:grid-cols-5 gap-4 m-5 h-full">
            <div className="w-full overflow-hidden col-start-1 md:col-end-4 flex flex-col gap-4 h-screen overflow-y-scroll no-scrollbar pb-[120px]">
              <div className="bg-white p-3 font-bold flex gap-3 items-center">
                <p className="font-bold py-2 text-[#2C3A5C] opacity-50">
                  Application ID
                </p>
                <p className="font-bold text-[16px]">
                  {investorDetails?.application?._id ?? "---"}
                </p>
                <StatusTag text={investorDetails?.application?.status} />
              </div>
              <div className="w-full overflow-hidden col-start-1 md:col-end-4 flex flex-col gap-4 h-screen overflow-y-scroll no-scrollbar pb-[120px]">
                {investorDetails && (
                  <ApplicationForm investorDetails={investorDetails} />
                )}
              </div>
            </div>
            <div className="md:col-start-4 md:col-end-6 h-screen overflow-y-scroll no-scrollbar">
              <div className="bg-white p-5 pb-0 mb-5">
                <h3 className="text-base font-bold mb-3 tracking-wide">
                  Application Logs
                </h3>
                {/* <StatusList label="APPLICATION STATUS" data={KycLogsData} /> */}
              </div>

              <div>
                <div className="bg-white p-5 pb-0 mb-5">
                  <h3 className="text-base font-bold mb-3 tracking-wide">
                    Account Details
                  </h3>
                  <LogsList
                    logs={accountDetailsLogs}
                    data={accountDetailsData ?? {}}
                  />
                </div>
              </div>
              <div className=" mb-[210px]">
                <div className="bg-white p-5 pb-0 mb-5">
                  <h3 className="text-base font-bold mb-3 tracking-wide">
                    Administration Logs
                  </h3>
                  <LogsList logs={AdminLogs} data={AdminData ?? {}} />
                </div>
              </div>
            </div>
          </div>
          {/* MODALS */}
          {showModal && (
            <Modal
              icon={{
                name: "WarningCircle",
                props: { size: 45, weight: "fill" },
              }}
              title={MODALS[action as keyof typeof MODALS]?.title}
              description={MODALS[action as keyof typeof MODALS]?.description}
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
                onClick={() => {
                  setShowModal(false);
                  if (action === "REJECT") setShowReasonModal(true);
                  if (action === "ACCEPT") acceptActionSubmitter();
                }}
                className={`transition-all delay-100 w-full py-2 bg-[#2C3A5C] text-white text-[12px] tracking-[1.5px] font-medium`}
              >
                {MODALS[action as keyof typeof MODALS]?.BtnLabel}
              </CustomButton>
            </Modal>
          )}

          {showReasonModal && (
            <RejectReasonModal
              setModalOpen={setShowReasonModal}
              setIsSuccessModalOpen={setSuccessModal}
              selectedAction={action}
            />
          )}
          {successModal && (
            <SuccessModal
              setModalOpen={setSuccessModal}
              description="Application rejected successfully."
            />
          )}
          {showDocModal && (
            <RequestDocModal
              setModalOpen={setShowDocModal}
              setIsSuccessModalOpen={setSuccessModal}
              selectedAction={action.toString()}
            />
          )}
        </section>
      )}
    </>
  );
};

export default ApplicationDetails;
