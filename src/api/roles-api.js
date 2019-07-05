import axios from '@/api/axios.js'

// 请求用户额角色
export const allocateroles = () => {
  return axios({
    url: `roles`
  })
}

// 请求所有权限列表
export const rolesList = () => {
  return axios({
    url: 'rights/list'
  })
}
