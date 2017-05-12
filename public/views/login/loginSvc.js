angular.module( 'willapp' ).service( 'loginSvc', function( $http ) {

  this.newUserLogin = user => $http.post( '/api/user/create', user )

  this.login = user => $http.post('/api/user/login', user )

  this.logout = () => $http.get( 'api/user/logout' )

} );
