angular.module("willapp").controller("willCtrl", function($scope, $stateParams, $state, willService){

$scope.test = "will ctrl is working"

  $scope.SendData = function(data) {
    willService.postUserInfo(data).then(function(response) {
      // Send some message
      // $state.go('nextView')
      console.log(response)
    })
  }
})
