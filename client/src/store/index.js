import Vue from 'vue'
import Vuex from 'vuex'

import Auth from '../Warehouse/Auth';
import Posts from '../Warehouse/Posts';
import Comments from '../Warehouse/Comments'
import helpers from '../Warehouse/helpers'
import Admin from '../Warehouse/Admin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    Auth,
    Posts,
    Comments,
    helpers,
    Admin
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
