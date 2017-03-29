angular.module("willapp").service("chatService", function($http){



this.getMessage = function(){
  return $http.get('/watson/message').then(function(response){
    return response.data
  })
}

this.postMessage = function(message){

  return $http.post('/watson/message',{message: message}).then(function(response){
    return response.data
  })
}




})
