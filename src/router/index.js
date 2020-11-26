/*****************************
 * Vue Router
 * 用來處理網頁內 Router 相關設定
 *****************************/
import Vue from 'vue'
import Router from 'vue-router'

// -------------------------------
// 管理後台頁面
// -------------------------------
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import aProduct from '@/components/Admin/Product'
import aOrderList from '@/components/Admin/OrderList'
import aCoupon from '@/components/Admin/coupon'
// -------------------------------
// 前端顯示頁面
// @：src路徑
// -------------------------------
import Index from '@/components/Index'
import Content from '@/components/Content'
import Cart from '@/components/Pages/Cart'
import Product from '@/components/Pages/Product'
import Purchase from '@/components/Pages/Purchase'
Vue.use(Router)
const RouterConfig = {
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: '首頁',
      component: Index
    },
    {
      path: '/',
      name: '共用內頁',
      component: Content,
      children: [
        {
          path: 'cart',
          name: '購物車',
          component: Cart
        },
        {
          path: 'product/:id',
          name: '產品頁',
          component: Product
        },
        {
          path: 'purchase/:id',
          name: '結果頁',
          component: Purchase
        },
        {
          path: '/login',
          name: '登入',
          component: Login
        }
      ]
    },
    {
      path: '/admin',
      name: '後台',
      component: Dashboard,
      children: [
        {
          path: '',
          name: '產品',
          component: aProduct,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'orderlist',
          name: '訂單清單',
          component: aOrderList,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'coupon',
          name: '優惠券',
          component: aCoupon,
          meta: {
            requireAuth: true
          }
        }
      ]
    }
  ]
}

export default new Router(RouterConfig)
