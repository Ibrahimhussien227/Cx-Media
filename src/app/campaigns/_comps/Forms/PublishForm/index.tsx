"use client";

import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import Accordion from "@/components/Accordion";
import CustomButton from "@/components/CustomButton";
import CustomDatePicker from "@/components/CustomDatePicker";
import usePublishCaqmpaign from "@/hooks/services/campaign/publishCampaign";
import { IPropertyDetailsProps, IPublishFormProps } from "./type";
import Spinner from "@/components/Spinner";
import SwitchButton from "@/components/SwitchButton";
import { useSearchParams } from "next/navigation";

const PublishForm = ({ publishedAt, closedAt }: IPublishFormProps) => {
  const searchParams = useSearchParams();
  const {
    watch,
    reset,
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      publishDate: publishedAt?.split(" ")[0] || "",
    },
  });
  const [schedule, setSchedule] = useState(
    publishedAt?.split(" ")[0] ? true : false
  );

  useEffect(() => {
    reset({
      publishDate: publishedAt?.split(" ")[0],
    });
  }, [reset, publishedAt]);

  // get => the end-date when using datePicker
  // patch => the publish-date on submit
  const { campEndDate, isLoading, patchPublishCampaign } = usePublishCaqmpaign(
    watch("publishDate")
  );

  const publishNowHandler = async (event: React.MouseEvent) => {
    event.preventDefault();

    const DateObj = new Date();
    const currentDate = DateObj.toISOString().split("T")[0];
    await patchPublishCampaign({
      campaignId: searchParams.get("id")!,
      campaignPublishingTimestamp: currentDate,
    });
    // setSchedule(true);
  };

  // submit handler
  const onSubmit: SubmitHandler<IPropertyDetailsProps> = async (formData) => {
    await patchPublishCampaign({
      campaignId: searchParams.get("id")!,
      campaignPublishingTimestamp: formData.publishDate,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="col-start-1 md:col-end-4 bg-white p-5"
    >
      <Accordion
        title="Publish Campaign"
        EditButton={
          <div
            className={`${
              !isDirty && "opacity-50"
            } flex flex-row w-full justify-between items-center gap-3`}
          >
            {!isLoading ? (
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
        <div>
          <div className="text-[#333333] text-[14px] font-medium mb-3">
            Publish your campaign now or schedule it for later.
          </div>
          {
            <div className="flex flex-row justify-between w-full items-center">
              <CustomButton
                className={`bg-primary text-[white] ${
                  schedule && "opacity-50"
                } text-[14px] px-3 py-1 font-[300] rounded-none animate-fade`}
                disabled={schedule}
                onClick={(e) => publishNowHandler(e)}
              >
                PUBLISH NOW
              </CustomButton>
              <div className="flex flex-row items-center justify-center gap-4">
                <SwitchButton
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.checked)}
                />
                <p className="text-[#333333] w-full">Scheduling Options</p>
              </div>
            </div>
          }
        </div>
        {schedule && (
          <div className="grid md:grid-cols-2 gap-4 items-center">
            <Controller
              control={control}
              name="publishDate"
              render={({ field: { value, onChange } }) => (
                <CustomDatePicker
                  disabled={isLoading}
                  label="Publish On"
                  formatString="yyyy-MM-dd"
                  onChange={onChange}
                  placeholderText={"Please select a date"}
                  value={value}
                />
              )}
            />
            <p className=" text-[12px] font-medium mt-5">
              Campaign End Date :
              {campEndDate?.data.campaignCloseTimestamp.split("T")[0] ??
                closedAt?.split(" ")[0] ??
                ""}
            </p>
          </div>
        )}
      </Accordion>
    </form>
  );
};

export default PublishForm;
