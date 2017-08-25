<template>
  <div class="" v-touch:tap="tapHandler"  v-touch:swipe="swipeHandler">
    ratings
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  data() {
    return {};
  },
  methods: {
    tapHandler() {
      alert(3);
    },
    swipeHandler(dir) {
      console.log(dir);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
