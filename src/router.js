import Vue from "vue"
import VueRouter from "vue-router"

import Home from "./views/Home.vue"
import NotFound from "./views/NotFound.vue"

Vue.use(VueRouter)

const routes = [
	//	Path			//Name				//Component
    {	path: "/", 		name: "home", 		component: Home 		},
	
	//Add here

	{	path: "*", 		name: "not-found", 	component: NotFound 	}
];

const router = new VueRouter({
	routes: routes,
	linkActiveClass: "active",
    mode: "history",
	base: "cenital-web-control"
})

export default router;