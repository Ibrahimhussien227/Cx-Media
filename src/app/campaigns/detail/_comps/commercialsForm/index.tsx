"use client";

import { LabeledInput } from "@/components/TextInputs";
import { useCallback, useEffect, useReducer} from "react";
import { useTranslation } from "react-i18next";
import { ITrackedForm } from "../../_sections/property-detail/types";
import { useCreateFinancialDetailsMutation, useUpdateFinancialDetailsMutation } from "@/store/services/campaign/financialDetailsApi";
import { financeFormReducer } from "./financeFormReducer";
import { CampaignReviewStatus } from "@/types/enum.constants";
import useOnUnmount from "@/hooks/useOnUnmount";

const CommercialsForm = ({formId, updateTracker, campaignDetails, configActionBtn}: ITrackedForm) => {
  const {t} = useTranslation("campaignsPage");

  const [createFinancialDetails, {isSuccess: isFinanceCreated}] = useCreateFinancialDetailsMutation();
  const [updateFinancialDetails, {isSuccess: isFinanceUpdated}] = useUpdateFinancialDetailsMutation();

  const [financeFormState, dispatch] = useReducer(financeFormReducer, {
    details: {...(campaignDetails.financialDetails|| {})},
    apiCampaignDetails: campaignDetails,
    createFinancialDetails,
    updateFinancialDetails,
    actionBtnConfig: {disabled: true},
    isLocked: [CampaignReviewStatus.APPROVED_TO_PUBLISH, CampaignReviewStatus.PENDING_FEE, CampaignReviewStatus.PENDING_REVIEW].includes(campaignDetails.reviewStatus),
    fieldsTrack: {
      propertyPrice: {hasChanged: false, isFilled: Boolean(campaignDetails.financialDetails?.propertyPrice)},
      projectedAnnualizedReturn: {hasChanged: false, isFilled: Boolean(campaignDetails.financialDetails?.projectedAnnualizedReturn)},
      projectedAnnualAppreciation: {hasChanged: false, isFilled: Boolean(campaignDetails.financialDetails?.projectedAnnualAppreciation)},
      projectedGrossYield: {hasChanged: false, isFilled: Boolean(campaignDetails.financialDetails?.projectedGrossYield)},
      projectedNetYield: {hasChanged: false, isFilled: Boolean(campaignDetails.financialDetails?.projectedNetYield)},
    }
  })

  // updating the tracker when necessary
  useEffect(()=> {
    if (financeFormState.details.completionStatus && updateTracker){
      updateTracker(formId, financeFormState.details.completionStatus)
    }
  }, [financeFormState.details.completionStatus, formId, updateTracker])

  // config save button with the latest button state and from data
  useEffect(()=> {
    configActionBtn && configActionBtn(financeFormState.actionBtnConfig)
  }, [financeFormState.actionBtnConfig, configActionBtn])

  const autoSaveOnLeave = useCallback(()=> {
    if (financeFormState.actionBtnConfig.disabled === false){// unsaved changes
      financeFormState.actionBtnConfig.onClick && financeFormState.actionBtnConfig.onClick()
    }
  }, [financeFormState.actionBtnConfig])
  
  useOnUnmount(autoSaveOnLeave)

  // disabled the save button after request is succeffuly made
  useEffect(()=> {
    if ((isFinanceCreated || isFinanceUpdated) && configActionBtn){
      configActionBtn({disabled: true})
    }
  }, [isFinanceCreated, isFinanceUpdated, configActionBtn])


  return (
    <form className="flex flex-col gap-4">
      <LabeledInput
        label={t("commercialsForm.propertyPrice")}
        placeholder={t("commercialsForm.propertyPricePlaceholder")}
        note={t("commercialsForm.propertyPriceContent")}
        type="number"
        suffix="AED"
        value={financeFormState.details.propertyPrice}
        onChange={(evt)=> dispatch({type: 'SET_PRICE', payload: +evt.target.value})}
        readOnly={financeFormState.isLocked}
      />
      <LabeledInput
        label={t("commercialsForm.projectedAnnualizedReturn")}
        placeholder={t("commercialsForm.projectedAnnualizedReturnPlaceholder")}
        note={t("commercialsForm.projectedAnnualizedReturnContent")}
        type="number"
        suffix="%"
        value={financeFormState.details.projectedAnnualizedReturn}
        onChange={(evt)=> dispatch({type: 'SET_ANNUAL_RETURN', payload: +evt.target.value})}
        readOnly={financeFormState.isLocked}
      />
      <LabeledInput
        label={t("commercialsForm.projectedAnnualAppreciation")}
        placeholder={t("commercialsForm.projectedAnnualAppreciationPlaceholder")}
        note={t("commercialsForm.projectedAnnualAppreciationContent")}
        type="number"
        suffix="%"
        value={financeFormState.details.projectedAnnualAppreciation}
        onChange={(evt)=> dispatch({type: 'SET_ANNUAL_APPRECIATION', payload: +evt.target.value})}
        readOnly={financeFormState.isLocked}
      />
      <LabeledInput
        label={t("commercialsForm.projectedGrossYield")}
        placeholder={t("commercialsForm.projectedGrossYieldPlaceholder")}
        note={t("commercialsForm.projectedGrossYieldContent")}
        type="number"
        suffix="%"
        value={financeFormState.details.projectedGrossYield}
        onChange={(evt)=> dispatch({type: 'SET_GROSS_YEILD', payload: +evt.target.value})}
        readOnly={financeFormState.isLocked}
      />
      <LabeledInput
        label={t("commercialsForm.projectedNetYield")}
        placeholder={t("commercialsForm.projectedNetYieldPlaceholder")}
        note={t("commercialsForm.projectedNetYieldContent")}
        type="number"
        suffix="%"
        value={financeFormState.details.projectedNetYield}
        onChange={(evt)=> dispatch({type: 'SET_NET_YEILD', payload: +evt.target.value})}
        readOnly={financeFormState.isLocked}
      />
    </form>
  );
};

export default CommercialsForm;
