import Vue from "vue";
import Vuex from "vuex";
import axios from "../axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    loading: false
  },
  mutations: {
    authUser(state, userData) {
      state.token = userData.token;
      state.user = userData.user;
      console.log(userData);
    },
    activeLoading(state) {
      state.loading = true;
    },
    disableLoading(state) {
      state.loading = false;
    }
  },
  actions: {
    login({ commit }, userData) {
      axios
        .post("/auth/login", {
          phone: userData.phone,
          password: userData.password
        })
        .then(res =>
          commit("authUser", {
            token: res.data.access_token,
            user: res.data.user
          })
        )
        .then(() => {
          commit("disableLoading");
        })
        .catch(err => {
          console.log(err);
          commit("disableLoading");
        });
    }
  },
  getters: {
    loading(state) {
      return state.loading;
    }
  },
  modules: {}
});
