const express = require('express')
const passport = require('passport')

const userLoginCtrl = require('../controllers/userLoginCtrl.js')
const router = express.Router()


router.get('/', userLoginCtrl.home)
router.get('/authfailed', userLoginCtrl.authfailed)
router.get('/logout', userLoginCtrl.logout)
router.post('/create', userLoginCtrl.create)
router.get('/currentuser',userLoginCtrl.getUser)

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log("Error", err)
    console.log("Info", info)
    console.log("User", user)
    if(err){return next(err);}
    if(!user) {res.status(403).json(info)}
    else{
    req.logIn(user, err => {
      if (err) {return next(err)}
      return res.redirect('/api/user/login/currentuser');
    });
    }
  })(req, res, next)
});


module.exports=router
