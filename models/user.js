const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  first_name: String,
  last_name: String,
  username: String,
  language_code: String,
  profile_photo_id: String,
})

userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)
module.exports = User
