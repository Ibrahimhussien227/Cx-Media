import React from "react";
import { completionStatus } from "@/types/enum.constants";
import { getTrackedFieldObj } from "../utils";
import { RTKCampaignTrigger } from "../../_sections/property-detail/types";


export const assetFormReducer : React.Reducer<
{
  details: IAssetDetails;
  apiCampaignDetails: ICampaignDetails;
  isLocked: boolean,
  fieldsTrack: {
    [fieldName: string]: {hasChanged: boolean, isFilled: boolean}
  },
  actionBtnConfig: Partial<actionBtnConfig>,
  updateAssetGeneralData: RTKCampaignTrigger<{
    campaignId: string;
    assetId: string;
    params: IAssetDetails;
  }>
}, {type: string, payload: any}
  >
=(state, action)=>{
  if (state.isLocked){
    return state; // top level control
  }
  const apiAssetDetails = state.apiCampaignDetails.assetDetails;
  let newAssetFormState = state;
  let fieldStatus = {hasChanged: false, isFilled: false};
  let shouldUpateTracker = false; // true when field *filling* status is different from what it was before (optimization)
  switch (action.type) {
    case 'SET_NAME':
      fieldStatus = getTrackedFieldObj(apiAssetDetails?.assetName || "", action.payload);
      shouldUpateTracker = fieldStatus.isFilled !== state.fieldsTrack.assetName.isFilled;
      newAssetFormState = {...state,
        details: {...state.details, assetName: action.payload},
        fieldsTrack: {...state.fieldsTrack, assetName: fieldStatus},
      }
      break;
    case 'SET_DESCRIPTION':
      fieldStatus = getTrackedFieldObj(apiAssetDetails?.assetDescription || "", action.payload);
      shouldUpateTracker = fieldStatus.isFilled !== state.fieldsTrack.assetDescription.isFilled;
      newAssetFormState = {...state,
        details: {...state.details, assetDescription: action.payload},
        fieldsTrack: {...state.fieldsTrack, assetDescription: fieldStatus},
      }
      break;
    case 'SET_PROP_ID':
      fieldStatus = getTrackedFieldObj(apiAssetDetails?.assetAppId || "", action.payload);
      shouldUpateTracker = fieldStatus.isFilled !== state.fieldsTrack.assetAppId.isFilled;
      newAssetFormState = {...state,
        details: {...state.details, assetAppId: action.payload},
        fieldsTrack: {...state.fieldsTrack, assetAppId: fieldStatus},
      }
      break;
    case 'SET_AREA':
      fieldStatus = getTrackedFieldObj(apiAssetDetails?.assetArea || "", action.payload);
      shouldUpateTracker = fieldStatus.isFilled !== state.fieldsTrack.assetArea.isFilled;
      newAssetFormState = {...state,
        details: {...state.details, assetArea: action.payload},
        fieldsTrack: {...state.fieldsTrack, assetArea: fieldStatus},
      }
      break;
    case 'SET_PROP_TYPE':
      fieldStatus = getTrackedFieldObj(apiAssetDetails?.assetType || '', action.payload);
      shouldUpateTracker = fieldStatus.isFilled !== state.fieldsTrack.assetType.isFilled;
      newAssetFormState = {...state,
        details: {...state.details, assetType: action.payload},
        fieldsTrack: {...state.fieldsTrack, assetType: fieldStatus},
      }
      break;
    case 'SET_INVESTMENT_TYPE':
      fieldStatus = getTrackedFieldObj(apiAssetDetails?.assetInvestmentType || '', action.payload);
      shouldUpateTracker = fieldStatus.isFilled !== state.fieldsTrack.assetInvestmentType.isFilled;
      newAssetFormState = {...state,
        details: {...state.details, assetInvestmentType: action.payload},
        fieldsTrack: {...state.fieldsTrack, assetInvestmentType: fieldStatus},
      }
      break;
    case 'SET_BEDS':
      fieldStatus = getTrackedFieldObj(apiAssetDetails?.numberOfBed || 0, action.payload);
      shouldUpateTracker = fieldStatus.isFilled !== state.fieldsTrack.numberOfBed.isFilled;
      newAssetFormState = {...state,
        details: {...state.details, numberOfBed: action.payload},
        fieldsTrack: {...state.fieldsTrack, numberOfBed: fieldStatus},
      }
      break;
    case 'SET_BATH':
      fieldStatus = getTrackedFieldObj(apiAssetDetails?.numberOfBath || 0, action.payload);
      shouldUpateTracker = fieldStatus.isFilled !== state.fieldsTrack.numberOfBath.isFilled;
      newAssetFormState = {...state,
        details: {...state.details, numberOfBath: action.payload},
        fieldsTrack: {...state.fieldsTrack, numberOfBath: fieldStatus},
      }
      break;
  }

  if (shouldUpateTracker) {// update completion status
    const fieldsTrackvals = Object.values(newAssetFormState.fieldsTrack);
    const completedFields = fieldsTrackvals.filter(track=> track.isFilled);
    const assetDetailsStatus = completedFields.length === 0 ? completionStatus.PENDING
      : completedFields.length < fieldsTrackvals.length?
        completionStatus.INCOMPLETE
      : completionStatus.COMPLETE;
    newAssetFormState.details.completionStatus = assetDetailsStatus
  }
  

  if (fieldStatus.hasChanged){
    const changedDetails : Partial<IAssetDetails> = {} 
    for (let field in newAssetFormState.fieldsTrack){
      if (newAssetFormState.fieldsTrack[field].hasChanged){
        changedDetails[field as keyof typeof changedDetails] = newAssetFormState.details[field as keyof typeof newAssetFormState.details]
      }
    }
    changedDetails.assetDescription = newAssetFormState.details.assetDescription; // remove this once desc field is not required by the backend
    changedDetails.completionStatus = newAssetFormState.details.completionStatus; // since we don't count it in our fields tracker
    newAssetFormState.actionBtnConfig = {
      disabled: false,
      onClick: ()=> state.updateAssetGeneralData({ 
        campaignId: state.apiCampaignDetails.campaignId,
        assetId: state.apiCampaignDetails.assetId as string,
        params: changedDetails
      })
    }
  } else if (
    Object.values(newAssetFormState.fieldsTrack).every(track=> !track.hasChanged) // nothing changed
  ){
    newAssetFormState.actionBtnConfig = {disabled: true}
  }


  return newAssetFormState;
}
