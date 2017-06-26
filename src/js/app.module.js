'use strict';

// Declare app level module which depends on filters, and services

angular.module("myApp", [
    "ngRoute",

    "myApp.filter",

    "myApp.service",
    "myApp.BlogPostService",

    "myApp.directive",

    "myApp.IndexController",
    "myApp.BlogPostController"
]).
config(function ($interpolateProvider, $routeProvider, $locationProvider) {

    // Index Route
    $routeProvider.
    when("/", {
        templateUrl: "/views/home.html",
        controller: "IndexController"
    });

    // Blog Routes
    $routeProvider.
    when("/blog", {
        templateUrl: "/views/blog/blog.html",
        controller: "BlogListController"
    }).
    when("/addPost", {
        templateUrl: "/views/blog/add_post.html",
        controller: "AddPostController"
    }).
    when("/readPost/:id/", {
        templateUrl: "/views/blog/read_post.html",
        controller: "ReadPostController"
    }).
    when("/editPost/:id/", {
        templateUrl: "/views/blog/edit_post.html",
        controller: "EditPostController"
    }).
    when("/deletePost/:id/", {
        templateUrl: "/views/blog/delete_post.html",
        controller: "DeletePostController"
    });

    // Otherwise Route (if no others match)
    $routeProvider.
    otherwise({
        redirectTo: "/"
    });

    $locationProvider.hashPrefix('!');
});
