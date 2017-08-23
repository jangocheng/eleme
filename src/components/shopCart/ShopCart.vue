<template>
  <div class="shopcart">
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
        <div class="pay" :class="payClass">{{ payDesc }}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [
          {
            price: 30,
            count: 1,
          },
        ];
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
    return {};
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
      if (this.totalPrice === 0) {
        return '';
      } else if (this.totalPrice < this.minPrice) {
        return 'not-enough';
      }
      return 'enough';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">

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
</style>
