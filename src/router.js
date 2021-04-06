import Vue from "vue"
import VueRouter from "vue-router"

import Home from "./views/Home.vue"

Vue.use(VueRouter)

const routes = [
    {
		path: "/",
		name: "home",
		component: Home
	}
];

const router = new VueRouter({
	routes: routes,
	linkActiveClass: "active",
    mode: "history",
	base: "cenital-web-control"
})

export default router;