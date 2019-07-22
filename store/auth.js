import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
  token: null,
  me: null
})

export const actions = {
  async login({ commit, dispatch }, loginData) {
    try {
      const res = await this.$axios.$post('/', {
        query: `
          mutation {
            login(login: "${loginData.login}", password: "${loginData.password}") {
              token
            }
          }
        `
      })
      if (!res.data.login) throw res

      const { token } = res.data.login
      const login = loginData.login
      dispatch('setToken', { token, login })
    } catch (error) {
      commit('setError', error, { root: true })
    }
  },
  setToken({ commit }, { token, login }) {
    this.$axios.setToken(token, 'Bearer')
    commit('setToken', token)
    commit('setMe', login)
    Cookies.set('jwt-token', token)
    Cookies.set('login', login)
  },
  logout({ commit }) {
    this.$axios.setToken(false)
    commit('clearToken')
    Cookies.remove('jwt-token')
    Cookies.remove('login')
  },
  autoLogin({ dispatch }) {
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie

    const cookies = Cookie.parse(cookieStr || '') || {}
    const token = cookies['jwt-token']
    const login = cookies['login'] || 'user'
    if (isJWTValid(token)) {
      dispatch('setToken', { token, login })
    } else {
      dispatch('logout')
    }
  },
  async register({ commit }, registerData) {
    try {
      const res = await this.$axios.$post('/', {
        query: `
          mutation {
            register(login: "${registerData.login}", password: "${registerData.password}") {
              token
            }
          }
        `
      })
      if (!res.data.register) throw res

    } catch (error) {
      commit('setError', error, { root: true })
    }
  },
}

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = null
    state.me = null
  },
  setMe(state, me) {
    state.me = me
  }
}

function isJWTValid(token) {
  if (!token) {
    return false
  }

  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || 0
  return new Date().getTime() / 1000 < expires
}
