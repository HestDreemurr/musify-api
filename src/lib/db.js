require("dotenv").config()

const { Pool } = require("@neondatabase/serverless")
const { hashPassword } = require("./bcrypt.js")
const { randomUUID } = require("node:crypto")

const token = process.env.NEONDB_TOKEN

const sql = new Pool({ connectionString: token })

async function createUser(user) {
  const userUUID = randomUUID()
  const userPassword = await hashPassword(user.password)
  await sql.query(`
  INSERT INTO users (id, name, email, password)
  VALUES ($1, $2, $3, $4)
  `, [userUUID, user.name, user.email, userPassword])
  return userUUID
}

async function getUser(userId) {
  const { rows } = await sql.query(`
  SELECT id, name, email FROM users
  WHERE id = $1
  `, [userId])
  return rows[0]
}

async function getUserPassword(email) {
  const { rows } = await sql.query(`
  SELECT id, password FROM users
  WHERE email = $1
  `, [email])
  return rows[0]
}

async function deleteUser(userId) {
  await sql.query(`
  DELETE FROM users
  WHERE id = $1
  `, [userId])
}

module.exports = {
  createUser,
  getUser,
  getUserPassword,
  deleteUser
}