angular.module('willapp').service('loginSvc', function($http) {

this.newUserlogin = (user)=> $http.post('/api/user/login/create',user)

  this.login = (user)=> $http.post('/api/user/login',user)


  this.logout=()=>{return $http.get('/logout')}

});
