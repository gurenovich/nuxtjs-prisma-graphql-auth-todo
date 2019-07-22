<template>
  <div>Clear data</div>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.dispatch('auth/logout')
    this.$router.push('/login')
  }
}
</script>

<style>
</style>
