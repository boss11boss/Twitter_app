const mongoose = require('mongoose');

let tweetSchema = mongoose.Schema({
    caption: String,
    likes:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'let'
    }],
    retweet:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'let'
    }],
    userID:{
     type:mongoose.Schema.Types.ObjectId
    }
  })

module.exports=mongoose.model('tweetz',tweetSchema)