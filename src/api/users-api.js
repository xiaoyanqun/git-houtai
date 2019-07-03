import axios from 'axios'

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
export const login = (data) => {
  return axios({
    method: 'post',
    url: 'login',
    data
  })
}

export const users = (params) => {
  return axios({
    url: 'users',
    params
  })
}

export const adduser = (data) => {
  return axios({
    url: 'users',
    method: 'post',
    data
  })
}
