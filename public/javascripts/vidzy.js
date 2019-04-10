var app = angular.module('Vidzy',['ngResource','ngRoute']);

app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/add-video',{
            templateUrl: 'partials/video-form.html',
            controller: 'AddVideoCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode( true );
});

app.controller('HomeCtrl',
    function($scope, $resource){
        var Videos = $resource('/api/videos');
        Videos.query(function(videos){
            $scope.videos = videos;
        });
    });

    app.controller('AddVideoCtrl',
    function($scope, $resource, $location){
        $scope.save = function(){
            var Videos = $resource('/api/videos');
            Videos.save($scope.video, function(){
                $location.path('/');
            });
        };
    });