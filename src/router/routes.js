import Home from "../views/Home.vue";
import MixEffect from "../views/MixEffect.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  //Path						            //Name				      //Component
  {	path: "/", 					        name: "home", 		  component: Home 		  },
  { path: '/mix-effect/:name', 	name: "mix-effect", component: MixEffect 	},
  
  //Add here
  
  {	path: "*", 					        name: "not-found", 	component: NotFound 	}
];

export default routes;
  