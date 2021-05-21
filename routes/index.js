var express = require('express');
var router = express.Router();
const passport = require('passport')
const ls = require('passport-local')


const userModel = require('./users')
const tweetModel = require('./tweet')


passport.use(new ls(userModel.authenticate()))
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
});

router.get('/login', function(req, res, next) {
  res.render('login')
});

router.get('/reg', function(req, res, next) {
  res.render('register')
});

router.post('/create', function(req, res, next) {
  let user = new userModel({
    username:req.body.username,
    email:req.body.email,
    name:req.body.name
  })
  userModel.register(user,req.body.password)
  .then(function(u){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/login')
    })
  })
})

router.post('/check',passport.authenticate('local',{
  successRedirect:'/profile',
  failureRedirect:'/'
}),function(req,res){})

router.get('/profile', isloggedIn,function(req, res) {
  res.render('profile')
});

router.get('/logout',function(req,res){
  req.logOut
  res.redirect('/')
})

router.get('/temp1',function(req, res) {
  userModel.findOne({username:req.session.passport.user})
  .then(function(userFound){
    tweetModel.create({
      caption:'helloooooooooo!',
      userID:userFound._id
    })
    .then(function(newlytweetcreated){
      userFound.tweet.push(newlytweetcreated);
      userFound.save().then(function(savedUser){
        res.send(savedUser);
      })
    })
  })
});

router.get('/temp2/:idd',function(req,res){
  userModel.findOne({username:req.session.passport.user})
  .then((foundUser)=>{
    tweetModel.findOne({_id:req.params.idd})
    .then((foundtweet)=>{
      if(foundtweet.likes.indexOf(foundUser._id)===-1){
        foundtweet.likes.push(foundUser._id)
      }
      else{
        let existingUser = foundtweet.likes.indexOf(foundUser._id)
        foundtweet.likes.splice(existingUser,1)
      }
      foundtweet.save().then((savedTweet)=>{
        res.send(savedTweet)  
      })

    })
  })
})


function isloggedIn(req,res,next){
  if(req.isAuthenticated()){
    next()
  }
  else{
    res.redirect('/')
  }
}

module.exports = router;
