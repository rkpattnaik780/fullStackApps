var ang = angular.module('myApp', []);

ang.controller('myCtrl' , function( $scope , $http){

    $scope.register = function(user){
        var t = true ;
        if(!(user.email && user.fname && user.lname && user.userid && user.password && user.password2))
         {  t = false ;
            alert('All fields are compulsary'); }
        if(user.password != user.password2)
          {   t = false ;
              alert("Password didn't match");}
        if(t){ // make the http call here.

            $http.post('/signup', $scope.user).then(function (res) {
              console.log(res.data);
              alert('successfully registered!');
              location.href = "dashboard.html" ;
              $scope.user = {} ;
              }, function (res) { console.log(error); }); 
        }
    }
});

//name of database be "votingapp" with collection users 