<template>
  <div>
    <Navbar />
    <div class="container">
      <nuxt />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from '../components/Navbar'
export default {
  components: {
    Navbar
  },
  computed: mapState(['error']),
  watch: {
    error(value) {
      if (value.errors) {
        this.$bvToast.toast(value.errors[0].message, {
          title: 'Error',
          autoHideDelay: 5000,
          variant: 'danger'
        })
      } else if (value.response) {
        this.$bvToast.toast(value.response.data.errors[0].message, {
          title: 'Error',
          autoHideDelay: 5000,
          variant: 'danger'
        })
      }
    }
  }
}
</script>
