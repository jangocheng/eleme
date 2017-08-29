<template>
  <div class=""@click="tapHandler">
    <span>kskdj</span>
    <transition name="fade">
      <p v-show="show">ratings</p>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  data() {
    return {
      show: false,
    };
  },
  methods: {
    tapHandler() {
      this.show = !this.show;
    },
    swipeHandler(dir) {
      console.log(dir);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
p
  height 200px
  background #f60
  &.fade-enter-active, &.fade-leave-active
    transition all .5s linear
  &.fade-enter, &.fade-leave-to
    transform translate3d(0, 100px, 0)
  &.fade-enter-to, &.fade-leave
    transform translate3d(0, 0, 0)
</style>
