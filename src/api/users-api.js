import axios from '@/api/axios.js'
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

export const deluser = (id) => {
  return axios({
    method: 'delete',
    url: `users/${id}`
  })
}

export const userstate = (id, type) => {
  return axios({
    method: 'put',
    url: `users/${id}/state/${type}`
  })
}

export const editputroles = (id, rid) => {
  return axios({
    method: 'put',
    url: `users/${id}/role`,
    data: { rid }
  })
}

export const editUser = (data) => {
  return axios({
    url: `users/${data.id}`,
    method: 'put',
    data: { email: data.email, mobile: data.mobile }
  })
}
