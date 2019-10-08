import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/fonts/iconfont.css';
Vue.use(Element);
Vue.config.productionTip = false;

// 添加请求拦截器
axios.interceptors.request.use(_request, _reqErr);
// 添加响应拦截器
axios.interceptors.response.use(_response, _resErr);
// 数据请求默认地址
axios.defaults.baseURL = "http://192.168.1.101:3000/api/v1/";
// 附带cookie凭证
axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;



// 全局路由
router.beforeEach(_beforeRouter)


new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount("#app");


// 响应拦截器
function _response(res) {
  return res
}
function _resErr(err) {
  console.log(err.response)
  Promise.reject(err.response)
}

// 请求拦截
function _request(config) {
  config.headers['token'] = 'token';
  config.headers['uid_id'] = localStorage.getItem("uid_id")
  return config;
}
function _reqErr(err) {
  console.log(err)
  return Promise.reject(err);
}


// 全局路由守卫
function _beforeRouter(to, from, next) {
  // 验证当前是否登陆状态
  if (to.meta.requiresAuth && !localStorage.getItem('uid_id')) {
    next({ path: '/login' });
    return;
  }
  // 不可回退
  if (to.meta.isBack && localStorage.getItem('uid_id')) {
    next(from.path);
    return;
  }
  next();
}