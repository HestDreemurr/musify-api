const bcrypt = require("bcryptjs")

async function hashPassword(password) {
  const passwordSalt = await bcrypt.genSalt(10)
  const encryptedPassword = await bcrypt.hash(password, passwordSalt)
  return encryptedPassword
}

async function validatePassword(userPassword, inputPassword) {
  const isValid = await bcrypt.compare(inputPassword, userPassword)
  return isValid
}

module.exports = {
  hashPassword,
  validatePassword
}