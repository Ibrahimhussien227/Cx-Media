"use client";

import { ITrackedForm } from "../../_sections/property-detail/types";
import { useTranslation } from "react-i18next";
import { CampaignReviewStatus, completionStatus } from "@/types/enum.constants";
import TagCheckbox from "@/components/TagCheckbox";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useGetCamapignsConfigsQuery } from "@/store/services/campaign/api";
import { convertConfigsToOptions } from "../utils";
import { useAddAssetAmenitiesMutation } from "@/store/services/campaign/assetDetailsApi";
import useOnUnmount from "@/hooks/useOnUnmount";

const AmenitiesForm = ({formId, updateTracker, campaignDetails, configActionBtn}: ITrackedForm) => {
  
  const {t} = useTranslation("campaignsPage");

  const originalAmentiesSorted = useMemo(()=> {
    return campaignDetails.assetDetails
      ?.assetAmenities
      ?.map(amenityObj=> amenityObj.amenitiesName)
      .sort((amen1, amen2)=> amen1 > amen2 ? 1 :-1) || []
  }, [campaignDetails.assetDetails?.assetAmenities]);

  const [selectedAmentiies, setSelectedAmentiies] = useState(originalAmentiesSorted)

  const [addAssetAmenties, {isSuccess: isAmentiesAdded}] = useAddAssetAmenitiesMutation()

  const {amenitiesOptions, isLoading} = useGetCamapignsConfigsQuery("amenity", {
    selectFromResult: ({data, isLoading})=> ({
      isLoading,
      amenitiesOptions: convertConfigsToOptions(data?.data) || []
    })
  })

  useEffect(()=> {
    if (isAmentiesAdded && configActionBtn) {
      configActionBtn({disabled: true})
    }
  }, [isAmentiesAdded, configActionBtn])

  const autoSaveOnLeave = useCallback(()=> { // autosave on unmount
    if (originalAmentiesSorted.join("") !== [...selectedAmentiies].sort((amen1, amen2)=> amen1 > amen2 ? 1 :-1).join("")) {
      addAssetAmenties({
        campaignId: campaignDetails.campaignId,
        assetId: campaignDetails.assetDetails?.assetId as string,
        amenitiesNames: selectedAmentiies
      })
    }
  }, [addAssetAmenties, campaignDetails.assetDetails?.assetId, campaignDetails.campaignId, originalAmentiesSorted, selectedAmentiies])
  useOnUnmount(autoSaveOnLeave)


  const isFormLocked = [
    CampaignReviewStatus.APPROVED_TO_PUBLISH,
    CampaignReviewStatus.PENDING_FEE,
    CampaignReviewStatus.PENDING_REVIEW
  ].includes(campaignDetails.reviewStatus);

  const handleAmenityClick =(amenityOp: IOption)=> {
    if (isFormLocked){
      return
    }
    let newSelectedAmenties : string[]; 
    if (selectedAmentiies.includes(amenityOp.display)){
      newSelectedAmenties = selectedAmentiies.filter(amenity=> amenity !== amenityOp.display)
    } else {
      newSelectedAmenties = selectedAmentiies.concat(amenityOp.display);
    }
    setSelectedAmentiies(newSelectedAmenties)
    if (updateTracker && configActionBtn){
      if (newSelectedAmenties.length === 0){ 
        updateTracker(formId, completionStatus.PENDING)
      } else if (newSelectedAmenties.length === 1) { 
        updateTracker(formId, completionStatus.COMPLETE) 
      }
      const selectedAmenitiesSorted = [...newSelectedAmenties].sort((amen1, amen2)=> amen1 > amen2 ? 1 :-1);
      if (originalAmentiesSorted.join("") !== selectedAmenitiesSorted.join("")){
        configActionBtn({
          disabled: false,
          onClick: ()=> addAssetAmenties({
            campaignId: campaignDetails.campaignId,
            assetId: campaignDetails.assetDetails?.assetId as string,
            amenitiesNames: newSelectedAmenties
          })
        })
      } else {
        configActionBtn({disabled: true})
      }
    }
  }



  return (
    <form className="flex flex-col justify-center gap-y-4 items-center w-full">
      <div className="flex w-full items-center">
        <div className="flex w-[100%]">
          <label className="flex w-[25%] font-semibold text-[10px] text-[#93A0C3] tracking-[1.5px] mb-0 mr-[12px]">
            {t("amenitiesForm.label")}
          </label>
          <div className="flex w-[75%] flex-col">
            <p className="text-[#93A0C3] text-[12px] tracking-[0px] px-[5px] mb-[10px]">
              Select the amenities available at or near the property.
            </p>
            <div className="flex flex-wrap gap-2">
              {isLoading? <p>Loading..</p> : amenitiesOptions.map(amenityOp=> (
                <TagCheckbox
                  key={amenityOp.value}
                  tagOption={amenityOp}
                  onClick={handleAmenityClick}
                  isChecked={selectedAmentiies.includes(amenityOp.display)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AmenitiesForm;
