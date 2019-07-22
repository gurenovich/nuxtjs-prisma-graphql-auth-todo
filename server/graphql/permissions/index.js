const { rule, and, shield } = require('graphql-shield')
const { getLoggedUser } = require('../utils')

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    const loggedUser = getLoggedUser(context)
    return loggedUser ? true : new Error('Not authorized')
  }),
  isTodoOwner: rule()(async (parent, { id }, context) => {
    const { userId } = getLoggedUser(context)
    const author = await context.prisma.todo({ id }).author()
    return (userId === author.id) ? true : new Error('Not owner this todo')
  }),
  isAdmin: rule()((parent, args, context) => {
    const { login } = getLoggedUser(context)
    return (login === 'admin') ? true : new Error('You are not admin')
  })
}

const permissions = shield({
  Query: {
    users: and(rules.isAuthenticatedUser, rules.isAdmin),
    me: rules.isAuthenticatedUser,
    todoes: rules.isAuthenticatedUser
  },
  Mutation: {
    createTodo: rules.isAuthenticatedUser,
    updateTodo: and(rules.isAuthenticatedUser, rules.isTodoOwner),
    deleteTodo: and(rules.isAuthenticatedUser, rules.isTodoOwner)
  }
})

module.exports = {
  permissions
}
