const Telegraf = require('telegraf')

const config = require('./config')

const bot = new Telegraf(config.token)

bot.start(({ reply }) => reply('Hello there!'))
bot.help(({ reply }) => reply('Help message...'))
bot.on('message', ctx => ctx.telegram.sendCopy(ctx.from.id, ctx.message))


bot.launch({
  webhook: {
    port: config.port,
    domain: config.domain,
    hookPath: config.hookPath,
  },
})
