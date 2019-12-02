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

Vue.use(require('vue-moment'));


import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC0AAcennjMo2tqULw0Jy4xeADyspU0Lu8',
    libraries: 'places,drawing,visualization', // This is required if you use the Autocomplete plugin
    // Vue.component('GmapMarker', GmapMarker)
  },
})

import Geocoder from "@pderas/vue2-geocoder";

Vue.use(Geocoder, {
    defaultCountryCode: null, 
    defaultLanguage:    null, 
    defaultMode:        'address', 
    googleMapsApiKey:   'AIzaSyC0AAcennjMo2tqULw0Jy4xeADyspU0Lu8'
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')




