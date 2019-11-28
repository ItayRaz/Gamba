import Vue from 'vue'
import Vuex from 'vuex'
import eventStore from './modules/event.store'
import userStore from './modules/user.store'
import confirmStore from './modules/confirm.store';

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
    eventStore,
    confirmStore
  }

})
