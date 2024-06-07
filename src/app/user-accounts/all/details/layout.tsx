"use client";
import Link from "next/link";

import SectionCard from "@/components/SectionCard";
import ActionsMenu from "@/components/ActionsMenu";
import { ArrowLeft } from "@/utils/icons";
import { MODALS, accountActions, pageSections } from "./configs";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Modal from "@/components/Modal";
import CustomButton from "@/components/CustomButton";

interface RootLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export default function RootLayout({ children }: RootLayoutProps) {
  const searchParams = useSearchParams();
  const [showModal, setShowModal] = useState<boolean>(false);

  const { setValue, reset, handleSubmit, watch } = useForm({
    defaultValues: { action: "" },
  });
  const formAccessor = watch();

  const onSubmit = (data: { action: string }) => {
    console.log(data);
    setShowModal(false);
    // reset();
  };

  return (
    <section className="h-full overflow-hidden no-scrollbar">
      <header className="bg-white flex flex-col items-start justify-between p-5">
        <div className="flex flex-row w-full justify-between">
          <Link
            href="."
            className="flex items-center gap-2 text-base font-bold"
          >
            <ArrowLeft size={24} />
            John Doe
          </Link>
          <ActionsMenu
            actions={accountActions.filter(
              (el) => el.status != formAccessor.action
            )}
            handler={(action) => {
              setValue("action", action, { shouldDirty: true });
              setShowModal(true);
            }}
          />
        </div>
        <div className="flex gap-4">
          {pageSections.map((section) => {
            return (
              <SectionCard
                customWidth="min-w-[400px]"
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
      <div className="grid md:grid-cols-5 gap-4 m-5">
        <div className="  col-start-1 md:col-end-4 flex flex-col gap-4 h-screen">
          {/* <div className="bg-white p-3 font-bold flex gap-3 items-center">
            <h2 className="font-bold py-2">Investor Details</h2>
          </div> */}
          <div className="h-full overflow-y-scroll mb-[140px] no-scrollbar">
            {children}
          </div>
        </div>
        <div className=" md:col-start-4 md:col-end-6 h-screen overflow-y-scroll no-scrollbar">
          <div className="bg-white p-5 pb-0 mb-[140px]">
            <h3 className="text-base font-bold mb-3 tracking-wide">
              Adminstaration Logs
            </h3>
            {/* <LogsList logs={logsData} data={adminAccount} /> */}
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
  );
}
