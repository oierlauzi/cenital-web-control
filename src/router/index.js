import Vue from "vue"
import VueRouter from "vue-router"

import routes from "./routes"

Vue.use(VueRouter)

const router = new VueRouter({
  routes: routes,
  linkActiveClass: "active",
  mode: "history",
  base: "cenital-web-control"
})

export default router;