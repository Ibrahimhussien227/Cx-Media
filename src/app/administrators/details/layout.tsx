"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

import SectionCard from "@/components/SectionCard";
// import LogsList from "@/components/LogsList";
import ActionsMenu from "@/components/ActionsMenu";
// import Spinner from "@/components/Spinner";
import Modal from "@/components/Modal";
import CustomButton from "@/components/CustomButton";
import { ArrowLeft } from "@/utils/icons";
import {
  // ADMINISTRATIONDATA,
  // ADMINSTRATIONLOGSHEADER,
  MODALS,
  accountActions,
  pageSections,
} from "./configs";

import DetailSkeleton from "@/components/Skeleton/PageSkeleton/children/details";
import PageSkeleton from "@/components/Skeleton/PageSkeleton";
import {
  useGetAdminByIdQuery,
  useUpdateAdminByIdMutation,
} from "@/store/services/admin/adminApi";
// import CreateModal from "../_components/Modals/CreateModal";
// import SuccessModal from "@/components/SuccessModal";
// import useUpdateAdminById from "@/hooks/services/admin/useUpdateAdminById";
// import { useGetAdminById } from "@/hooks/services/admin/useGetAdminById";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const searchParams = useSearchParams();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data, isLoading } = useGetAdminByIdQuery({
    id: searchParams.get("id")!,
  });
  const [updateAdmin] = useUpdateAdminByIdMutation();

  const { setValue, reset, handleSubmit, watch } = useForm({
    defaultValues: { action: "" },
  });
  const formAccessor = watch();

  const onSubmit = (data: { action: string }) => {
    //
    updateAdmin({
      id: searchParams.get("id")!,
      body: { status: data.action },
    });

    setShowModal(false);
    reset();
  };

  if (isLoading) return <div>...Loading</div>;

  const replaceWithAdminDetails = true;

  return (
    <>
      {!replaceWithAdminDetails ? (
        <PageSkeleton withHeader>
          <DetailSkeleton />
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
                {/* {campaignDetails?.property.name} */}
                {searchParams.get("id")}
              </Link>
              <ActionsMenu
                actions={accountActions.filter(
                  (el) => el.status !== data?.data?.status,
                )}
                handler={(action) => {
                  setValue("action", action, { shouldDirty: true });
                  setShowModal(true);
                }}
              />
            </div>
            <div className="grid md:grid-cols-4 gap-4 w-full">
              {pageSections.map((section) => (
                <SectionCard
                  key={section.href}
                  title={section.title}
                  description={section.description}
                  href={section.href}
                  searchParams={searchParams.get("id") ?? ""}
                />
              ))}
            </div>
          </header>
          <div className="grid md:grid-cols-5 gap-4 m-5">
            <div className="col-start-1 md:col-end-4 flex flex-col gap-4 h-screen">
              <div className="h-full overflow-y-scroll mb-[140px] no-scrollbar">
                {children}
              </div>
            </div>
            {/* {!false ? (
            <div className=" md:col-start-4 md:col-end-6 h-screen overflow-y-scroll no-scrollbar">
              <div className="bg-white p-5 pb-0 mb-[15px]">
                <h3 className="text-base font-bold mb-3 tracking-wide">
                  Adminstaration Logs
                </h3>
                <LogsList
                  logs={ADMINSTRATIONLOGSHEADER}
                  data={ADMINISTRATIONDATA}
                />
              </div>
            </div>
          ) : (
            <Spinner />
          )} */}
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
                  className="hover:bg-[#D4E4F2] transition-all delay-100 w-full py-2 bg-[#F5F8FF80] text-secondary text-[12px] tracking-[1.5px] font-medium border rounded-sm"
                  onClick={() => {
                    reset();
                    setShowModal(false);
                  }}
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  type="submit"
                  className="transition-all delay-100 w-full py-2 bg-[#2C3A5C] text-white text-[12px] tracking-[1.5px] font-medium rounded-sm"
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
