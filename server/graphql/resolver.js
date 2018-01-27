import { rolesCasting } from '../src/global_func.js'

export default {
  User: {
    async loginLogs (root, args, { DB, user }) {
      // admin role is required to use this method
      if (user.roles.admin) {
        const foundUser = await DB.User.findOne({
          socialID: root.socialID,
          socialType: root.socialType
        })
        // can't direct access loginLogs cause it give us undefined
        const loginLogs = await JSON.parse(JSON.stringify(foundUser.loginLogs)) 
        return loginLogs
      }
    },
    async roles (root, args) {
      console.log(root)
      return root.roles
    }
  },
  Query: {
    async User (root, args, { DB }) {
      const user = await DB.User.findOne({
        socialID: args.socialID,
        socialType: args.socialType
      })
      return user
    },
    async loginUser (root, args, { user }) {
      return {
        socialID: user.socialID,
        socialType: user.socialType,
        roles: user.roles
      }
    }
  },
  Mutation: {
    async addStaffRole (root, args, { DB, user }) {
      // admin role is required to use this method
      if (user.roles.admin) {
        // find the user then add staff role
        const updatedUser = await DB.User.findOneAndUpdate({
          // conditions
          socialID: args.socialID,
          socialType: args.socialType,
        }, {
          // update
          $addToSet: {
            roles: {
              name: 'staff'
            }
          }
        }, {
          new: true, // return modified document
        })
        // cast roles from array objects to an object
        const roles = await rolesCasting(updatedUser.roles)
        // if user is exist, then return updated user information, else return null
        if (updatedUser) {
          return {
            socialID: updatedUser.socialID,
            socialType: updatedUser.socialType,
            roles: roles
          }
        }
      }
    },
    async removeStaffRole (root, args, { DB, user }) {
      // admin role is required to use this method
      if (user.roles.admin) {
        // find the user then add staff role
        const updatedUser = await DB.User.findOneAndUpdate({
          // conditions
          socialID: args.socialID,
          socialType: args.socialType,
        }, {
          // update
          $pull: {
            roles: {
              name: 'staff'
            }
          }
        }, {
          new: true, // return modified document
        })
        // cast roles from array objects to an object
        const roles = await rolesCasting(updatedUser.roles)
        // if user is exist, then return updated user information, else return null
        if (updatedUser) {
          return {
            socialID: updatedUser.socialID,
            socialType: updatedUser.socialType,
            roles: roles
          }
        }
      }
    }
  }
}