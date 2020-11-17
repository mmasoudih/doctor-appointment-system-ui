import Vue from "vue";
import Vuex from "vuex";
import axios from "../axios";
import Noty from  "../plugins/notification";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    loading: false,
  },
  mutations: {
    authUser(state, userData) {
      state.token = userData.token;
      state.user = userData.user;
      localStorage.setItem("token", JSON.stringify(userData.token));
    },
    activeLoading(state) {
      state.loading = true;
    },
    disableLoading(state) {
      state.loading = false;
    },
  },
  actions: {
    login({ commit }, userData) {
      axios
        .post("/auth/login", {
          phone: userData.phone,
          password: userData.password,
        })
        .then((res) => {
        
          commit("authUser", {
            token: res.data.access_token,
            user: res.data.user,
          });
          res.data.access_token ?
          Noty({
            message: "ورود با موفقیت انجام شد.",
            type: "success",
          })
          : ''
        })
        .then( async () => {
          commit("disableLoading");
        })
        .catch(async (err) => {
          this.loading = false;
          let errors = await err.response.data;
          Object.entries(errors).map((e) => {
            Noty({
              message: e[1],
              type: "error",
            });
          });
          commit("disableLoading");
        });
    },
  },
  getters: {
    loading(state) {
      return state.loading;
    },
  },
  modules: {},
});
