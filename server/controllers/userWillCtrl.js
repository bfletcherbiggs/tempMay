const db = require('../db')

module.exports = {
  //TODO: create user and create row in users and row in will_info
  getUserInfo: function(req, res, next) {

    if (!req.user) {
      return res.status(401).json({message: "Unauthorized. Please log in."})
    }

    db.from('user')
    .where("user.id", req.user.id)
    .leftJoin('will_inputs', 'user.id', 'will_inputs.user_id')
    .leftJoin('user_children', 'user.id', 'user_children.user_id')
    .leftJoin('user_step_children', 'user.id', 'user_step_children.user_id')
    .leftJoin('user_disinherit', 'user.id', 'user_disinherit.user_id')
    .returning('*')
    .then(user => {
      const formattedUser = user[0]

      formattedUser.children = []
      formattedUser.stepChildren = []
      formattedUser.disinherit = []

      for (let userRow of user) {
        if (userRow.child) {
          formattedUser.children.push({
            child: userRow.child,
            dob: userRow.dob,
            legalstatus: userRow.childlegalstatus
          })
        }
        if(userRow.stepchild) {
          formattedUser.stepChildren.push({
            stepchild: userRow.stepchild,
            stepchilddob: userRow.stepchilddob
          })
        }
        if(userRow.disinheritname) {
          formattedUser.disinherit.push({
            disinheritname: userRow.disinheritname,
            disinheritdob: userRow.disinheritdob
          })
        }

      }

      delete formattedUser.id
      delete formattedUser.child
      delete formattedUser.dob
      delete formattedUser.childlegalstatus
      delete formattedUser.stepchild
      delete formattedUser.stepchilddob
      delete formattedUser.disinheritname
      delete formattedUser.disinheritdob

      formattedUser.id=formattedUser.user_id
      delete formattedUser.user_id

      res.status(200).json(formattedUser)
    })


  },

  postUserInfo: function(req, res, next) {
    let user_id = parseInt(req.session.passport.user)
    let user = {
      first_name: req.body.ufirstName,
      middle_name: req.body.uMiddleName,
      last_name: req.body.uLastName,
      other_sign_names: req.body.uOtherLegalNames,
      address: req.body.uAddress,
      city: req.body.uCity,
      county: req.body.uCounty,
      state: req.body.uState,
      complete: req.body.complete
    }
    db('user')
    .where('user.id', user_id)
    .update(user)
    .returning('id')
    .then(function(response) {
      console.log(response)
      res.status(200).json(response)
    }).catch(function(err) {
      console.log(err)
      return res.status(500).json(err)
    })

  },

  updateWillInfo: function(req, res, next) {
    db('will_inputs').update(req.body).returning('*').then(function(response) {
      console.log(response)
      res.status(200).json(response)
    }).catch(function(err) {
      return res.status(500).json(err)
    })
  },

  updateChildren: function(req, res, next) {
    db('user_children').insert(req.body).returning('*').then(function(response) {
      console.log(response)
      return res.status(200).json(response)
    }).catch(function(err) {
      return res.status(500).json(err)
    })
  },

  updateStepChildren: function(req, res, next) {
    db('user_step_children').insert(req.body).returning('*').then(function(response) {
      console.log(response)
      return res.status(200).json(response)
    }).catch(function(err) {
      return res.status(500).json(err)
    })
  },

  updateDisInheritPeople: function(req, res, next) {
    db('user_disinherit').insert(req.body).returning('*').then(function(response) {
      console.log(response)
      return res.status(200).json(response)
    }).catch(function(err) {
      return res.status(500).json(err)
    })
  },

  postMilitaryClause: function(req, res, next) {
    console.log(req.body)
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
