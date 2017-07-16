var ang = angular.module('myApp', []);

ang.controller('myCtrl', function ($scope, $http) {
    
      function load(){
       $scope.display = "visible" ; 
      $http.get('/profile').then(function (res) {
      console.log("fetch user data");
      if(!res.data){ 
          alert("nothing found");
          $scope.display = "hidden" ; }
          console.log(res.data);
          $scope.userinfo = res.data;
          loadMyPolls();
      }, function (res) {console.log(error);});
    }

    load() ;

   /* function loadMyPolls(){
         $http.post('/loadmypolls',$scope.userinfo).then(function (res) {
             console.log(res.data);
         $scope.plist = res.data ;
      }, function (res) {console.log(error);});
    } */

    function loadMyPolls(){
         $http.post('/loadmypolls',$scope.userinfo).then(function (res) {
             console.log(res.data);
             $scope.plist = res.data ;
      }, function (res) {console.log(error);});
    }
    

     $scope.logoff = function(){
          $http.get('/logout').then(function (res) {
           alert("Logging you out");
           location.href = "exit.html"
      }, function (res) {console.log(error);});
     };
     
    $scope.submitques = function(){
         $http.post('/submitpoll' , $scope.nques).then(function(res){
             console.log('Submitted');
             $scope.nques = {} ;
             loadMyPolls();
         }, function (res) { console.log(error);});
    };
});

/* Let the polls be in another collection named polling in 'votingapp' database

any record in the polling sec should have 
 - a question
 - 4 options
 - 4 buttons that will increase their value per vote
 - 4 counts
 - user who posted it
 */