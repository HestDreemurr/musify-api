require("dotenv").config()
const jwt = require("jsonwebtoken")

const secretKey = process.env.JWT_SECRET_KEY

function generateToken(userId) {
  const token = jwt.sign({ userId }, secretKey)
  return token
}

module.exports = {
  generateToken
}