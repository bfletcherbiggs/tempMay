const express = require( 'express' ),
      userLoginCtrl = require( '../controllers/userLoginCtrl.js' ),
      router = express.Router();

router.get('/logout', userLoginCtrl.logout)
router.post('/create', userLoginCtrl.create)
router.get('/currentuser',userLoginCtrl.getUser)
router.post( '/login', userLoginCtrl.login )


module.exports=router
