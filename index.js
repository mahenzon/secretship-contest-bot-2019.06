const Telegraf = require('telegraf')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })

const Cat = mongoose.model('Cat', { name: String })

// const kitty = new Cat({ name: 'Zildjian' })
// kitty.save().then(() => console.log('meow'))

Cat.find({}).then(document => console.log(document))
