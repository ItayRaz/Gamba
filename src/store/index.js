import Vue from 'vue'
import Vuex from 'vuex'
import eventoStore from './modules/evento.store'
import userStore from './modules/user.store'
import confirmStore from './modules/confirm.store';
import reviewStore from './modules/review.store';

Vue.use(Vuex)

export default new Vuex.Store({//use strcit
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userStore,
    eventoStore,
    confirmStore,
    reviewStore
  }

})
