<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.delivertime}}分钟送达
        </div>
        <div class="supports" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="brand "></span><span class="bulletin">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" alt="">
    </div>
    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :score="seller.score" :size="48"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="supports-item" v-for="(item, index) in seller.supports">
              <i class="icon" :class="classMap[seller.supports[index].type]"></i>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <div class="title" style="margin-bottom: 24px;">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <p class="bulletin">
            {{seller.bulletin}}
          </p>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close" @click="hideDetail"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Star from '../star/Stars';

export default {
  name: 'header',
  props: {
    seller: {
      type: Object,
    },
  },
  data() {
    return {
      detailShow: false,
    };
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    },
  },
  components: {
    Star,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../commom/stylus/mixin"

.header
  color #fff
  position relative
  background rgba(7, 17, 27, 0.5)
  overflow hidden
  .content-wrapper
    padding: 24px 12px 16px 24px
    font-size 0
    position relative
    .avatar
      display inline-block
      font-size 14px
      img
        border-radius 2px
    .content
      display inline-block
      font-size 14px
      margin-left 16px
      .title
        margin 2px 0 8px 0
        .brand
          width 30px
          height 18px
          display inline-block
          vertical-align top
          bg-image('brand')
          background-size 30px 18px
          background-repeat no-repeat
        .name
          margin-left 6px
          font-size 16px
          font-weight 700
          line-height 18px
      .description
        font-size 12px
        padding-bottom 10px
      .supports
        font-size 0
        .icon
          display inline-block
          vertical-align top
          width 12px
          height 12px
          margin-right 4px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.guarantee
            bg-image('guarantee_1')
          &.invoice
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
        .text
          font-size 10px
          line-height 12px

    .support-count
      color #fff
      position absolute
      right 12px
      bottom 18px
      padding 7px 8px
      line-height 12px
      border-radius 14px
      height 12px
      background-color rgba(0, 0, 0, 0.2)
      text-align center
      .count
        font-size 10px
        padding-right 2px
      .icon-keyboard_arrow_right
        font-size 10px
        line-height 12px
  .bulletin-wrapper
    height 28px
    line-height 28px
    background rgba(7, 17, 27, 0.2)
    color #fff
    padding 0 40px 0 12px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    position relative
    span
      display inline-block
      vertical-align middle
    .brand
      width 22px
      height 12px
      bg-image('bulletin')
      background-size 22px 12px
      background-repeat no-repeat
      margin-right 4px
    .bulletin
      font-size 10px
      padding-right 20px
    .icon-keyboard_arrow_right
      position absolute
      font-size 10px
      right 12px
      top 8px
  .background
    position absolute
    z-index -1
    left 0
    top 0
    width 100%
    height 100%
    filter blur(10px)
  .detail
    position fixed
    top 0
    left 0
    z-index 100
    width 100%
    height 100%
    overflow auto
    background rgba(7, 17, 27, 0.8)
    .detail-wrapper
      min-height 100%
      width 100%
      .detail-main
        margin-top 64px
        padding-bottom 64px
      .name
        text-align center
        font-size 16px
        font-weight 700
        color #fff
        line-height 16px
      .star-wrapper
        padding 16px 0 28px 0
        text-align center
      .title
        display flex
        width 80%
        margin 0 auto 24px auto
        .line
          flex 1
          position relative
          top -6px
          border-bottom 1px solid rgba(255, 255, 255, 0.2)
        .text
          padding 0 12px
          font-size 14px
      .supports
        width 80%
        margin 12px auto 28px
        .supports-item
          font-size 0
          line-height 12px
          margin-top 12px
          padding-left 12px
          .icon
            display inline-block
            vertical-align top
            width 16px
            height 16px
            margin-right 6px
            background-size 16px 16px
            &.decrease
              bg-image('decrease_1')
            &.special
              bg-image('special_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
          .text
            font-size 12px
            font-weight 200
      .bulletin
        width 80%
        margin 0 auto
        text-indent 2em
        font-size 12px
        font-weight 200px
        line-height 24px
    .detail-close
      position relative
      width 32px
      height 32px
      font-size 32px
      margin -64px auto 0 auto
      clear both
</style>
