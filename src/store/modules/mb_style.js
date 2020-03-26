import { getField, updateField } from "vuex-map-fields";

const state = {
  localFeatures: {
    version: 8,
    name: "Mapbox Streets",
    sprite: "mapbox://sprites/mapbox/streets-v8",
    glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
    //"glyphs": "http://fonts.openmaptiles.org/{fontstack}/{range}.pbf",
    // https://github.com/openmaptiles/fonts
    sources: {
      "mapbox-streets": {
        type: "vector",
        url: "mapbox://mapbox.mapbox-streets-v6"
      },
      "mapbox-terrain-rgb": {
        type: "raster-dem",
        url: "mapbox://mapbox.terrain-rgb"
      },
      "geojson-marker": {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-77.0323, 38.9131]
          },
          properties: {
            title: "Mapbox DC",
            "marker-symbol": "monument"
          }
        },
        video: {
          type: "video",
          urls: [
            "https://static-assets.mapbox.com/mapbox-gl-js/drone.mp4",
            "https://static-assets.mapbox.com/mapbox-gl-js/drone.webm"
          ],
          coordinates: [
            [-122.51596391201019, 37.56238816766053],
            [-122.51467645168304, 37.56410183312965],
            [-122.51309394836426, 37.563391708549425],
            [-122.51423120498657, 37.56161849366671]
          ]
        }
      },
      image: {
        type: "image",
        url: "https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif",
        coordinates: [
          [-80.425, 46.437],
          [-71.516, 46.437],
          [-71.516, 37.936],
          [-80.425, 37.936]
        ]
      }
    },
    layers: [
      {
        id: "water",
        source: "mapbox-streets",
        "source-layer": "water",
        type: "fill",
        paint: {
          "fill-color": "rgba(255, 255, 0, 0.5)",
          "fill-outline-color": "#ff0000"
        }
      }
    ],
    bearing: 0,
    center: [-116, 49],
    zoom: 12.5
  },
  nationalPark: {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-121.353637, 40.584978],
                [-121.284551, 40.584758],
                [-121.275349, 40.541646],
                [-121.246768, 40.541017],
                [-121.251343, 40.423383],
                [-121.32687, 40.423768],
                [-121.360619, 40.43479],
                [-121.363694, 40.409124],
                [-121.439713, 40.409197],
                [-121.439711, 40.423791],
                [-121.572133, 40.423548],
                [-121.577415, 40.550766],
                [-121.539486, 40.558107],
                [-121.520284, 40.572459],
                [-121.487219, 40.550822],
                [-121.446951, 40.56319],
                [-121.370644, 40.563267],
                [-121.353637, 40.584978]
              ]
            ]
          }
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-121.415061, 40.506229]
          }
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-121.505184, 40.488084]
          }
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-121.354465, 40.488737]
          }
        }
      ]
    }
  },
  gmBoundsBlank: {
    type: "FeatureCollection",
    features: [
      {
        id: 0,
        properties: {
          id: "blank"
        },
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [[]]
        }
      }
    ]
  },
  gmBoundsPolygonTest: {
    type: "FeatureCollection",
    features: [
      {
        id: 2,
        properties: {
          id: "test"
        },
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-115.7538590626053, 49.7900719475247],
              [-115.7538590626053, 49.781870360652434],
              [-115.72707988780061, 49.781870360652434],
              [-115.72707988780061, 49.7900719475247],
              [-115.7538590626053, 49.7900719475247]
            ]
          ]
        }
      }
    ]
  },
  gmBoundsPolygon: {
    type: "FeatureCollection",
    features: [
      {
        id: 1,
        properties: {
          id: "gmViewBox"
        },
        type: "Feature",
        geometry: { type: "Polygon", coordinates: [[]] }
      }
    ]
  }
};

const mutations = {
  updateField,
  updateGmBoundsPolygonCoord(state, coords) {
    state.gmBoundsPolygon.features[0].geometry.coordinates = coords;
    // state.gmBoundsPolygon2.features.push(newPolygonFeature);
    // state.gmBoundsPolygon.features.push(newPolygonFeature);

    // state.gmBoundsPolygon.features[1] = newPolygonFeature;
    // state.gmBoundsPolygon.data.features[0].geometry.coordinates = coords;
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
