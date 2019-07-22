//Express nuxt SSR
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

//Graphql
const { prisma } = require('./prisma/generated/prisma-client')
const { GraphQLServer } = require('graphql-yoga')
const { resolvers } = require('./graphql/resolvers')
const { typeDefs } = require('./graphql/typedefs')

const { permissions } = require('./graphql/permissions')

const app = express()

let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  //start graphql server
  const server = new GraphQLServer({
    typeDefs,
    resolvers,
    middlewares: [permissions],
    context: request => {
      return {
        ...request,
        prisma
      }
    }
  })
  server.start(() => console.log('Server is running on http://localhost:4000'))

  //start nuxt SSR
  const nuxt = new Nuxt(config)
  const { host, port } = nuxt.options.server

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(nuxt.render)

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
