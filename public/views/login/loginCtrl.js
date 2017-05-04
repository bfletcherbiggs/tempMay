angular.module('willapp').controller('loginCtrl', function($scope,$state,loginSvc, willService) {

// $scope.booUserlogin = (user)=>{
//   loginSvc.newUserlogin(user).then((res)=>{
//     console.log(res)
//     if (res.status === 200) {
//       $scope.user=res.data
//       willService.setUser(res.data)
//       console.log("Are you still here?")
//       $state.go('chat')
//     }
//   })
//   .catch((err)=>{
//     console.log(err)
//       // if(err.data.error === "username"){
//       //   alert("Username Incorrect")
//       // }
//       // else if(err.data.error === "password"){
//       //   alert("Password Incorrect")
//       // }
//       // else{err}
//   })
//
//
// }

  $scope.login = (user)=>{
    loginSvc.login(user).then((res)=>{
      console.log(res)
      if (res.status === 200) {
        $scope.user=res.data
        willService.setUser(res.data)
        $state.go('chat')
      }
    })
    .catch((err)=>{
      console.log(err)
        // if(err.data.error === "username"){
        //   alert("Username Incorrect")
        // }
        // else if(err.data.error === "password"){
        //   alert("Password Incorrect")
        // }
        // else{err}
    })
  }




});
