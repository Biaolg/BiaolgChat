import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Ling',
    name: 'Ling',
    component: () => import('../views/Ling.vue')
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '*',
    name: 'Ling',
    component: () => import('../views/Ling.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
