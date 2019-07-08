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

export const editGoodsById = (id) => {
  return axios({
    url: `goods/${id}`,
    method: 'put'
  })
}
