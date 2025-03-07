require("dotenv").config()

const { neon } = require("@neondatabase/serverless")
const { hashPassword } = require("./bcrypt.js")
const { randomUUID } = require("node:crypto")

const token = process.env.NEONDB_TOKEN

const sql = neon(token)

async function createUser(user) {
  const userUUID = randomUUID()
  const userPassword = await hashPassword(user.password)
  await sql`
  INSERT INTO users (id, name, email, password)
  VALUES (${userUUID}, ${user.name}, ${user.email}, ${userPassword})
  `
  return userUUID
}

module.exports = {
  createUser
}