import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import Vuelazyload from 'vue-lazyload'
Vue.use(Vuelazyload)

import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
//Vue.prototype.$http = axios
Vue.use(VueAxios, axios)

Vue.use(VueAwesomeSwiper)
Vue.use(flatPickr)
 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
