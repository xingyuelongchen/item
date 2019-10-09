import Vue from "vue";
import Router from "vue-router";
// 后台路由
import adminRouters from './admin.js';
// 公共路由
import publics from './public.js';

Vue.use(Router);
export default new Router({
  mode: "history",
  // mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    // 公共路由
    {
      path: '/',
      redirect:'/admin',
      component: () => import('@/views/admin/index.vue'),
      children: [
        ...publics
      ]
    },
    {
      path: '/index',
      component: () => import('@/views/home/index.vue'),
    },
    {
      path: '/login/:redirect?',
      meta: {
        isBack: true
      },
      component: () => import("@/views/public/login.vue")
    },
    //后台管理路由
    {
      path: '/admin',
      meta: { requiresAuth: true, isBack: false },
      // meta: { 
      //  requiresAuth: true, 判断是否登陆才可访问 
      //  isBack: false 是否可以后退
      // },
      component: () => import('@/views/admin/index.vue'),
      children: [
        ...adminRouters
      ]
    }
  ]
});
//
