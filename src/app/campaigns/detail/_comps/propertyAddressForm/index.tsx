"use client";

import React, { useEffect, useMemo, useReducer, useState, useRef, useCallback} from 'react';
import { ITrackedForm } from '../../_sections/property-detail/types';
import { useTranslation } from "react-i18next";
import { DebouncedInput, LabeledInput, TextInput } from '@/components/TextInputs';
import CustomSelect from '@/components/customSelect';
import { CountryCitiesOps, MAPBOX_INITIAL_CENTER, cityAreasOps, countryOptions } from './configs';
import { useAddAssetLocationMutation, useUpdateAssetLocationMutation } from '@/store/services/campaign/assetDetailsApi';
import { locationFormReducer } from './locationFormReducer';
import { CampaignReviewStatus } from '@/types/enum.constants';
import  { MapPin }  from "../../../../../utils/icons";
import { LngLatLike } from 'mapbox-gl'; 
import useClickOutside  from "../../../../../hooks/useClickOutside";
import useMapbox from '../../../../../hooks/useMapbox';
import useOnUnmount from '@/hooks/useOnUnmount';

const mapAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

type mapBoxSearchResult = {
  id: string;
  place_name: string;
  text: string;
  geometry:{
    coordinates: LngLatLike
  }
}

const PropertyAddressForm = ({formId, updateTracker, campaignDetails, configActionBtn}: ITrackedForm) => {
  const {t} = useTranslation("campaignsPage");
  
  const assetLocation =  campaignDetails.assetDetails?.assetLocation;
  
  const chosenCoordinates = useMemo(()=> {
    return assetLocation?.assetGeolocationLong && assetLocation?.assetGeolocationLat?
    [+assetLocation.assetGeolocationLong, +assetLocation.assetGeolocationLat]
    :
    MAPBOX_INITIAL_CENTER
  }, [assetLocation?.assetGeolocationLat, assetLocation?.assetGeolocationLong])

  const { map, onMapClick, setMarker } = useMapbox(mapAccessToken, chosenCoordinates);

  const [addAssetLocation, {isSuccess: isLocationAdded}] = useAddAssetLocationMutation();
  const [updateAssetLocation, {isSuccess: isLocationUpdated}] = useUpdateAssetLocationMutation();

  const [locationFormState, dispatch] = useReducer(locationFormReducer, {
    details: {...(assetLocation || {assetId: campaignDetails.assetId})},
    apiCampaignDetails: campaignDetails,
    isLocked: [CampaignReviewStatus.APPROVED_TO_PUBLISH, CampaignReviewStatus.PENDING_FEE, CampaignReviewStatus.PENDING_REVIEW].includes(campaignDetails.reviewStatus),
    actionBtnConfig: {disabled: true},
    addAssetLocation,
    updateAssetLocation,
    fieldsTrack: {
      assetAddressOne: {hasChanged: false, isFilled: Boolean(assetLocation?.assetAddressOne)},
      assetCountry: {hasChanged: false, isFilled: Boolean(assetLocation?.assetCountry)},
      assetCity: {hasChanged: false, isFilled: Boolean(assetLocation?.assetCity)},
      assetLocationArea: {hasChanged: false, isFilled: Boolean(assetLocation?.assetLocationArea)},
    }
  })

  // const [marker, setMarker] = useState<MapboxMarker | null>(null);    
  const [searchResults, setSearchResults] = useState<mapBoxSearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const ulRef = useRef(null);


  useClickOutside(ulRef, () => setIsOpen(false));


  // config save button with the latest button state and from data
  useEffect(()=> {
    configActionBtn && configActionBtn(locationFormState.actionBtnConfig)
    
  }, [locationFormState.actionBtnConfig, configActionBtn])

  const autoSaveOnLeave = useCallback(()=> {
    if (locationFormState.actionBtnConfig.disabled === false){// unsaved changes
      locationFormState.actionBtnConfig.onClick && locationFormState.actionBtnConfig.onClick()
    }
  }, [locationFormState.actionBtnConfig])
  
  useOnUnmount(autoSaveOnLeave)

  // updating the tracker when necessary
  useEffect(()=> {
    if (locationFormState.details.completionStatus && updateTracker){
      updateTracker(formId, locationFormState.details.completionStatus)
    }
  }, [locationFormState.details.completionStatus, formId, updateTracker])

  // disabled the save button after request is succeffuly made
  useEffect(()=> {
    if ((isLocationAdded || isLocationUpdated) && configActionBtn){
      configActionBtn({disabled: true})
    }
  }, [isLocationAdded, isLocationUpdated, configActionBtn])


  const citiesOptions = useMemo(()=> {
    return CountryCitiesOps[(locationFormState.details.assetCountry || "UAE") as keyof typeof CountryCitiesOps]
  }, [locationFormState.details.assetCountry]);

  const areasOptions = useMemo(()=> {
    return cityAreasOps[(locationFormState.details.assetCity || "Dubai") as keyof typeof cityAreasOps]
  }, [locationFormState.details.assetCity]);


  

  const handleSearch = async (searchStr:string) => {
    setSearchQuery(searchStr); // Update searchQuery state
    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchStr}.json?access_token=${mapAccessToken}`);
      const data = await response.json();
      console.log(data)
      setIsOpen(true);
      setSearchResults(data.features);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  const handleSelectLocation = (result: mapBoxSearchResult) => {
    const center = result.geometry.coordinates;
    setIsOpen(false)
    setMarker(center, true);
    setSearchQuery(result.text); 
    dispatch({type: 'SET_COORDINATES', payload: center.toString()})
  };
 
  useEffect(() => {
    let unsubscribeClick: (() => void) | undefined;
  
    if (map) {
      unsubscribeClick = onMapClick((coordinates: LngLatLike) => {
        const center = coordinates as { lng: number; lat: number };
        // Update marker on map click
        setMarker(coordinates, false);
        dispatch({type: 'SET_COORDINATES', payload: center.lng + ',' + center.lat})
      });
    }
    return () => {
      // Ensure unsubscribeClick is a function before invoking it
      if (unsubscribeClick) {
        unsubscribeClick();
      }
    };
  }, [map, onMapClick, setMarker]);

  return (
    <form className="flex flex-col justify-center gap-y-4 items-center w-full">
      <LabeledInput
        label={t("propertyAddressForm.propertyAddress")}
        placeholder={t("propertyAddressForm.propertyAddressPlaceholder")}
        note={t("propertyAddressForm.propertyAddressContent")}
        className="w-full"
        value={locationFormState.details.assetAddressOne || ""}
        onChange={(evt: any) =>
          dispatch({ type: "SET_ADDRESS_ONE", payload: evt.target.value })
        }
        readOnly={locationFormState.isLocked}
      />
      <div className="w-full grid grid-cols-[0.5fr_1fr_1fr] gap-6">
        <TextInput
          placeholder={t("propertyAddressForm.addressLine2")}
          className="col-start-2 col-end-3"
          value={locationFormState.details.assetAddressTwo || ""}
          onChange={(evt: any) =>
            dispatch({ type: "SET_ADDRESS_TWO", payload: evt.target.value })
          }
          readOnly={locationFormState.isLocked}
        />
      </div>
      <div className="w-full grid grid-cols-[0.5fr_1fr_1fr] gap-6">
        <CustomSelect
          options={countryOptions}
          placeholder={t("propertyAddressForm.selectCountry")}
          value={countryOptions.find(
            (op) => op.value === locationFormState.details.assetCountry
          )}
          onSelect={(selectedOp: IOption) =>
            dispatch({ type: "SET_COUNTRY", payload: selectedOp.value })
          }
          className="col-start-2 grid-cols-[1fr]"
        />
      </div>
      {locationFormState.details.assetCountry && (
        <>
          <div className="w-full grid grid-cols-[0.5fr_1fr_1fr] gap-6">
            <CustomSelect
              options={citiesOptions}
              placeholder={t("propertyAddressForm.selectCity")}
              value={citiesOptions.find(
                (op) => op.value === locationFormState.details.assetCity
              )}
              onSelect={(selectedOp: IOption) =>
                dispatch({ type: "SET_CITY", payload: selectedOp.value })
              }
              className="col-start-2 grid-cols-[1fr]"
            />
          </div>
          {locationFormState.details.assetCity && (
            <div className="w-full grid grid-cols-[0.5fr_1fr_1fr] gap-6">
              <CustomSelect
                options={areasOptions}
                placeholder={t("propertyAddressForm.selectArea")}
                value={areasOptions.find(
                  (op) =>
                    op.value === locationFormState.details.assetLocationArea
                )}
                onSelect={(selectedOp: IOption) =>
                  dispatch({ type: "SET_AREA", payload: selectedOp.value })
                }
                className="col-start-2 grid-cols-[1fr]"
              />
            </div>
          )}
        </>
      )}
      <div className="w-full grid grid-cols-[0.5fr_1fr_1fr] gap-6">
        <label className="inline-block font-bold text-[10px] text-[#93A0C3] tracking-[1.5px] mb-0">
          {t("propertyAddressForm.geoLocation")}
        </label>
        <DebouncedInput
          placeholder={t("propertyAddressForm.geoLocationPlaceholder")}
          onChange={handleSearch}
          value={searchQuery}
          className="col-start-2 col-end-4"
          // readOnly={locationFormState.isLocked}
        />
      </div>

      <div className="w-full grid grid-cols-[0.24fr_1fr] gap-6 relative">
        {isOpen && (
          <ul
            ref={ulRef}
            className="grid justify-center w-[100%] col-start-2 grid-cols-[1fr] bg-[#232F4B] absolute border z-50 rounded-[2px] px-[10px]"
          >
            {searchResults.map((result) => (
              <li
                key={result.id}
                onClick={() => handleSelectLocation(result)}
                className="py-[10px] border-b flex cursor-pointer"
              >
                <MapPin size={15} color="#93A0C3" weight="fill" />
                <div className="ml-2">
                  <h3 className="text-[#FFFFFF] text-[12px] bold">
                    {result.text}
                  </h3>
                  <p className="text-[#BFC5D5] text-[12px]">
                    {result.place_name}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="w-full grid grid-cols-[0.5fr_1fr_1fr] gap-6 ">
        <div
          id="map"
          className='relative w-full h-[400px] col-start-2 col-end-4 grid-cols-[1fr]'
        />
      </div>
    </form>
  );
};

export default PropertyAddressForm;
