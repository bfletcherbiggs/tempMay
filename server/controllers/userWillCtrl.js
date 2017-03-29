const db = require('../db')

module.exports = {
  postUserInfo: function(req, res, next) {
    var user = {
      first_name: req.body.ufirstName,
      last_name: req.body.ulastName
    }
    db('user').insert(user).returning('id').then(function(response) {
      console.log(response)
      res.status(200).json(response)
    }).catch(function(err) {
      return res.status(500).json(err)
    })

  }
}
