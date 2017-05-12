exports.up = function( knex, Promise ) {
    return knex.schema.createTable( 'user_step_children', function( t ) {
        t.increments( 'id' ).unsigned().primary().notNull();
        t.integer( 'user_id' ).references( 'user.id' ).notNull().onDelete( 'cascade' );
        t.timestamps( true, true );
        t.string( 'stepchild' );
        t.string( 'stepchilddob' );
        t.boolean( 'complete' ).default( false ).notNull();
    } )
    .then( function () {
        return knex( 'user_step_children' ).insert( [
            { user_id: 1, stepchild: "Hot Tamale", stepchilddob: "08/35/86" }
        ] )
    } )
};

exports.down = function( knex, Promise ) {
    return knex.schema.dropTable( 'user_step_children' );
};
