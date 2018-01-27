import config from '../config'
import DB from '../model'
import { rolesCasting } from './global_func'
import jwt from 'jsonwebtoken'
import uuidv1 from 'uuid/v1'

export const setUUID = (req, res, next) => {
  // get UUID from client's cookie
  let UUID = req.cookies.UUID
  // if UUID was not created yet, create a new one and store in cookie
  if (!UUID) {
    UUID = uuidv1()
    req.cookies.UUID = UUID
    res.cookie('UUID', UUID)
  }
  next()
}

export const verifyJwt = async (req, res, next) => {
  const token = JSON.parse(JSON.stringify(req.cookies)).token
  if (token) {
    try {
      // verify token to get socialID and socialType
      let user = await jwt.verify(token, config.jwtSecret)
      // get user from DB
      user = await DB.User.findOne({
        socialID: user.socialID,
        socialType: user.socialType
      }) 
      // cast roles from array objects to an object
      const roles = await rolesCasting(user.roles)
      // set user session
      req.user = {
        socialID: user.socialID,
        socialType: user.socialType,
        token: user.token,
        roles: roles
      }
    } catch (err) {
      console.log(err)
    }
  }
  next()
}