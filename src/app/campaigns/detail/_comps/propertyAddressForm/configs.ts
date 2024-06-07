import { LngLatLike } from "mapbox-gl";


export const countryOptions = [
  {value: "UAE", display: "UAE"},
  {value: 'US', display: 'US'}
];

export const CountryCitiesOps = {
  "US": [
    {value: "New york", display: "New york"},
    {value: "Los Angeles", display: "Los Angeles"}
  ],
  "UAE": [
    {value: "Dubai", display: "Dubai"},
    {value: "Abu dhabi", display: "Abu dhabi"}
  ]
}

export const cityAreasOps = {
  "Dubai": [
    {value: "Sport City", display: "Sport City"},
    {value: "Production City", display: "Production City"}
  ],
  "Abu dhabi": [
    {value: "Airport", display: "Airport"},
    {value: "Market", display: "Market"}
  ],
  "New york": [
    {value: "Airport", display: "Airport"},
    {value: "Market", display: "Market"},
    {value: "Junction", display: "Junction"},
  ],
  "Los Angeles": [
    {value: "Airport", display: "Airport"},
    {value: "Market", display: "Market"},
    {value: "Junction", display: "Junction"},
  ],
}

export const MAPBOX_INITIAL_CENTER : LngLatLike = [55.1671, 24.96];