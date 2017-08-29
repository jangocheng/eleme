<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="foodScroll">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{ food.name }}</h1>
          <div class="detail">
            <span class="sell-count">月售{{ food.sellCount }}</span>
            <span class="rating">好评率{{ food.rating }}%</span>
          </div>
          <div class="price">
            <span class="nowPrice">￥{{ food.price }}</span>
            <span class="oldPrice" v-show="food.oldPrice">{{ food.oldPrice }}</span>
          </div>
          <div class="cart-controll-wrapper" v-show="food.count">
            <cart-controll :food="food"></cart-controll>
          </div>
          <div class="buy" v-show="!food.count || food.count===0" @click="addFirst">
            加入购物车
          </div>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{ food.info }}</p>
        </div>
        <split v-show="food.info"></split>
        <div class="food-rating">
          <h1 class="title">商品评价</h1>
          <div class="rating-tab">
            <span class="tab-item">全部<span class="num">2</span></span>
            <span class="tab-item">推荐<span class="num">2</span></span>
            <span class="tab-item">吐槽<span class="num">2</span></span>
          </div>
          <div class="only" :class="{active: onlyRead}">
            <i></i>
            <p>只看有内容的评价</p>
          </div>
        </div>
        <div class="rating-list">
          <div v-for="item in food.ratings">
            <div class="date-time">{{ momentFormat(item.rateTime) }}</div>
            <p class="text">{{item.text}}</p>
            <img class="avatar" :src="item.avatar" alt="">
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
import BScroll from 'better-scroll';
import CartControll from '../cartControll/CartControll';
import Split from '../split/Split';

export default {
  name: '',
  props: {
    food: {
      type: Object,
    },
  },
  data() {
    return {
      showFlag: false,
      onlyRead: false,
    };
  },
  components: {
    CartControll,
    Split,
  },
  methods: {
    show() {
      this.showFlag = true;
      this.$nextTick(() => {
        if (!this.foodScroll) {
          this.foodScroll = new BScroll(this.$refs.foodScroll, {
            click: true,
          });
        }
        this.foodScroll.refresh();
      });
    },
    momentFormat(val) {
      return this.$moment(val).format('YYYY-MM-DD HH:mm');
    },
    hide() {
      this.showFlag = false;
    },
    addFirst() {
      Vue.set(this.food, 'count', 1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.food
  position fixed
  left 0
  top 0
  bottom 48px
  background #fff
  width 100%
  &.move-enter-active, &.move-leave-active
    transition all 0.3s linear
  &.move-enter, &.move-leave-to
    transform translate3d(100%, 0, 0)
  &.move-enter-to, &.move-leave
    transform translate3d(0, 0, 0)
  .image-header
    position relative
    width 100%
    height 0
    padding-top 100%
    img
      position absolute
      top 0
      left 0
      width 100%
      height 100%
    .back
      position absolute
      left 0
      top 10px
      .icon-arrow_lift
        display block
        padding 10px
        font-size 20px
        color: #fff
  .content
    padding 18px
    position relative
    .title
      margin-bottom 8px
      line-height 14px
      font-weight 700
      font-size 14px
      color: rgb(7, 17, 27)
    .detail
      margin-bottom 18px
      line-height 10px
      font-size 0
      .sell-count, .rating
        font-size 10px
        color: rgb(147, 153, 159)
      .sell-count
        margin-right 12px
    .price
      padding-bottom 18px
      line-height 24px
      font-weight 700
      .nowPrice
        font-size 14px
        color rgb(240, 20, 20)
        margin-right 8px
      .oldPrice
        font-size 10px
        color rgb(147, 153, 159)
        text-decoration line-through
    .cart-controll-wrapper
      position absolute
      right 12px
      bottom 12px
    .buy
      position absolute
      right 18px
      bottom 10px
      line-height 24px
      height 24px
      padding 0 12px
      box-sizing border-box
      font-size 10px
      border-radius 12px
      color #fff
      background rgb(0, 160, 220)
  .info
    padding 18px
    .title
      margin-bottom 6px
      line-height 14px
      font-size 14px
      color rgb(7, 17, 27)
    .text
      line-height 24px
      font-size 12px
      color rgb(77, 85, 93)
      padding 0 8px
      text-align justify
  .food-rating
    padding 18px
    .title
      margin-bottom 6px
      line-height 14px
      font-size 14px
      color rgb(7, 17, 27)
    .rating-tab
      font-size 0
      .tab-item
        display inline-block
        padding 8px 12px
</style>
