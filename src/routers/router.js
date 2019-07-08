import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login.vue'
import home from '@/views/home.vue'
import wel from '@/views/wel.vue'
import user from '@/views/users/user.vue'
import role from '@/views/right/roleList.vue'
import right from '@/views/right/rightList.vue'
import goods from '@/views/goods/goods.vue'
import add from '@/views/goods/add.vue'
import list from '@/views/goods/list.vue'

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
          path: 'users',
          component: user
        },
        {
          name: 'role',
          path: 'roles',
          component: role
        },
        {
          name: 'right',
          path: 'rights',
          component: right
        },
        {
          name: 'goods',
          path: 'goods',
          component: goods,
          redirect: { path: '/home/goods/list' },
          children: [
            {
              name: 'list',
              path: 'list',
              component: list
            },
            {
              name: 'add',
              path: 'add',
              component: add
            }
          ]
        }
      ]
    }
  ]
})
