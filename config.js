module.exports = {
  token: process.env.BOT_TOKEN,
  domain: process.env.DOMAIN,
  hookPath: process.env.WEBHOOK_PATH || null,
  port: process.env.PORT || 3001,
}
