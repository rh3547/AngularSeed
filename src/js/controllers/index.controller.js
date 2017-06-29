'use strict';

/* Index Controller */
angular.module('myApp.IndexController', [])
.controller('IndexController', function ($scope, CRUDService) {
    $scope.message = "Angular Seed";

    // Demonstration of generic CRUD service, requires API to be running elsewhere
    CRUDService.READALL("post").then(function(data) {
        $scope.list = data;
    });
});
