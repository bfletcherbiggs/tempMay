angular.module('willapp').service("willService", function($http, chatService){


//========== Personal Info DB POST FUNCTION ===========

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


//========== ASSET CALCULATION FUNCTION ===========

    this.calculateAssets = function(estatevalue) {

      var summed = 0;

      for (var key in estatevalue) {
        summed += estatevalue[key];
      };

      if(summed >750000) {
        // Send standard message to Watson: 'Assets > 750000'
        return "a message"
      }
      else {
        // Send response to watson
        return "2d0ap53reh assetview"
      }


    }

    //========== MILITARY DB Power Clause Post FUNCTION ===========
this.postMilitaryClause = function(clause){
  return $http.post('/api/user/will/userinfo', {clause: clause}).then(function(response){
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
