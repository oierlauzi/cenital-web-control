import Vue from "vue"
import App from "./App.vue"
import BootstrapVue from "bootstrap-vue"

import router from "./router"
import store from "./store"

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(BootstrapVue)

Vue.config.productionTip = false
Vue.prototype.$appName = "Cenital Web Control"
Vue.prototype.$appVersion = "0.1.0"

new Vue({
  render: h => h(App),
  router: router,
  store: store
}).$mount("#app")