import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/GoogleIdView",
    name: "GoogleIdView",
    component: () => import("../views/GoogleIdView.vue"),
  },
  {
    path: "/GoogleUserView",
    name: "GoogleUserView",
    component: () => import("../views/GoogleUserView.vue"),
  },
  {
    path: "/BrowserView",
    name: "BrowserView",
    component: () => import("../views/BrowserView.vue"),
  },
  {
    path: "/EndView",
    name: "EndView",
    component: () => import("../views/EndView.vue"),
  },
];

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
