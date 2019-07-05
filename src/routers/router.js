import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login.vue'
import home from '@/views/home.vue'
import wel from '@/views/wel.vue'
import user from '@/views/users/user.vue'
import role from '@/views/right/roleList.vue'
import right from '@/views/right/rightList.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: login
    },
    {
      path: '/',
      redirect: { path: '/home' }
    },
    {
      name: 'home',
      path: '/home',
      component: home,
      redirect: { path: '/home/wel' },
      children: [
        {
          name: 'wel',
          path: 'wel',
          component: wel
        },
        {
          name: 'user',
          path: 'user',
          component: user
        },
        {
          name: 'role',
          path: 'role',
          component: role
        },
        {
          name: 'right',
          path: 'right',
          component: right
        }
      ]
    }
  ]
})
