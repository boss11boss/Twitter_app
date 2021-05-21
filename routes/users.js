const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')

mongoose.connect('mongodb://localhost/helo')

let userSchema = mongoose.Schema({
  username: String,
  name:String,
  password:String,
  email:String,
  tweet:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'tweetz'
  }]
})



mongoose.plugin(plm)
module.exports=mongoose.model('let',userSchema)

