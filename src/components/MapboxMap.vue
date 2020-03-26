<template>
  <div class="fit">
    <div class="fit absolute column z-top no-pointer-events" v-if="isLocationQuery">
      <q-icon class="col self-center q-mr-lg" color="positive" name="arrow_forward" size="xl" v-if="isSearch"></q-icon>
    </div>
    <div class="fit absolute" ref="mapboxMapDiv" />

    <q-resize-observer @resize="map.resize()" v-if="map" />
  </div>
</template>

<script>
import Vue from "vue";
import * as mapBox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import MapboxGeocoder from "mapbox-gl-geocoder";
// import "mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css";

import { mapFields } from "vuex-map-fields";
import debounce from "lodash.debounce";

export default {
  name: "MapboxMap",
  data() {
    return {
      map: null,
      mapContextData: null,
      marker: null,
      tempE: null
    };
  },
  computed: {
    ...mapFields("mb_store", [
      "isLocationQuery",
      "getLocationQuery",
      "accessToken",
      "country",
      "region",
      "district",
      "place",
      "placeId",
      "iso_3166_2",
      "mapCenter",
      "mapStyleTerrain",
      "mapStyleSatellite",
      "mapZoom",
      "searchDataType"
    ]),
    ...mapFields("gm_store", ["gmBounds"]),
    ...mapFields("mb_style", [
      "localFeatures",
      "nationalPark",
      "gmBoundsPolygon",
      "gmBoundsBlank"
    ]),
    ...mapFields("settings", [
      "isDesktop",
      "isSearch",
      "leftRightSplitValue",
      "topBottomSplitValue"
    ]),
    countryCode: function() {
      return this.iso_3166_2.split("-")[0].toLowerCase();
    }
  },
  watch: {
    isSearch(n, o) {
      if (this.map) {
        // if (this.isSearch) {
        //   this.createGeoCoder();
        //   this.map.addControl(this.geoCoder, "top-left");
        // } else {
        //   this.map.removeControl(this.geoCoder);
        // }
      }
    },

    getLocationQuery(newQuery, oldQuery) {
      console.log("From Mapbox, getLocationQuery: ", newQuery);
      if (newQuery == true) {
        // let point = this.map.getCenter();
        console.log("newQuery: ", newQuery);
        this.getLocationFromPoint();
        this.getLocationQuery = false;
      }
    }
  },
  mounted() {
    this.initMap();
  },
  methods: {
    // Init GeoCoder
    // createGeoCoder() {
    //   let searchBbox = this.map.getBounds().toArray();

    //   this.geoCoder = new MapboxGeocoder({
    //     accessToken: this.accessToken,
    //     mapboxgl: mapBox,
    //     flyto: true,
    //     minLength: 4,
    //     placeholder: "Pan, Zoom, Center on Search Area",
    //     // trackProximity: true,
    //     countries: this.countryCode,
    //     bbox: this.mapBounds,
    //     types: this.searchDataType
    //   });
    //   Vue.prototype.$geoCoder = this.geoCoder;
    // },
    initMap() {
      this.map = new mapBox.Map({
        accessToken: this.accessToken,
        container: this.$refs.mapboxMapDiv,
        style: this.mapStyleTerrain,
        center: this.mapCenter,
        zoom: this.mapZoom
        // hash: "/"
      });

      this.map.on("load", () => {
        this.setupMapControls();
        // this.setupMapEvents();
        // this.setupMapLayers();

        if (this.isDesktop) {
          // this.setupDesktop();
        } else {
          // this.setupTouch();
        }

        Vue.prototype.$map = this.map;
      });
    },

    setupMapControls() {
      // Settings
      this.map.touchZoomRotate.disableRotation();

      //Navigation Controls
      this.map.addControl(
        new mapBox.NavigationControl({
          visualizePitch: true
        }),
        "bottom-left"
      );

      // Geo Locate Control
      this.map.addControl(
        new mapBox.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        }),
        "bottom-left"
      );
    },

    setupMapEvents() {
      this.map.on(
        "idle",
        debounce(() => {
          // this.getLocationFromPoint();
        }, 2000)
      );
    },
    setupMapLayers() {},
    setupDesktop() {
      this.map.on("contextmenu", e => {
        this.tempE = e;
        console.log("context menu e: ", e);
        // this.getLocationFromPoint(e.point);
        // this.mapContextData = this.map.queryRenderedFeatures($vm.tempE.point, {
      });
    },

    setupTouch() {},

    clearLocationData() {
      this.country = "";
      this.region = "";
      this.iso_3166_2 = "";
      this.district = "";
      this.place = "";
      this.placeId = "";
    },

    getLocationFromPoint(point) {
      this.clearLocationData();
      let zoom = this.map.getZoom();
      if (!point) {
        // TODO calc every time or set global on resize?
        let mapCanvas = this.map.getCanvas().getBoundingClientRect();
        point = [mapCanvas.width / 2, mapCanvas.height / 2];
      }
      let mapContextArray = this.map.queryRenderedFeatures(point);
      console.log("mapContextArray: ", mapContextArray);
      if (mapContextArray && mapContextArray.length > 0) {
        for (var layer of mapContextArray) {
          if (layer.sourceLayer == "Level1_All_Names_3b-aj96ck") {
            this.country = layer.properties.admin;
            this.region = layer.properties.name;
            this.iso_3166_2 = layer.properties.iso_3166_2;
            //add wikipedia etc
          }
          if (zoom > 6) {
            if (layer.sourceLayer == "CA_4-4lt376") {
              this.district = layer.properties.CDNAME;
              if (layer.properties.CSDNAME.includes("/")) {
                console.log("Name inclueds  / ");
                layer.properties.CSDNAME = layer.properties.CSDNAME.split(
                  "/"
                )[1];
              }
              this.place = layer.properties.CSDNAME;
              this.placeId = layer.properties.CSDUID;
              // this.coords = layer.geometry.coordinates;
            }
          }
        }
      }
    }
  }
};
</script>
<style>
.mapboxgl-ctrl {
  opacity: 0.6;
}
.mapboxgl-ctrl:focus-within {
  opacity: 1;
}
.mapboxgl-ctrl-geocoder {
  min-width: 300px;
}
</style>