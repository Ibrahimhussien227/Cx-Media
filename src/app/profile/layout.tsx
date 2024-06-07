"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import LogsList from "@/components/LogsList";
import ActionsMenu from "@/components/ActionsMenu";
// import Spinner from "@/components/Spinner";
import CustomButton from "@/components/CustomButton";
import { ArrowLeft } from "@/utils/icons";
import {
  ADMINISTRATIONDATA,
  ADMINSTRATIONLOGSHEADER,
  pageSections,
} from "./configs";
import FormModal from "@/components/FormModal";
import TextInput from "@/components/TextInput";
import SuccessModal from "@/components/Modal/SuccessModal";
import { usePathname } from "next/navigation";
import { useGetAdminMeQuery } from "@/store/services/admin/adminApi";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { data } = useGetAdminMeQuery();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [success, setSuccess] = useState(false);
  const pathName = usePathname();

  const {
    setValue,
    reset,
    handleSubmit,
    //  watch
  } = useForm({
    defaultValues: { status: "Active" },
  });
  // const formAccessor = watch();

  const onSubmit = (data: { status: string }) => {
    console.log(data);
    reset();
  };

  return (
    <div className="h-full overflow-hidden no-scrollbar">
      <header className="bg-white flex flex-col items-start justify-between p-5">
        <div className="flex flex-row w-full justify-between">
          <Link
            href="."
            className="flex items-center gap-2 text-base font-bold"
          >
            <ArrowLeft size={24} />
            {data?.data.profile.fullName}
          </Link>
          <ActionsMenu
            actions={[{ title: "Reset Password", status: "reset" }]}
            handler={(title) => {
              setValue("status", title, { shouldDirty: true });
              setShowModal(true);
            }}
          />
        </div>
        <div className="grid md:grid-cols-4 gap-4 w-full">
          {pageSections.map((section) => {
            const isActive = section.href === pathName;
            return (
              <Link
                key={section.description}
                className={`mt-1 relative flex grow shrink-1 basis-0
                gap-4 border bg-gradient-blue-white p-4 
                ${isActive ? "" : "opacity-50"} ${
                  !isActive ? "cursor-pointer" : ""
                }`}
                href={section.href}
              >
                {isActive && (
                  <div className="absolute w-4 h-[0.15rem] top-[-0.09rem] left-4 bg-[#FF6C02]" />
                )}
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between items-center">
                    <p className="text-primary font-bold text-[15px]">
                      {section.title}
                    </p>
                  </div>
                  <p className="text-[12px]">{section.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </header>
      <div className="grid md:grid-cols-5 gap-4 m-5">
        <div className="col-start-1 md:col-end-4 flex flex-col gap-4 h-screen">
          <div className="h-full overflow-y-scroll mb-[140px] no-scrollbar">
            {children}
          </div>
        </div>
        {/* {!false ? ( */}
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
        {/* ) : (
          <Spinner />
        )} */}
      </div>
      {/* MODAL */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {showModal && (
          <FormModal
            setShowModal={setShowModal}
            title="Reset Password"
            className="w-[320px]"
          >
            <form
              // onSubmit={handleSubmit(handleSubmitInvetion)}
              className="flex flex-col w-full px-2 gap-4"
            >
              <TextInput
                // {...register("fullName")}
                label="Current Password"
                placeholder="Enter"
              />
              <TextInput
                // {...register("email")}
                label="New Password"
                placeholder="Enter"
              />
              <TextInput
                // {...register("email")}
                label="Confirm Password"
                placeholder="Enter"
              />

              <div
                className={`col-span-2 col-start-2 col-end-3 flex flex-row justify-between ${
                  false && "opacity-50"
                }`}
              >
                <CustomButton
                  onClick={() => {
                    setShowModal(false);
                    reset();
                  }}
                  className="font-medium text-[14px] text-primary px-6 py-1 rounded-sm animate-fade border tracking-[1.5px] hover:bg-[#F5F8FF]"
                >
                  CANCEL
                </CustomButton>
                <CustomButton
                  type="submit"
                  className={` bg-primary text-white text-[14px] px-6 py-1 font-medium rounded-sm animate-fade tracking-[1.5px]`}
                  disabled={false}
                  onClick={() => {
                    setShowModal(false);
                    setSuccess(true);
                  }}
                >
                  UPDATE
                </CustomButton>
              </div>
            </form>
          </FormModal>
        )}
        {success && (
          <SuccessModal
            description="Password changed successfully."
            setModalOpen={setSuccess}
          />
        )}
      </form>
    </div>
  );
}
