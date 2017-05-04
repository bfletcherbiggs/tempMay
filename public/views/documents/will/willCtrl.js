angular.module("willapp").controller("willCtrl", function($scope, $stateParams, $state, $timeout, willService, chatService){

 // ======== Biz Explaination Submition  ================
$scope.bizExplainSubmit = function (user){
    console.log(user)
    willService.updateBizExplaination(user).then(function(response) {
      $scope.$parent.postSystemMessage("bizexplain")

      console.log(response)
    })
  }


//========== CHILDREN 2 ADD CHIlDREN FORM ADD with button ===========

       $scope.user = [];

       $scope.addInput = function () {

         $scope.user.push({
          //  user_id: willService.user.id,
           child: "",
           dob: "",
           childlegalstatus: "",
         });

         $timeout(function(){
           var dateId = '#date-' + ($scope.user.length - 1)
           var $datePicker = jQuery(dateId)
           console.log($datePicker)
           $datePicker

           .pickadate({
             onSet: function(e) {
               console.log(e)
               this.close()
             },
             onClose: function() {
               console.log("Close")
             },
             closeOnSelect: true,
             selectMonths: true, // Creates a dropdown to control month
             selectYears: 40 // Creates a dropdown of 15 years to control year
           });

         })

       };
       $scope.logInputs = function() {
          console.log($scope.user)
        }

      $scope.submitUserChildren = function(user){

          willService.submitUserChildren(user).then(function(response) {
            console.log(user)
            var today = new Date();
            var year = today.getFullYear()

            user.forEach((ele)=>{

              if(year - (ele.dob.substr(ele.dob.length-4,ele.dob.length)) <= 18){
                  $scope.$parent.postSystemMessage("minordetectedrun")
              }
          else  $scope.$parent.postSystemMessage("childrensubmitview")
            })

          console.log(response)
        })
      }


//=========STEP CHILDREN INPUTS ==========

        $scope.user = [];

        $scope.stepChildAddInput = function () {

          $scope.user.push({

            stepchild: "",
            stepchilddob: "",

          });


          $timeout(function(){
            var dateId = '#date-' + ($scope.user.length - 1)
            var $datePicker = jQuery(dateId)

            $datePicker

            .pickadate({
              onSet: function(e) {
                console.log(e)
                this.close()
              },
              onClose: function() {
                console.log("Close")
              },
              closeOnSelect: true,
              selectMonths: true, // Creates a dropdown to control month
              selectYears: 40 // Creates a dropdown of 15 years to control year
            });

          })

        };
        $scope.steplogInputs = function() {
           console.log($scope.user)
         }
         $scope.submitUserStepChildren = function(user){

             willService.submitUserStepChildren(user).then(function(response) {
                 $scope.$parent.postSystemMessage("childnominor")
                   $state.go("chat", {returning: true})
             console.log(response)
           })

         }
//=========DISINHERIT PEOPLE INPUTS ==========

                 $scope.user = [];

                 $scope.disaddInput = function () {

                   $scope.user.push({

                     disinheritname: "",
                     disinheritdob: "",

                   });


                   $timeout(function(){
                     var dateId = '#date-' + ($scope.user.length - 1)
                     var $datePicker = jQuery(dateId)
                     console.log($datePicker)
                     $datePicker

                     .pickadate({
                       onSet: function(e) {
                         console.log(e)
                         this.close()
                       },
                       onClose: function() {
                         console.log("Close")
                       },
                       closeOnSelect: true,
                       selectMonths: true, // Creates a dropdown to control month
                       selectYears: 40 // Creates a dropdown of 15 years to control year
                     });

                   })

                 };
                 $scope.dislogInputs = function() {
                    console.log($scope.user)
                  }
                  $scope.disInPerson = function(user){
                    willService.submitUserDisInPerson(user).then(function(response) {
                    $scope.$parent.postSystemMessage("disinview")

                       console.log($scope.user)
                    console.log(response)
                  })


                  }

// ========== PERSONAL INFO SUBMISSION =================

  $scope.SendData = function(data) {
    willService.postUserInfo(data).then(function(response) {
      // Send some message
      // $state.go('nextView')
      $scope.$parent.postSystemMessage("personview")
      $state.go("chat.maritalStatus", {returning: true})
    }).catch(function(err) {

    })
  }
 //========== ASSET CALCULATION FUNCTION ===========
  $scope.calculateAssets = function(estatevalue){

    var message = willService.calculateAssets(estatevalue)
    $scope.$parent.postSystemMessage(message)

    // chatService.postMessage(message).then(function(response) {
    //   console.log(response)
    // })
  }

// ======== Military Yes and No submit ================
$scope.militaryyes = function(){
  var clause = document.querySelector('.military-yes-clause').innerText
  willService.postMilitaryClause(clause).then(function(response){
      $scope.$parent.postSystemMessage("millitview")

    $state.go("chat", {returning: true})

  })
 }

 // ======== Children 1 Questions Submit   ================

 $scope.pregoresponseyes = function() {
  //  willService.postUserInfo(data).then(function(response) {
  //   }
   $scope.prego = !$scope.prego
 }

 $scope.futureChildrenAnswer = function() {
  //  willService.postUserInfo(data).then(function(response) {

  //   }
   $scope.planToInclude = !$scope.planToInclude
 }

 $scope.stepChildProvideTrigger = function(){
   $state.go("chat.childrenthree", {returning: true})
 }

  $scope.stepchildNoProvideTrigger = function(){
    console.log("banana")
   $scope.$parent.postSystemMessage("childnominor")
   $state.go("chat", {returning: true})

 }

 // ======== Marital Status Page Submit ================
$scope.submitMaritalStatus = function(user) {
  console.log(user)
  willService.updateMaritalStatus(user).then(function(response) {
    $scope.$parent.postSystemMessage("maritalstatussubmit")
    $state.go("chat", {returning: true})
    console.log(response)
  })
}
// ======== Guardian Submit ================
$scope.submitGuardian = function(guardian) {
 console.log(guardian)
 willService.updateUserGuardian(guardian).then(function(response) {
   $scope.$parent.postSystemMessage("childrensubmitview")
   console.log(response)
 })
}

// ======== EXECUTOR PERSONAL REP Submit ================
 $scope.executorsubmit = function (user) {
  $scope.$parent.postSystemMessage("executorsubmitview")
  $state.go("chat.spec", {returning: true})

}
$scope.addSpouseAsPersonalRep = function (){
  $state.go("chat.spec", {returning: true})

}
// ======== SPECIFIC PROPERTY BEQUEST================

$scope.aaddItemLog = function() {
   console.log($scope.specific)
 }
 $scope.addPropItemSubmit = function(){
   $scope.$parent.postSystemMessage("specificpropviewsubmit")
   $state.go("chat.residual", {returning: true})
 //   willService.submitbequest(specific).then(function(response) {
 //   $scope.$parent.postSystemMessage("specificpropviewsubmit")
 //   $state.go("chat.residual", {returning: true})
 //
 //      console.log($scope.specific)
 //   console.log(response)
 // })
 }

  $scope.specific = [];

  $scope.aaddItem = function () {

  $scope.specific.push({

    personalitem: "",
    beneficiary: "",

  });
  };
  $scope.skipSpecific = function(){

    $state.go("chat.residual", {returning: true})

  }
  // ======== Residual Property Questions ================

  $scope.submitResidual = function (){
    $scope.$parent.postSystemMessage("residualsubmitview")
    $state.go("chat.progress", {returning: true})

  }



})
