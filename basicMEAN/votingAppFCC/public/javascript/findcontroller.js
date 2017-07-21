var ang = angular.module('myApp', []);

ang.controller('myCtrl', function ($scope, $http) {
    function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
        var t = true ;
    $scope.submail = function(user){
       if (!validateEmail(user.email)) {
           alert("Enter a valid emailID");
           user.email = null ;
           t = false ;
       } 
       if(t){
           $http.post('/sendpwd',user).then(function(res){
              if(res.data){ 
                      alert("Email has been sent to the registered emailId");
                      location.href = "../index.html";
              }
              else{
                  alert("Provided emailid has not been registered!");
                  user.email = null ;
              }
           },function(res){console.log(error);})
       }       
    };
});