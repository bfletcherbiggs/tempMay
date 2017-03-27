angular.module("willapp").service("chatService", function($http){



this.getMessage = function(){
  return $http.get('/message').then(function(response){
    return response.data
  })
}

this.postMessage = function(message){

  return $http.post('/message',{message: message}).then(function(response){
    return response.data
  })
}




})
