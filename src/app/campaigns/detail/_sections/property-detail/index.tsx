"use client";
import React, { useCallback, useState } from "react";
import StatusTag from "@/components/statusTag";
import { IFormsTracker } from "./types";
import { completionStatus } from "@/types/enum.constants";
import { coompletionStatusColorMap, forms } from "./configs";
import { ICampaignSectionProps } from "../../types";


const PropertyDetail =({
    campaignDetails,
    configActionBtn,
    activeTabState
  }: ICampaignSectionProps)=>{


  const trackerInitialState  = forms.reduce((tracker: IFormsTracker, form)=> {
    tracker[form.id] = form.statusGetter(campaignDetails)
    tracker.formsNum += 1;
    return tracker;
  }, {formsNum: 0, completedForms: 0})

  const [tracker, setTracker] = useState(trackerInitialState);

  const [activeForm, setActiveForm] = useState(forms[0]);

  const updateTracker = useCallback((formId: string, state:completionStatus)=> {
    const formCurrentState = tracker[formId as keyof typeof tracker] as unknown as completionStatus;
    if (formCurrentState === state){
      return; // same, don't bother
    }
    let newTrackerObj = {
      ...tracker,
      [formId]: state,
    }
    newTrackerObj.completedForms = Object
    .values(newTrackerObj)
    .filter(status=> typeof status === 'string' && status === completionStatus.COMPLETE).length;

    /* if (newTrackerObj.completedForms === newTrackerObj.formsNum){
      configActionBtn({
        disabled: false,
        text: 'Next',
        onClick:()=> activeTabState.setActiveTabIdx(activeTabState.activeTabIdx + 1)}
      )
    } */
    setTracker(newTrackerObj)
  }, [tracker, /* configActionBtn, activeTabState */])

  const RenderedForm = activeForm.Comp;

  return (
    <div className={`py-5 grid md:grid-cols-4 md:gap-8`}>
      <ul className={`list-none flex gap-1 md:block md:*:mt-1`}>
        {forms.map(formData=> {
          const formStatus = tracker[formData.id as keyof typeof tracker] as unknown as string;
          return (
          <li
            key={formData.id}
            onClick={()=> setActiveForm(formData)}
            className={`
              border-[0.5px] border-borderOpticy p-2.5 capitalize flex justify-between flex-wrap transition-all font-minion relative text-[16px] cursor-pointer
              ${activeForm.id === formData.id? `bg-[#5A6A93] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0.5 before:h-2.5 before:bg-orange`: ''}
            `}
          >
            {formData.title}
            <StatusTag
              text={formStatus}
              color={coompletionStatusColorMap[formStatus as keyof typeof coompletionStatusColorMap]}
            />
          </li>
        )})}
      </ul>

      <div className={`md:col-start-2 md:col-end-5`}>
        <RenderedForm
          formId={activeForm.id}
          updateTracker={updateTracker}
          campaignDetails={campaignDetails}
          configActionBtn={configActionBtn}
        />
      </div>
    </div>
  );
}
export default PropertyDetail;
