
import { RTKCampaignTrigger } from "../../_sections/property-detail/types";
import { getTrackedFieldObj, roundToXDecimals } from "../utils";
import { completionStatus } from "@/types/enum.constants";

export const financeFormReducer : React.Reducer<
{
  details: IFinancialDetails;
  apiCampaignDetails: ICampaignDetails;
  isLocked: boolean,
  fieldsTrack: {
    [fieldName: string]: {hasChanged: boolean, isFilled: boolean}
  },
  actionBtnConfig: Partial<actionBtnConfig>,
  createFinancialDetails: RTKCampaignTrigger<{
    campaignDetails: ICampaignDetails,
    details: IFinancialDetails
  }, {data: IFinancialDetails}>,
  updateFinancialDetails: RTKCampaignTrigger<{
    campaignId: string,
    details: IFinancialDetails
  }>
}, {type: string, payload: number}
  >
=(state, action)=>{
  if (state.isLocked){
    return state; // top level control
  }
  const apiFinaceDetails = state.apiCampaignDetails.financialDetails;
  let newFinanceFormState = state;
  let fieldStatus = {hasChanged: false, isFilled: false};
  let shouldUpateTracker = false; // true when field *filling* status is different from what it was before (optimization)
  const roundedValue = roundToXDecimals(action.payload, 2);
  switch (action.type) {
    case 'SET_PRICE':
      fieldStatus = getTrackedFieldObj(apiFinaceDetails?.propertyPrice || "", roundedValue);
      shouldUpateTracker = fieldStatus.isFilled !== state.fieldsTrack.propertyPrice.isFilled;
      newFinanceFormState = {...state,
        details: {...state.details, propertyPrice: roundedValue},
        fieldsTrack: {...state.fieldsTrack, propertyPrice: fieldStatus},
      }
      break;
    case 'SET_ANNUAL_RETURN':
      fieldStatus = getTrackedFieldObj(apiFinaceDetails?.projectedAnnualizedReturn || "", roundedValue);
      shouldUpateTracker = fieldStatus.isFilled !== state.fieldsTrack.projectedAnnualizedReturn.isFilled;
      newFinanceFormState = {...state,
        details: {...state.details, projectedAnnualizedReturn: roundedValue},
        fieldsTrack: {...state.fieldsTrack, projectedAnnualizedReturn: fieldStatus},
      }
      break;
    case 'SET_ANNUAL_APPRECIATION':
      fieldStatus = getTrackedFieldObj(apiFinaceDetails?.projectedAnnualAppreciation || "", roundedValue);
      shouldUpateTracker = fieldStatus.isFilled !== state.fieldsTrack.projectedAnnualAppreciation.isFilled;
      newFinanceFormState = {...state,
        details: {...state.details, projectedAnnualAppreciation: roundedValue},
        fieldsTrack: {...state.fieldsTrack, projectedAnnualAppreciation: fieldStatus},
      }
      break;
    case 'SET_GROSS_YEILD':
      fieldStatus = getTrackedFieldObj(apiFinaceDetails?.projectedGrossYield || '', roundedValue);
      shouldUpateTracker = fieldStatus.isFilled !== state.fieldsTrack.projectedGrossYield.isFilled;
      newFinanceFormState = {...state,
        details: {...state.details, projectedGrossYield: roundedValue},
        fieldsTrack: {...state.fieldsTrack, projectedGrossYield: fieldStatus},
      }
      break;
    case 'SET_NET_YEILD':
      fieldStatus = getTrackedFieldObj(apiFinaceDetails?.projectedNetYield || '', roundedValue);
      shouldUpateTracker = fieldStatus.isFilled !== state.fieldsTrack.projectedNetYield.isFilled;
      newFinanceFormState = {...state,
        details: {...state.details, projectedNetYield: roundedValue},
        fieldsTrack: {...state.fieldsTrack, projectedNetYield: fieldStatus},
      }
      break;
  }

  if (shouldUpateTracker) {// update completion status
    const fieldsTrackvals = Object.values(newFinanceFormState.fieldsTrack);
    const completedFields = fieldsTrackvals.filter(track=> track.isFilled);
    const assetDetailsStatus = completedFields.length === 0 ? completionStatus.PENDING
      : completedFields.length < fieldsTrackvals.length?
        completionStatus.INCOMPLETE
      : completionStatus.COMPLETE;
    newFinanceFormState.details.completionStatus = assetDetailsStatus
  }
  
  if (apiFinaceDetails?.financialId === undefined){// post request, all fields must be filled for the save button to be enabled
    if (newFinanceFormState.details.completionStatus === completionStatus.COMPLETE){
      newFinanceFormState.actionBtnConfig = {
        disabled: false,
        onClick: ()=> state.createFinancialDetails({
          campaignDetails: state.apiCampaignDetails,
          details: newFinanceFormState.details
        })
      }
    }
  } else { // patch request
    if (fieldStatus.hasChanged){
      newFinanceFormState.actionBtnConfig = {
        disabled: false,
        onClick: ()=>  state.updateFinancialDetails({
          campaignId: state.apiCampaignDetails.campaignId,
          details: newFinanceFormState.details
        })
      }
    } else if (
      Object.values(newFinanceFormState.fieldsTrack).every(track=> !track.hasChanged) // nothing changed
    ){
      newFinanceFormState.actionBtnConfig = {disabled: true}
    }
  }


  return newFinanceFormState;
}