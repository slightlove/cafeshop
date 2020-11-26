import Vue from 'vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  fas
} from '@fortawesome/free-solid-svg-icons'
import {
  fab
} from '@fortawesome/free-brands-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'
import {ValidationObserver, ValidationProvider, localize, extend} from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import zw from 'vee-validate/dist/locale/zh_TW.json'
import moment from 'vue-moment'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
import VueLoaders from 'vue-loaders'
import 'vue-loaders/dist/vue-loaders.css'
// 本地插件
import './bus'
import 'swiper/swiper-bundle.css'
import 'bootstrap/dist/js/bootstrap'
import filters from '@/assets/filters/currency'
import router from './router'
import App from './App'
Vue.use(VueAxios, Axios)
Vue.use(moment)
Vue.use(VueLoaders)
Vue.filter('currency', filters)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker)
Vue.config.productionTip = false
Axios.defaults.withCredentials = true
Axios.defaults.credentials = 'include'
// console.log(Axios)
library.add(fas, fab)
localize({zw})
// Add Veevalidate rules
extend('email', email)
extend('required', required)
extend('mobile', (value) => {
  const mobileReg = /^09\d{8}$/g
  if (value.length === 10 && mobileReg.test(value)) {
    return true
  }
  return false
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // const vm = this;
    const api = `${process.env.APIURL}/api/user/check`
    Axios.post(api).then(res => {
      if (res.data.success) {
        next()
      } else {
        console.log(`前往頁面錯誤，錯誤訊息：${res.message}`)
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})
