angular.module("willapp").component("navComponent", {

      templateUrl: "navigation/header/header.html",
      controller:   function(){$( document ).ready(function(){
            $(".button-collapse").sideNav();

         })}

})
