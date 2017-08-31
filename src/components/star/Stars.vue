<template>
  <div class="star" :class="starType">
    <span v-for="(item, index) in itemClasses" :class="item" class="star-item">

    </span>
  </div>
</template>

<script type="text/ecmascript-6">
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_OFF = 'off';
const CLS_HALF = 'half';
export default {
  name: '',
  props: {
    size: {
      type: Number,
    },
    score: {
      type: Number,
    },
  },
  data() {
    return {};
  },
  computed: {
    starType() {
      if (this.size === 24) {
        return 'star-24';
      } else if (this.size === 36) {
        return 'star-36';
      }
      return 'star-48';
    },
    itemClasses() {
      const result = [];
      const score = Math.floor(this.score * 2) / 2;
      const hasDecimal = score % 1 !== 0;
      const integer = Math.floor(score);
      for (let i = 0; i < integer; i += 1) {
        result.push(CLS_ON);
      }
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import "../../commom/stylus/mixin"
.star
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &.on
        bg-image('star48_on')
      &.half
        bg-image('star48_half')
      &.off
        bg-image('star48_off')
      &:last-child
        margin-right 0
  &.star-36
    .star-item
      width 15px
      height 15px
      marign-right 6px
      background-size 15px 15px
      &.on
        bg-image('star36_on')
      &.half
        bg-image('star36_half')
      &.off
        bg-image('star36_off')
      &:last-child
        margin-right 0
  &.star-24
    .star-item
      width 10px
      height 10px
      marign-right 3px
      background-size 10px 10px
      &.on
        bg-image('star24_on')
      &.half
        bg-image('star24_half')
      &.off
        bg-image('star24_off')
      &:last-child
        margin-right 0

</style>
