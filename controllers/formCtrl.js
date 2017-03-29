const db = require('../db.js')

module.exports = {

postUserInfo: function(){

  db.post_user([req.body.ufirstName, req.body.ulastName], function(err) {
          if (err) next(err)
          return res.status(200).json()
      })
}

}
