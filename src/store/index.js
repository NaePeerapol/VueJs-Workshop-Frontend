import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // ดึง token จาก localStorage เมื่อเริ่มต้น
    token: localStorage.getItem('user-token') || null
  },
  getters: {
    isAuthenticated: state => !!state.token
  },
  mutations: {
    setToken(state, token) {
      // เก็บ token ใน localStorage
      localStorage.setItem('user-token', token)
      state.token = token
    },
    clearToken(state) {
      // ลบ token ออกจาก localStorage
      localStorage.removeItem('user-token')
      state.token = null
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token)
    },
    logout({ commit }) {
      commit('clearToken')
      router.push('/')
    }
  }
})