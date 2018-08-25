import Vue from 'vue'
import Router from 'vue-router'
import Events from '@/components/Events'
import VueMaterial from 'vue-material'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
// import 'element-ui/lib/theme-default/index.css'

Vue.use(Router)
Vue.use(VueMaterial)
Vue.use(ElementUI, { locale })
Vue.component(VueMaterial)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Events',
      component: Events
    }
  ]
})
