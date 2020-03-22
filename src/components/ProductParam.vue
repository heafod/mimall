<template>
  <div class="nav-bar" :class="{'is_fixed': isFIxed}">
    <div class="container">
      <div class="pro-title">{{title}}</div>
      <div class="pro-param">
        <a href="javascript:;">概述</a>
        <span>|</span>
        <a href="javascript:;">参数</a>
        <span>|</span>
        <a href="javascript:;">用户评价</a>
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-bar",
  props: {
      title: String
  },
  data() {
    return {
      isFIxed: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.initHeight);
  },
  methods: {
    initHeight() {
      let scollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.isFIxed = scollTop > 152 ? true : false;
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.initHeight, false); // 冒泡
  }
};
</script>

<style lang="scss" sscoped>
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";

.nav-bar {
  height: 70px;
  line-height: 70px;
  border-top: 1px solid $fontH;
  background-color: $colorG;
  z-index: 10;
  &.is_fixed {
    position: fixed;
    top: 0;
    width: 100%;
    box-shadow: 0 5px 5px $colorE;
  }
  .container {
    @include flex();
    .pro-title {
      font-size: $fontH;
      color: $colorB;
      font-weight: bold;
    }
    .pro-param {
      font-size: $fontJ;
      span {
        margin: 0 10px;
      }
      a {
        color: $colorC;
      }
    }
  }
}
</style>