import Vue from "vue"
import Vuex from "vuex"
import { createLogger } from "vuex"

import modules from "./modules";
import plugins from "./plugins";

Vue.use(Vuex)

//Determine if it is a production build, and if so,
//create the logger plugin
const debug = process.env.NODE_ENV !== "production"
const loggerPlugin = debug ? [createLogger()] : []

//Create the Vuex Store
const store = new Vuex.Store({
  modules: modules,
  strict: debug,
  plugins: plugins.concat(loggerPlugin)
})

export default store;