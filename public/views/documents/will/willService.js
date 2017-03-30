angular.module('willapp').service("willService", function($http, chatService){

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

    this.calculateAssets = function(estatevalue) {

      var summed = 0;

      for (var key in estatevalue) {
        summed += estatevalue[key];
      };

      if(summed >750000) {
        // Send standard message to Watson: 'Assets > 750000'
        return "a message"
        // return $http.post('/watson/message',{message: message}).then(function(response){
        //
        //   return response.data
        //
        // })
      }
      else {
        // Send response to watson
        return "2d0ap53reh assetview"
        // return $http.post('/watson/message',{message: message}).then(function(response){
        //   console.log(context)
        //   return response.data
        //
        // })
      }


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
