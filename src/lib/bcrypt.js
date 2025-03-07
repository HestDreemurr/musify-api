const bcrypt = require("bcryptjs")

async function hashPassword(password) {
  const passwordSalt = await bcrypt.genSalt(10)
  const encryptedPassword = await bcrypt.hash(password, passwordSalt)
  return encryptedPassword
}

module.exports = {
  hashPassword
}