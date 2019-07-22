export const state = () => ({
  error: null
})

export const actions = {
  nuxtServerInit({ dispatch }) {
    dispatch('auth/autoLogin')
  }
}

export const mutations = {
  setError(state, error) {
    state.error = error
  },
  clearError(state) {
    state.error = null
  }
}
