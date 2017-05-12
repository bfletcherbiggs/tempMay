const db = require( '../db' ),
      bcrypt = require( 'bcryptjs' ),
      passport = require( '../passport.js' ),
      userFunc = require( '../functions.js' );


const hash = given => {
    const salt = bcrypt.genSaltSync( 10 );
    return bcrypt.hashSync( given, salt )
}

module.exports = {
    logout: ( req, res ) => {
        console.log('logout')
        req.logout();
        userFunc.handleResponse(res,200,'success')
    },
    create: ( req, res, next ) => {
        const userInfo = {
            email: req.body.email.toLowerCase(),
            password: hash( req.body.password )
        }
        console.log(userInfo)

        return db( 'user' )
        .returning( '*' )
        .insert( userInfo )
        .then ( response => {
            passport.authenticate( 'local', ( err, user, info ) => {
                if( err ) { return next( err )}
                if( !user ) { return res.status( 403 ).json( info ) }
                req.login( user, err => {
                    if( err ) { return next( err ) }
                    return db( 'will_inputs' )
                    .insert( { user_id:user.id } )
                    .then( response => {
                        return res.redirect( '/api/user/currentuser' )
                    } )
                    .catch( err => {
                        return res.status(500).json(err)
                    } )
                } )
            } )( req, res, next )
        } )
        .catch( err =>{
            console.log(err)
            return userFunc.handleResponse( res, 500, 'error', err )
        } )
    },
    login: ( req, res, next ) => {
        passport.authenticate( 'local', ( err, user, info ) => {
            if( err ) { return next( err ) }
            if( !user ) { return res.status( 403 ).json( info ) }
            req.logIn( user, err => {
                if ( err ) { return next( err ) }
                return res.redirect( '/api/user/currentuser' )
            } )
        } )( req, res, next )
    },
    getUser: ( req, res ) => {
        delete req.user.password
        return res.status( 200 ).json( req.user )
    }
}
