import axios from '@/api/axios.js'

// 获取所有商品数据
export const getAllGoodsList = (params) => {
  return axios({
    url: 'goods',
    params
  })
}

// 获取商品分类下拉列表数据
export const getAllCateList = (type) => {
  return axios({
    url: 'categories',
    type: { type }
  })
}
// 编辑商品
export const editGoodsById = (id) => {
  return axios({
    url: `goods/${id}`,
    method: 'put'
  })
}

// 添加商品
export const addGoods = (data) => {
  return axios({
    method: 'post',
    url: 'goods',
    data
  })
}

// 获取商品参数
export const getCategories = (id, sel) => {
  return axios({
    url: `categories/${id}/attributes`,
    params: { sel }
  })
}
