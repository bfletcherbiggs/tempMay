const passport = require( 'passport' ),
      LocalStrategy = require( 'passport-local' ).Strategy,
      bcrypt = require( 'bcryptjs' ),
      db = require( './db' );

const config = {
    usernameField: 'email',
    passwordField: 'password'
}

// NOTE: this callback function runs when passport.authenticate('local') is called
passport.use( new LocalStrategy( config, ( email, password, done ) => {
    db( 'user' )
    .where( { email } )
    .first()
    .then( user => {
        if ( !user ) {
            return done( null, false, { error:"username" } )
        }
        if ( !bcrypt.compareSync( password, user.password ) ) {
            return done( null, false, { error:"password" } )
        }
        done( null, user )
    })
    .catch( err => {
        done( err )
    } )
} ) )

// NOTE:
//   this is passed the value that serializeUser saved our session
//   whatever value we give to done() here will end up on req.user
passport.deserializeUser( ( id, done ) => {
    db( 'user' )
    .where( { id } )
    .first()
    .then( user => {
        done( null, user )
        return null
    } )
    .catch( err => {
        done( err, null )
        return null
    } )
} )


// NOTE:
//   this is passed the value from deserializeUser (req.user)
//   whatever value we give to done() here will be saved on our session
passport.serializeUser( ( user, done ) => {
    done( null, user.id )
} )

module.exports = passport
