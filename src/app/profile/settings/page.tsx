"use client";

import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Accordion from "@/components/Accordion";
import Spinner from "@/components/Spinner";
import CustomButton from "@/components/CustomButton";
import GridFormSkeleton from "@/components/Skeleton/GridFormSkeleton";
import SwitchButton from "@/components/SwitchButton";

import { getDirtyFields } from "@/utils/getDirtyFields";
import { ISettingsSubmitForm } from "./type";
import {
  useGetAdminMeQuery,
  useUpdateAdminByIdMutation,
} from "@/store/services/admin/adminApi";

const Settings = () => {
  const { data, isLoading } = useGetAdminMeQuery();
  const [updateAdmin, { isLoading: isLoadingUpdatingAdmin }] =
    useUpdateAdminByIdMutation();

  const {
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty, dirtyFields },
  } = useForm({
    defaultValues: {
      isMfaEnabled: !!data?.data.profile.isMfaEnabled,
    },
  });

  useEffect(() => {
    reset({ isMfaEnabled: !!data?.data.profile.isMfaEnabled });
  }, [data, reset]);

  const handleSubmitComapny: SubmitHandler<ISettingsSubmitForm> = async (
    formData,
  ) => {
    updateAdmin({
      id: data?.data.userId + "",
      body: getDirtyFields(formData, dirtyFields),
    });
  };

  if (isLoading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit(handleSubmitComapny)}
      className="col-start-1 md:col-end-4 bg-white p-5"
    >
      <Accordion
        title="Account Settings"
        EditButton={
          <div
            className={`${
              !isDirty && "opacity-50"
            } flex flex-row w-full justify-between items-center gap-3`}
          >
            {!isLoadingUpdatingAdmin ? (
              <>
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
                  Update
                </CustomButton>
              </>
            ) : (
              <Spinner />
            )}
          </div>
        }
      >
        {isLoading ? (
          <GridFormSkeleton />
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-[12px] font-bold ml-2">
                2 Factor Authentication
              </label>
              <div className="bg-[#F5F8FF80] px-5 flex items-center justify-start gap-5 border rounded-sm">
                <SwitchButton
                  //   isDisabled={isLoading}
                  value={watch("isMfaEnabled")}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setValue("isMfaEnabled", e.target.checked, {
                      shouldDirty: true,
                    })
                  }
                />
                <p className="text-[12px] font-medium">
                  {watch("isMfaEnabled") ? "Active" : "Disabled"}
                </p>
              </div>
            </div>
          </div>
        )}
      </Accordion>
    </form>
  );
};

export default Settings;
