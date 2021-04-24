import Home from "../views/Home.vue";
import MixEffect from "../views/MixEffect.vue";
import NotFound from "../views/NotFound.vue";

import store from "../store"


const mixEffectGuard = function(to, from, next) {
  if(store.getters["mixEffect/list"].includes(to.params.name)) {
    //Mix effect exists on the store
    next();
  } else {
    //Mix effect does not exist on the store
    next({ name: "not-found" });
  }
}

const routes = [
  //Path						            //Name				      //Component
  {	path: "/", 					        name: "home", 		  component: Home 		                              },
  { path: '/mix-effect/:name', 	name: "mix-effect", component: MixEffect, beforeEnter: mixEffectGuard },
  
  //Add here
  
  {	path: "*", 					        name: "not-found", 	component: NotFound 	                            }
];

export default routes;
  