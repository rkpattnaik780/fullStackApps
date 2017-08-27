var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope, $timeout) {
    var socket = io();
    window.setTimeout(function() {
        var elem = document.getElementById('messages');
        elem.scrollTop = elem.scrollHeight;
    }, 5000);
    
    function load() {
        socket.emit('loadmsgs');
    }
    load();
    $scope.msgs = [];
    $scope.sendMsg = function (data) {
        socket.emit('sendmsg', data);
        $scope.message.text = null;
        setTimeout(function() {
        var elem = document.getElementById('messages');
        elem.scrollTop = elem.scrollHeight;
    }, 500);
    };
    socket.on('msgclient', function (data) {
        $scope.$apply(function () { $scope.msgs.push(data) });
        setTimeout(function() {
        var elem = document.getElementById('messages');
        elem.scrollTop = elem.scrollHeight;
    }, 500);
    });
    socket.on('avlmsgs', function (res) {
        console.log(res);
        //$scope.$apply(function(){$scope.msgs.concat(res); console.log($scope.msgs)});
        $scope.$apply(function () { $scope.msgs = res });
    });
});