/*
 * @Author: kaka 
 * @Date: 2018-06-11 19:03:21 
 * @Last Modified by: kaka
 * @Last Modified time: 2018-06-11 19:11:30
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import axios,{AxiosInstance} from 'axios'
import * as element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// export default element
Vue.use(v=>{
  v.prototype.$axios=axios
})
Vue.use(element)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
declare module 'Vue/types/vue'{
  interface Vue{
    $axios:AxiosInstance
  }
}
