const { mergeResolvers } = require('merge-graphql-schemas')
const auth = require('./auth.resolvers')
const todo = require('./todo.resolvers')


const resolversArray = [
  auth,
  todo,
];

const resolvers = mergeResolvers(resolversArray)

module.exports = {
  resolvers
}
