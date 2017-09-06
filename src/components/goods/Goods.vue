<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul v-if="$store.state.goods">
        <li v-for="(item, index) in $store.state.goods" class="menu-item border-1px" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
          <span class="text">
            <span v-show="item.type>0" :class="classMap[item.type]" class="icon"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item, index) in $store.state.goods" class="foods-list foot-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food, index) in item.foods" class="food-item" @click="selectFood(food, $event)">
              <div class="icon">
                <img :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="nowPrice">￥{{food.price}}</span>
                  <span class="oldPrice" v-show="food.oldPrice">{{food.oldPrice}}</span>
                </div>
                <div class="cart-controll-erapper">
                  <cart-controll :food="food"></cart-controll>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import ShopCart from '../shopCart/ShopCart';
import CartControll from '../cartControll/CartControll';
import Food from '../food/Food';

export default {
  name: 'goods',
  props: {
    seller: {
      type: Object,
    },
  },
  data() {
    return {
      listHeight: [],
      scrollY: 0,
      selectedFood: {},
      showFood: false,
    };
  },
  components: {
    ShopCart,
    CartControll,
    Food,
  },
  created() {
    this.$http.get('/api/goods').then((respnnse) => {
      const res = respnnse.data;
      if (res.code === 0) {
        this.$store.state.goods = res.data;
      }
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$nextTick(() => {
        this.initScroll();
        this.calculateHeight();
      });
    });
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i += 1) {
        const h1 = this.listHeight[i];
        const h2 = this.listHeight[i + 1];
        if (!h2 || (this.scrollY >= h1 && this.scrollY < h2)) {
          return i;
        }
      }
      return 0;
    },
  },
  methods: {
    initScroll() {
      this.MenuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true,
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3,
        tap: true,
        click: true,
      });
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    calculateHeight() {
      const footList = this.$refs.foodsWrapper.getElementsByClassName('foot-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < footList.length; i += 1) {
        const item = footList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index) {
      const footList = this.$refs.foodsWrapper.getElementsByClassName('foot-list-hook');
      const el = footList[index];
      this.foodsScroll.scrollToElement(el, 500);
    },
    selectFood(food) {
      this.selectedFood = food;
      this.$refs.food.show();
      console.log(this.selectedFood);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../commom/stylus/mixin"

.goods
  display flex
  overflow hidden
  position absolute
  top 174px
  bottom 46px
  width 100%
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background #f3f5f7
    .menu-item
      display table
      width 56px
      height 54px
      line-height 14px
      padding 0 12px
      &.current
        background: #fff
        font-weight 700
        margin-top -1px
        z-index 10
        position relative
        .text
          border-none()
      .icon
        display inline-block
        vertical-align top
        width 12px
        height 12px
        margin-right 2px
        background-size 12px 12px
        background-repeat no-repeat
        &.decrease
          bg-image('decrease_3')
        &.discount
          bg-image('discount_3')
        &.guarantee
          bg-image('guarantee_3')
        &.invoice
          bg-image('invoice_3')
        &.special
          bg-image('special_3')
      .text
        display table-cell
        vertical-align middle
        font-size 12px
        color rgb(7, 17, 27)
        text-align center
        border-1px(rgba(7, 17, 27, 0.1))
  .foods-wrapper
    flex 1
    background #fff
    .title
      background #f3f5f7
      font-size 12px
      line-height 26px
      color rgb(147, 153, 159)
      height 26px
      padding-left 14px
      border-left 2px solid #d9dde1
    .food-item
      margin 18px
      display flex
      position relative
      border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        margin-bottom 0
      .icon
        margin-right 10px
        img
          width 57px
          height 57px
      .content
        .name
          font-size 14px
          color rgb(7, 17, 27)
          line-height 14px
        .desc
          font-size 10px
          color rgb(147, 153, 159)
          line-height 14px
          padding 6px 0
        .extra
          font-size 0
          color rgb(147, 153, 159)
          span
            font-size 10px
            line-height 10px
            display inline-block
          span:nth-of-type(1)
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
        .cart-controll-erapper
          position: absolute
          right 0
          bottom 0
</style>
