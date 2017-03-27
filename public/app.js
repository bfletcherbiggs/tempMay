angular.module("willapp", ["ui.router"])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/")

  $stateProvider
    .state("chat", {
      url: "/chat",
      templateUrl: "/views/chat/chat_view.html",
      controller: "chatCtrl"
    })
      .state("home", {
        url: "/",
        templateUrl: "/views/home/home.html",
        controller: "chatCtrl"
      })
      .state("login", {
        url: "/login",
        templateUrl: "/views/chat/login.html",
        controller: "chatCtrl"
      })
      .state("contact", {
        url: "/contact",
        templateUrl: "/views/contact/contact.html",
        controller: "chatCtrl"
      })

})
