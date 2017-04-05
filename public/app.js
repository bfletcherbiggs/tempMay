angular.module("willapp", ["ui.router"])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/")

  $stateProvider
  .state("home", {
    url: "/",
    templateUrl: "/views/home/home.html",
    controller: "homeCtrl"
  })
  .state("login", {
    url: "/login",
    templateUrl: "/views/login/login.html",
    controller: "loginCtrl"
  })
  .state("contact", {
    url: "/contact",
    templateUrl: "/views/contact/contact.html",
  })
    .state("chat", {
      url: "/chat",
      templateUrl: "/views/chat/chat_view.html",
      controller: "chatCtrl"
    })
    .state("chat.progress", {
      url: "/progress/:returning",
      templateUrl: "/views/documents/documents.html",
      parent: "chat",
      controller: "willCtrl"
    })
    .state("chat.estatevalue", {
      url: "/estatevalue/:returning",
      templateUrl: "/views/documents/will/views/formIntake/estateValue.html",
      parent: "chat",
      controller: "willCtrl"
    })
    .state("chat.personinfo", {
      url: "/personinfo/:returning",
      templateUrl: "/views/documents/will/views/formIntake/personalinfo.html",
      parent: "chat",
      controller: "willCtrl"
    })
    .state("chat.attorneyref", {
      url: "/attorneyref/:returning",
      templateUrl: "/views/documents/will/views/formIntake/attorneyReferrel.html",
      parent: "chat",
      controller: "willCtrl"
    })
    .state("chat.bizexplaination", {
      url: "/bizexplaination/:returning",
      templateUrl: "/views/documents/will/views/formIntake/bizExplanation.html",
      parent: "chat",
      controller: "willCtrl"
    })
    .state("chat.childrenone", {
      url: "/childrenone/:returning",
      templateUrl: "/views/documents/will/views/formIntake/children1.html",
      parent: "chat",
      controller: "willCtrl"
    })
    .state("chat.childrentwo", {
      url: "/childrentwo/:returning",
      templateUrl: "/views/documents/will/views/formIntake/children2.html",
      parent: "chat",
      controller: "willCtrl"
    })
    .state("chat.childrenthree", {
      url: "/childrenthree/:returning",
      templateUrl: "/views/documents/will/views/formIntake/children3.html",
      parent: "chat",
      controller: "willCtrl"
    })
    .state("chat.disinheritone", {
      url: "/disinheritone/:returning",
      templateUrl: "/views/documents/will/views/formIntake/disInherit1.html",
      parent: "chat",
      controller: "willCtrl"
    })
    .state("chat.disinherittwo", {
      url: "/disinherittwo/:returning",
      templateUrl: "/views/documents/will/views/formIntake/disInherit2.html",
      parent: "chat",
      controller: "willCtrl"
    })
    .state("chat.maritalStatus", {
      url: "/maritalStatus/:returning",
      templateUrl: "/views/documents/will/views/formIntake/maritalStatus.html",
      parent: "chat",
      controller: "willCtrl"
    })
    .state("chat.millitaryService", {
      url: "/millitaryService/:returning",
      templateUrl: "/views/documents/will/views/formIntake/millitaryService.html",
      parent: "chat",
      controller: "willCtrl"
    })
    .state("chat.minorGuardian", {
      url: "/minorGuardian/:returning",
      templateUrl: "/views/documents/will/views/formIntake/minorGuardian.html",
      parent: "chat",
      controller: "willCtrl"
    })
    .state("chat.pregnant", {
      url: "/pregnant/:returning",
      templateUrl: "/views/documents/will/views/formIntake/pregnant.html",
      parent: "chat",
      controller: "willCtrl"
    })
})
