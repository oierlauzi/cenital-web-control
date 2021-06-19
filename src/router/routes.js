import Home from "../views/Home.vue";
import MixEffect from "../views/MixEffect.vue";
import OutputWindow from "../views/OutputWindow.vue";
import NotFound from "../views/NotFound.vue";

import store from "../store"


function mixEffectGuard(to, from, next) {
  if(store.getters["mixEffect/list"].includes(to.params.name)) {
    //Mix effect exists on the store
    next();
  } else {
    //Mix effect does not exist on the store
    next({ name: "not-found" });
  }
}

function outputWindowGuard(to, from, next) {
  if(store.getters["outputWindow/list"].includes(to.params.name)) {
    //Mix effect exists on the store
    next();
  } else {
    //Mix effect does not exist on the store
    next({ name: "not-found" });
  }
}

const routes = [
  //Path						              //Name				        //Component
  {	path: "/", 					          name: "home", 		    component: Home 		                              },
  { path: '/mix-effect/:name', 	  name: "mix-effect",   component: MixEffect, beforeEnter: mixEffectGuard },
  { path: '/output-window/:name', name: "output-window",component: OutputWindow, beforeEnter: outputWindowGuard },
  
  //Add here
  
  {	path: "*", 					          name: "not-found", 	  component: NotFound 	                            }
];

export default routes;
  