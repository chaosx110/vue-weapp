import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const initalStates = {};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: initalStates
});
