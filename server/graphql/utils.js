const { verify } = require('jsonwebtoken')
const { APP_SECRET } = require('../keys')

function getLoggedUser(context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId, login } = verify(token, APP_SECRET)
    return { userId, login }
  }
  return null
}

module.exports = {
  getLoggedUser,
}
