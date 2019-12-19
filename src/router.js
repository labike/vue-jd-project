import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: Main
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/goodsList',
      name: 'goodsList',
      // route level code-splitting
      // this generates a separate chunk (]about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/GoodsList.vue')
    },
    {
      path: '/goodsDetail',
      name: 'goodsDetail',
      component: () => import('./views/GoodsDetail.vue')
    },
    {
      path: '/buy',
      name: 'buy',
      component: () => import('./views/Buy.vue')
    }
  ]
})
