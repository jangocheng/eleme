import Vue from 'vue';
import Router from 'vue-router';
import Vue2TouchEvents from 'vue2-touch-events';
import Goods from '@/components/goods/Goods';
import Seller from '@/components/seller/Seller';
import Ratings from '@/components/ratings/Ratings';

Vue.use(Router);
Vue.use(Vue2TouchEvents, {
  disableClick: false,
  touchClass: 'tap-active',
  tapTolerance: 10,
  swipeTolerance: 30,
});
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'goods',
      component: Goods,
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller,
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods,
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings,
    },
  ],
});
