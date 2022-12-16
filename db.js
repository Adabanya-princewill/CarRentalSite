const mongoose  = require("mongoose")

function connectDB() {
  mongoose.connect('mongodb+srv://admin:12345@cluster0.lbk8adq.mongodb.net/obaya', {useUnifiedTopology: true, useNewUrlParser: true})
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