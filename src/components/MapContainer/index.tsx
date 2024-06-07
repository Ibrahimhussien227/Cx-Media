"use client";

import React from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "@/utils/icons";
import { IMapContainer } from "./type";

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const MapContainer = ({
  showPopup = false,
  longitude,
  latitude,
  popupTitle,
  popupDescription,
}: IMapContainer) => {
  return (
    <Map
      mapboxAccessToken={mapboxToken}
      initialViewState={{
        longitude: 55.2708,
        latitude: 25.2048,
        zoom: 10,
      }}
      style={{ height: "30rem" }}
      doubleClickZoom={false}
      interactive={false}
      dragPan={false}
      scrollZoom={false}
      attributionControl={false}
      mapStyle="mapbox://styles/mapbox/light-v11"
    >
      <Marker longitude={longitude} latitude={latitude}>
        <MapPin
          size={20}
          color="#ff9300"
          weight="fill"
          className="cursor-pointer"
        />
      </Marker>
      {showPopup && (
        <Popup
          className="relative"
          longitude={longitude}
          latitude={latitude}
          anchor="bottom"
          closeOnClick={false}
          closeButton={false}
        >
          <div className="h-3 w-[2px] bg-active absolute top-3 left-[-1px]" />
          <div className="flex flex-col items-start justify-center">
            <p className="font-MinionPro text-[14px]">{popupTitle}</p>
            <p className="text-secondary text-[10px] font-bold">
              {popupDescription}
            </p>
          </div>
        </Popup>
      )}
    </Map>
  );
};

export default MapContainer;
