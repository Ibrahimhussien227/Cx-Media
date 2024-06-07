"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { ColumnDef } from "@tanstack/react-table";
import { nanoid } from "nanoid";

import ActionsMenu from "@/components/ActionsMenu";
import Modal from "@/components/Modal";
import CustomButton from "@/components/CustomButton";
import StatusTag from "@/components/StatusTag";
// import TableSkeleton from "@/components/CustomTable/_comps/Skeleton";
import CustomTable from "@/components/CustomTable";
import { ArrowLeft } from "@/utils/icons";
import { ACTIONS, COLUMNS, STATSCARDS } from "./config";
import { useSearchParams } from "next/navigation";

const Details = () => {
  const searchParams = useSearchParams();

  const [showModal, setShowModal] = useState<boolean>(false);

  const { setValue, reset, handleSubmit } = useForm({
    defaultValues: { action: "" },
  });

  const onSubmit: SubmitHandler<{ action: string }> = async (formData) => {
    // if (campaignDetails && formData.action)
    //   postAction({
    //     campaignId: campaignDetails?.campaign._id,
    //     reviewStatus: formData.action,
    //   });
    console.log(formData);

    reset();
    setShowModal(false);
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
            {searchParams?.get("id")}
          </Link>
          <ActionsMenu
            actions={ACTIONS}
            handler={(title) => {
              setValue("action", title, { shouldDirty: true });
              setShowModal(true);
            }}
          />
        </div>
      </header>
      <div className="grid md:grid-cols-5 gap-4 m-5">
        <div className="col-start-1 md:col-end-4 flex flex-col gap-4 h-screen">
          <div className="flex flex-row items-center justify-start gap-2">
            <p className="font-bold">25 Jan 2024 - 25 Mar 2024</p>
            <StatusTag text="LIVE" />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {STATSCARDS?.map(({ title, count }) => (
              <div
                key={nanoid()}
                className="flex flex-col grow shrink-0 gap-4 bg-white p-4"
              >
                <p className="text-[#333333] text-[13px]">{title}</p>
                <p className="text-secondary text-[16px] font-bold">
                  {count.length ? count : "-"}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start justify-center">
            <p className="font-bold mb-4">Insights by Campaign / Property</p>
            {/* {false ? (
              <TableSkeleton />
            ) : ( */}
            <div className="bg-white w-full overflow-x-scroll">
              <CustomTable
                data={[]}
                columns={COLUMNS as ColumnDef<{ _id?: string }>[]}
              />
            </div>
            {/* )} */}
          </div>
        </div>
        <div className="md:col-start-4 md:col-end-6 self-start h-screen overflow-y-scroll no-scrollbar">
          {/* <div className="bg-white p-5 mb-[15px]">
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-base font-bold mb-3">Campaign Listing Fee</h3>
              <StatusTag text="PAID" />
            </div>
            <LogsList logs={campaignListingFeeData} data={adminAccount} />
          </div>
          <div className="bg-white p-5 mb-[15px]">
            <h3 className="text-base font-bold mb-3">Seller Details</h3>
            <LogsList logs={sellerDetailsData} data={adminAccount} />
          </div> */}
          <div className="bg-white p-5 mb-[125px]">
            <h3 className="text-base font-bold mb-3">Administration Logs</h3>
            {/* <LogsList logs={logsData} data={campaignAdminstration} /> */}
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
            description="Are you Sure you want to perform this action?"
            setShowModal={setShowModal}
          >
            <CustomButton
              className={`hover:bg-[#D4E4F2] transition-all delay-100 w-full py-2 bg-[#D4E4F2] text-secondary text-[10px] tracking-[1.5px]`}
              onClick={() => {
                reset();
              }}
            >
              CANCEL
            </CustomButton>
            <CustomButton
              type="submit"
              className={`transition-all delay-100 w-full py-2 bg-[#2C3A5C] text-[white] text-[10px] tracking-[1.5px]`}
            >
              Proceed
            </CustomButton>
          </Modal>
        )}
      </form>
    </section>
  );
};

export default Details;
