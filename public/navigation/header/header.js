angular.module("willapp").component("navComponent", {
    templateUrl: "navigation/header/header.html",
    controller: ( loginSvc, $rootScope, $scope, $location, willService ) => {
        $scope.logout = () => {
            loginSvc.logout()
            .then( res => {
                willService.logoutUser()
                $location.path( '/' )
            } )
            .catch( err => err )
        }

        $( document ).ready( function() {
            $( ".button-collapse" ).sideNav();
        } )
    }
} )
