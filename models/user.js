const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  first_name: String,
  last_name: String,
  username: String,
  language_code: String,
  profile_photo_id: String,
})

const User = model('User', userSchema)
module.exports = User
