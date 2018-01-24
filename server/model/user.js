import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  socialID: { type: String, required: true },
  socialType: { type: String, enum: ['facebook', 'google', 'twitter'], required: true },
  token: { type: String },
  roles: {
    name: { type: String, enum: ['admin', 'staff'], unique: true, sparse: true }
  },
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