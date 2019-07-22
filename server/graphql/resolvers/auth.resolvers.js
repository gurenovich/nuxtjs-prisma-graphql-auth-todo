const { hash, compare } = require('bcrypt')
const { sign } = require('jsonwebtoken')
const { getLoggedUser } = require('../utils')
const { APP_SECRET } = require('../../keys')

module.exports = {
  Query: {
    users(root, args, context) {
      return context.prisma.users()
    },
    me: (parent, args, context) => {
      const { userId } = getLoggedUser(context)
      return context.prisma.user({ id: userId })
    }
  },
  Mutation: {
    register: async (parent, { login, password }, context) => {
      const hashedPassword = await hash(password, 10)
      const user = await context.prisma.createUser({
        login,
        password: hashedPassword
      })
      return {
        token: sign({ userId: user.id }, APP_SECRET),
        user
      }
    },
    login: async (parent, { login, password }, context) => {
      const user = await context.prisma.user({ login })
      if (!user) {
        throw new Error(`User: ${login} not found`)
      }
      const passwordValid = await compare(password, user.password)
      if (!passwordValid) {
        throw new Error('Invalid password')
      }
      return {
        token: sign({ userId: user.id, login }, APP_SECRET, {
          expiresIn: 60 * 60
        }),
        user
      }
    }
  }
}
