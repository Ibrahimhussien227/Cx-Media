import { completionStatus } from "@/types/enum.constants";
import { PropsWithRef } from "react";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationDefinition } from "@reduxjs/toolkit/query";



export interface ITrackedForm {
  formId: string;
  updateTracker?: (formId: string, state:completionStatus)=> void;
  campaignDetails: ICampaignDetails;
  configActionBtn?: (configParams: Partial<actionBtnConfig>)=> void
}


type trackedformObj = {
  id: string;
  title: string;
  Comp: React.FunctionComponent<PropsWithRef<{formId: string, updateTracker: (formId: string, state:completionStatus)=> void}>>;
}

export interface IFormsTrackerProps {
  forms: trackedformObj[];
  onComplete: ()=> void
}

export interface IFormsTracker {
  formsNum: number;
  completedForms: number;
  [key: string]: completionStatus | number;
}


export type RTKCampaignTrigger<params, returnType = void> = MutationTrigger<MutationDefinition<
  params,
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
  "Campaign",
  returnType,
  "campaignApi">
>