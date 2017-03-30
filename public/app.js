angular.module("willapp", ["ui.router"])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/")

  $stateProvider
    .state("chat", {
      url: "/chat",
      templateUrl: "/views/chat/chat_view.html",
      controller: "chatCtrl"
    })
    .state("chat.question", {
      url: "/question/:returning",
      template: '<h1>Hi</h1>',
      parent: "chat",
      controller: "willCtrl"
    })
    .state("chat.personinfo", {
      url: "/personinfo/:returning",
      templateUrl: "/views/documents/will/views/personalinfo.html",
      parent: "chat",
      controller: "willCtrl"
    })
    .state("chat.estatevalue", {
      url: "/estatevalue/:returning",
      templateUrl: "/views/documents/will/views/estateValue.html",
      parent: "chat",
      controller: "willCtrl"
    })
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



})
