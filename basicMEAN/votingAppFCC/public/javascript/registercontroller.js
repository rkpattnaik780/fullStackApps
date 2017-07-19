var ang = angular.module('myApp', []);

ang.controller('myCtrl', function ($scope, $http) {

    $scope.register = function (user) {
        var t = true;
        if (!(user.email && user.fname && user.lname && user.userid && user.password && user.password2)) {
            t = false;
            alert('All fields are compulsary');
            user.password = null;
            user.password2 = null;
        }
        if (user.password.length < 8 || user.password2.length < 8) {
            t = false;
            alert("Password should longer than 8 characters");
            user.password = null;
            user.password2 = null;
        }
        if(!user.terms) {
            t = false;
            alert("You have to agree terms and conditions");
            user.password.length = null;
            user.password2.length = null; 
        }
        if (user.password != user.password2) {
            t = false;
            alert("Password didn't match");
            user.password = null;
            user.password2 = null;
        }
        if (t) { // make the http call here.

            $http.post('/signup', $scope.user).then(function (res) {
                console.log(res.data);
                alert('successfully registered!');
                location.href = "dashboard.html";
                $scope.user = {};
            }, function (res) { console.log(error); });
        }
    }
});

//name of database be "votingapp" with collection users 