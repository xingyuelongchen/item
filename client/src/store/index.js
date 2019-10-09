import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: true,
    userInfo: null
  },
  mutations: {
    setLoading(state, e) {
      state.isLoading = e;
    },
    setUserInfo(state, e) {
      state.userInfo = e
    }
  },
  actions: {}
});