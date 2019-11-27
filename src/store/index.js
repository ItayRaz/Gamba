import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './modules/user.store'
import eventStore from './modules/event.store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userStore,
    eventStore
  }

})
