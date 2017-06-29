'use strict';

// Declare app level module which depends on filters, and services

angular.module("myApp", [
    "ngRoute",

    "myApp.filter",

    "myApp.service",
    "myApp.CRUDService",

    "myApp.directive",

    "myApp.IndexController"
]).
config(function ($interpolateProvider, $routeProvider, $locationProvider, $httpProvider) {
    $httpProvider.defaults.headers['post']['Access-Control-Allow-Origin'] = "*";
    $httpProvider.defaults.headers['put']['Access-Control-Allow-Origin'] = "*";
    $httpProvider.defaults.headers['delete'] = {};
    $httpProvider.defaults.headers['delete']['Access-Control-Allow-Origin'] = "*";

    // Index Route
    $routeProvider.
    when("/", {
        templateUrl: "/views/home.html",
        controller: "IndexController"
    });

    // Otherwise Route (if no others match)
    $routeProvider.
    otherwise({
        redirectTo: "/"
    });

    $locationProvider.hashPrefix('!');
});
