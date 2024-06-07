"use client";

import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Accordion from "@/components/Accordion";
import CustomSelect from "@/components/CustomSelect";
import Spinner from "@/components/Spinner";
import CustomButton from "@/components/CustomButton";
import TextInput from "@/components/TextInput";
import GridFormSkeleton from "@/components/Skeleton/GridFormSkeleton";
import { getDirtyFields } from "@/utils/getDirtyFields";
import { IAccountSubmitForm } from "./type";
import { ROLELEVELS } from "./configs";
import {
  useGetAdminMeQuery,
  useUpdateAdminByIdMutation,
} from "@/store/services/admin/adminApi";

const AccountDetails = () => {
  const { data, isLoading } = useGetAdminMeQuery();

  console.log(data);

  const [updateAdmin, { isLoading: isLoadingUpdatingAdmin }] =
    useUpdateAdminByIdMutation();
  const {
    reset,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isDirty, dirtyFields },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      roleId: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        fullName: data.data.profile.fullName,
        email: data?.data.profile.email,
        roleId: data?.data.roleId,
      });
    }
  }, [data, reset]);

  const handleSubmitComapny: SubmitHandler<IAccountSubmitForm> = async (
    formData,
  ) => {
    updateAdmin({
      id: data?.data.userId + "",
      body: getDirtyFields(formData, dirtyFields),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitComapny)}
      className="col-start-1 md:col-end-4 bg-white p-5"
    >
      <Accordion
        title={`Account ID ${data?.data.userId}`}
        status={data?.data.status}
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
            <TextInput
              {...register("fullName")}
              label="Full Legal Name"
              // disabled={isLoading}
            />
            <TextInput
              {...register("email")}
              label="Email Address"
              // disabled={isLoading}
            />
            <CustomSelect
              label="Role"
              options={ROLELEVELS}
              value={watch("roleId")}
              // disabled={isLoading}
              onChange={(selectedPropertyType) =>
                setValue("roleId", selectedPropertyType.display, {
                  shouldDirty: true,
                })
              }
            />
          </div>
        )}
      </Accordion>
    </form>
  );
};

export default AccountDetails;
