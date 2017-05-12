exports.up = function( knex, Promise ) {
    return knex.schema.createTable( 'will_inputs', function( t ) {
        t.increments( 'id' ).unsigned().primary().notNull();
        t.integer( 'user_id' ).references( 'user.id' ).notNull().onDelete( 'cascade' );
        t.timestamps( true, true );
        t.string( 'military_clause' );
        t.string( 'marital_status' );
        t.string( 'spouse_name' );
        t.string( 'spouse_citizen' );
        t.string( 'biz_explanation' );
        t.string( 'guardian_name' );
        t.string( 'guardian_city' );
        t.string( 'guardian_state' );
        t.string( 'co_guardian_name' );
        t.string( 'co_guardian_city' );
        t.string( 'co_guardian_state' );
        t.boolean( 'complete' ).default( false ).notNull();
    } )
    .then( function () {
        return knex( 'will_inputs' ).insert( [
            { user_id: 1, military_clause: "I have served in the Armed Forces", marital_status: "marriedonce", spouse_name: "missy", spouse_citizen: "yes", guardian_name: "T Money", guardian_city: "Denton", guardian_state: "TX", co_guardian_name: "Joey", co_guardian_city: "Weatherford", co_guardian_state: "UT" }
        ] )
    } )
};

exports.down = function( knex, Promise ) {
    return knex.schema.dropTable( 'will_inputs' );
};
