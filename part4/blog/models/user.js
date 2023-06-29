const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true, // unique: true is not a validator. It's used to optimize queries.
  },
  name: String,
  passwordHash: String
})

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
    delete returnedObject._id
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)