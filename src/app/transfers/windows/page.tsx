"use client";

import React, { useState } from "react";

import CustomTable from "@/components/CustomTable";
// import TableSkeleton from "@/components/CustomTable/_comps/Skeleton";
import { ColumnDef } from "@tanstack/react-table";
import CustomButton from "@/components/CustomButton";
import { Plus } from "@/utils/icons";
import FormModal from "@/components/FormModal";
import CustomDatePicker from "@/components/CustomDatePicker";
import { STATUSOPTIONS, columns, data } from "./config";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import TableSkeleton from "@/components/Skeleton/Table";

const Windows = () => {
  const [modal, setMoadl] = useState(false);

  const {
    reset,
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      startDate: "",
      endDate: "",
    },
  });

  const handleSubmitComapny: SubmitHandler<{
    startDate: string;
    endDate: string;
  }> = async (formData) => {
    console.log(formData);
  };

  const replaceWithTableData = false;

  return (
    <section className="m-5">
      <nav className="flex flex-col md:flex-row mb-2 gap-2 bg-white p-5 items-center justify-between">
        <h2 className="font-bold">Published Campaigns</h2>
        <CustomButton
          type="button"
          // disabled={isLoading}
          onClick={() => {
            setMoadl(true);
          }}
          className="bg-primary text-white text-[14px] px-3 py-1 font-medium animate-fade tracking-wider rounded-sm flex items-center justify-center gap-1"
        >
          <Plus />
          CREATE
        </CustomButton>
      </nav>
      {modal && (
        <form onSubmit={handleSubmit(handleSubmitComapny)}>
          <FormModal setShowModal={setMoadl} title="Create Window">
            <div className="flex flex-col gap-4 w-full px-2">
              <div className="flex flex-col w-full">
                <Controller
                  control={control}
                  name="startDate"
                  render={({ field: { value, onChange } }) => (
                    <CustomDatePicker
                      // disabled={isLoading}
                      label="Start Date"
                      placeholder="Select"
                      formatString="yyyy-MM-dd"
                      onChange={onChange}
                      placeholderText={"Please select a date"}
                      value={value}
                    />
                  )}
                />
              </div>
              <div>
                <div className="flex flex-col w-full">
                  <div className="flex w-full items-center">
                    <Controller
                      control={control}
                      name="endDate"
                      render={({ field: { value, onChange } }) => (
                        <CustomDatePicker
                          // disabled={isLoading}
                          placeholder="Select"
                          label="End Date"
                          formatString="yyyy-MM-dd"
                          onChange={onChange}
                          placeholderText={"Please select a date"}
                          value={value}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`${
                  !isDirty && "opacity-50"
                } flex flex-row w-full justify-between items-center gap-3`}
              >
                <CustomButton
                  className={`p-2 ml-auto font-[300] px-3 py-1 rounded-none animate-fade border ${
                    isDirty && "hover:bg-[#F5F8FF]"
                  }`}
                  onClick={() => reset()}
                  disabled={!isDirty}
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  type="submit"
                  className="bg-primary text-[white] px-3 py-1 font-[300] rounded-none animate-fade"
                  disabled={!isDirty}
                >
                  Submit
                </CustomButton>
              </div>
            </div>
          </FormModal>
        </form>
      )}
      {replaceWithTableData ? (
        <TableSkeleton />
      ) : (
        <div className="bg-white w-full overflow-x-scroll">
          <CustomTable
            data={
              // (!error &&
              //   approvedCampaign?.map((item) => ({
              //     _id: item.campaign._id,
              //     ...item,
              //   })))
              data || []
            }
            columns={columns as ColumnDef<{ _id?: string }>[]}
            statusOptions={STATUSOPTIONS || {}}
          />
        </div>
      )}
    </section>
  );
};

export default Windows;
