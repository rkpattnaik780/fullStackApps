var ang = angular.module('myApp', []);

ang.controller('myCtrl', function ($scope, $http, $location) {

    $scope.login = function (user) {
        var t = true;
        if (!(user.userid && user.password)) {
            t = false;
            alert("All feilds are compulsary!");
        }
        if (t) {
            $http.post('/login', $scope.user).then(function (res) {
                console.log(res.data);
                
                if(res.data)  { location.href = 'htmlpages/dashboard.html' ; }
                else 
                {
                    alert("The userid and password isn't registered");
                    user.userid = null ;
                    user.password = null ;
                }
            }, function (res) { console.log(error); });
        }
    }
});