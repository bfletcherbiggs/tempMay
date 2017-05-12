angular.module('willapp').service("willService", function($http, $rootScope, chatService){

  var self = this;
  self.setuser= {}

  this.setUser = function(setuser) {
    self.setuser = setuser;
    $rootScope.isAuthenticated = true;
  }
  this.logoutUser = () => {
    self.setuser = [];
    $rootScope.isAuthenticated = false;
  }

  //========== GET USER'S PROGRESS ===========

    this.getProgress = function() {
          return $http.get('/api/user/will/userinfo').then(function(response){
            //Check code
            if (response.status === 200) {
              self.setUser(response.data)
              return response.data;
            }
          }).catch(function(err) {
            return err;
          })
      }



//========== SEND PERSONAL INFO TO DB POST FUNCTION ===========

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

    //========== SEND MILITARY CLAUSE TO DATABASE ===========

 this.postMilitaryClause = function(clause){
   const dataForSQL = {military_clause: clause}
  return $http.put('/api/user/will/willInfo', dataForSQL).then(function(response){
    //Check code
    if (response.status === 200) {
      return response.data;
    }
  }).catch(function(err) {
    return err;
  })

}

  //========== SEND MARITAL STATUS & SPOUSE TO DB ===========

this.updateMaritalStatus = function(user) {
  const dataForSQL = {
      // Rename property to match SQL table column name

      marital_status: user.maritalStatus,
      spouse_name: user.spousename,
      spouse_citizen: user.spousecitizen
  }
  console.log(dataForSQL)
  return $http.put('/api/user/will/willinfo', dataForSQL)
}

  //========== SEND CHILDREN TO DB ===========
this.submitUserChildren = function(user){
  return $http.put('/api/user/will/willinfo/children', user)
}

//========== SEND STEP - CHILDREN TO DB ===========
this.submitUserStepChildren = function(user){
  console.log(user)
return $http.put('/api/user/will/willinfo/stepchildren', user)
}
//========== SEND DISINHERIT PEOPLE TO DB ===========
this.submitUserDisInPerson = function(user){
  console.log(user)
return $http.put('/api/user/will/willinfo/disinheritpeople', user)
}
//========== Send Biz Explain To Lawyer ===========

this.updateBizExplaination = function(user) {
const dataForSQL = {
    // Rename property to match SQL table column name
    user_id: this.user.id,
    biz_explaination: this.user.bizexplain
}
console.log(dataForSQL)
return $http.put('/api/user/will/willinfo', dataForSQL)
}
// ============= Send Guardian to DB =============
this.updateUserGuardian = function(guardian) {
  console.log(guardian)
const dataForSQL = {
    // Rename property to match SQL table column name

    guardian_name  : guardian.gname,
    guardian_city  : guardian.gcity,
    guardian_state  : guardian.gstate,
    co_guardian_name  : guardian.gconame,
    co_guardian_city  : guardian.gcocity,
    co_guardian_state  : guardian.gcostate,
}
console.log(dataForSQL)
return $http.put('/api/user/will/willinfo', dataForSQL)
}

})
