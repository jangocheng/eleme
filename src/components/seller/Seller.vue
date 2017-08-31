<template>
  <div class="seller-wrapper" ref="sellerWrapper">
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
            <span class="text-small">元</span>
          </p>
        </div>
      </div>
    </div>
    <split></split>
  </div>
</template>

<script type="text/ecmascript-6">
// import BScroll from 'better-scroll';
import Star from '../star/Stars';
import Split from '../split/Split';

export default {
  name: '',
  data() {
    return {
      seller: {},
    };
  },
  created() {
    this.$http.get('/api/seller').then((respnnse) => {
      const res = respnnse.data;
      if (res.code === 0) {
        this.seller = res.data;
        console.log(this.seller);
      }
//      this.$nextTick(() => {
//        this.SellerWrapper = new BScroll(this.$refs.sellerWrapper, {
//          click: true,
//        });
//      });
    });
  },
  components: {
    Star,
    Split,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../commom/stylus/mixin"
.seller-h1
  h1
    padding 18px 0 8px 18px
.seller-header
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
        vertical-align top
      .text-small
        display inline-block
        font-size 10px
</style>
