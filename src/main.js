import Vue from 'vue'
import App from './App.vue'
import router from '@/routers/router.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
// 路由全局前置守卫
router.beforeEach((to, from, next) => {
 console.log(to);
 let token = localStorage.getItem('token')
 // 如果没有token值，除非你去登陆，否则都应该重定向到登陆
 if(token || to.path === '/login'){
   // 如果有token,那么就next
   next()
 }else if (!token && to.path !== '/login'){
  next({name:'login'})
 }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
