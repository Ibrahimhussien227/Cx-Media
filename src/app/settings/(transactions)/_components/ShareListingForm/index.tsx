import React from "react";

import Accordion from "@/components/Accordion";
import CustomButton from "@/components/CustomButton";
// import Spinner from "@/components/Spinner";
import TextInput from "@/components/TextInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { IShareListingForm } from "./type";

const ShareListingForms = () => {
  const {
    reset,
    handleSubmit,
    register,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      platformFeeInvestor: 0,
      platformFeeeSeller: 0,
      vatInvestor: 0,
      vatSeller: 0,
    },
  });

  // useEffect(() => {
  //   reset({
  //     publishDate: publishedAt?.split(" ")[0],
  //   });
  // }, [reset, publishedAt]);

  // submit handler
  const handleSubmitComapny: SubmitHandler<IShareListingForm> = async (
    formData
  ) => {
    console.log(formData);

    // await patchPublishCampaign({
    //   campaignId: searchParams.id,
    //   campaignPublishingTimestamp: formData.publishDate,
    // });
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitComapny)}
      className="col-start-1 md:col-end-4 bg-white p-5 rounded-sm"
    >
      <Accordion
        title="Share Listing Purchase"
        EditButton={
          <div
            className={`${
              !isDirty && "opacity-50"
            } flex flex-row w-full justify-between items-center gap-3`}
          >
            <>
              <CustomButton
                className={`p-2 ml-auto font-medium px-3 py-1 rounded-none animate-fade border ${
                  isDirty && "hover:bg-[#F5F8FF]"
                }`}
                onClick={() => reset()}
                disabled={!isDirty}
              >
                Cancel
              </CustomButton>
              <CustomButton
                type="submit"
                className="bg-primary text-[white] px-3 py-1 font-medium rounded-none animate-fade"
                disabled={!isDirty}
              >
                Update
              </CustomButton>
            </>
          </div>
        }
      >
        <p className="font-semibold text-gray-400">SELLER</p>

        <div className="grid md:grid-cols-2 gap-4">
          <TextInput
            {...register("platformFeeeSeller", {
              setValueAs: (v) => parseInt(v),
            })}
            label="Platform Fee (%)"
            // disabled={isLoading}
          />

          <TextInput
            {...register("vatSeller", {
              setValueAs: (v) => parseInt(v),
            })}
            label="VAT (%)"
            // disabled={isLoading}
          />
        </div>
        <p className="font-semibold text-gray-400">BUYER</p>

        <div className="grid md:grid-cols-2 gap-4">
          <TextInput
            {...register("platformFeeInvestor", {
              setValueAs: (v) => parseInt(v),
            })}
            label="Platform Fee (%)"
            // disabled={isLoading}
          />

          <TextInput
            {...register("vatInvestor", {
              setValueAs: (v) => parseInt(v),
            })}
            label="VAT (%)"
            // disabled={isLoading}
          />
        </div>
      </Accordion>
    </form>
  );
};

export default ShareListingForms;
