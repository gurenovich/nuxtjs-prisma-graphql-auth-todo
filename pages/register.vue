<template>
  <section>
    <b-row class="mt-5">
      <b-col md="6" offset="3">
        <h1>Register</h1>
        <b-form @submit.prevent="onSubmit">
          <b-form-group id="input-group-1" label="Login" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="login"
              type="text"
              required
              placeholder="Enter login"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Password" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="password"
              type="password"
              required
              placeholder="Enter password"
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </b-col>
    </b-row>
  </section>
</template>

<script>
export default {
  middleware: ['guest'],
  data() {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    async onSubmit() {
      await this.$store.dispatch('auth/register', {
        login: this.login,
        password: this.password
      })
      this.$router.push('/login')
    }
  }
}
</script>

<style>
</style>
