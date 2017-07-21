var ang = angular.module('myApp', []);

ang.controller('myCtrl', function ($scope, $http) {
    
      function load(){
       $scope.display = "visible" ; 
      $http.get('/profile').then(function (res) {
      console.log("fetch user data");
      if(!res.data){ 
          location.href = "../index.html" ;}
          console.log(res.data);
          $scope.userinfo = res.data;
          loadMyPolls();
      }, function (res) {console.log(error);});
    }

    load() ;

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

     $scope.deletePoll = function(item){
          $http.post('/deletepoll',item).then( function (res){
              console.log("Deleted");
              loadMyPolls();
          }, function (res) { console.log("error");});
     };
     
    $scope.submitques = function(nques){
         var t = true ;
         if (!(nques.question && nques.op1 && nques.op2 && nques.op3 && nques.op4)){
             t = false ;
             alert("All fields are compulsary!") ;
             $scope.nques = {} ;
         }
         if(t){
         $http.post('/submitpoll' , $scope.nques).then(function(res){
             console.log('Submitted');
             $scope.nques = {} ;
             loadMyPolls();
         }, function (res) { console.log(error);}); }
    };
});
