<template>
  <div class="seller-wrapper" ref="sellerWrapper">
    <div>
      <div class="seller-header">
        <div class="seller-h1">
          <h1>{{ seller.name }}</h1>
          <div class="star-box">
            <div class="star-wrapper">
              <star :score="seller.score" :size="36"></star>
            </div>
            <span class="ratingCount">({{ seller.ratingCount }})</span>
            <span class="sellCount">月售{{ seller.sellCount }}</span>
          </div>
          <span class="collect" @click="collectHandler">
            <i class="icon icon-favorite" :class="{active:collected}"></i>
            <p>已收藏</p>
          </span>
        </div>

        <div class="header-bottom">
          <div class="block">
            <h2 class="title">起送价</h2>
            <p class="text">
              <span class="text-big">{{ seller.minPrice }}</span>
              <span class="text-small">元</span>
            </p>
          </div>
          <div class="block">
            <h2 class="title">商家配送</h2>
            <p class="text">
              <span class="text-big">{{ seller.deliveryPrice }}</span>
              <span class="text-small">元</span>
            </p>
          </div>
          <div class="block">
            <h2 class="title">平均配送时间</h2>
            <p class="text">
              <span class="text-big">{{ seller.deliveryTime }}</span>
              <span class="text-small">分钟</span>
            </p>
          </div>
        </div>
      </div>
      <split></split>
      <div class="seller-bulletin">
        <div class="seller-h1">
          <h1>公告与活动</h1>
        </div>
        <div class="infos">
          <p class="bulletin">{{ seller.bulletin }}</p>
          <ul class="supports-list">
            <li class="support-item" v-for="item in seller.supports">
              <i class="icon" :class="classMap[item.type]"></i>
              <p class="support-text">{{ item.description }}</p>
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="seller-pics">
        <div class="seller-h1">
          <h1>商家实景</h1>
        </div>
        <div class="pic-wrapper">
          <div ref="picWrapper">
            <ul class="pic-list" ref="picList">
              <li v-for="pic in seller.pics">
                <img :src="pic" alt="" width="120" height="90">
              </li>
            </ul>
          </div>
        </div>
      </div>
      <split></split>
      <div class="seller-infos">
        <div class="seller-h1">
          <h1>商家信息</h1>
        </div>
        <ul class="info-list">
          <li class="info-item" v-for="info in seller.infos">
            <p>{{ info }}</p>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import Star from '../star/Stars';
import Split from '../split/Split';

export default {
  name: '',
  props: {
    seller: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      collected: false,
    };
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  mounted() {
    this.$nextTick(() => {
      this.SellerWrapper = new BScroll(this.$refs.sellerWrapper, {
        click: true,
      });
      if (this.seller.pics) {
        const width = (126 * this.seller.pics.length) - 6;
        this.$refs.picList.style.width = `${width}px`;
        this.$nextTick(() => {
          this.picWrapper = new BScroll(this.$refs.picWrapper, {
            scrollX: true,
            eventPassthrought: 'vertical',
          });
        });
      }
    });
  },
  components: {
    Star,
    Split,
  },
  methods: {
    collectHandler() {
//      console.log(this.collected);
      this.collected = !this.collected;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../commom/stylus/mixin"
.seller-wrapper
  position absolute
  top 174px
  bottom 46px
  width 100%
  overflow hidden
.seller-h1
  h1
    padding 18px 0 8px 18px
.seller-header
  position relative
  .collect
    position absolute
    right 18px
    top 18px
    z-index 10
    text-align center
    color #d4d6d9
    .icon
      font-size 24px
      line-height 24px
      &.active
        color rgb(240, 20, 20)
    p
      font-size 10px
      line-height 10px
      margin-top 4px
  .star-box
    border-1px(rgba(7, 17, 27, .1))
    font-size 0
    display flex
    margin 0 18px
    padding-bottom 18px
    .star-wrapper
      margin-right 8px
    .ratingCount, .sellCount
      font-size 10px
      color rgb(77, 85, 93)
      line-height 18px
      vertical-align middle
    .ratingCount
      margin-right 12px
  .header-bottom
    display flex
    .block
      flex 1 0
      margin 18px 0
      text-align center
      border-right 1px solid rgba(7, 17, 27, .1)
      &:last-child
        border-right none
      .title
        font-size 10px
        color rgb(147, 153, 159)
        line-height 10px
        padding-bottom 4px
      .text
        font-size 0
        display flex
        color rgb(7, 17, 27)
        justify-content center
      .text-big
        display inline-block
        font-size 24px
        line-height 24px
        vertical-align bottom
      .text-small
        display inline-block
        font-size 10px
        line- height 24px
        vertical-align bottom
.pic-wrapper
  padding 0 18px 12px
  overflow hidden
  background #fff
  div
    width 100%
    overflow hidden
  .pic-list
    font-size 0
    display flex
    flex-wrap nowrap
    li
      width 120px
      height 90px
      display inline-block
      margin-right 16px
.seller-bulletin
  .bulletin
    padding-bottom 16px
    margin 0 18px
    font-size 12px
    color rgb(240, 20, 20)
    line-height 24px
    border-1px(rgba(7, 17, 27, .1))
  .supports-list
    .support-item
      display flex
      margin 0 18px
      padding 16px 12px
      border-1px(rgba(7, 17, 27, .1))
      .icon
        display inline-block
        width 16px
        height 16px
        background-size 16px 16px
        margin-right 6px
        &.decrease
          bg-image('decrease_4')
        &.discount
          bg-image('discount_4')
        &.guarantee
          bg-image('guarantee_4')
        &.invoice
          bg-image('invoice_4')
        &.special
          bg-image('special_4')
      .support-text
        display inline-block
        font-size 12px
        color rgb(7, 17, 27)
        line-height 16px
        vertical-align middle
.seller-infos
  .info-list
    margin 0 18px
    .info-item
      padding 16px 12px
      border-top 1px solid rgba(7, 17, 27, .1)
      font-size 12px
      color rgb(7, 17, 27)
      line-height 16px
</style>
