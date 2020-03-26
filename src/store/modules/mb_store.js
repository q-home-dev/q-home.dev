import { getField, updateField } from "vuex-map-fields";

const mb_searchDataTypes = [
  "country",
  "region",
  "district",
  "place",
  "placeId",
  "locality",
  "neighborhood",
  "address",
  "poi"
];

/*
{"message":"Not Authorized - Contact sales to access premium tilesets"}
https://api.mapbox.com/v4/mapbox.enterprise-boundaries-a0-v2/tilequery/-120,51.json?access_token=pk.eyJ1IjoiaXJlZi10ZWFtIiwiYSI6ImNrN3Q5Zzh1djByaG0zb25yZG8wdGt0dmgifQ.VkgyLyg6OziHuOUD89MsxQ

*/

const state = {
  isLocationQuery: true,
  getLocationQuery: false,
  accessToken:
    "pk.eyJ1IjoicS1ob21lLWRldiIsImEiOiJjazgxZWV0bnUwcGw2M2xvcTd5a2U3NTg0In0.Vu8MFWVuN1QuoS-R_DUDtQ",
  // coordinates:[],
  country: "",
  countryCode: "",
  region: "",
  district: "",
  place: "",
  placeId: null,
  iso_3166_2: "CA-BC",
  mapBounds: [
    [-127.5, 36.3],
    [-104.4, 60.6]
  ],
  mapCenter: [-115.96267, 49.99629],
  mapZoom: 4,
  mapStyleTerrain: "mapbox://styles/q-home-dev/ck81egxec07n51iqhfhxkaigf",
  mapStyleSatellite: "mapbox://styles/mapbox/satellite-v9",
  searchDataType: "address",
  searchSliderIndex: 3,
  searchCountry: "Canada",
  searchRegion: "BC",
  searchPlace: ""
};

const mutations = {
  updateField,
  updateSearchDataType(state, index) {
    state.searchDataType = searchDataTypes[index];
  }
};

const actions = {};

const getters = {
  getField
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
