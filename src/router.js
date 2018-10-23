import Vue from 'vue'
import Router from 'vue-router'
import Transfer from './views/Transfer.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/transfer',
      name: 'transfer',
      component: Transfer
    },
    {
      path: '/view/balance',
      name: 'viewbalance',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/Balance.vue')
    },
    {
      path: '/issue/tokens',
      name: 'issueToken',
      component: () => import(/* webpackChunkName: "issue" */ '@/views/Issue.vue')
    }
  ]
})
