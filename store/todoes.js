export const state = () => ({
  todoes: [],
})

export const actions = {
  async fetchTodoes({ commit }) {
    try {
      const res = await this.$axios.$post('/', {
        query: `
          query {
            todoes {
              id title done
            }
          }
        `
      })
      commit('setTodoes', res.data.todoes)
    } catch (error) {
      commit('setError', error, { root: true })
    }
  },

  async createTodo({ commit }, title) {
    try {
      const res = await this.$axios.$post('/', {
        query: `
          mutation {
            createTodo(title: "${title}") {
              id title done
            }
          }
        `
      })
      commit('setNewTodo', res.data.createTodo)
    } catch (error) {
      commit('setError', error, { root: true })
    }
  },

  async deleteTodo({ commit }, id) {
    try {
      await this.$axios.$post('/', {
        query: `
          mutation {
            deleteTodo(id: "${id}") {
              id title done
            }
          }
        `
      })
      commit('setDeleteTodo', id)
    } catch (error) {
      commit('setError', error, { root: true })
    }
  },

  async updateTodo({ commit }, id) {
    try {
      await this.$axios.$post('/', {
        query: `
          mutation {
            updateTodo(id: "${id}") {
              id
            }
          }
        `
      })
      commit('setUpdateTodo', id)
    } catch (error) {
      commit('setError', error, { root: true })
    }
  }
}

export const mutations = {
  setTodoes(state, todoes) {
    state.todoes = todoes
  },
  setNewTodo(state, newTodo) {
    state.todoes.push(newTodo)
  },
  setDeleteTodo(state, id) {
    state.todoes = state.todoes.filter(todo => todo.id != id)
  },
  setUpdateTodo(state, id) {
    const idx = state.todoes.findIndex(todo => todo.id == id)
    state.todoes[idx].done = true
  }
}

export const getters = {
  completedTodoes: state => state.todoes.filter(todo => todo.done === true)
}
