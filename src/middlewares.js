const { verifyToken } = require("./lib/jwt.js")

async function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) return res.status(400).json({ ok: false, message: "Token ausente" })
  
  const tokenPayload = verifyToken(token)
  if (!tokenPayload) return res.status(400).json({ ok: false, message: "Token inválido" })
  
  req.userId = tokenPayload.userId
  next()
}

module.exports = {
  authenticateToken
}