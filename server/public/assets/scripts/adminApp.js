/**
 * Created by colinmiller on 11/10/15.
 */
var myApp = angular.module('myApp', []);


myApp.controller("MessageController", ['$scope', '$http', function($scope, $http){

    $scope.note = {};
    $scope.messageBoard = [];
    var defaultForm = {
        name: "",
        message : ""
    };

    $scope.clickButton = function(message){
        $http.post('/data', message).then(function(response){
            $scope.inputForm.$setPristine();
            $scope.note = defaultForm;
            $scope.getData();
        });
    };

    $scope.clickCancel = function(){
        $scope.inputForm.$setPristine();
        $scope.note = defaultForm;
    };

    $scope.getData = function(){
        $http.get('/data').then(function(response){
            $scope.messageBoard = response.data;
            console.log("This is the response: ", response.data);
        });
    };

    //delete is not functioning yet
    $scope.clickDelete = function(){
        $http.delete('/data').then(function(response){
           $scope.messageBoard = response.data;
        });
        console.log("Delete!")
    };

    $scope.getData();
}]);
