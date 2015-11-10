/**
 * Created by colinmiller on 11/6/15.
 */
//angular

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

    $scope.getData();
}]);





//old jquery
//var messageData = {};
//
//$(document).ready(function(){
//
//    main();
//
//});
//
//function main(){
//    init();
//    clickSubmit();
//    clickCancel();
//    downloadData();
//}
//
//function init(){
//    $('#message').val("");
//    $('#name').val("");
//    messageData = {};
//}
//
//function clickSubmit(){
//    $('.container').on('click', '#submit', function(){
//        $.each($('#inputForm').serializeArray(), function(i, field){
//            messageData[field.name]=field.value;
//        });
//        console.log(messageData);
//        uploadData();
//        init();
//    });
//}
//
//function clickCancel(){
//    $('.container').on('click', '#cancel', function(){
//        console.log("Cancel!");
//        init();
//    });
//}
//
//function uploadData(){
//    $.ajax ({
//        type: "POST",
//        url: "/data",
//        data: messageData,
//        success: function(){
//            downloadData();
//        }
//    })
//}
//
//function downloadData(){
//    $.ajax ({
//        type:"GET",
//        url:"/data",
//        success: function (data){
//            appendDom(data);
//        }
//    })
//}
//
//function appendDom (data){
//    $('#displayField').empty();
//
//    for (var i=0; i<data.length; i++){
//        var el = "<div class='well'>" +
//                "<p>" + data[i].name + "</p>" +
//                "<p>" + data[i].message + "</p>" +
//                "</div>";
//
//        $('#displayField').append(el);
//    }
//}