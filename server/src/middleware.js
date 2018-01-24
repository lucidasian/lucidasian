import config from '../config'
import jwt from 'jsonwebtoken'
import uuidv1 from 'uuid/v1'

export const setUUID = (req, res, next) => {
  let UUID = req.cookies.UUID
  if (!UUID) {
    UUID = uuidv1()
    req.cookies.UUID = UUID
    res.cookie('UUID', UUID)
  }
  next()
}

export const verifyJwt = (req, res, next) => {
  const token = JSON.parse(JSON.stringify(req.cookies)).token
  if (token) {
    try {
      const user = jwt.verify(token, config.jwtSecret)
      req.user = user
    } catch (err) {
      console.log(err)
      res.redirect(`${req.hostname}:${config.clientPort}/signin`)
    }
  }
  next()
}