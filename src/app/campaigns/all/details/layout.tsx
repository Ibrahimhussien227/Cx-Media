"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import SectionCard from "@/components/SectionCard";
import ActionsMenu from "@/components/ActionsMenu";
import CustomButton from "@/components/CustomButton";
import Spinner from "@/components/Spinner";
import Modal from "@/components/Modal";
import FormModal from "@/components/FormModal";
import CustomSelect from "@/components/CustomSelect";
import useGetCampaignDetails from "@/hooks/services/campaign/getCampaignDetails";
import { usePostCampaignActionMutation } from "@/store/services/campaigns/campaignActionsApi";
import { ArrowLeft } from "@/utils/icons";
import LogsWrapper from "./_components/LogsWrapper";
import { EXTENDDAYS, MODALS, campaignActions, pageSections } from "./configs";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [showModal, setShowModal] = useState(false);
  const [extendModal, setExtendModal] = useState(false);
  const searchParams = useSearchParams();

  const { campaignDetails, isLoadingCampain, error } = useGetCampaignDetails(
    searchParams.get("id") as string,
  );

  const [updateActions, { isLoading, error: errorActions }] =
    usePostCampaignActionMutation();

  const {
    setValue,
    reset,
    handleSubmit,
    watch,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: { actions: "", days: "" },
  });
  const formAccessor = watch();

  const onSubmit = async (formData: { actions: string; days?: string }) => {
    const { actions, days } = formData;

    if (days) {
      updateActions({
        campaignId: searchParams.get("id") as string,
        actions,
        days,
      }).then(() => {
        setShowModal(false);
        reset();
      });
    } else {
      updateActions({
        campaignId: searchParams.get("id") as string,
        actions,
      }).then(() => {
        setShowModal(false);
        reset();
      });
    }
  };

  const actionHandler = (action: string) => {
    if (action === "ADD_EXTENSION") {
      setExtendModal(true);
    } else {
      setShowModal(true);
    }

    setValue("actions", action, { shouldDirty: true });
    // setShowModal(true);
  };

  if (isLoadingCampain || isLoading) return <Spinner />;
  if (error) return <div>SomeThing went wrong</div>;

  return (
    <Suspense>
      <section className="h-screen overflow-hidden">
        <header className="bg-white flex flex-col items-start justify-between p-5 sticky top-0 z-50">
          <div className="flex flex-row w-full justify-between">
            <Link
              href="."
              className="flex items-center gap-2 text-base font-bold"
            >
              <ArrowLeft size={24} />
              {campaignDetails?.property.name}
            </Link>
            <ActionsMenu
              actions={campaignActions.filter(
                (el) => el.status !== formAccessor.actions,
              )}
              handler={actionHandler}
            />
          </div>

          <div className="grid md:grid-cols-4 gap-4 w-full">
            {pageSections.map(({ href, title, description }) => (
              <SectionCard
                key={href}
                title={title}
                description={description}
                href={href}
                searchParams={searchParams.get("id") ?? ""}
              />
            ))}
          </div>
        </header>
        <div className="grid md:grid-cols-5 gap-4 m-5 h-full">
          {errorActions && "data" in errorActions && (
            <p className="text-red-500">
              {(errorActions?.data as { message?: string })?.message}
            </p>
          )}
          <div className="col-start-1 md:col-end-4 flex flex-col gap-4 h-screen">
            {children}
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
              title={MODALS[formAccessor.actions as keyof typeof MODALS].title}
              description={
                formAccessor.actions === "ADD_EXTENSION"
                  ? `Are you sure you want to extend the campaign by ${formAccessor.days} days?`
                  : MODALS[formAccessor.actions as keyof typeof MODALS]
                      .description
              }
              setShowModal={setShowModal}
            >
              <CustomButton
                className={`hover:bg-[#D4E4F2] transition-all delay-100 w-full py-2 bg-[#D4E4F2] text-secondary text-[10px] tracking-[1.5px]`}
                onClick={() => {
                  setShowModal(false);
                }}
              >
                CANCEL
              </CustomButton>
              <CustomButton
                type="submit"
                className="transition-all delay-100 w-full py-2 bg-[#2C3A5C] text-[white] text-[10px] tracking-[1.5px]"
              >
                {MODALS[formAccessor.actions as keyof typeof MODALS].BtnLabel}
              </CustomButton>
            </Modal>
          )}
        </form>
        {extendModal && (
          <FormModal
            setShowModal={setExtendModal}
            title="Add Administrator"
            className="w-[600px]"
          >
            {error && (
              <p className="text-red-500 text-center mb-4">
                {(error as { data: { error: string } }).data.error}
              </p>
            )}
            <div className="w-full px-2 grid md:grid-cols-2 gap-4">
              <div className="flex flex-col w- col-start-1 col-end-3">
                <CustomSelect
                  className="px-2 py-2"
                  label="Extend Campaign By"
                  options={EXTENDDAYS}
                  value={watch("days")}
                  onChange={(selectedDay) =>
                    setValue("days", selectedDay.value, { shouldDirty: true })
                  }
                />
              </div>
              <div />

              <div
                className={`col-span-2 col-start-2 col-end-3 flex flex-row justify-between ml-3 ${
                  !dirtyFields.days && "opacity-50"
                }`}
              >
                <CustomButton
                  onClick={() => {
                    setExtendModal(false);
                    reset();
                  }}
                  className="font-medium text-[14px] text-primary px-6 py-1 rounded-sm animate-fade border tracking-[1.5px] hover:bg-[#F5F8FF]"
                >
                  CANCEL
                </CustomButton>
                <CustomButton
                  onClick={() => {
                    setExtendModal(false);
                    setShowModal(true);
                  }}
                  type="submit"
                  className={` bg-primary text-white text-[14px] px-6 py-1 font-medium rounded-sm animate-fade tracking-[1.5px]`}
                  disabled={!dirtyFields.days}
                >
                  SUBMIT
                </CustomButton>
              </div>
            </div>
          </FormModal>
        )}
      </section>
    </Suspense>
  );
}
