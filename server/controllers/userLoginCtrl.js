const db = require('../db')
const passport = require("../passport.js")
const bcrypt = require('bcryptjs')


function hash(given) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(given, salt)
}

module.exports = {
  home: (req, res) =>{
     userFunc.handleResponse(res,200,'Welcome Home')
   },
   authfailed:(req, res)=> {
       res.status(400).send("oops")
   },
   logout: (req,res)=>{
     req.logout();
     userFunc.handleResponse(res,200,'success')
   },

  create: (req, res, next) => {

          const userInfo = {
              email: req.body.email.toLowerCase(),
              password: hash(req.body.password),
          }
          db('user').returning('*').insert(userInfo)
            .then ((response) =>{
              return passport.authenticate('local', (err,user,info)=>{
                if(user){
                  delete user.password
                  db('will_inputs').insert({user_id: user.id})
                  .then(response => {
                    return res.status(200).json(user)
                  })
                  .catch(err => {
                    return res.status(500).json(err)
                  })
                }
            })(req,res,next);
          })
          .catch((err)=>{
            console.log("Error in create", err)
            return res.status(500).json(err);
        })
},


  getUser: function(req, res) {
    console.log("Getting user")
    // if (req.isAuthenticated()) {
      delete req.user.password
      return res.status(200).json(req.user)
    // }
    // return res.status(401).json({message: "Unauthorized"})
  },



}
