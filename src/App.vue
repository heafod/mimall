<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import storage from "./storage";

export default {
  name: "App",
  components: {},
  data() {
    return {
      res: {}
    };
  },
  mounted() {
    // storage.setItem('a', 1);
    // storage.setItem('user', {a: 1});
    // storage.setItem('abc', {a: 2}, 'user');
    // storage.clear('a');
    // 本地加载请求静态 json 文件的形式
    // this.axios.get('/mock/user/login.json').then((res) => {
    //   this.res = res;
    //   console.log(res)
    // })
    // 通过 easy-mock 平台实现数据请求
    // this.axios.get('/get').then((res) => {
    //   this.res = res;
    //   console.log(res)
    // })
    // 本地集成 mockjs 实现数据 mock
    //     this.axios.get("/user/login").then(res => {
    //   this.res = res;
    //   console.log(res);
    // });
    if (this.$cookie.get("userId")) {
      this.getUser();
      this.getCartCount();
    }
  },
  methods: {
    getUser() {
      this.axios.get("/user").then((res = {}) => {
        // to-do 保存到 vuex
        this.$store.dispatch("saveUserName", res.username);
      });
    },
    getCartCount() {
      this.axios.get("/carts/products/sum").then((res = 0) => {
        // to-do 保存到 vuex
        this.$store.dispatch("saveCartCount", res);
      });
    }
  }
};
</script>

<style lang="scss">
@import "./assets/scss/reset.scss";
@import "./assets/scss/config.scss";
@import "./assets/scss/btn.scss";
</style>
