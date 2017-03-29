const express = require('express')
const userWillCtrl = require('../controllers/userWillCtrl')
const router = express.Router()

// router.get('', userinfoCtrl.getMessage)

router.post('/userinfo', userWillCtrl.postUserInfo)

module.exports = router
