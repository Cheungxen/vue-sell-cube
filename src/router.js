import Vue from 'vue'
import Router from 'vue-router'
import Goods from './components/goods/goods.vue'
import Ratings from './components/ratings/ratings'
import Seller from './components/seller/seller'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'goods',
    component: Goods
  },
  {
    path: '/goods',
    name: 'goods',
    component: Goods
  },
  {
    path: '/ratings',
    name: 'ratings',
    component: Ratings
  },
  {
    path: '/seller',
    name: 'seller',
    component: Seller
  }
]

var router = new Router({
  routes
})

export default router
