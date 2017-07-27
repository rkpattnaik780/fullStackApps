var ang = angular.module('myApp', []);

ang.controller('myCtrl', function ($scope, $http) {

    $scope.register = function (user) {
        var t = true;
        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
        console.log(user.terms);
        if (!(user.email && user.fname && user.lname && user.userid && user.password && user.password2)) {
            t = false;
            alert('All fields are compulsary');
            user.password = null;
            user.password2 = null;
        }
        if (!validateEmail(user.email)) {
            t = false;
            alert("Enter a valid email ID");
            user.password = null;
            user.password2 = null;
            user.email = null;
        }
        if (user.password.length < 8 || user.password2.length < 8) {
            t = false;
            alert("Password should longer than 8 characters");
            user.password = null;
            user.password2 = null;
        }
        if (!user.terms) {
            t = false;
            alert("You have to agree terms and conditions");
            user.password = null;
            user.password2 = null;
        }
        if (/[^a-zA-Z]/.test(user.fname) || /[^a-zA-Z]/.test(user.lname)) {
            t = false;
            alert("Names cant have numbers");
            user.password = null;
            user.password2 = null;
            user.fname = null;
            user.lname = null;
        }
        if (user.password != user.password2) {
            t = false;
            alert("Password didn't match");
            user.password = null;
            user.password2 = null;
        }
        if (t) { // make the http call here.
            $http.post('/checkemail', $scope.user).then(function (resp) {
                if (!resp.data) {
                    $http.post('/checkuserid', $scope.user).then(function (res) {
                        // if userid is available , data is returned .
                        if (!res.data) {
                            $http.post('/signup', $scope.user).then(function (response) {
                                console.log(response.data);
                                alert('successfully registered!');
                                location.href = "dashboard.html";
                                $scope.user = {};
                            }, function (response) { console.log(error); });
                        }
                        else {
                            alert("Userid is already taken up");
                            user.password = null;
                            user.password2 = null;
                            user.userid = null;
                        }

                    }, function (res) { console.log(error); });
                }
                else {
                    alert("Email ID is already registered!!");
                    user.password = null;
                    user.password2 = null;
                    user.email = null;
                }
            }, function (resp) { console.log(error); });


        }
    }
});

//name of database be "votingapp" with collection users 