import axios from 'axios'

// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

export const login = (data)=>{
  return axios({
    method:'post',
    url:'login',
    data
  })
}