"use client";

import { useCallback, useEffect, useMemo, useReducer } from "react";
import { ITrackedForm } from "../../_sections/property-detail/types";
import { LabeledInput, TextInput } from "@/components/TextInputs";
import CustomSelect from "@/components/customSelect";
import { assetFormReducer } from "./assetFormReducer";
import { CampaignReviewStatus } from "@/types/enum.constants";
import { useUpdateAssetGeneralDataMutation } from "@/store/services/campaign/assetDetailsApi";
import { useTranslation } from "react-i18next";
import { useGetCamapignsConfigsQuery } from "@/store/services/campaign/api";
import { convertConfigsToOptions } from "../utils";
import useOnUnmount from "@/hooks/useOnUnmount";

const PropertyForm = ({
  formId,
  updateTracker,
  campaignDetails,
  configActionBtn,
}: ITrackedForm) => {
  const { t } = useTranslation("campaignsPage");

  const [updateAssetGeneralData, { isSuccess: isUpdateSuccessful }] =
    useUpdateAssetGeneralDataMutation();

  const [assetFormState, dispatch] = useReducer(assetFormReducer, {
    details: { ...(campaignDetails.assetDetails || {}) },
    apiCampaignDetails: campaignDetails,
    updateAssetGeneralData,
    actionBtnConfig: { disabled: true },
    isLocked: [
      CampaignReviewStatus.APPROVED_TO_PUBLISH,
      CampaignReviewStatus.PENDING_FEE,
      CampaignReviewStatus.PENDING_REVIEW,
    ].includes(campaignDetails.reviewStatus),
    fieldsTrack: {
      assetName: {
        hasChanged: false,
        isFilled: Boolean(campaignDetails.assetDetails?.assetName),
      },
      assetDescription: {
        hasChanged: false,
        isFilled: Boolean(campaignDetails.assetDetails?.assetDescription),
      },
      assetAppId: {
        hasChanged: false,
        isFilled: Boolean(campaignDetails.assetDetails?.assetAppId),
      },
      assetType: {
        hasChanged: false,
        isFilled: Boolean(campaignDetails.assetDetails?.assetType),
      },
      assetArea: {
        hasChanged: false,
        isFilled: Boolean(campaignDetails.assetDetails?.assetArea),
      },
      numberOfBed: {
        hasChanged: false,
        isFilled: Boolean(campaignDetails.assetDetails?.numberOfBed),
      },
      numberOfBath: {
        hasChanged: false,
        isFilled: Boolean(campaignDetails.assetDetails?.numberOfBath),
      },
      assetInvestmentType: {
        hasChanged: false,
        isFilled: Boolean(campaignDetails.assetDetails?.assetInvestmentType),
      },
    },
  });

  const { propertyTypeOps } = useGetCamapignsConfigsQuery("asset_type", {
    skip: assetFormState.isLocked,
    selectFromResult: ({ data }) => ({
      propertyTypeOps: convertConfigsToOptions(
        data?.data,
        assetFormState.details.assetType
      ),
    }),
  });
  const { investmentTypeOps } = useGetCamapignsConfigsQuery("investment_type", {
    skip: assetFormState.isLocked,
    selectFromResult: ({ data }) => ({
      investmentTypeOps: convertConfigsToOptions(
        data?.data,
        assetFormState.details.assetInvestmentType
      ),
    }),
  });

  const selectedType = useMemo(() => {
    const assetType = assetFormState.details.assetType;
    // in the initial run, if asset type is present it's actually the display string, otherwise we deal with the value (key)
    return propertyTypeOps.find(
      (op) => op.value === assetType || op.display == assetType
    );
  }, [assetFormState.details.assetType, propertyTypeOps]);

  const selectedInvestmentType = useMemo(() => {
    const investmentType = assetFormState.details.assetInvestmentType;
    // in the initial run, if investment type is present it's actually the display string, otherwise we deal with the value (key)
    return investmentTypeOps.find(
      (op) => op.value === investmentType || op.display === investmentType
    );
  }, [assetFormState.details.assetInvestmentType, investmentTypeOps]);

  // updating the tracker when necessary
  useEffect(() => {
    updateTracker && updateTracker(formId, assetFormState.details.completionStatus);
  }, [assetFormState.details.completionStatus, formId, updateTracker]);

  // config save button with the latest button state and from data
  useEffect(() => {
    configActionBtn && configActionBtn(assetFormState.actionBtnConfig);

  }, [assetFormState.actionBtnConfig, configActionBtn]);

  const autoSaveOnLeave = useCallback(()=> {
    if (assetFormState.actionBtnConfig.disabled === false){
      assetFormState.actionBtnConfig.onClick && assetFormState.actionBtnConfig.onClick()
    }
  }, [assetFormState.actionBtnConfig])

  useOnUnmount(autoSaveOnLeave)

  // disabled the save button after request is succeffuly made
  useEffect(() => {
    if (isUpdateSuccessful && configActionBtn) {
      configActionBtn({ disabled: true });
    }
  }, [isUpdateSuccessful, configActionBtn]);

  return (
    <form className="flex flex-col justify-center gap-y-4 w-full">
      <LabeledInput
        label={t("propertyForm.propertyName")}
        placeholder={t("propertyForm.propertyNamePlaceholder")}
        onChange={(evt) =>
          dispatch({ type: "SET_NAME", payload: evt.target.value })
        }
        value={assetFormState.details.assetName}
        readOnly={assetFormState.isLocked}
        note={t("propertyForm.propertyNameContent")}
      />
      <LabeledInput
        isTextArea={true}
        label={t("propertyForm.propertyDescription")}
        value={assetFormState.details.assetDescription}
        placeholder={t("propertyForm.propertyDescriptionPlaceholder")}
        readOnly={assetFormState.isLocked}
        note={t("propertyForm.propertyDescriptionContent")}
        onChange={(evt) =>
          dispatch({ type: "SET_DESCRIPTION", payload: evt.target.value })
        }
      />
      <LabeledInput
        value={assetFormState.details.assetAppId}
        label={t("propertyForm.propertyId")}
        placeholder={t("propertyForm.propertyIdPlaceholder")}
        readOnly={assetFormState.isLocked}
        onChange={(evt) =>
          dispatch({ type: "SET_PROP_ID", payload: evt.target.value })
        }
        note={t("propertyForm.propertyIdContent")}
      />

      <CustomSelect
        label={t("propertyForm.propertyType")}
        options={propertyTypeOps}
        onSelect={(selectedOp) =>
          dispatch({ type: "SET_PROP_TYPE", payload: selectedOp.value })
        }
        value={selectedType}
        note={t("propertyForm.propertyTypeContent")}
      />

      {assetFormState.details.assetType && (
        <div className="grid grid-cols-[0.5fr_1fr_1fr] gap-5">
          <span>{""}</span>
          <div className="flex gap-3 justify-end">
            <TextInput
              placeholder="Enter"
              suffix="BEDS"
              type="number"
              readOnly={assetFormState.isLocked}
              min={1}
              value={assetFormState.details.numberOfBed}
              onChange={(evt) =>
                dispatch({ type: "SET_BEDS", payload: +evt.target.value })
              }
              className="w-[50%]"
            />
            <TextInput
              placeholder="Enter"
              suffix="BATHS"
              readOnly={assetFormState.isLocked}
              type="number"
              value={assetFormState.details.numberOfBath}
              onChange={(evt) =>
                dispatch({ type: "SET_BATH", payload: +evt.target.value })
              }
              className="w-[50%]"
            />
          </div>
          <span className="text-[#93A0C3] text-[12px] tracking-[0px] pl-5 border-l-[1px]">
            {t("propertyForm.propertyTypesubContent")}
          </span>
        </div>
      )}
      <LabeledInput
        label={t("propertyForm.propertyArea")}
        placeholder={t("propertyForm.propertyAreaPlaceholder")}
        value={assetFormState.details.assetArea}
        suffix="SQ. FT."
        type="number"
        min={20}
        readOnly={assetFormState.isLocked}
        onChange={(evt) =>
          dispatch({ type: "SET_AREA", payload: +evt.target.value })
        }
        note={t("propertyForm.propertyAreaContent")}
      />

      <CustomSelect
        label={t("propertyForm.investmentType")}
        options={investmentTypeOps}
        onSelect={(selectedOp) =>
          dispatch({ type: "SET_INVESTMENT_TYPE", payload: selectedOp.value })
        }
        value={selectedInvestmentType}
        note={t("propertyForm.investmentTypeContent")}
      />
    </form>
  );
};

export default PropertyForm;
