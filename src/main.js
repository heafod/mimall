import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
// import env from './env'

// 根据前端的跨域方式做调整
// axios.defaults.baseURL = 'https://www.imooc.com/api'; // CORS、JSONP 代理需要使用全地址
// axios.defaults.baseURL = '/api'; // 使用代理的方式跨域
axios.defaults.timeout = 8000;
// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL =env.baseURL;
// console.log(env.baseURL)

// 接口错误拦截
axios.interceptors.response.use(function(response) {
  let res = response.data;
  if (res.status == 0){
    return res.data;
  }else if(res.status == 10){
    window.location.href = '/#/login';
  }else{
    alert(res.msg);
  }
})

Vue.use(VueAxios, axios)
// Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
