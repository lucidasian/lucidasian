import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  socialID: { type: String, required: true },
  socialType: { type: String, enum: ['facebook', 'google', 'twitter'], required: true },
  token: { type: String },
  roles: {
    admin: { type: Boolean, default: false },
    member: { type: Boolean, default: false },
    staff: { type: Boolean, default: false }
  },
  displayName: { type: String, required: true },
  loginLogs: {
    uuid: { type: String },
    token: { type: String },
    ipAddress: { type: String, required: true },
    loginAt: { type: Date, default: Date.now, required: true }
  },
  createdAt: { type: Date, default: Date.now }
})

userSchema.index({ socialID: 1, socialType: -1 }, { unique: true })

// using the schema to make a collection in our DB
export const User = mongoose.model('User', userSchema)

export const getAllUser = async () => {
  const users = await User.find()
  return users
}

export const getAllUserByRole = async (role) => {
  role = `roles.${role}`
  const users = await User.find({
    [role]: true
  })
  return users
}

export const getDisplayName = async (socialID, socialType) => {
  const user = await User.findOne({
    socialID: socialID,
    socialType: socialType
  })

  return user ? user.displayName : null
}

export const getUser = async (socialID, socialType) => {
  const user = await User.findOne({
    socialID: socialID,
    socialType: socialType
  })
  return user
}

export const promoteStaffRole = async (socialID, socialType) => {
  const updatedUser = await User.findOneAndUpdate({
    // conditions
    socialID: socialID,
    socialType: socialType,
  }, {
    // update
    'roles.staff': true
    // $addToSet: {
    //   roles: {
    //     name: 'staff'
    //   }
    // }
  }, {
    new: true, // return modified document
  })

  return updatedUser
}

export const demoteStaffRole = async (socialID, socialType) => {
  // find the user then add staff role
  const updatedUser = await User.findOneAndUpdate({
    // conditions
    socialID: socialID,
    socialType: socialType,
  }, {
    // update
    'roles.staff': false
    // $pull: {
    //   roles: {
    //     name: 'staff'
    //   }
    // }
  }, {
    new: true, // return modified document
  })

  return updatedUser
}

export const signIn = async (accessToken, socialID, socialType, displayName, uuid, ipAddress) => {
  const user = await User.findOneAndUpdate({
    // conditions
    socialID: socialID,
    socialType: socialType
  }, {
    // update
    token: accessToken,
    displayName: displayName,
    'roles.member': true,
    // $addToSet: {
    //   roles: {
    //     name: 'member'
    //   }
    // },
    $push: {
      loginLogs: {
        uuid: uuid,
        token: accessToken,
        ipAddress: ipAddress,
        loginAt: Date.now()
      }
    }
  }, {
    new: true, // return modified document
    upsert: true // create the object if it doesn't exist
  })

  return user
}