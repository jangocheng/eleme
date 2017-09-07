<template>
  <div class="rating-wrapper" ref="ratingWrapper">
    <div>
      <div class="score-wrapper">
        <div class="score-left">
          <p class="score">{{ seller.score }}</p>
          <h2 class="title">综合评分</h2>
          <p class="rankRate">高于周边商家{{ seller.rankRate }}%</p>
        </div>
        <div class="score-right">
          <div class="scroe-item">
            <span class="title">服务态度</span>
            <div class="star">
              <star :score="seller.serviceScore" :size="36"></star>
            </div>
            <span class="score">{{ seller.serviceScore }}</span>
          </div>
          <div class="scroe-item">
            <span class="title">服务态度</span>
            <div class="star">
              <star :score="seller.foodScore" :size="36"></star>
            </div>
            <span class="score">{{ seller.foodScore }}</span>
          </div>
          <div class="scroe-item">
            <span class="title">送达时间</span>
            <span class="deliveryTime">{{ seller.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <div class="food-rating">
        <h1 class="title">商品评价</h1>
        <div v-if="ratings" class="rating-tab">
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
        <div v-show="isShow(item)" class="list-item" v-for="item in ratings">
          <img class="avatar" :src="item.avatar" alt="">
          <div class="head">
            <span class="username">{{ item.username }}</span>
            <span class="rateTime">{{ item.rateTime | momentFormat }}</span>
          </div>
          <div class="item-content">
            <div class="top">
              <div class="star">
                <star :score="item.score" :size="36"></star>
              </div>
              <span class="deliveryTime" v-if="item.deliveryTime">{{ item.deliveryTime }}分钟送达</span>
            </div>
            <p v-if="item.text" class="text">{{item.text}}</p>
            <p v-else="" class="text notext">暂无评论</p>
            <div class="content">
              <i class="icon" :class="{'icon-thumb_up':item.rateType===0,'icon-thumb_down':item.rateType===1}"></i>
              <div class="recommend" v-for="recommend in item.recommend">
                {{ recommend }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import moment from 'moment';
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
      ratings: [],
      onlyRead: false,
      activeCode: 2,
    };
  },
  computed: {
    posiList() {
      if (!this.ratings) {
        return [];
      }
      if (this.onlyRead) {
        return this.ratings.filter(item => item.rateType === 0 && item.text !== '');
      }
      return this.ratings.filter(item => item.rateType === 0);
    },
    negaList() {
      if (!this.ratings) {
        return [];
      }
      if (this.onlyRead) {
        return this.ratings.filter(item => item.rateType === 1 && item.text !== '');
      }
      return this.ratings.filter(item => item.rateType === 1);
    },
    allList() {
      if (!this.ratings) {
        return [];
      }
      if (this.onlyRead) {
        return this.ratings.filter(item => item.text !== '');
      }
      return this.ratings;
    },
  },
  filters: {
    momentFormat(val) {
      return moment(val).format('YYYY-MM-DD HH:mm');
    },
  },
  mounted() {
    this.$http.get('/api/ratings').then((respnnse) => {
      const res = respnnse.data;
      if (res.code === 0) {
        this.ratings = res.data;
//        console.log(this.ratings);
      }
      this.$nextTick(() => {
        if (!this.RatingWrapper) {
          this.RatingWrapper = new BScroll(this.$refs.ratingWrapper, {
            click: true,
          });
        }
        this.RatingWrapper.refresh();
      });
    });
  },
  components: {
    Star,
    Split,
  },
  methods: {
    tabHandler(type) {
      this.activeCode = type;
      this.$nextTick(() => {
        this.RatingWrapper.refresh();
      });
    },
    onlyHandler() {
      this.onlyRead = !this.onlyRead;
      this.$nextTick(() => {
        this.RatingWrapper.refresh();
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
@import "../../commom/stylus/mixin"
.rating-wrapper
  position absolute
  top 174px
  bottom 46px
  width 100%
  overflow hidden
  .score-wrapper
    display flex
    margin 18px 0
    .score-left
      padding 0 14px
      border-right 1px solid rgba(7, 17, 27, .1)
      text-align center
      .score
        font-size 24px
        color rgb(255, 153, 0)
        line-height 28px
      .title
        font-size 12px
        color rgb(7, 17, 27)
        line-height 12px
        margin-top 6px
      .rankRate
        font-size 10px
        color #93999f
        line-height 10px
        margin-top 8px
    .score-right
      flex 1
      padding-left 24px
      .scroe-item
        display flex
        font-size 0
        margin-top 8px
        .title
          display inline-block
          font-size 12px
          color rgb(7, 17, 27)
          line-height 18px
          margin-right 12px
        .score, .deliveryTime
          display inline-block
          font-size 12px
          line-height 18px
          color rgb(147, 153, 159)
        .score
          margin-left 12px
          color rgb(255, 153, 0)

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
    border-1px(rgba(7, 17, 27, .1))
    .list-item
      position relative
      margin 18px
    .avatar
      width 28px
      height 28px
      border-radius 50%
      position absolute
      left 0
      top 0
    .head
      display flex
      padding-left 40px
      span
        display inline-block
      .rateTime, .username
        color rgb(147, 153, 159)
        font-size 10px
        line-height 12px
        vertical-align top
      .username
        flex 1
    .text
      font-size 12px
      line-height 18px
      color rgb(7, 17, 27)
      vertical-align top
      margin-top 6px
      &.notext
        color #b7bbbf
    .item-content
      padding-left 40px
      .top
        display flex
        margin-top 4px
        .deliveryTime
          font-size 10px
          line-height 16px
          color rgb(147, 153, 159)
          margin-left 6px
      .content
        margin-top 8px
        display flex
        flex-wrap wrap
        .icon, .text
          display inline-block
        .icon
          margin-right 4px
          font-size 12px
          vertical-align middle
          color rgb(147, 153, 159)
          display inline-block
          &.icon-thumb_up
            color rgb(0, 160, 220)
        .recommend
          display inline-block
          border 1px solid rgba(7, 17, 27, .1)
          font-size 12px
          line-height 16px
          vertical-align middle
          padding 0 6px
          margin-right 8px
</style>
