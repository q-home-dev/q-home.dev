import Vue from "vue";
import Vuex from "vuex";

import gm_store from "./modules/gm_store";
import mb_store from "./modules/mb_store";
import mb_style from "./modules/mb_style";
import settings from "./modules/settings";

Vue.use(Vuex);

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      mb_store,
      gm_store,
      mb_style,
      settings
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
