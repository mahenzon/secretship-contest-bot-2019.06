const mongoose = require('mongoose')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const config = require('./config')
const { addOrUpdateUser } = require('./utils/userActions')


mongoose.connect('mongodb://localhost/contest-bot', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
})
const db = mongoose.connection

// Check connection
db.once('open', () => {
  console.log('Connected to MongoDB')
})

// Check for db errors
db.on('error', (err) => {
  console.error(err)
})


// Create constant login keyboard
const keyboard = Markup.inlineKeyboard([
  Markup.loginButton('Login', `${config.domain}/login`),
])


const bot = new Telegraf(config.token)

bot.start(({ reply, message }) => {
  addOrUpdateUser(message.from)
  return reply('Hello! Here you can check all users of this bot...', Extra.markup(keyboard))
})

bot.help(({ reply }) => reply('Help message...'))
bot.on('message', ctx => ctx.telegram.sendCopy(ctx.from.id, ctx.message))


bot.launch()
// bot.launch({
//   webhook: {
//     port: config.port,
//     domain: config.domain,
//     hookPath: config.hookPath,
//   },
// })
