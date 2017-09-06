<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link :to="{ path: 'goods'}" active-class="tab-item-active">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{ path: 'ratings'}" active-class="tab-item-active">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{ path: 'seller'}" active-class="tab-item-active">商家</router-link>
      </div>
    </div>

    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>

    <shop-cart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shop-cart>
  </div>
</template>

<script>
import VHeader from './components/header/Header';
import ShopCart from './components/shopCart/ShopCart';

export default {
  name: 'app',
  data() {
    return {
      seller: {},
    };
  },
  created() {
    const that = this;
    this.$http.get('api/seller').then((response) => {
      const res = response.data;
      if (res.code === 0) {
        that.seller = res.data;
//        console.log(that.seller);
      }
    });
  },
  components: {
    VHeader,
    ShopCart,
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "commom/stylus/base"
  @import "commom/stylus/mixin"
  #app
    .tab
      display flex
      width 100%
      height 40px
      line-height 40px
      justify-content space-around
      border-1px(#e5e5e5)
    .tab-item
      text-align center
      flex 1
      & > a
        display block
        font-size 14px
        color rgb(77, 85, 93)
      .tab-item-active
        color rgb(240, 20, 20)


</style>
