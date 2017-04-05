angular.module("willapp").controller("chatCtrl", function($scope, $stateParams, $state, chatService, $timeout){

$scope.messages = [];
$scope.userMessage="";
var $chatMessages = jQuery('.chat-messages')

$scope.watsonMessage = function(){
  chatService.getMessage($scope.watsonMessage).then(function(response){
      $scope.messages.push(response)

  })
}
$scope.postUserMessage = function(userMessage) {
  $scope.userMessage="";
  $scope.messages.push(userMessage)
  postMessageToWatson(userMessage)

}

$scope.postSystemMessage = function(sysMessage) {
  $scope.messages.push("")
  postMessageToWatson(sysMessage)

}

function postMessageToWatson(message) {
  chatService.postMessage(message).then(function(response){
    $scope.messages.push(response)
    // jQuery('.chat-messages').scrollTop(jQuery(this).parent().outerHeight())

    // Animating the scroll
    $timeout(function() {
      $chatMessages.animate({scrollTop: $chatMessages.outerHeight()}, 1000)
    }, 200)

    // Checking Watson's response and triggering views
    if (response.includes('Time is Money') || response.includes('if we can make your estate plan today')) {
      // $scope.messages.push("should go to new state")
      $state.go("chat.estatevalue", {returning: true})
    }
    else if (response.includes('Fantastic! Do you own a farm')) {
      $state.go("chat", {returning: true})
    }
    // Other conditions here
    else if (response.includes('Legal Name')) {
      $state.go("chat.personinfo", {returning: true})
    }
    else if (response.includes('I understand its not clear, go ahead')) {
      $state.go("chat.bizexplaination", {returning: true})
    }
    else if (response.includes('Thank You for your service')) {
      $state.go("chat.millitaryService", {returning: true})
    }
    else if (response.includes('Ok lets add your children to your will')) {
      $state.go("chat.childrentwo", {returning: true})
    }
    else if (response.includes('Are you, your spouse, or partner pregnant')) {
      $state.go("chat.childrenone", {returning: true})
    }
    else if (response.includes('Ok lets add your children to your will.') || response.includes('Take a look at the form to the right which starts with the question about step children')) {
      $state.go("chat.childrentwo", {returning: true})
    }

    // This is the Catch all all condition go above here...Not sure you need this though as it takes away a view with a different response.
    // else {
    //   $state.go("chat.progress", {returning: true})
    // }


  })
}


if (!$stateParams.returning) {
  $scope.watsonMessage()
}

})
