import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login/index')
    },
    {
      path: '/maplist',
      name: 'MapList',
      component: () => import('@/views/MapList/index'),
      meta: { requiresAuth: true }
    },
    {
      path: '/form',
      name: 'Form',
      component: () => import('@/views/Form/index'),
      meta: { requiresAuth: true }
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
