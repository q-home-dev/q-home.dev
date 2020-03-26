import { getField, updateField } from "vuex-map-fields";

const state = {
  key: "AIzaSyALaYKnBjbTl2BzAdOjFK5jgQvfzfMOxYs",
  gmCenter: { lat: 49.786, lng: -115.743 },
  gmZoom: 18,
  gmBounds: null
};

const mutations = {
  updateField
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
