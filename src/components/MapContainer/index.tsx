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
  const defaultLongitude = longitude ? longitude : 55.2708;
  const defaultLatitude = latitude ? latitude : 25.2048;

  return (
    <Map
      {...{
        width: "100%",
        height: "100%",
      }}
      mapboxAccessToken={mapboxToken}
      initialViewState={{
        longitude: defaultLongitude,
        latitude: defaultLatitude,
        zoom: 10,
      }}
      style={{ height: "18rem" }}
      // doubleClickZoom={false}
      // interactive={false}
      // dragPan={false}
      // scrollZoom={false}
      attributionControl={false}
      mapStyle="mapbox://styles/mapbox/light-v11"
    >
      <Marker longitude={defaultLongitude} latitude={defaultLatitude}>
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
          longitude={defaultLongitude}
          latitude={defaultLatitude}
          anchor="bottom"
          closeOnClick={false}
          closeButton={false}
        >
          <div className="h-3 w-[2px] bg-active absolute top-3 left-[-1px]" />
          <div className="flex flex-col items-start justify-center">
            <p className="font-minion text-[14px]">{popupTitle}</p>
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
