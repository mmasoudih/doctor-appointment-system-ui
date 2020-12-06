import Vue from "vue";
import Vuex from "vuex";
import axios from "../axios";
import Noty from "../plugins/notification";
import router from "../router/index";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    loading: false,
    authenticated: false,
    specialties: []
  },
  mutations: {
    authUser(state, userData) {
      state.token = userData.token;
      state.user = userData.user;
      localStorage.setItem("token", userData.token);
      state.authenticated = true;
    },
    activeLoading(state) {
      state.loading = true;
    },
    disableLoading(state) {
      state.loading = false;
    },
    setUserLogin(state, userData) {
      state.authenticated = localStorage.token ? true : false;
      state.token = localStorage.token ? localStorage.token : null;
      state.user = userData;
    },
    logout(state) {
      state.authenticated = false;
      localStorage.removeItem("token");
      router.push("/");
      Noty({
        message: "خروج از حساب کاربری با موفقیت انجام شد.",
        type: "info"
      });
    },
    setHeader(state) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
    }
  },
  actions: {
    login({ commit }, userData) {
      axios
        .post("/auth/login", {
          phone: userData.phone,
          password: userData.password
        })
        .then(res => {
          commit("authUser", {
            token: res.data.access_token,
            user: res.data.user
          });
          commit("setHeader");
          res.data.access_token
            ? Noty({
                message: "ورود با موفقیت انجام شد.",
                type: "success"
              })
            : "";
          router.push("/panel");
        })
        .then(async () => {
          commit("disableLoading");
        })
        .catch(async err => {
          this.loading = false;
          let errors = await err.response.data;
          Object.entries(errors).map(e => {
            Noty({
              message: e[1],
              type: "error"
            });
          });
          commit("disableLoading");
        });
    },
    logout({ commit }) {
      commit("logout");
    },
    async setUserLogin({ commit }) {
      await axios
        .get("/getUser")
        .then(async res => {
          let response = await res.data;
          commit("setUserLogin", response);
          // console.log("Value Set .......//////");
          // return Promise.resolve();
        })
        .catch(async err => {
          this.loading = false;
          let errors = await err.response.data;
          Object.entries(errors).map(e => {
            Noty({
              message: e[1],
              type: "error"
            });
          });
        });
    }
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    authenticated(state) {
      return state.authenticated;
    },
    userInfo(state) {
      return state.user;
    },
    token(state) {
      return state.token;
    }
  },
  modules: {}
});
