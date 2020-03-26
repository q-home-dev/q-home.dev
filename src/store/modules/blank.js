import { getField, updateField } from "vuex-map-fields";
//ADD to Vue file import { mapFields } from "vuex-map-fields";

const state = {
  people: { user: "Jim" }
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
