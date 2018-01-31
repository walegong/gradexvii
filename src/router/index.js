import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import MapList from '@/components/MapList'

import CrossCard from '@/components/CrossCard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/maplist',
      name: 'MapList',
      component: MapList
    },
    {
      path: '*',
      redirect: '/login',
    },
    {
      path: '/test',
      name: 'CrossCard',
      component: CrossCard
    }
  ],
})
