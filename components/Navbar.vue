<template>
  <b-navbar type="dark" variant="primary">
    <b-navbar-brand href="#">Todo</b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <template v-if="me">
          <nuxt-link exact active-class="active" to="/profile" tag="li">
            <a class="nav-link">{{me}}</a>
          </nuxt-link>
          <nuxt-link exact active-class="active" to="/" tag="li">
            <a class="nav-link">Main</a>
          </nuxt-link>
          <nuxt-link exact active-class="active" to="/logout" tag="li">
            <a class="nav-link">Logout</a>
          </nuxt-link>
        </template>
        <template v-else>
          <nuxt-link exact active-class="active" to="/login" tag="li">
            <a class="nav-link">Login</a>
          </nuxt-link>
          <nuxt-link exact active-class="active" to="/register" tag="li">
            <a class="nav-link">Register</a>
          </nuxt-link>
        </template>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('auth', ['me'])
  }
}
</script>
