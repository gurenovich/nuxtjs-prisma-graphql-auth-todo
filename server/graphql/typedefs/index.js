const { mergeTypes } = require('merge-graphql-schemas')
const auth = require('./auth.typedefs.graphql')
const todo = require('./todo.typedefs.graphql')


const typeDefsArray = [
  auth,
  todo,
];

const typeDefs = mergeTypes(typeDefsArray)

module.exports = {
  typeDefs
}
