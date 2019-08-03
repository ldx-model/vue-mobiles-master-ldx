/**
 * login.js
 * 用于login模块的状态管理
 */
import * as types from '../mutation-type' // 引入定义的方法
const login = {
  state: {
    token: '',
    user_id: '',
    user_type: '',
    task_id: ''
  },
  mutations: {
    [types.SET_TOKEN](state, data) {
      state.token = data.token
      state.user_id = data.user_id
      state.task_id = data.task_id
      state.user_type = data.user_type
      sessionStorage.setItem('token', data.token)
      sessionStorage.setItem('user_id', data.user_id)
      sessionStorage.setItem('user_type', data.user_type)
    },
    [types.DEL_TOKEN](state) {
      state.token = ''
      sessionStorage.removeItem('token')
    },
    [types.SET_TASK_ID](state, data) {
      state.task_id = data
    }
  },
  actions: {},
  getters: { // 定义getters，可以通过mapGetters拓展函数调用

  }
}
export default login // 输出login模块
