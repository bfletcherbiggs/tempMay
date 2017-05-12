angular.module( 'willapp' ).controller( 'loginCtrl', function( $scope, $state, loginSvc, willService ) {

  $scope.pwdtype="password"
  $scope.togglePWD=null

  $scope.togglePassword = () => {
     $scope.togglePWD = !$scope.togglePWD
     $scope.togglePWD
     ?$scope.pwdtype="text"
     :$scope.pwdtype="password"
  }

  $scope.newUserLogin = user => {
    loginSvc.newUserLogin( user ).then( res => {
      if (res.status === 200) {
        $scope.user = res.data
        willService.setUser( res.data )
        $state.go( 'chat' )
      }
    })
    .catch( err => {
        if( err.data.error === "username" ){
          alert("Username Incorrect")
        }
        else if( err.data.error === "password" ){
          alert("Password Incorrect")
        }
        console.log( err )
    })
  }



  $scope.login = user => {
    loginSvc.login( user ).then( res => {
      if (res.status === 200) {
        $scope.user = res.data
        willService.setUser( res.data )
        $state.go( 'chat' )
      }
    })
    .catch( err => {
        if( err.data.error === "username" ){
          alert("Username Incorrect")
        }
        else if( err.data.error === "password" ){
          alert("Password Incorrect")
        }
        console.log( err )
    })
  }


});
