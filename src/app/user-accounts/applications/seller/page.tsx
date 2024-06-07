"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import StatusTag from "@/components/StatusTag";
import ActionsMenu from "@/components/ActionsMenu";
import LogsList from "@/components/LogsList";
import Modal from "@/components/Modal";
import CustomButton from "@/components/CustomButton";
import SuccessModal from "@/components/Modal/SuccessModal";
import { usePatchSellerAppActionMutation } from "@/store/services/sellers/applicationsApi";
import { ArrowLeft } from "@/utils/icons";
import useGetSellerDetails from "@/hooks/services/seller/getSellerDetails";
import KYCForm from "./_comps/KYCForm";
import IdentityForm from "./_comps/IdentityForm";
import RepresentativeForm from "./_comps/RepresentativeForm";
import CompanyDetailsForm from "../../_comps/Forms/CompanyDetailsForm";
import {
  AdminData,
  AdminLogs,
  MODALS,
  accountActions,
  accountDetailsData,
  accountDetailsLogs,
} from "./configs";
import PageSkeleton from "@/components/Skeleton/PageSkeleton";
import DetailSkeleton from "@/components/Skeleton/PageSkeleton/children/details";

const SellerRegisteration = () => {
  const [showModal, setShowModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const searchParams = useSearchParams();

  const { sellerDetails } = useGetSellerDetails(searchParams.get("id")!);

  // RTK Query
  const [postAction, { isError }] = usePatchSellerAppActionMutation();

  const { setValue, reset, watch } = useForm({
    defaultValues: { action: "" },
  });
  const { action } = watch();

  const acceptActionSubmitter = () => {
    postAction({
      sellerId: searchParams.get("id")!,
      applicationReviewStatus: action.toUpperCase(),
    }).finally(() => {
      setShowModal(false);
      reset();
    });
    if (!isError) setSuccessModal(true);
  };

  return (
    <>
      {!sellerDetails ? (
        <PageSkeleton withLogs>
          <DetailSkeleton />
        </PageSkeleton>
      ) : (
        <section className="w-full overflow-hidden col-start-1 md:col-end-4 flex flex-col gap-4 h-screen overflow-y-scroll no-scrollbar pb-[120px]">
          <header className="bg-white flex flex-col items-start justify-between p-4">
            <div className="flex flex-row w-full justify-between">
              <Link
                href="."
                className="flex items-center gap-2 text-base font-bold"
              >
                <ArrowLeft size={24} />
                {sellerDetails?.identity.name}
              </Link>
              <ActionsMenu
                disabled={sellerDetails?.application.status != "PENDING_REVIEW"}
                actions={accountActions.filter(
                  (el) => el.status !== sellerDetails?.other?.profileStatus,
                )}
                handler={(title) => {
                  setValue("action", title, { shouldDirty: true });
                  setShowModal(true);
                }}
              />
            </div>
          </header>
          <div className="grid md:grid-cols-5 gap-4 mx-5 h-full">
            <div className="w-full overflow-hidden col-start-1 md:col-end-4 flex flex-col gap-4 h-screen overflow-y-scroll no-scrollbar">
              <div className="bg-white p-3 font-bold flex gap-3 items-center">
                <p className="font-bold py-2 text-[#2C3A5C] opacity-50">
                  Seller ID
                </p>
                <p className="font-bold text-[16px]">
                  {searchParams.get("id")}
                </p>
                <StatusTag text={sellerDetails?.application?.status} />
              </div>
              <div className="w-full overflow-hidden col-start-1 md:col-end-4 flex flex-col gap-4 h-screen overflow-y-scroll no-scrollbar">
                {sellerDetails && (
                  <>
                    <IdentityForm data={sellerDetails.identity} />
                    <KYCForm data={sellerDetails.kycStatus} />
                    <RepresentativeForm
                      data={sellerDetails?.companyRepresentative}
                    />
                    <CompanyDetailsForm data={sellerDetails?.companyDetails} />
                  </>
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
                  acceptActionSubmitter();
                }}
                className={`transition-all delay-100 w-full py-2 bg-[#2C3A5C] text-white text-[12px] tracking-[1.5px] font-medium`}
              >
                {MODALS[action as keyof typeof MODALS]?.BtnLabel}
              </CustomButton>
            </Modal>
          )}
          {successModal && (
            <SuccessModal
              setModalOpen={setSuccessModal}
              description="Application rejected successfully."
            />
          )}
        </section>
      )}
    </>
  );
};

export default SellerRegisteration;
