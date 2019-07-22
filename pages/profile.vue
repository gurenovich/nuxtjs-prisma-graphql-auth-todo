<template>
  <b-row class="mt-4">
    <b-col md="6" offset="3">
      <b-jumbotron :header="me" lead="Profile page">
        <p>You have <b>{{todoes.length}}</b> todoes:</p>
        <p>Is done {{completedTodoes.length}} and other {{todoes.length - completedTodoes.length}}</p>
        <b-button variant="primary" to="/">See them</b-button>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  middleware: ['auth'],
  computed: {
    ...mapState('auth', ['me']),
    ...mapState('todoes', ['todoes']),
    ...mapGetters('todoes', ['completedTodoes'])
  },
  async fetch({ store }) {
    await store.dispatch('todoes/fetchTodoes')
  }
}
</script>
