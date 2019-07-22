const { getLoggedUser } = require('../utils')

module.exports = {
  Query: {
    todoes(root, args, context) {
      const { userId } = getLoggedUser(context)
      return context.prisma.user({ id: userId }).todoes()
    }
  },
  Mutation: {
    createTodo: (parent, { title }, context) => {
      const { userId } = getLoggedUser(context)
      return context.prisma.createTodo({
        title,
        author: { connect: { id: userId } }
      })
    },

    deleteTodo: (parent, id, { prisma }) => prisma.deleteTodo(id),

    updateTodo: async (parent, id, context) => {
      return context.prisma.updateTodo({
        where: id,
        data: { done: true }
      })
    }
  }
}
