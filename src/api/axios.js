import axios from 'axios'
import router from '@/routers/router.js'

// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// axios拦截器，所以的请求都会被拦截
axios.interceptors.request.use(function (config) {
  // 对请求成功做你想做的
  let token = localStorage.getItem('token')
  // 把token添加到亲求头中
  config.headers.Authorization = token
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// axios拦截器，所以的响应都会被拦截
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 如果是无效token就重定向到login重新登录
  if (response.data.meta.msg === '无效token' && response.data.meta.status === 400) {
    router.push({ name: 'login' })
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default axios
