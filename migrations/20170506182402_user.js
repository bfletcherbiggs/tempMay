exports.up = function( knex, Promise ) {
    return knex.schema.createTable( 'user', function( t ) {
        t.increments( 'id' ).unsigned().primary().notNull();
        t.timestamps( true, true );
        t.string( 'first_name', 20 );
        t.string( 'middle_name', 20 );
        t.string( 'last_name', 20 );
        t.string( 'email' ).notNull().unique();
        t.string( 'password' ).notNull();
        t.string( 'other_sign_names' );
        t.string( 'address' );
        t.string( 'city' );
        t.string( 'county' );
        t.string( 'state' );
        t.boolean( 'complete' ).default( false ).notNull();
    } )
    .then( function () {
        return knex( 'user' ).insert( [
            { first_name: "Chuck", last_name: "Norris", middle_name: "The", email: "1@1.com", password: "$2a$10$uCBSFHeYHgEBDbS/Cf9guOCmzkzt6ujnBqc5s9TzU0DYVRw.vLc0a", address: "500 S Ervay St", city: "Dallas", state: "TX"}
        ] )
    } )
};

exports.down = function( knex, Promise ) {
    return knex.schema.dropTable( 'user' );
};
