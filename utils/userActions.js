const { Telegram } = require('telegraf')
const User = require('../models/user')
const config = require('../config')

const tg = new Telegram(config.token)

async function updateProfileImageId(user_id) {
  const { total_count, photos } = await tg.getUserProfilePhotos(user_id, 1, 1)
  if (total_count <= 0) return
  const photoArray = photos[0]
  const photo = photoArray[photoArray.length - 1]
  if (!(photo && photo.file_id)) return
  User.updateOne({ user_id }, { profile_photo_id: photo.file_id }, (err) => {
    if (err) {
      console.error(err)
    }
  })
}

async function addOrUpdateUser(user) {
  const newUser = {
    user_id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    language_code: user.language_code,
  }
  const query = { user_id: user.id }
  const options = {
    upsert: true,
    setDefaultsOnInsert: true,
  }
  User.findOneAndUpdate(query, newUser, options, (err) => {
    if (err) {
      console.error('Error adding new user!', user, err)
      return
    }
    updateProfileImageId(user.id)
  })
}


const actions = {
  addOrUpdateUser,
}

module.exports = actions
