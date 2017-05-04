const express = require('express')
const userWillCtrl = require('../controllers/userWillCtrl')
const router = express.Router()

// router.get('', userinfoCtrl.getMessage)

router.post('/userinfo', userWillCtrl.postUserInfo)
router.get('/userinfo', userWillCtrl.getUserInfo)
router.put('/willinfo', userWillCtrl.updateWillInfo)
router.put('/willinfo/children', userWillCtrl.updateChildren)
router.put('/willinfo/stepchildren', userWillCtrl.updateStepChildren)
router.put('/willinfo/disinheritpeople', userWillCtrl.updateDisInheritPeople)

module.exports = router
