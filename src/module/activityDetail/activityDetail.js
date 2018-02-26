import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import ElementUi from'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
 import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
//Vue.prototype.$http = axios
Vue.use(VueAxios, axios)
Vue.use(ElementUi)
Vue.use(VueAwesomeSwiper)
Vue.use(flatPickr)
 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
