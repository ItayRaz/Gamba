import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import Avatar from 'vue-avatar'

Vue.use(ElementUI, { locale })
import './styles/global.scss';

// Vue.use(require('vue-moment'));


import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC0AAcennjMo2tqULw0Jy4xeADyspU0Lu8',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // import {GmapMarker} from 'vue2-google-maps/src/components/marker'
    // Vue.component('GmapMarker', GmapMarker)
  },
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')




