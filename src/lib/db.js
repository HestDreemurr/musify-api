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

async function getUser(userId) {
  const user = await sql`
  SELECT id, name, email FROM users
  WHERE id = ${userId}
  `
  return user[0]
}

async function getUserPassword(email) {
  const user = await sql`
  SELECT id, password FROM users
  WHERE email = ${email}
  `
  return user[0]
}

async function deleteUser(userId) {
  const res = await sql`
  DELETE FROM users
  WHERE id = ${userId}
  `
  return res
}

module.exports = {
  createUser,
  getUser,
  getUserPassword,
  deleteUser
}