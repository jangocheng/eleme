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
          <div v-if="food.ratings" class="rating-tab">
            <span class="tab-item all" :class="{active:activeCode===2}" @click="tabHandler(2, $event)">全部<span class="num">{{ allList.length }}</span></span>
            <span class="tab-item posi" :class="{active:activeCode===0}" @click="tabHandler(0, $event)">推荐<span class="num">{{ posiList.length }}</span></span>
            <span class="tab-item nega" :class="{active:activeCode===1}" @click="tabHandler(1, $event)">吐槽<span class="num">{{ negaList.length }}</span></span>
          </div>
          <div class="only" :class="{active: onlyRead}" @click="onlyHandler">
            <i class="icon-check_circle" :class="{active:onlyRead}"></i>
            <p class="text">只看有内容的评价</p>
          </div>
        </div>
        <div class="rating-list">
          <div v-show="isShow(item)" v-for="item in food.ratings">
            <div class="head">
              <span class="rateTime">{{ item.rateTime | momentFormat }}</span>
              <span class="username">{{ item.username }}</span>
              <img class="avatar" :src="item.avatar" alt="">
            </div>
            <div class="item-content">
              <i class="icon" :class="{'icon-thumb_up':item.rateType===0,'icon-thumb_down':item.rateType===1}"></i>
              <p v-if="item.text" class="text">{{item.text}}</p>
              <p v-else="" class="text notext">暂无评论</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
import moment from 'moment';
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
      activeCode: 2,
    };
  },
  components: {
    CartControll,
    Split,
  },
  computed: {
    posiList() {
      if (!this.food.ratings) {
        return [];
      }
      if (this.onlyRead) {
        return this.food.ratings.filter(item => item.rateType === 0 && item.text !== '');
      }
      return this.food.ratings.filter(item => item.rateType === 0);
    },
    negaList() {
      if (!this.food.ratings) {
        return [];
      }
      if (this.onlyRead) {
        return this.food.ratings.filter(item => item.rateType === 1 && item.text !== '');
      }
      return this.food.ratings.filter(item => item.rateType === 1);
    },
    allList() {
      if (!this.food.ratings) {
        return [];
      }
      if (this.onlyRead) {
        return this.food.ratings.filter(item => item.text !== '');
      }
      return this.food.ratings;
    },
  },
  filters: {
    momentFormat(val) {
      return moment(val).format('YYYY-MM-DD HH:mm');
    },
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
    hide() {
      this.showFlag = false;
    },
    addFirst() {
      Vue.set(this.food, 'count', 1);
    },
    tabHandler(type) {
      this.activeCode = type;
      this.$nextTick(() => {
        this.foodScroll.refresh();
      });
    },
    onlyHandler() {
      this.onlyRead = !this.onlyRead;
      this.$nextTick(() => {
        this.foodScroll.refresh();
      });
    },
    isShow(rating) {
      if (this.onlyRead && !rating.text) {
        return false;
      }
      if (this.activeCode === 2) {
        return true;
      }
      return rating.rateType === this.activeCode;
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
    padding 18px 18px 12px 18px
    border-bottom 1px solid rgba(7, 17, 27, .1)
    .title
      margin-bottom 6px
      line-height 14px
      font-size 14px
      color rgb(7, 17, 27)
    .rating-tab
      font-size 0
      margin-top 12px
      .tab-item
        display inline-block
        padding 8px 12px
        line-height 12px
        font-size 12px
        color: rgb(77, 85, 93)
        margin-right 8px
        .num
          line-height 10px
          font-size 10px
          margin-left 4px
        &.posi, &.all
          background #ccecf8
          &.active
            background rgb(0, 160, 220)
            color: #fff
        &.nega
          background rgba(77, 85, 93, .2)
          &.active
            background rgb(77, 85, 93)
            color: #fff
    .only
      margin-top 18px
      font-size 0
      border-top 1px solid rgba(7, 17, 27, .1)
      .icon-check_circle
        vertical-align top
        display inline-block
        padding-top 12px
        line-height 24px
        font-size 24px
        color rgb(147, 153, 159)
        margin-right 4px
        &.active
          color rgb(0, 160, 220)
      .text
        display inline-block
        padding-top 12px
        line-height 24px
        font-size 12px
        color rgb(147, 153, 159)
        &.active
          color rgb(0, 160, 220)
  .rating-list
    padding 18px
    .head
      display flex
      span, img
        display inline-block
      .rateTime, .username
        color rgb(147, 153, 159)
        font-size 10px
        line-height 12px
        vertical-align top
      .username
        margin-right 6px
      .rateTime
        flex 1
      .avatar
        width 12px
        height 12px
        border-radius 50%
    .item-content
      display flex
      padding 12px 0 16px 0
      .icon, .text
        display inline-block
      .text
        flex 1
        font-size 12px
        line-height 16px
        color rgb(7, 17, 27)
        vertical-align top
        &.notext
          color #b7bbbf
      .icon
        margin-right 4px
        font-size 12px
        vertical-align middle
        color rgb(147, 153, 159)
        &.icon-thumb_up
          color rgb(0, 160, 220)
</style>
