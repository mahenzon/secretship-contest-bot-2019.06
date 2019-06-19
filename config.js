const domain = process.env.DOMAIN
const rootPath = process.env.NODE_ENV === 'production' ? '/secretship-contest-2019.06/' : '/'
const loginUrl = `${domain}${rootPath}api/login`

module.exports = {
  domain,
  rootPath,
  loginUrl,
  token: process.env.BOT_TOKEN,
  hookPath: process.env.WEBHOOK_PATH || null,
  port: process.env.PORT || 3001,
  mongoConnectUri: process.env.MONGO_URI || 'mongodb://localhost/contest-bot',
}
