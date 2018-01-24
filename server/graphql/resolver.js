export default {
  User: {
    async loginLogs (root, args, { DB }) {
      const loginLogs = await JSON.parse(JSON.stringify(root.loginLogs)) // can't direct access cause it give us undefined
      return loginLogs
    }
  },
  Query: {
    async User (root, args, { DB }) {
      const user = await DB.User.findOne({
        socialID: args.socialID,
        socialType: args.socialType
      })
      return user
    }
  },
  Mutation: {
    async signUp (root, args, { DB, IP_ADDRESS, UUID }) {     
      const newUser = await DB.User.findOneAndUpdate({
        // conditions
        socialID: args.socialID,
        socialType: args.socialType
      }, {
        // update
        socialID: args.socialID,
        socialType: args.socialType,
        $push: {
          loginLogs: {
            uuid: UUID,
            ipAddress: IP_ADDRESS,
            loginAt: Date.now()
          }
        }
      }, {
        new: true, // return modified document
        upsert: true // create the object if it doesn't exist
      })

      return {
        socialID: newUser.socialID,
        socialType: newUser.socialType,
        token: newUser.token
      }
    }
  }
}