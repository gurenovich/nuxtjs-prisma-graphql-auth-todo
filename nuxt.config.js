const pkg = require('./package')

module.exports = {
  mode: 'universal',

  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  loading: { color: '#FF5733' },

  css: [],

  plugins: ['./plugins/axios.js'],

  modules: ['@nuxtjs/axios', 'bootstrap-vue/nuxt'],

  bootstrapVue: {
    componentPlugins: [
      'NavbarPlugin',
      'LayoutPlugin',
      'FormPlugin',
      'FormGroupPlugin',
      'FormInputPlugin',
      'InputGroupPlugin',
      'BVToastPlugin',
      'ButtonPlugin',
      'AlertPlugin',
      'JumbotronPlugin',
      'LinkPlugin',
      'ListGroupPlugin'
    ]
  },

  axios: {
    baseURL: 'http://localhost:4000'
  },

  build: {
    extend(config, ctx) {}
  }
}
