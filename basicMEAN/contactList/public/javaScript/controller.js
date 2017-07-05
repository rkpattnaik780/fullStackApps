var ang = angular.module('myApp', []);
ang.controller('myCtrl', function ($scope, $http) {

  function refresh( ) {
    $http.get('/contactlist').then(function (res) {
      console.log('i requested');
      $scope.contactList = res.data;
      $scope.contact = {} ;
    }, function (res) { console.log(error); });
  }

  refresh();

  $scope.store = function () {
    $http.post('/contactlist', $scope.contact).then(function (res) {
          refresh() ;
    }, function (res) { console.log(error); }); 
  }; 
  $scope.remove = function(id){
    console.log(id);
    $http.delete('/contactlist/' + id).then(function(res){
      console.log(res.data) ;
      refresh();
    });
  };
  
  $scope.edit = function(id){
    
   $http.get('/contactlist/' + id).then(function(res){
     console.log(res.data) ;
      $scope.contact = res.data ;  
      console.log(id) ;
    } , function(res) { console.log(error) ;});
  };

  $scope.update = function(){
        console.log($scope.contact._id) ;
        $http.put('/contactlist/' + $scope.contact._id , $scope.contact).then(function(response){
         // console.log(response);
          refresh();
        });
  };

});
