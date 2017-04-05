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

  },

  postMilitaryClause: function(req, res, next) {
    var clause = {
      clause: req.body.clause,
    }

    // First find the user db('will_info').find()

      // If the row exists, then update military clause
      // db('will_info').update('military_clause', 'clause.clause')


      // If the row/user doesn't exist, insert the row with the military clause
      // db('will_info').insert()
    db('will_inputs').insert(clause).returning('clause').then(function(response) {
      console.log(response)
      res.status(200).json(response)
    }).catch(function(err) {
      return res.status(500).json(err)
    })

  }
}
