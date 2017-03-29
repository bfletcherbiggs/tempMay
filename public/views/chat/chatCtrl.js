angular.module("willapp").controller("chatCtrl", function($scope, $stateParams, $state, chatService){

$scope.messages = [];
$scope.userMessage="";

$scope.watsonMessage = function(){
  chatService.getMessage($scope.watsonMessage).then(function(response){
      $scope.messages.push(response)

  })
}
$scope.postMessage = function(userMessage) {
  $scope.userMessage="";
  $scope.messages.push(userMessage)
  chatService.postMessage(userMessage).then(function(response){
    $scope.messages.push(response)

    if (response.includes('Great! Heres a nugget for ya')) {
      // $scope.messages.push("should go to new state")
      $state.go("chat.personinfo", {returning: true})

    }

  })
}

if (!$stateParams.returning) {
  $scope.watsonMessage()
}

})
