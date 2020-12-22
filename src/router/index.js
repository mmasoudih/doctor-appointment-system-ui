import Vue from "vue";
import VueRouter from "vue-router";
import JWT from "./jwt";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/panel",
    name: "Panel",
    component: () => import("../views/panel/Dashboard"),
    beforeEnter: (to, from, next) => {
      if (localStorage.token) {
        const jwtPayload = JWT(localStorage.token);
        if (jwtPayload.exp < Date.now() / 1000) {
          // token expired
          localStorage.removeItem("token");
          next("/");
        } else next();
      } else {
        next("/");
      }
    },
    children: [
      {
        path: "profile",
        name: "completeProfile",
        component: () => import("../views/panel/Profile")
      },
      {
        path: "days",
        name: "manageDays",
        component: () => import("../views/panel/Days")
      },
      {
        path: "specialties",
        name: "manageSpecialties",
        component: () => import("../views/panel/Specialy")
      },
      {
        path: "doctors",
        name: "manageDoctors",
        component: () => import("../views/panel/Doctors")
      },
      {
        path: "get-turn",
        name: "getTurn",
        component: () => import("../views/panel/Turn")
      },
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
