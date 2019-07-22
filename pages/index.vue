<template>
  <section>
    <b-row class="mt-5">
      <b-col md="6" offset="3">
        <h1>Todo APP</h1>
        <Add />
        <b-list-group class="mt-4">
          <b-list-group-item
            v-for="(todo, index) in todoes"
            :key="todo.id"
            :variant="todo.done ? 'success' : 'warning'"
            href="#"
          >
            <b>{{ index + 1 }}.</b>
            {{ todo.title }}
            <Delete :id="todo.id" :done="todo.done" />
            <b-button
              variant="success"
              @click="updateTodo(todo.id)"
              size="sm"
              class="float-right mr-2"
              v-if="!todo.done"
            >Done</b-button>
          </b-list-group-item>
        </b-list-group>
        <b-alert variant="warning" :show="!todoes.length">Not data</b-alert>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Add from '../components/todo/Add'
import Delete from '../components/todo/Delete'
export default {
  middleware: ['auth'],
  components: {
    Add,
    Delete
  },
  async fetch({ store }) {
    await store.dispatch('todoes/fetchTodoes')
  },
  computed: mapState('todoes', ['todoes']),
  methods: {
    async updateTodo(id) {
      await this.$store.dispatch('todoes/updateTodo', id)
    }
  }
}
</script>

<style>
</style>
