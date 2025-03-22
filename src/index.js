require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("node:path")

const db = require("./lib/db.js")
const jwt = require("./lib/jwt.js")
const { authenticateToken } = require("./middlewares.js")
const { validatePassword } = require("./lib/bcrypt.js")

const app = express()
const port = process.env.PORT ?? 3333
const allowedURL = process.env.ALLOWED_URL

app.use(express.json())
app.use(cors({
  origin: allowedURL
}))

app.post("/auth/register", async (req, res) => {
  const user = req.body
  
  const userId = await db.createUser(user)
  
  const userToken = jwt.generateToken(userId)
  
  return res.json({ ok: true, userToken })
})

app.post("/auth/login", async (req, res) => {
  const user = req.body
  
  const dbUser = await db.getUserPassword(user.email)
  
  if (!dbUser) return res.status(404).json({ ok: false, errorCode: "user_not_found" })
  
  const isValidPassword = await validatePassword(dbUser.password, user.password)
  
  if (!isValidPassword) return res.status(400).json({ ok: false, errorCode: "invalid_password" })
  
  const token = jwt.generateToken(dbUser.id)
  
  return res.json({ ok: true, token })
})

app.get("/auth/me", authenticateToken, async (req, res) => {
  const user = await db.getUser(req.userId)
  
  if (!user) return res.status(404).json({ ok: false, errorCode: "user_not_found" })
  
  return res.json({ ok: true, user })
})

app.delete("/auth/delete", authenticateToken, async (req, res) => {
  await db.deleteUser(req.userId)
  
  return res.status(204)
})

app.put("/auth/update", authenticateToken, async (req, res) => {
  await db.updateUser(req.userId, req.body)
  
  return res.status(204)
})

app.get("/sla", (req, res) => {
  console.log(req.headers)
  
  return res.send("Sla")
})

app.listen(port, () => {
  console.log("Aplicação rodando em http://localhost:3333")
})