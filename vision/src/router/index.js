import Vue from 'vue'
import VueRouter from 'vue-router'
import HotPage from '@/views/HotPage'
import MapPage from '@/views/MapPage'
import RankPage from '@/views/RankPage'
import SellerPage from '@/views/SellerPage'
import StockPage from '@/views/StockPage'
import Trendpage from '@/views/Trendpage'
import ScreenPage from '@/views/ScreenPage'

Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      redirect: '/screen'
    },
    {
      path: '/screen',
      component: ScreenPage
    },
    {
      path: '/hotPage',
      component: HotPage
    },
    {
      path: '/mapPage',
      component: MapPage
    },
    {
      path: '/rankPage',
      component: RankPage
    },
    {
      path: '/sellerPage',
      component: SellerPage
    },
    {    
      path: '/stockPage',
      component: StockPage
    },
    {
      path: '/trendPage',
      component: Trendpage
    }
]

const router = new VueRouter({
  routes
})

export default router
