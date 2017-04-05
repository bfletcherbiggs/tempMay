angular.module("willapp").controller("willCtrl", function($scope, $stateParams, $state, $timeout, willService, chatService){

//========== CHILDREN ADD FORM ADD with button ===========

       $scope.numberOfInputs = [];

       $scope.addInput = function () {

         $scope.numberOfInputs.push({
           child: "",
           dob: "",
           biological: false,
           adopted: false
         });


         $timeout(function(){
           var dateId = '#date-' + ($scope.numberOfInputs.length - 1)
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
          console.log($scope.numberOfInputs)
        }

//=========STEP CHILDREN INPUTS ==========

        $scope.stepnumberOfInputs = [];

        $scope.stepChildAddInput = function () {

          $scope.stepnumberOfInputs.push({
            stepChild: "",
            stepchilddob: "",

          });


          $timeout(function(){
            var dateId = '#date-' + ($scope.stepnumberOfInputs.length - 1)
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
        $scope.steplogInputs = function() {
           console.log($scope.stepnumberOfInputs)
         }

// ========== PERSONAL INFO SUBMISSION =================
  $scope.SendData = function(data) {
    willService.postUserInfo(data).then(function(response) {
      // Send some message
      // $state.go('nextView')
      $scope.$parent.postSystemMessage("personview")
      $state.go("chat", {returning: true})
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

 // ======== Children 1 Questions  ================

 $scope.pregoresponseyes = function() {
  //  willService.postUserInfo(data).then(function(response) {
  //
  //
  //   }
   $scope.prego = !$scope.prego
 }

 $scope.futureChildrenAnswer = function() {
  //  willService.postUserInfo(data).then(function(response) {
  //
  //
  //   }
   $scope.planToInclude = !$scope.planToInclude
 }




 // ======== Business Explanation Page Submit ================



})
