import axios from '@/api/axios.js'

// 请求用户户角色
export const allocateroles = () => {
  return axios({
    url: `roles`
  })
}

// 请求所有权限列表
export const rolesList = (type) => {
  return axios({
    url: `rights/${type}`
  })
}

// 删除角色指定权限
export const delRoles = (roleId, rightId) => {
  return axios({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}

// 角色授权
export const giveRoles = (roleId, rids) => {
  return axios({
    method: 'post',
    url: `roles/${roleId}/rights`,
    data: { rids }
  })
}

// 添加角色
export const addRoles = (data) => {
  return axios({
    url: 'roles',
    method: 'post',
    data
  })
}

// 删除角色
export const delRolesById = (id) => {
  return axios({
    url: `roles/${id}`,
    method: 'delete'
  })
}

// 编辑角色
export const editRolesById = (data) => {
  return axios({
    url: `roles/${data.id}`,
    method: 'put',
    data
  })
}

// 左侧菜单栏权限
export const getAllLeftList = () => {
  return axios({
    url: 'menus'
  })
}
