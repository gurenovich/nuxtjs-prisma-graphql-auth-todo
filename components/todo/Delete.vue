<template>
  <b-button
    variant="danger"
    size="sm"
    class="float-right"
    @click="deleteTodo()"
    v-if="done"
  >Delete</b-button>
</template>

<script>
export default {
  props: ['id', 'done'],
  methods: {
    async deleteTodo() {
      const res = await this.$store.dispatch('todoes/deleteTodo', this.id)
    }
  }
}
</script>

<style>
</style>
