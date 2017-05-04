angular.module("willapp").controller("chatCtrl", function($scope, $window,$location,$rootScope,$anchorScroll, $stateParams, $state, chatService, willService, $timeout){

$scope.getProgress = () => {
  willService.getProgress().then(function(response) {
    console.log(response)
    // Store it somewhere
  })
}

$scope.getProgress()

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
  $('#scrollbot').attr('id', 'notNewMessage')
// }
  $('#newMessage').attr('id', 'scrollbot')
  postMessageToWatson(userMessage)

  // $anchorScroll(["scrollbot"])
  // function fuck($anchorScroll, $location, $scope) {
  //     $scope.gotoAnchor = function(x) {
  //       var newHash = 'anchor' + x;
  //       if ($location.hash() !== newHash) {
  //         // set the $location.hash to `newHash` and
  //         // $anchorScroll will automatically scroll to it
  //         $location.hash('anchor' + x);
  //       } else {
  //         // call $anchorScroll() explicitly,
  //         // since $location.hash hasn't changed
  //         $anchorScroll();
  //       }
  //     };
  //   }
}

$scope.postSystemMessage = function(sysMessage) {
  $scope.messages.push("")
  postMessageToWatson(sysMessage)

}

function postMessageToWatson(message) {

  chatService.postMessage(message).then(function(response){
    $scope.messages.push(response)
    // if ($('#scrollbot')){

    $('#scrollbot').attr('id', 'notNewMessage')
  // }
    $('#newMessage').attr('id', 'scrollbot')
    document.getElementById('scrollbot').scrollIntoView(true);
    // NOTE get the digetst to cycle to push that all the way down...


    // jQuery('.chat-messages').scrollTop(jQuery(this).parent().outerHeight())
    // Animating the scroll
    // $timeout(function() {
    //   $chatMessages.animate({scrollTop: $chatMessages.outerHeight()}, 1000)
    // }, 200)

    // Checking Watson's response and triggering views
    if (response.includes('Time is Money') || response.includes('if we can make your estate plan today')) {
      // $scope.messages.push("should go to new state")
      $state.go("chat.estatevalue", {returning: true})
    }
    else if (response.includes('Fantastic! Do you own a farm')) {
      $state.go("chat", {returning: true})
    }
    // Other conditions here
    else if (response.includes('Legal Name') || response.includes(' go ahead and update your personal information')) {
      $state.go("chat.personinfo", {returning: true})
    }
    else if (response.includes('I have bad news... I am not able to create a will for you')) {
      $state.go("chat.attorneyref", {returning: true})
    }
    else if (response.includes('I understand its not clear, go ahead') || response.includes('proceed here until you answer this one question, if your not')) {
      $state.go("chat.bizexplaination", {returning: true})
    }
    else if (response.includes('Thank You for your service') || response.includes('did not serve in the armed forces just click')) {
      $state.go("chat.millitaryService", {returning: true})
    }
    else if (response.includes('Ok lets add your children to your will') || response.includes(' go ahead and update your children')) {
      $state.go("chat.childrentwo", {returning: true})
    }
    else if (response.includes('Are you, your spouse, or partner pregnant')) {
      $state.go("chat.childrenone", {returning: true})
    }
    else if (response.includes('Ok lets add your children to your will.') || response.includes('Take a look at the form to the right which starts with the question about step children')) {
      $state.go("chat.childrentwo", {returning: true})
    }
    else if (response.includes('It looks like you have a minor child in your care')) {
      $state.go("chat.minorGuardian", {returning: true})
    }
    else if (response.includes('Ok this is how this works, you need to list the name') || response.includes(' go ahead and update your disinherit')) {
      $state.go("chat.disinheritone", {returning: true})
    }
    else if (response.includes('Great! We are really moving along here, Now')) {
      $state.go("chat.executor", {returning: true})
    }
    else if (response.includes('gender, and relationship') || response.includes(' go ahead and update your disinherit')) {
      $state.go("chat.disinheritone", {returning: true})
    }
    else if (response.includes(' go ahead and update your executor')) {
      $state.go("chat.executor", {returning: true})
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
