import Vue from 'vue';
import Router from 'vue-router';
// import Goods from '@/components/goods/Goods';
// import Seller from '@/components/seller/Seller';
// import Ratings from '@/components/ratings/Ratings';

// const Goods = () => import('@/components/goods/Goods');
// const Seller = () => import('@/components/seller/Seller');
// const Ratings = () => import('@/components/ratings/Ratings');

// 路由懒加载
const Goods = r => require.ensure([], () => r(require('@/components/goods/Goods')));
const Seller = r => require.ensure([], () => r(require('@/components/seller/Seller.vue')));
const Ratings = r => require.ensure([], () => r(require('@/components/ratings/Ratings')));

Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '',
      redirect: '/goods',
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
