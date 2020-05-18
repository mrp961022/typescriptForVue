import Vue, { AsyncComponent } from 'vue'
import Router, { RouteConfig, Route, NavigationGuard } from 'vue-router'

import HelloWorld from '@/components/HelloWorld.vue'
import EchartsPage from '@/components/echartsPage.vue'
// ... 其他组件
Vue.use(Router)
const routes: RouteConfig[] = [
  {
    path: '/',
    component: HelloWorld
  },
  {
    path: '/about',
    component: EchartsPage
  }
  // ...其他 routers
]
export default new Router({
  routes
})