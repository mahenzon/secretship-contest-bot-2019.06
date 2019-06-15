const { Schema, model } = require('mongoose')
const timestamps = require('mongoose-timestamp')
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new Schema({
  user_id: {
    type: Number,
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

UserSchema.plugin(timestamps)
UserSchema.plugin(uniqueValidator)

const User = model('User', UserSchema)
module.exports = User
