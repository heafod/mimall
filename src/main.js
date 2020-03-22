import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

import App from './App.vue'
// import env from './env'

// 增加 mock 开关
// const mock = true
// if (mock) {
//   require('./mock/api.js')
// }

// 根据前端的跨域方式做调整
// axios.defaults.baseURL = 'https://www.imooc.com/api'; // CORS、JSONP 代理需要使用全地址
// axios.defaults.baseURL = 'http://httpbin.org'; // 使用mock方式请求
axios.defaults.baseURL = '/api'; // 使用代理的方式跨域 
axios.defaults.timeout = 8000;
// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL =env.baseURL;
// console.log(env.baseURL)

// 接口错误拦截
// response.status == 200
axios.interceptors.response.use(function (response) {
  let res = response.data;
  let path = location.hash;

  if (res.status == 0) {
    return res.data;
  } else if (res.status == 10) {
    if (path != '#/index') {
      window.location.href = '/#/login';
      return Promise.reject(res)
    }
  } else {
    // alert(res.msg);
    Message.warning(res.msg);
    return Promise.reject(res);
  }
}, (error)=>{
  let res = error.response;
  Message.error(res.data.message)
  return Promise.reject(error)
})

Vue.use(VueAxios, axios)
Vue.use(VueCookie)
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg'
})
Vue.prototype.$message = Message

// Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')