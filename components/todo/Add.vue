<template>
  <b-form @submit.prevent="onSubmit" inline class="mt-3">
    <b-input-group class="col-md-10">
      <b-input
        id="inline-form-input-username"
        v-model="title"
        type="text"
        required
        placeholder="Enter todo"
      ></b-input>
    </b-input-group>

    <b-button type="submit" variant="primary">Submit</b-button>
  </b-form>
</template>

<script>
export default {
  data() {
    return {
      title: ''
    }
  },
  methods: {
    async onSubmit() {
      const res = await this.$store.dispatch('todoes/createTodo', this.title)
      this.title = ''
    }
  }
}
</script>

<style>
</style>
