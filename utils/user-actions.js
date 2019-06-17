const { Telegram } = require('telegraf')
const User = require('../models/user')
const config = require('../config')

const tg = new Telegram(config.token)

async function updateProfileImageId(user_id) {
  const { total_count, photos } = await tg.getUserProfilePhotos(user_id, 0, 1)
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
  const user_id = user.id
  const newUser = {
    user_id,
    username: user.username,
    last_name: user.last_name,
    first_name: user.first_name,
    language_code: user.language_code,
  }
  const options = {
    upsert: true,
    setDefaultsOnInsert: true,
  }
  try {
    await User.findOneAndUpdate({ user_id }, newUser, options)
  } catch (error) {
    console.error('Error adding new user!', user, error)
    return
  }
  updateProfileImageId(user_id)
}


const actions = {
  addOrUpdateUser,
}

module.exports = actions
