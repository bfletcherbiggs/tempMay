angular.module("willapp").controller("willCtrl", function($scope, $stateParams, $state, willService, chatService){
$scope.test = "will ctrl is working"

  $scope.SendData = function(data) {
    willService.postUserInfo(data).then(function(response) {
      // Send some message
      // $state.go('nextView')
      console.log(response)
    })
  }

  $scope.calculateAssets = function(estatevalue){
    // console.log(estatevalue)
    var message = willService.calculateAssets(estatevalue)
    $scope.$parent.postSystemMessage(message)
  
    // chatService.postMessage(message).then(function(response) {
    //   console.log(response)
    // })
  }
})
