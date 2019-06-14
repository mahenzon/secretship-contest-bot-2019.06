const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const config = require('./config')


const keyboard = Markup.inlineKeyboard([
  Markup.loginButton('Login', `${config.domain}/login`),
])


const bot = new Telegraf(config.token)

bot.start(ctx => ctx.reply('Hello! Here you can check all users of this bot...', Extra.markup(keyboard)))
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
