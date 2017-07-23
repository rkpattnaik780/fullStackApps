var ang = angular.module('myApp', []);

ang.controller('myCtrl', function ($scope, $http) {

  $scope.onPoll = {};

  function load() {
    $scope.display = "visible";
    $http.get('/profile').then(function (res) {
      console.log("fetch user data");
      if (!res.data) {
        $scope.display = "none";
      }
      $scope.userinfo = res.data;
    }, function (res) { console.log(error); });
  }

  load();

  function loadPolls() {
    $http.get('/loadpolls').then(function (res) {
      $scope.plist = res.data;
    }, function (res) { console.log(error); });
  }

  loadPolls();

  $scope.logoff = function () {
    $http.get('/logout').then(function (res) {
      alert("Logging you out");
      location.href = "exit.html"
    }, function (res) { console.log(error); });
  };

  $scope.add1 = function (item) {
    $http.post('/checkvoted', item).then(function (res) {
      $scope.onPoll = res.data;
      if ($scope.onPoll.voters.indexOf($scope.userinfo.userid) === -1) {
        $http.post('/votefor1', item).then(function (res) {
          loadPolls();
        }, function (res) { console.log(error); });
      }
      else alert("You have already voted");
    }, function (res) { console.log(error); });
  };
  $scope.add2 = function (item) {
    $http.post('/checkvoted', item).then(function (res) {
      $scope.onPoll = res.data;
      if ($scope.onPoll.voters.indexOf($scope.userinfo.userid) === -1) {
        $http.post('/votefor2', item).then(function (res) {
          loadPolls();
        }, function (res) { console.log(error); });
      }
      else alert("You have already voted");
    }, function (res) { console.log(error); });
  };
  $scope.add3 = function (item) {
    $http.post('/checkvoted', item).then(function (res) {
      $scope.onPoll = res.data;
      if ($scope.onPoll.voters.indexOf($scope.userinfo.userid) === -1) {
        $http.post('/votefor3', item).then(function (res) {
          loadPolls();
        }, function (res) { console.log(error); });
      }
      else alert("You have already voted");
    }, function (res) { console.log(error); });
  };
  $scope.add4 = function (item) {
    $http.post('/checkvoted', item).then(function (res) {
      $scope.onPoll = res.data;
      if ($scope.onPoll.voters.indexOf($scope.userinfo.userid) === -1) {
        $http.post('/votefor4', item).then(function (res) {
          loadPolls();
        }, function (res) { console.log(error); });
      }
      else alert("You have already voted");
    }, function (res) { console.log(error); });
  };
});
