const express = require("express")
const path = require("node:path")

const db = require("./lib/db.js")
const jwt = require("./lib/jwt.js")

const app = express()
const port = process.env.PORT ?? 3333

app.use(express.json())

app.post("/auth/register", async (req, res) => {
  const user = req.body
  
  const userId = await db.createUser(user)
  
  const userToken = jwt.generateToken(userId)
  
  return res.json({ userToken })
})

app.listen(port, () => {
  console.log("Aplicação rodando em http://localhost:3333")
})