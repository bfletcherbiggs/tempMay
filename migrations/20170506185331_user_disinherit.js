exports.up = function( knex, Promise ) {
    return knex.schema.createTable( 'user_disinherit', function( t ) {
        t.increments( 'id' ).unsigned().primary().notNull();
        t.integer( 'user_id' ).references( 'user.id' ).notNull().onDelete( 'cascade' );
        t.timestamps( true, true );
        t.string( 'disinheritname' );
        t.string( 'disinheritdob' );
        t.boolean( 'complete' ).default( false ).notNull();
    } )
    .then( function () {
        return knex( 'user_disinherit' ).insert( [
            { user_id: 1, disinheritname: "Doosauce", disinheritdob: "04/35/90" }
        ] )
    } )
};

exports.down = function( knex, Promise ) {
    return knex.schema.dropTable( 'user_disinherit' );
};
