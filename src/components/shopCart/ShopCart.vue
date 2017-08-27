<template>
  <div>
    <div class="shopcart" @click="toggleList($event)">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight': totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></i>
            </div>
            <div v-show="totalCount>0" class="num">{{ totalCount }}</div>
          </div>
          <div class="price" :class="{'highlight': totalPrice>0}">￥{{ totalPrice }}</div>
          <div class="desc">另需配送费￥{{ deliveryPrice }}元 </div>
        </div>
        <div class="content-right">
          <div class="pay" @click.stop.prevent="pay" :class="payClass">{{ payDesc }}</div>
        </div>
        <div class="ball-container">
          <transition name="drop">
            <div class="ball" v-for="ball in balls" v-show="ball.show"></div>
          </transition>
        </div>
        <!--<transition name="shopcart">-->
        <div class="shopcart-list"  v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="clear" v-touch:tap="clearFoods">清空</span>
          </div>
          <div class="list-content" ref="shopcarScroll">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{ food.name }}</span>
                <div class="price">
                  <span class="">
                    ￥{{ food.price * food.count }}
                  </span>
                </div>
                <div class="cartcontroll-wrapper">
                  <cart-controll :food="food"></cart-controll>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!--</transition>-->
      </div>
    </div>
    <transition name="filterMove">
      <div @click="hideMask" class="filter" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import CartControll from '../cartControll/CartControll';

export default {
  name: '',
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [];
      },
    },
    deliveryPrice: {
      type: Number,
      default: 0,
    },
    minPrice: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      balls: [
        {
          show: false,
        },
      ],
      fold: false,
    };
  },
  components: {
    CartControll,
  },
  created() {
    this.$nextTick(() => {
      this.initScroll();
    });
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.count * food.price;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`;
      } else if (this.totalPrice < this.minPrice) {
        const diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}元起送`;
      }
      return '去结算';
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough';
      }
      return 'enough';
    },
    listShow() {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      const show = !this.fold;
      if (show) {
        this.$nextTick(() => {
          if (!this.shopcartScroll) {
            this.shopcartScroll = new BScroll(this.$refs.shopcarScroll, {
              click: true,
            });
          } else {
            this.shopcartScroll.refresh();
          }
        });
      }
      return show;
    },
  },
  methods: {
    toggleList() {
      if (!this.totalCount) {
        this.fold = false;
        return;
      }
      this.fold = !this.fold;
    },
    clearFoods() {
      this.selectFoods.forEach((food) => {
        this.$set(food, 'count', 0);
      });
    },
    hideMask() {
      this.fold = true;
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      console.log(`总金额${this.totalPrice}元`);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../commom/stylus/mixin"

.shopcart
  position fixed
  left 0
  bottom 0
  z-index 50
  width 100%
  height 48px
  .content
    display flex
    background #141d27
    .content-left
      font-size 0
      flex 1
      .logo-wrapper
        display inline-block
        position relative
        top -10px
        margin 0 12px
        padding 6px
        width 56px
        height 56px
        box-sizing border-box
        vertical-align top
        border-radius 50%
        background #141d27
        .num
          position absolute
          top 0
          right 0
          width 24px
          height 16px
          line-height 16px
          border-radius 16px
          text-align center
          font-size 9px
          font-weight 700
          color: #fff
          background rgb(240, 20, 20)
          box-shadow 0 4px 8px rgba(0, 0, 0, 0.4)
        .logo
          width 100%
          height 100%
          border-radius 50%
          text-align center
          background #2b343c
          &.highlight
            background: rgb(0, 160, 220)
          .icon-shopping_cart
            font-size 24px
            color #80858a
            line-height 44px
            &.highlight
              color: #fff
      .price, .desc
        display inline-block
        font-size 16px
        color: rgba(255, 255, 255, 0.4)
        font-weight 700
        line-height 24px
        padding-right 12px
        border-right 1px solid rgba(255, 255, 255, .1)
        margin-top 12px
        margin-left 12px
      .price
        &.highlight
          color: #fff
      .desc
        font-weight 100
        font-size 12px
        border-right none
    .content-right
      text-align center
      flex 0 0 105px
      width 105px
      .pay
        font-size 14px
        font-weight 700
        line-height 48px
        color rgba(255, 255, 255, 0.4)
        background #2b333b
        &.enough
          background: #00b43c
          color: #fff
  .ball-container
    .ball
      position fixed
      left 32px
      bottom 22px
      z-index 200
      width 16px
      height 16px
      border-radius 50%
      background rgb(0, 160, 220)
  .drop-enter-active
    transition all .4s
  .shopcart-list
    position absolute
    top -258px
    left 0
    z-index -1
    width 100%
    .list-header
      height 40px
      line-height 40px
      display flex
      background #f3f5f7
      padding 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      .title
        flex 1
        font-size 14px
      .clear
        color: rgb(0, 160, 220)
        font-size 12px
    .list-content
      background #fff
      height 218px;
      width 100%
      z-index 10
      overflow hidden
      ul
        padding 0 18px
        .food
          border-1px(rgba(7, 17, 27, 0.1))
          padding 6px 0
          font-size 0
          .name
            vertical-align middle
            line-height 24px
            display inline-block
            font-size 14px
            color rgb(7, 17, 27)
            width 210px
          .price
            vertical-align middle
            line-height 24px
            display inline-block
            font-size 14px
            color rgb(240, 20, 20)
            span
              font-weight 700
          .cartcontroll-wrapper
            position absolute
            top 0
            right 0
            display inline-block
/*    &.shopcart-enter-active, &.shopcart-leave-active
      transition all 5s linear
    &.shopcart-enter
      transform translate3d(0, 0, 0)
    &.shopcart-enter-to
      transform translate3d(0, -258px, 0)*/
.filter
  position fixed
  left 0
  top 0
  z-index 20
  height 100%
  width 100%
  backdrop-filter blur (20px)
  background rgba(7, 17, 27, .6)
  &.filterMove-enter-active, &.filterMove-leave-active
    transition all .5s ease
  &.filterMove-enter, &.filterMove-leave-to
    opacity 0
  &.filterMove-leave, &.filterMove-enter-to
    opacity 1
</style>
