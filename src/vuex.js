import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 保存数据
const state = {
  username: ''
}
// 操作数据
const mutations = {
  setUserName (state, value) {
    state.username = value
  }
}
// 触发操作数据函数
const actions = {
  getSetUserName ({ commit }, value) {
    commit('setUserName', value)
  }
}
// 获取数据
const getters = {
  getUserName (state) {
    return state.username
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
