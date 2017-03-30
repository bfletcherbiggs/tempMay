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

    if (response.includes('estimate the value of your assets to determine')) {
      // $scope.messages.push("should go to new state")
      $state.go("chat.estatevalue", {returning: true})

    }

  })
}

$scope.postSystemMessage = function(sysMessage) {
  $scope.messages.push("")
  chatService.postMessage(sysMessage).then(function(response) {
    $scope.messages.push(response)
    // $state.go("chat")
    if (response.includes('added them up and we are good to proceed')) {
      $state.go("chat.personinfo", {returning: true})
    } else if (response.includes('I didnt quite understand what you said')) {
      $state.go("home")
    }
  })
}

if (!$stateParams.returning) {
  $scope.watsonMessage()
}

})
