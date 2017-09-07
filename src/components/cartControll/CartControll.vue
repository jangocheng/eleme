<template>
  <div class="cart-controll">
    <transition name="move">
      <div class="cart-decrese" v-show="food.count>0" @click.stop.prevent="decreaseFood">
        <i class="inner icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0"> {{food.count}} </div>
    <div class="cart-add" @click.stop.prevent="addFood">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';

export default {
  name: '',
  props: {
    food: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {
    addFood() {
//      this.food.count ? this.food.count += 1 : Vue.set(this.food, 'count', 1);
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count += 1;
      }
      this.$store.dispatch('selectedfoods');
    },
    decreaseFood() {
      this.food.count = this.food.count <= 0 ? 0 : this.food.count - 1;
      this.$store.dispatch('selectedfoods');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.cart-controll
  font-size 0
  .cart-decrese
    display inline-block
    padding 6px
    .inner
      display inline-block
      font-size 24px
      color rgb(0, 160, 220)
      line-height 24px
  .cart-count
    display inline-block
    vertical-align top
    padding-top 6px
    font-size 10px
    color rgb(147, 153, 159)
    line-height 24px
  .cart-add
    display inline-block
    padding 6px
    font-size 24px
    color rgb(0, 160, 220)
    line-height 24px
  .move-enter-active, .move-leave-active
    transition all .4s linear
  .move-enter-to, .move-leave
    opacity 1
    transform translate3d(0, 0, 0) rotate(0)
  .move-enter, .move-leave-to
    opacity 0
    transform translate3d(24px, 0, 0) rotate(180deg)
</style>
