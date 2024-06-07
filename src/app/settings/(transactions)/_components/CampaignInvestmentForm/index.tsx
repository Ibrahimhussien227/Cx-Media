import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Accordion from "@/components/Accordion";
import CustomButton from "@/components/CustomButton";
import TextInput from "@/components/TextInput";
import { ICampaignInvestment, ICampaignInvestmentFormsProps } from "./type";

const CampaignInvestmentForms = ({
  campaignInvestment,
}: ICampaignInvestmentFormsProps) => {
  const {
    reset,
    handleSubmit,
    register,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      dldTransferAndRegistrationFee:
        campaignInvestment.dldTransferAndRegistrationFee.value,
      trusteeFee: campaignInvestment.trusteeFee.value,
      titleDeedFee: campaignInvestment.titleDeedFee.value,
      brokerageAgencyFee: campaignInvestment.brokerageAgencyFee.value,
      administrationFee: campaignInvestment.administrationFee.value,
      propertyInsuranceFee: campaignInvestment.propertyInsuranceFee.value,
      valuationFee: campaignInvestment.valuationFee.value,
      certificateOfIncumbencyFee:
        campaignInvestment.certificateOfIncumbencyFee.value,
      difcSpvIncorporationFee: campaignInvestment.difcSpvIncorporationFee.value,
      difcNocFee: campaignInvestment.difcNocFee.value,
      serviceFee: campaignInvestment.serviceFee.value,
      maintenanceAndPropertyManagementFee:
        campaignInvestment.maintenanceAndPropertyManagementFee.value,
      miscellaneousFee: campaignInvestment.miscellaneousFee.value,
      reserveForUtilitiesAndMaintenance:
        campaignInvestment.reserveForUtilitiesAndMaintenance.value,
      acquisitionFee: campaignInvestment.acquisitionFee.value,
      platformVAT: campaignInvestment.platformVAT.value,
    },
  });

  // submit handler
  const handleSubmitComapny: SubmitHandler<ICampaignInvestment> = async (
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
        title="Campaign Investment"
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
        <p className="font-semibold text-gray-400">PROPERTY SERVICE FEE</p>

        <div className="grid md:grid-cols-2 gap-4">
          <TextInput
            {...register("dldTransferAndRegistrationFee")}
            label="DLD Transfer & Registration Fee (%)"
            // disabled={isLoading}
          />
          <TextInput
            {...register("trusteeFee")}
            label="Trustee Fee"
            // disabled={isLoading}
          />

          <TextInput
            {...register("titleDeedFee")}
            label="Title Deed Fee"
            // disabled={isLoading}
          />

          <TextInput
            {...register("brokerageAgencyFee")}
            label="Brokerage/Agency Fee (%)"
            // disabled={isLoading}
          />
          <TextInput
            {...register("administrationFee")}
            label="Administration Fee"
            // disabled={isLoading}
          />
          <TextInput
            {...register("propertyInsuranceFee")}
            label="Property Insurance Fee (%)"
            // disabled={isLoading}
          />

          <TextInput
            {...register("valuationFee")}
            label="Valueation Fee"
            // disabled={isLoading}
          />

          <TextInput
            {...register("certificateOfIncumbencyFee")}
            label="Certificate of Incumbency Fee"
            // disabled={isLoading}
          />
          <TextInput
            {...register("difcSpvIncorporationFee")}
            label="DIFC SPC IncorporationFee"
            // disabled={isLoading}
          />
          <TextInput
            {...register("difcNocFee")}
            label="DIFC NOC Fee"
            // disabled={isLoading}
          />
          <TextInput
            {...register("serviceFee")}
            label="Service Fee"
            // disabled={isLoading}
          />

          <TextInput
            {...register("maintenanceAndPropertyManagementFee")}
            label="Maintenance & Property Management Fee"
            // disabled={isLoading}
          />
          <TextInput
            {...register("miscellaneousFee")}
            label="Miscelleaneous Fee"
            // disabled={isLoading}
          />
          <TextInput
            {...register("reserveForUtilitiesAndMaintenance")}
            label="Reserve for Utilities & Maintenance"
            // disabled={isLoading}
          />
        </div>
        <p className="font-semibold text-gray-400">PLATFORM FEE</p>
        <div className="grid md:grid-cols-2 gap-4">
          <TextInput
            {...register("acquisitionFee")}
            label="Acquisition Fee (%)"
            // disabled={isLoading}
          />
          <TextInput
            {...register("dldTransferAndRegistrationFee")}
            label="KYC Fee (%)"
            // disabled={isLoading}
          />

          <TextInput
            {...register("platformVAT")}
            label="VAT (%)"
            // disabled={isLoading}
          />
        </div>
      </Accordion>
    </form>
  );
};

export default CampaignInvestmentForms;
