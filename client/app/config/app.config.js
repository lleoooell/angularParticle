angular.module('app').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      // $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/', {
          templateUrl: 'app/views/home.html',
          controller: 'testCtrl'
        }).
        when('/devices', {
          templateUrl: 'app/views/device_liste.html',
          controller: 'devices_listeCtrl'
        }).
         when('/devices/:deviceId', {
          templateUrl: 'app/views/device_detail.html',
          controller: 'devices_detailsCtrl'
        }).
        
        otherwise('/');
    }
  ]).config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      chartColors: ['#FF5252', '#FF8A80'],
      responsive: false
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
      showLines: false
    });
  }]);