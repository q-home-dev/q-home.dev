import { getField, updateField } from "vuex-map-fields";

const state = {
  isDesktop: null,
  isSearch: false,
  leftRightSplitValue: 100,
  topBottomSplitValue: 100
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
