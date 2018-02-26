import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelazyload from 'vue-lazyload'
Vue.use(Vuelazyload)
//Vue.prototype.$http = axios
Vue.use(VueAxios, axios)

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
