exports.up = function( knex, Promise ) {
    return knex.schema.createTable( 'user_children', function( t ) {
        t.increments( 'id' ).unsigned().primary().notNull();
        t.integer( 'user_id' ).references( 'user.id' ).notNull().onDelete( 'cascade' );
        t.timestamps( true, true );
        t.string( 'child' );
        t.string( 'dob' );
        t.string( 'childlegalstatus' );
        t.boolean( 'complete' ).default( false ).notNull();
    } )
    .then( function () {
        return knex( 'user_children' ).insert( [
            { user_id: 1, child: "Boosauce", childlegalstatus: "Detained", dob: "04/35/86" }
        ] )
    } )
};

exports.down = function( knex, Promise ) {
    return knex.schema.dropTable( 'user_children' );
};
