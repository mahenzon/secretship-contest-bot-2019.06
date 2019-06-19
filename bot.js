const mongoose = require('mongoose')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const I18n = require('./i18n')
const config = require('./config')
const { addOrUpdateUser } = require('./utils/user-actions')


mongoose.connect(config.mongoConnectUri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  reconnectTries: Number.MAX_VALUE,
})
const db = mongoose.connection

// Check for db errors
db.on('error', (err) => {
  console.error(err)
})


function createLoginKb(buttonText) {
  const keyboard = Markup.inlineKeyboard([
    Markup.loginButton(buttonText, config.loginUrl),
  ])
  return Extra.markup(keyboard)
}


const bot = new Telegraf(config.token)

bot.use(Telegraf.session())
bot.use(I18n.middleware())


// Setup middleware to update user's info on each interacion
bot.use(({ message }, next) => {
  addOrUpdateUser(message.from)
  return next()
})

bot.start(({ i18n, replyWithHTML }) => replyWithHTML(
  [i18n.t('greeting'), i18n.t('about')].join('\n\n'),
  createLoginKb(i18n.t('loginBtn')).webPreview(false),
))
bot.help(({ i18n, replyWithHTML }) => replyWithHTML(
  [i18n.t('help'), i18n.t('about')].join('\n\n'),
  createLoginKb(i18n.t('loginBtn')).webPreview(false),
))

// Set locales
bot.command(['en', 'ru'], ({ i18n, reply, message }) => {
  i18n.locale(message.text.slice(1, 3))
  return reply(i18n.t('languageSelected'))
})

// Handle all other messages
bot.on('message', ctx => ctx.telegram.sendCopy(
  ctx.from.id,
  ctx.message,
  createLoginKb(ctx.i18n.t('loginBtn')),
))


// Check connection
db.once('open', () => {
  console.log('Connected to MongoDB')
  // Start server only after DB connect
  // bot.launch().then(() => console.log('Started bot'))
  bot.launch({
    webhook: {
      port: config.port,
      domain: config.domain,
      hookPath: config.hookPath,
    },
  }).then(() => console.log('Started bot with webhook'))
})
