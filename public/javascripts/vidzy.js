var app = angular.module('Vidzy', ['ngResource', 'ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/add-video', {
            templateUrl: 'partials/video-form.html',
            controller: 'AddVideoCtrl'
        })
        .when('/video/:id', {
            templateUrl: 'partials/video-form.html',
            controller: 'EditVideoCtrl'
        })
        .when('/video/delete/:id',{
            templateUrl: 'partials/video-delete.html',
            controller: 'DeleteVideoCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
});

app.controller('HomeCtrl',
    function ($scope, $resource, $location) {

        var keyword = $location.search().keyword;

        var Videos = $resource('/api/videos', { search: keyword });
        Videos.query(function (videos) {
            $scope.videos = videos;
        });
    });

app.controller('AddVideoCtrl',
    function ($scope, $resource, $location) {
        $scope.save = function () {
            var Videos = $resource('/api/videos');
            Videos.save($scope.video, function () {
                $location.path('/');
            });
        };
    });

app.controller('EditVideoCtrl',
    function ($scope, $resource, $location, $routeParams) {
        var videos = $resource('/api/videos/:id', { id: '@_id' }, { update: { method: 'PUT' } });

        videos.get({ id: $routeParams.id }, function (video) {
            $scope.video = video;
        });

        $scope.save = function () {
            videos.update($scope.video, function () {
                $location.path('/');
            });
        }
    });

app.controller('DeleteVideoCtrl', 
    function($scope, $resource, $location, $routeParams){
        var videos = $resource('/api/videos/:id');

        videos.get({ id: $routeParams.id}, function(video){
            $scope.video = video;
        });

        $scope.delete=function(){
            videos.delete({id: $scope.video._id}, function () {
                $location.path('/');
            });
        }
    });