"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import ActionsMenu from "@/components/ActionsMenu";
import useGetCampaignDetails from "@/hooks/services/campaign/getCampaignDetails";
import DetailsForm from "@/app/campaigns/_comps/Forms/DetailsForm";
import LocationForm from "@/app/campaigns/_comps/Forms/LocationForm";
import AmenitiesForm from "@/app/campaigns/_comps/Forms/AmenitiesForm";
import ImagesForm from "@/app/campaigns/_comps/Forms/ImagesForm";
import DocumentsForm from "@/app/campaigns/_comps/Forms/DocumentsForm";
import FinancialsForm from "@/app/campaigns/_comps/Forms/FinancialsForm";
import StatusTag from "@/components/StatusTag";
import Spinner from "@/components/Spinner";
import Modal from "@/components/Modal";
import CustomButton from "@/components/CustomButton";
import { usePostCampaignApplicationActionMutation } from "@/store/services/campaigns/campaignActionsApi";
import { ArrowLeft } from "@/utils/icons";
import { MODALS, accountActions } from "./configs";
import LogsWrapper from "./_components/LogsWrapper";
import { setValuesToObject } from "@/app/campaigns/_comps/Forms/FeeStructure/utils";
import { useGetFeeStructureQuery } from "@/store/services/campaigns/feeStructureApi";
import FeeStructureForm from "../../_comps/Forms/FeeStructure";

const ApplicationDetailPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const { campaignDetails, error, isLoadingCampain } = useGetCampaignDetails(
    searchParams.get("id") as string,
  );

  const { data: feeData, isLoading: isLoadingFeeStructure } =
    useGetFeeStructureQuery({ campaignId: searchParams.get("id")! });

  const [postAction, { error: errorActions }] =
    usePostCampaignApplicationActionMutation();

  const { setValue, handleSubmit, reset, watch } = useForm({
    defaultValues: { action: "" },
  });
  const formAccessor = watch();

  const onSubmit: SubmitHandler<{ action: string }> = async (formData) => {
    if (campaignDetails && formData.action)
      postAction({
        campaignId: campaignDetails?.campaign?._id,
        reviewStatus: formData.action,
      }).finally(() => {
        setShowModal(false);
        reset();
      });
  };

  if (isLoadingCampain) return <Spinner />;
  if (error) return <div>SomeThing went wrong</div>;
  if (!isLoadingCampain && !campaignDetails) return;

  return (
    <section className="h-screen overflow-hidden">
      <header className="bg-white flex flex-col items-start justify-between p-4">
        <div className="flex flex-row w-full justify-between">
          <Link
            href="."
            className="flex items-center gap-2 text-base font-bold"
          >
            <ArrowLeft size={24} />
            {campaignDetails?.property.name}
          </Link>
          <ActionsMenu
            actions={accountActions.filter(
              (el) => el.status != formAccessor.action,
            )}
            handler={(action) => {
              setValue("action", action, { shouldDirty: true });
              setShowModal(true);
            }}
          />
        </div>
      </header>
      <div className="grid md:grid-cols-5 gap-4 m-5 h-full">
        <div className="col-start-1 md:col-end-4 flex flex-col gap-4 h-screen">
          <div className="bg-white p-3 font-bold flex gap-3 items-center">
            <p className="font-bold py-2 text-[#2C3A5C] opacity-50">
              Application ID
            </p>{" "}
            <p className="font-bold text-[16px]">
              {campaignDetails?.property._id}
            </p>
            <StatusTag text={campaignDetails?.property.reviewStatus} />
          </div>
          {errorActions && "data" in errorActions && (
            <p className="text-red-500">
              {(errorActions?.data as { message?: string })?.message}
            </p>
          )}
          <div className="flex flex-col gap-3 h-full overflow-y-scroll mb-32 no-scrollbar">
            {campaignDetails && (
              <>
                <DetailsForm
                  campaignId={searchParams.get("id")!}
                  propertyDetails={campaignDetails.property}
                />
                <LocationForm
                  campaignId={searchParams.get("id")!}
                  propertyLocation={campaignDetails.location}
                />
                <AmenitiesForm
                  campaignAmenities={campaignDetails.amenities}
                  assetId={campaignDetails.property._id}
                />
                <ImagesForm
                  assetId={campaignDetails.property._id}
                  assetMediaFiles={campaignDetails?.files.filter(
                    (file) => file.fileKey === "assetPhotos",
                  )}
                />
                <DocumentsForm
                  assetId={campaignDetails.property._id}
                  campaignId={searchParams.get("id")!}
                  propertyDocuments={campaignDetails?.files.filter(
                    ({ fileKey }: { fileKey: string }) =>
                      fileKey !== "assetPhotos",
                  )}
                />
                <FinancialsForm
                  assetId={campaignDetails.property._id}
                  campaignId={searchParams.get("id")!}
                  propertyFinancials={campaignDetails.financialDetails}
                />
                {!isLoadingFeeStructure && feeData && (
                  <FeeStructureForm
                    feeStructureId={feeData.data.feeStructureId}
                    propertyFee={setValuesToObject(feeData?.data?.fee)}
                  />
                )}{" "}
              </>
            )}
          </div>
        </div>
        {campaignDetails && (
          <LogsWrapper
            campaignId={campaignDetails?.campaign._id}
            sellerId={campaignDetails?.seller._id}
          />
        )}
      </div>
      {/* MODALS */}
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
              className={`hover:bg-[#D4E4F2] transition-all delay-100 w-full py-2 bg-[#D4E4F2] text-secondary text-[12px] tracking-[1.5px] font-bold`}
              onClick={() => {
                setShowModal(false);
              }}
            >
              CANCEL
            </CustomButton>
            <CustomButton
              type="submit"
              className={`transition-all delay-100 w-full py-2 bg-[#2C3A5C] text-white text-[12px] tracking-[1.5px] font-bold`}
            >
              {MODALS[formAccessor.action as keyof typeof MODALS].BtnLabel}
            </CustomButton>
          </Modal>
        )}
      </form>
    </section>
  );
};

export default ApplicationDetailPage;
