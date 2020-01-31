import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

// Setting up default vue's modules for api calls
Vue.prototype.$http = axios;

// Load the token from the localStorage
const token = localStorage.getItem("token");
const adminToken = localStorage.getItem("Admintoken")

//Is there is any token we will simply append defaut axios auth headers
if(token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
} else if(adminToken) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = adminToken;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
