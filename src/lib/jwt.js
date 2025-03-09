require("dotenv").config()
const jwt = require("jsonwebtoken")

const secretKey = process.env.JWT_SECRET_KEY

function generateToken(userId) {
  const token = jwt.sign({ userId }, secretKey)
  return token
}

function verifyToken(token) {
  try {
    const payload = jwt.verify(token, secretKey)
    return payload
  } catch {
    return false
  }
}

module.exports = {
  generateToken,
  verifyToken
}