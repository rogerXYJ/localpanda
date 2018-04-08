import Vue from 'vue'
<<<<<<< HEAD
import elementUi from 'element-ui';
import '~/assets/scss/G-ui/element-variables.scss';
Vue.use(elementUi);
=======
import Element from 'element-ui'
import '~/assets/scss/G-ui/element-variables.scss';
import locale from 'element-ui/lib/locale/lang/en'

export default () => {
  Vue.use(Element, { locale })
}
>>>>>>> master
