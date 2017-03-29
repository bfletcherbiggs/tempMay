angular.module('willapp').service("willService", function($http){

  this.postUserInfo = function(data) {
        return $http.post('/api/user/will/userinfo', data).then(function(response){
          //Check code
          if (response.status === 200) {
            return response.data;
          }
        }).catch(function(err) {
          return err;
        })
    }


})


// General User Info
// ufirstName: "",
// umiddleName: "",
// ulastName: "",
// ucity: "",
// ualternateNameYouSignWith: "",
// uaddressStreet: "",
// uaddressCity: "",
// uaddressZip: "",
// uaddressCounty: "",
// uphoneNumber: "",


// Marital Status

// User Agent for Minor Children
// minorAgentFirstName: "",
// minorAgentMiddleName: "",
// minorAgentLastName: "",
// minorAgentAddress: "",
// minorAgentPhone: "",
// limitationsOnDecision: "",
// altAgentOneFirstName: "",
// altAgentOneLastName: "",
// altAgentOneAddress: "",
// altAgentOnePhone: "",
// altAgentTwoFirstName: "",
// altAgentTwoLastName: "",
// altAgentTwoAddress: "",
// altAgentTwoPhone: "",
// durationDate: ""};
//
// })
