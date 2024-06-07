
import { LngLatLike } from "mapbox-gl";
import { RTKCampaignTrigger } from "../../_sections/property-detail/types";
import { getTrackedFieldObj } from "../utils";
import { completionStatus } from "@/types/enum.constants";




export const locationFormReducer : React.Reducer<
  {
    details: IAssetLocation;
    apiCampaignDetails: ICampaignDetails;
    isLocked: boolean;
    actionBtnConfig: Partial<actionBtnConfig>;
    addAssetLocation: RTKCampaignTrigger<
    {campaignId: string, params: IAssetLocation}, 
    {data: IAssetLocation}
    >;
    updateAssetLocation: RTKCampaignTrigger<{
      assetLocationId: string,
      campaignId: string,
      params: Partial<IAssetLocation>
    }>;
    fieldsTrack: {
      [fieldName: string]: {hasChanged: boolean, isFilled: boolean}
    };
  },
  {type: string, payload: string}
> = (state, action) => {
  if (state.isLocked){
    return state; // top level control
  }
  const apiLocationDetails = state.apiCampaignDetails.assetDetails?.assetLocation;
  let newLocationFormState = state;
  let fieldStatus = {hasChanged: false, isFilled: false};
  let shouldUpateTracker = false; // true when field *filling* status is different from what it was before (optimization)

  switch (action.type) {
    case 'SET_ADDRESS_ONE':
      fieldStatus = getTrackedFieldObj(apiLocationDetails?.assetAddressOne || "", action.payload);
      shouldUpateTracker = fieldStatus.isFilled !== state.fieldsTrack.assetAddressOne.isFilled;
      newLocationFormState = {...state,
        details: {...state.details, assetAddressOne: action.payload},
        fieldsTrack: {...state.fieldsTrack, assetAddressOne: fieldStatus},
      }
      break;
    case 'SET_ADDRESS_TWO':
      fieldStatus = getTrackedFieldObj(apiLocationDetails?.assetAddressTwo || "", action.payload); // to enable save chanegs button upon updates but
      // we don't record it in fieldsTrack as it's optional, also it doesn't affect the tracker status
      newLocationFormState = {...state,
        details: {...state.details, assetAddressTwo: action.payload},
      }
      break;
    case 'SET_COUNTRY':
      fieldStatus = getTrackedFieldObj(apiLocationDetails?.assetCountry || "", action.payload);
      shouldUpateTracker = fieldStatus.isFilled !== state.fieldsTrack.assetCountry.isFilled;
      newLocationFormState = {...state,
        details: {...state.details, assetCountry: action.payload},
        fieldsTrack: {...state.fieldsTrack, assetCountry: fieldStatus},
      }
      break;
    case 'SET_CITY':
      fieldStatus = getTrackedFieldObj(apiLocationDetails?.assetCity || '', action.payload);
      shouldUpateTracker = fieldStatus.isFilled !== state.fieldsTrack.assetCity.isFilled;
      newLocationFormState = {...state,
        details: {...state.details, assetCity: action.payload},
        fieldsTrack: {...state.fieldsTrack, assetCity: fieldStatus},
      }
      break;
    case 'SET_AREA':
      fieldStatus = getTrackedFieldObj(apiLocationDetails?.assetLocationArea || '', action.payload);
      shouldUpateTracker = fieldStatus.isFilled !== state.fieldsTrack.assetLocationArea.isFilled;
      newLocationFormState = {...state,
        details: {...state.details, assetLocationArea: action.payload},
        fieldsTrack: {...state.fieldsTrack, assetLocationArea: fieldStatus},
      }
      break;
    case 'SET_COORDINATES':
      const [long, lat] = action.payload.split(',');
      newLocationFormState = {...state,
        details: {...state.details,
          assetGeolocationLat: lat,
          assetGeolocationLong: long
        },
      }
      fieldStatus = {hasChanged: true, isFilled: true}
  }

  if (shouldUpateTracker) {// update completion status
    const fieldsTrackvals = Object.values(newLocationFormState.fieldsTrack);
    const completedFields = fieldsTrackvals.filter(track=> track.isFilled);
    const assetDetailsStatus = completedFields.length === 0 ? completionStatus.PENDING
      : completedFields.length < fieldsTrackvals.length?
        completionStatus.INCOMPLETE
      : completionStatus.COMPLETE;
    newLocationFormState.details.completionStatus = assetDetailsStatus
  }
  
  if (apiLocationDetails?.assetLocationId === undefined){// post request, all fields must be filled for the save button to be enabled
    if (newLocationFormState.details.completionStatus === completionStatus.COMPLETE){
      newLocationFormState.actionBtnConfig = {
        disabled: false,
        onClick: ()=> state.addAssetLocation({
          campaignId: state.apiCampaignDetails.campaignId,
          params: newLocationFormState.details
        })
      }
    }
  } else { // patch request
    if (fieldStatus.hasChanged){
      newLocationFormState.actionBtnConfig = {
        disabled: false,
        onClick: ()=>  state.updateAssetLocation({
          assetLocationId: apiLocationDetails.assetLocationId as string,
          campaignId: state.apiCampaignDetails.campaignId,
          params: newLocationFormState.details
        })
      }
    } else if (
      Object.values(newLocationFormState.fieldsTrack).every(track=> !track.hasChanged) // nothing changed
    ){
      newLocationFormState.actionBtnConfig = {disabled: true}
    }
  }


  return newLocationFormState;
}