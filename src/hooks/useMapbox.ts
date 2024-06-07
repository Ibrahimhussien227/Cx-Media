import { useEffect, useRef,useState } from 'react';
import mapboxgl, { LngLatLike, Map as MapboxMap, Marker as MapboxMarker } from 'mapbox-gl';


const useMapbox = (mapAccessToken:any , initialCenter:any) => {
  const mapRef = useRef<MapboxMap | null>(null);
  const markerRef = useRef<MapboxMarker | null>(null); 

  const handleClick = () => { }
  useEffect(() => {
    if (!mapRef.current) {
      mapboxgl.accessToken = mapAccessToken;
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: initialCenter,
        zoom: 12,
      });
      mapRef.current = map;
      setMarker(initialCenter)
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapAccessToken, initialCenter]);



  const onMapClick = (callback: (coordinates: LngLatLike) => void) => {
   
    if (!mapRef.current) {
      console.error('Map not initialized.');
      return;
    }

    mapRef.current.on('click', (e) => {
    //   console.log(e.lngLat)
      callback(e.lngLat);
    });

    return () => {
      mapRef.current?.off('click', handleClick);
    };
  };

  const setMarker = (coordinates: LngLatLike, setCenter: boolean = true) => {
    if (!mapRef.current) {
      console.error('Map is not initialized.');
      return;
    }

    // If marker already exists, remove it
    if (markerRef.current) {
      markerRef.current.remove();
    }
  // Check if the center coordinates are valid
    
    // Add new marker at the specified coordinates
    const marker = new mapboxgl.Marker({ color: '#FF6C02' })
      .setLngLat(coordinates)
      .addTo(mapRef.current);

    markerRef.current = marker;
   if(setCenter){
    if (!coordinates || !Array.isArray(coordinates) || coordinates.length !== 2) {
        return console.error('Invalid center coordinates:', coordinates);
      }
    mapRef.current.setCenter(coordinates);
    console.log(2)
   }
    // Set the map center to the selected location
   
  };


  return { map: mapRef.current,  onMapClick, setMarker };
};

export default useMapbox;
