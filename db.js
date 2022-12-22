const mongoose  = require("mongoose")
require('dotenv').config()

function connectDB() {
  mongoose.connect(process.env.MONGO_KEY, {useUnifiedTopology: true, useNewUrlParser: true})
  const connection = mongoose.connection

  connection.on('connected', ()=> {
    console.log('Mongo DB connection successful')
  })
  connection.on('error', ()=> {
    console.log('Mongo DB connection Error')
  })
}
connectDB()

module.exports = mongoose