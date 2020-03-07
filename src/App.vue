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
    
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
